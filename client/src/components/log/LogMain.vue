<script lang="ts" setup>
import { Ref, ref, onMounted } from 'vue'
import { Post } from '@/models'
import LogTable from './LogTable.vue'

interface ILogProps {
    userId: number
    userName: string
    userEmail: string
}
const props = defineProps<ILogProps>()

defineEmits(['response'])

const userEntries: Ref<Post[]> = ref([])

onMounted(async () => {
    const response = await fetch('http://localhost:3000/post/' + props.userId)
    if (!response.ok) {
        throw new Error('could not find posts: ' + props.userEmail)
    }
    const data = await response.json()
    userEntries.value = data
})

const handleDelete = async (id: string) => {
    // todo: delete this log: id
    const deleteResult = await fetch('http://localhost:3000/post/' + id, {
        method: 'DELETE',
    })

    if (!deleteResult) {
        throw new Error('could not delete post: ' + id)
    }
    const data = await deleteResult.json()
    console.log('data', data)
}
</script>

<template>
    <div id="container">
        <h1 v-if="userEntries">Welcome, {{ props.userName }}</h1>
        <h1 v-else>Welcome back</h1>
        <LogTable @response="handleDelete" :entries="userEntries" />
    </div>
</template>

<style scoped lang="sass">
    #container
        display: flex
        flex-flow: column nowrap
</style>