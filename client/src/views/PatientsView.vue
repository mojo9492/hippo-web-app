<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import getPatients from "@/components/patients/PatientsController";
import { User } from "../models";
import PatientRecord from "../components/patients/PatientRecord.vue";

const store = useStore();

const patients = ref<User[]>([]);
onMounted(async () => {
  const result = await getPatients(store.state.user.id);
  patients.value = result;
});
</script>

<template>
  <div id="container">
    <h1>My Patients</h1>
    <PatientRecord v-for="p in patients" :key="p.id" :user="p" />
  </div>
</template>

<style lang="sass"></style>
