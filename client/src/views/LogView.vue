<script lang="ts" setup>
import LogMain from "@/components/log/LogMain.vue";
import { computed, onMounted} from "vue";
import { useStore } from "vuex";
import { User } from "@/models";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const route = useRoute();
const router = useRouter();
// todo neeed to handle redirects app wide
// const loggedIn = computed(() => store.state.sec.auth);

const user = computed<User>(() => store.state.sec.user);
const patientId = computed(() => Number(route.query.patientId));
onMounted(() => {
  if (!user.value) {
    router.push({ name: "login", replace: true });
  }
});
</script>

<template>
  <div class="home">
    <Suspense>
      <template #fallback>
        <div role="status">
          <span>Loading...</span>
        </div>
      </template>
      <LogMain :user="user" :patientId="patientId" />
    </Suspense>
  </div>
</template>
