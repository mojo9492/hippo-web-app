<script lang="ts" setup>
import { Patient } from "@/models";

interface IProps {
  patient: Patient;
}
const props = defineProps<IProps>();
</script>

<template>
  <div id="container">
    <p>{{ props.patient.id }}</p>
    <p>{{ props.patient.userId }}</p>
    <p>{{ props.patient.userId }}</p>
    <button>message</button>
    <button>View Record</button>
  </div>
</template>

<style>
</style>
