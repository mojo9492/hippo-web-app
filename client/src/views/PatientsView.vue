<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { User } from "@/models";
import PatientMain from "../components/patients/PatientMain.vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const loggedIn = computed(() => store.state.sec.auth);
const user = computed<User>(() => store.state.sec.user);
onMounted(() => {
  if (!loggedIn.value) { // ? does this work?
    router.push({ name: "login", replace: true });
  }
});
</script>

<template>
  <Suspense>
    <template #fallback>
      <div>
        <div role="status">
          <span>Loading...</span>
        </div>
      </div>
    </template>
    <PatientMain :user="user" />
  </Suspense>
</template>

<style lang="sass"></style>
