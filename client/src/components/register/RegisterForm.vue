<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { IStore } from "@/store";
import validateForm from "./registerValidation";

const store = useStore<IStore>();
const router = useRouter();
const userName = ref("");
const password = ref("");
const lastName = ref("");
const firstName = ref("");

const handleRegister = async () => {
  const formIsValid = validateForm(
    userName.value,
    password.value,
    lastName.value,
    firstName.value
  );
  if (!formIsValid) return; // * add form validation message

  const dispatchRegister = await store.dispatch("auth/register", {
    userName: userName.value,
    password: password.value,
    lastName: lastName.value,
    firstName: firstName.value,
  });
  // todo add banner messaging
  if (!dispatchRegister) return;

  await router.push("/");
};
</script>

<template>
  <div id="container">
    <form id="loginForm" @submit.prevent="handleRegister">
      <fieldset>
        <legend>Login</legend>
        <div class="form-group">
          <label for="username">Email</label>
          <input
            type="text"
            class="form-control"
            id="username"
            placeholder="Enter username"
            v-model="userName"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Enter password"
            v-model="password"
          />
        </div>
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input
            type="text"
            class="form-control"
            id="firstName"
            placeholder="Enter first name"
            v-model="firstName"
          />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input
            type="text"
            class="form-control"
            id="lastName"
            placeholder="Enter last name"
            v-model="lastName"
          />
        </div>
      </fieldset>
      <button type="submit" class="btn-primary">Register</button>
    </form>
  </div>
</template>

<style lang="sass">
@use '@/_lib'

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

        .btn-primary
            @include lib.buttonPrimary
</style>
