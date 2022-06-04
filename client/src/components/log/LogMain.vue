<script lang="ts" setup>
import { Ref, ref, watch } from "vue";
import { PatientRecord, User } from "@/models";
import LogTable from "./LogTable.vue";
import { deleteEntry, postEntry } from "./LogController";

interface ILogMain {
  user: User,
  entries: PatientRecord[]
}
const props = defineProps<ILogMain>()
const userEntries = ref<PatientRecord[]>(props.entries);
// * refs
const showUndo = ref(false);
const deletedPosts: Ref<PatientRecord[]> = ref([]);
// * events
const handleAddPost = async (record: PatientRecord) => {
  const newPost = await postEntry(record);
  if (!newPost) return;
  userEntries.value.push(record);
  userEntries.value.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};
const handleUndoPrompt = async (id: string) => {
  // * show undo option and start 8 second countdown
  showUndo.value = true;
  // * add the post to the buffer
  deletedPosts.value.push(
    userEntries.value.find((post) => post.id === id) as PatientRecord
  );
  // * remove the deleted post from the UI
  userEntries.value = userEntries.value.filter((post) => post.id !== id);
};
const undoDeletePost = async () => {
  // * add the post to the UI
  const post = deletedPosts.value.pop() as PatientRecord;
  userEntries.value.push(post);
  showUndo.value = false;
  if (deletedPosts.value.length > 0) {
    // * then blink the undo button
    setTimeout(() => (showUndo.value = true), 500);
  }
};
const handleDeletion = async () => {
  const post = deletedPosts.value.pop() as PatientRecord;
  deletedPosts.value.forEach(async (p) => {
    await deleteEntry(p.id as string);
  });
  const deleteResult = await deleteEntry(post.id as string);
  if (!deleteResult) {
    throw deleteResult.error;
  }
  showUndo.value = false;
  deletedPosts.value.pop();
};
// * emits
defineEmits(["postToAdd", "postToDelete"]);
// * watches for user undo state and will delete all entries in the buffer in 8 seconds
watch(showUndo, (deleteEntry) => {
  if (!deleteEntry) return;
  setTimeout(() => {
    handleDeletion();
  }, 8000);
});
</script>

<template>
  <div id="container">
    <LogTable @postToAdd="handleAddPost" @postToDelete="handleUndoPrompt" :author-id="props.user.id"
      :author-first="props.user.first" :entries="props.entries" />
    <div v-if="showUndo">
      <button class="undo-button" @click="undoDeletePost">Undo?</button>
    </div>
  </div>
</template>

<style scoped lang="sass">
@use '@/_lib' as lib

#container
    display: flex
    flex-flow: column nowrap

    h1
        font-size: lib.$font-size-xxl

    .undo-button
        background: red
        color: white
        border: none
        border-radius: .25em
        height: 3em
        width: 6em
        cursor: pointer
        z-index: 1
        position: fixed
        top: 1em
        right: 1em

        &:hover
            background: red
        &:active
            background: red
</style>
