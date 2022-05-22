<script lang="ts" setup>
import { Ref, ref, onMounted, watch } from "vue";
import { Post } from "@/models";
import LogTable from "./LogTable.vue";
import { deleteEntry, getEntries, postEntry } from "./LogController";
import { useStore } from "vuex";

const store = useStore();
// * refs
const userEntries: Ref<Post[]> = ref([]);
const showUndo = ref(false);
const deletedPosts: Ref<Post[]> = ref([]);

const handleAddPost = async (post: Post) => {
  const newPost = await postEntry(post);
  if (!newPost) return;
  userEntries.value.push(post);
  userEntries.value.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};
const handleUndoPrompt = async (id: string) => {
  // * show undo option and start 8 second countdown
  showUndo.value = true;
  // * add the post to the buffer
  deletedPosts.value.push(
    userEntries.value.find((post) => post.id === id) as Post
  );
  // * remove the deleted post from the UI
  userEntries.value = userEntries.value.filter((post) => post.id !== id);
};
const undoDeletePost = async () => {
  // * add the post to the UI
  const post = deletedPosts.value.pop() as Post;
  userEntries.value.push(post);
  showUndo.value = false;
  if (deletedPosts.value.length > 0) {
    // * then blink the undo button
    setTimeout(() => (showUndo.value = true), 500);
  }
};
const handleDeletion = async () => {
  const post = deletedPosts.value.pop() as Post;
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
onMounted(async () => {
  // todo: delete this log: user
  const entries = await getEntries(store.state.user.id);
  // * sort by date
  userEntries.value = entries.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  userEntries.value = entries;
});
// * watches for user undo state and will delete all entries in the buffer in 8 seconds
watch(showUndo, (deleteEntry) => {
  if (!deleteEntry) return;
  setTimeout(() => {
    handleDeletion();
  }, 8000);
});
</script>

<template>
  <div v-if="store.state.auth" id="container">
    <h1 v-if="userEntries">Welcome, {{ store.state.user.first }}</h1>
    <h1 v-else>Welcome back</h1>
    <LogTable @postToAdd="handleAddPost" @postToDelete="handleUndoPrompt" :author-id="store.state.user.id"
      :author-first="store.state.user.first" :entries="userEntries" />
    <div v-if="showUndo">
      <button class="undo-button" @click="undoDeletePost">Undo?</button>
    </div>
  </div>
  <div v-else>
    <h1>Please log in</h1>
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
