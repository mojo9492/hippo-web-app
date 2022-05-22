<script lang="ts" setup>
import { User } from "@/models";

interface IProps {
  user: User;
}
const props = defineProps<IProps>();
</script>

<template>
  <div id="container">
    <p>{{ props.user.last }}</p>
    <p>{{ props.user.first }}</p>
    <p>{{ props.user.email }}</p>
    <button>message</button>
    <button>View Record</button>
  </div>
</template>

<style></style>
