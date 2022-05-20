<script lang="ts" setup>
import { Ref, ref, onMounted } from 'vue'
import { Post } from '@/models'
import LogTable from './LogTable.vue'

interface ILogProps {
    userName: string
    userEmail: string
}
const props = defineProps<ILogProps>()

const userEntries: Ref<Post[]> = ref([])

onMounted(async () => {
    const response = await fetch('http://localhost:3000/feed')
    if (!response.ok) {
        throw new Error('could not find posts: ' + props.userEmail)
    }
    const data = await response.json()
    console.log('response ', data)
    userEntries.value = data
})
</script>

<template>
    <div id="container">
        <h1 v-if="userEntries">Welcome, {{ props.userName }}</h1>
        <h1 v-else>Welcome back</h1>
        <LogTable :entries="userEntries"/>
    </div>
</template>

<style scoped lang="sass">
    #container
        display: flex
        flex-flow: column nowrap
</style>