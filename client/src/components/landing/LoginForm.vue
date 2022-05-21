<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
import login from './AuthController'

const store = useStore()
const router = useRouter()
const userName = ref('')
const password = ref('')

const handleLogin = async () => {
    if (userName.value === 'admin' && password.value === 'admin') return 
        const result = await login(userName.value, password.value)
        if (!result) return 
        
        store.commit('setUser', result)
        return router.push('/log')
    // router.push( {
    //     name: 'homeLog',
    //     params: {
    //         userName: userName.value,
    //         password: password.value,
    //     }
    // })
}

</script>

<template>
    <div id="container">
        <form id="loginForm" @submit.prevent="handleLogin">
            <fieldset>
                <legend>Login</legend>
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" id="username" placeholder="Enter username"
                        v-model="userName">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Enter password"
                        v-model="password">
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
            </fieldset>
        </form>
    </div>
</template>

<style lang="sass">
#container
    width: 100%
    height: 100%
    display: flex
    flex-flow: column nowrap
    justify-content: center
    align-items: center

    #loginForm
        width: 300px
        margin: 0 auto
        padding: 20px
        border: 1px solid #ccc
        border-radius: 5px
        box-shadow: 0 0 8px #ccc
        background-color: #f8f8f8
        display: flex
        flex-flow: column nowrap
        justify-content: center
        align-items: center

        fieldset
            border: 0
            padding: 0

        legend
            font-size: 1.5em
            font-weight: bold
            margin-bottom: 10px

        .form-group
            margin-bottom: 10px

        label
            display: block
            margin-bottom: 5px

        input
            width: 100%
            padding: 5px
            border: 1px solid #ccc
            border-radius: 5px
            box-shadow: 0 0 8px #ccc
            background-color: #f8f8f8
            margin-bottom: 10px

        button
            width: 100%
            padding: 5px
            border: 1px solid #ccc
            border-radius: 5px
            box-shadow: 0 0 8px #ccc
            background-color: #f8f8f8
            margin-bottom: 10px

</style>