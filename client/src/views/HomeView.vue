<template>
  <div class="home">
    <h1>Hello from Hippo</h1>
    <LoginForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// @ is an alias to /src
import LoginForm from "@/components/login/LoginForm.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    LoginForm,
  },
});
</script>
