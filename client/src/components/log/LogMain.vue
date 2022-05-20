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

defineEmits(['postToDelete', 'postToAdd'])

const userEntries: Ref<Post[]> = ref([])

onMounted(async () => {
    const response = await fetch('http://localhost:3000/post/' + props.userId)
    if (!response.ok) {
        throw new Error('could not find posts: ' + props.userEmail)
    }
    const data = await response.json()
    userEntries.value = data
})

const handleAddPost = async (post: Post) => {
    const response = await fetch('http://localhost:3000/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    })
    if (!response.ok) {
        const data = await response.json()
        throw new Error('could not add post: ' + data.body)
    }
    // todo impletment data return
    userEntries.value.push(post)
}

const handleDelete = async (id: string) => {
    const deleteResult = await fetch(`http://localhost:3000/post/${id}`, {
        method: 'DELETE',
    })

    if (!deleteResult) {
        throw new Error('could not delete post: ' + id)
    }
    // todo: handle undo delete
    // * returns the deleted post for undo purposes
    await deleteResult.json()
    // * remove the deleted post from the UI
    userEntries.value = userEntries.value.filter(post => post.id !== id)
}
</script>

<template>
    <div id="container">
        <h1 v-if="userEntries">Welcome, {{ props.userName }}</h1>
        <h1 v-else>Welcome back</h1>
        <LogTable @postToAdd="handleAddPost" @postToDelete="handleDelete" :entries="userEntries" />
    </div>
</template>

<style scoped lang="sass">
    #container
        display: flex
        flex-flow: column nowrap
</style>