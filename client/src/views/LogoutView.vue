<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { IStore } from '@/store'

const store = useStore<IStore>();
const router = useRouter();
const name = computed(() => store.getters.sec.user.first)

onMounted(() => {
    setTimeout(() => {
        store.dispatch("auth/logout");
        router.push({ name: "home", replace: true });
    }, 4000)
})
</script>

<template>
    <h1>Good bye, {{ name }}</h1>
</template>