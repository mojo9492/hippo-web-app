<template>
    <div class="home">
        <LogMain :user-id="1" :user-name="'jobi'" :user-email="'jobi@boberjoberlabs.com'" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LogMain from '@/components/log/LogMain.vue';
export default defineComponent({
    name: 'HomeView',
    components: {
        LogMain,
    },
});
</script>