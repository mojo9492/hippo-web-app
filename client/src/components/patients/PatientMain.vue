<script lang="ts" setup>
import { Patient, User } from "@/models";
import PatientData from "@/components/patients/PatientData.vue";
import { getCaregiverByUserId, getPatientsByCaregiverId } from '@/services/userService';
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps<{ user: User }>();

const caregiver = await getCaregiverByUserId(props.user.id);
const patients = await getPatientsByCaregiverId(caregiver.id);

const handleView = (patient: Patient) => {
    router.push({
        name: 'log',
        query: {
            patientId: patient.id
        }
    });

};

defineEmits(["viewPatient"]);
</script>

<template>
    <h1>My Patients</h1>
    <PatientData v-for="p in patients" :key="p.patient.id" :patient-data="p" @viewPatient='handleView' />
</template>
