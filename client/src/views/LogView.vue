<template>
    <div class="home">
        <LogMain :user-id="user.id" :user-name="user.first" :user-email="user.email" />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import LogMain from '@/components/log/LogMain.vue'
import { useStore } from 'vuex'

const store = useStore()
console.log('store', store.state.user)
export default defineComponent({
    name: 'HomeView',
    components: {
        LogMain,
    },
    setup() {
        return {
            user: computed(() => store.state.user),
        }
    }
})
</script>