<template>
  <div class="home">
    <LogMain />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LogMain from "@/components/log/LogMain.vue";

export default defineComponent({
  name: "LogView",
  components: {
    LogMain,
  },
});
</script>
