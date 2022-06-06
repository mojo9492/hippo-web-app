<script lang="ts" setup>
import { IAPIPatient } from "../../services/userService";

interface IProps {
  patientData: IAPIPatient;
}
defineProps<IProps>();
</script>

<template>
  <div id="container">
    <table>
      <tr>
        <th>First</th>
        <th>Last</th>
        <th>Caregiver Id</th>
      </tr>
      <tr>
        <td>{{ patientData.user.first }}</td>
        <td>{{ patientData.user.last }}</td>
        <td>{{ patientData.patient.caregiverId }}</td>
      </tr>
    </table>
    <div id='controls'>
      <a class="btn-secondary" :href="`mailto:${patientData.user.email}`">Message</a>
      <button class="btn-primary" @click="$emit('viewPatient', patientData.patient)">View</button>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@use '@/_lib'

#container
  border: 1px solid #ccc
  border-radius: .25em
  margin-bottom: 1em

  table
    width: 100%
    border-collapse: collapse
    border-bottom: 1px solid #ccc
    margin-bottom: 1em

    th
      font-size: lib.$font-size-lg

    td
      font-size: lib.$font-size-base

      
  #controls
    dislay: flex
    justify-content: space-between
    align-items: center

    .btn-primary
      @include lib.buttonPrimary()

    .btn-secondary
      @include lib.buttonSecondary()
</style>
