<script lang="ts" setup>
import { Ref, ref, onMounted, watch } from 'vue'
import { Post } from '@/models'
import LogTable from './LogTable.vue'

interface ILogProps {
    userId: number
    userName: string
    userEmail: string
}
const props = defineProps<ILogProps>()
// * refs
const userEntries: Ref<Post[]> = ref([])
const showUndo = ref(false)
const deletedPost: Ref<Post | undefined> = ref()
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
    userEntries.value.push(post)
}
const handleDelete = async (id: string) => {
    const deleteResult = await fetch(`http://localhost:3000/post/${id}`, {
        method: 'DELETE',
    })

    if (!deleteResult) {
        throw new Error('could not delete post: ' + id)
    }
    // * show undo option
    showUndo.value = true
    deletedPost.value = userEntries.value.find((post) => post.id === id)
    // * returns the deleted post for undo purposes
    await deleteResult.json()
    // * remove the deleted post from the UI
    userEntries.value = userEntries.value.filter(post => post.id !== id)
}
const undoDeletePost = async () => {
    const response = await fetch('http://localhost:3000/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(deletedPost.value),
    })
    if (!response.ok) {
        const data = await response.json()
        throw new Error('could not add post: ' + data.body)
    }
    userEntries.value.push(deletedPost.value as Post)
    showUndo.value = false
}
defineEmits(['postToAdd', 'postToDelete'])
onMounted(async () => {
    const response = await fetch('http://localhost:3000/post/' + props.userId)
    if (!response.ok) {
        throw new Error('could not find posts: ' + props.userEmail)
    }
    const data = await response.json()
    userEntries.value = data
})
watch(showUndo, () => {
    setTimeout(() => {
        showUndo.value = false
        deletedPost.value = undefined
    }, 8000)
})
</script>

<template>
    <div id="container">
        <div v-if="showUndo"><button class="undo-button" @click="undoDeletePost">Undo?</button></div>
        <h1 v-if="userEntries">Welcome, {{ props.userName }}</h1>
        <h1 v-else>Welcome back</h1>
        <LogTable @postToAdd="handleAddPost" @postToDelete="handleDelete" :author-id="props.userId"
            :author-first="props.userName" :entries="userEntries" />
    </div>
</template>

<style scoped lang="sass">
@use '@/_lib' as lib

#container
    display: flex
    flex-flow: column nowrap

    h1
        font-size: lib.$font-size-xxl

    .undo-button
        background: red
        color: white
        border: none
        border-radius: .25em
        height: 3em
        width: 6em
        cursor: pointer
        &:hover
            background: red
        &:active
            background: red
</style>