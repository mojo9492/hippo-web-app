<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { User } from "@/models";

const store = useStore();
const router = useRouter();

const user = computed<User>(() => store.state.sec.user);
const loggedIn = computed(() => store.state.sec.auth);

onMounted(() => {
  if (!loggedIn.value) {
    router.push({ name: 'login', replace: true });
  }
});
</script>

<template>
  <div v-if="loggedIn" class="home">
    <h1>Hello from Hippo</h1>
    <h2>Welcome back, {{ user.first }}</h2>
  </div>
</template>
