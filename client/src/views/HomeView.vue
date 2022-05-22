<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <h1>Hello from Hippo</h1>
    <LoginForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// @ is an alias to /src
import LoginForm from "@/components/landing/LoginForm.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    LoginForm,
  },
});
</script>
