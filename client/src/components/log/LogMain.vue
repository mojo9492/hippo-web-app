<script lang="ts" setup>
import { onBeforeMount, Ref, ref, watch } from "vue";
import { PatientRecord, User } from "@/models";
import LogTable from "./LogTable.vue";
import { getEntriesByPatientId, postRecord, deleteEntry } from "./logService";
import { useRouter } from "vue-router";

const router = useRouter()
const props = defineProps<{ user: User, patientId: number }>();
const patientRecords = ref<PatientRecord[]>([]);
const entries = (await getEntriesByPatientId(props.patientId)) as PatientRecord[];
// * sort by date
patientRecords.value = entries.sort((a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});
// * refs
const showUndo = ref(false);
const deletionQueue: Ref<PatientRecord[]> = ref([]);
// * events
const handleAddRecord = async (record: PatientRecord) => {
  const newPost = await postRecord(record);
  if (!newPost) return;
  patientRecords.value.push(record);
  patientRecords.value.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};
const moveToQueueWithUndoPrompt = async (id: string) => {
  // * show undo option and start 8 second countdown
  showUndo.value = true;
  // * add the post to the buffer
  deletionQueue.value.push(
    patientRecords.value.find((post) => post.id === id) as PatientRecord
  );
  // * remove the deleted post from the UI
  patientRecords.value = patientRecords.value.filter((post) => post.id !== id);
};
const undoDeleteRecord = async () => {
  // * add the post to the UI
  const post = deletionQueue.value.pop() as PatientRecord;
  patientRecords.value.push(post);
  showUndo.value = false;
  if (deletionQueue.value.length > 0) {
    // * then blink the undo button
    setTimeout(() => (showUndo.value = true), 500);
  }
};
const deleteRecords = async () => {
  // const record = deletionQueue.value.pop() as PatientRecord;
  // const deleteResult = await deleteEntry(record.id as string);
  deletionQueue.value.forEach(async (r) => {
    await deleteEntry(r.id as string);
  });
  showUndo.value = false;
  deletionQueue.value.pop();
};
// * emits
defineEmits(["addRecord", "deleteRecord"]);
// * watches for user undo state and will delete all entries in the buffer in 8 seconds
watch(showUndo, (deleteEntry) => {
  if (!deleteEntry) return;
  setTimeout(() => {
    deleteRecords();
  }, 8000);
});
onBeforeMount(() => {
  if (!props.user) {
    router.push({ name: "login" });
  }
})
</script>

<template>
  <div id="container">
    <h2>patient: {{ patientId }}</h2>
    <LogTable @addRecord="handleAddRecord" @deleteRecord="moveToQueueWithUndoPrompt" :author-id="props.user.id"
      :author-first="props.user.first" :patient-id="patientId" :entries="patientRecords" />
    <div v-if="showUndo">
      <button class="undo-button" @click="undoDeleteRecord">Undo?</button>
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
