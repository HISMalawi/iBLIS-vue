<template>
  <ion-page>
    <tool-bar pageTitle="iBLIS | Configurations" defaltBackButtonLink="/home" />

    <ion-content :fullscreen="true">
      <collapse-tool-bar pageTitle="iBLIS | Configurations" />

      <div id="container">
        <div id="flex-container"></div>
      </div>
    </ion-content>

    <app-footer />
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from "@ionic/vue";
import { defineComponent, watchEffect } from "vue";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import AppFooter from "@/components/AppFooter.vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";

export default defineComponent({
  name: "ConfigurationsPage",
  components: {
    IonContent,
    IonPage,
    ToolBar,
    CollapseToolBar,
    AppFooter,
  },
  setup() {
    const store = useStore();

    const router = useRouter();

    watchEffect(() => {
      if (!store.getters.isLoggedIn) {
        router.push({ name: "Login", replace: true });
      }
    });

    return {};
  },
});
</script>

<style scoped>
#flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

#container {
  padding-top: 15px;
}

ion-content {
  --ion-background-color: #eee;
}
</style>
