<template>
  <ion-page>
    <tool-bar pageTitle="iBLIS | Configurations" defaltBackButtonLink="/home" />

    <ion-content :fullscreen="true">
      <collapse-tool-bar pageTitle="iBLIS | Configurations" />

      <div id="container">
        <ion-card v-if="!$store.state.loggedIn">
          <ion-item>
            <ion-icon :icon="serverOutline" slot="start"></ion-icon>
            <ion-label position="floating"> Server Address </ion-label>
            <ion-input
              placeholder="http://0.0.0.0:3001/"
              v-model="serverAddress"
            ></ion-input>
          </ion-item>
        </ion-card>
      </div>
    </ion-content>

    <app-footer />
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonCard,
  IonItem,
  IonLabel,
  IonIcon,
  IonInput,
} from "@ionic/vue";
import { defineComponent, ref, watch } from "vue";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import AppFooter from "@/components/AppFooter.vue";
import { serverOutline } from "ionicons/icons";
import Utils from "@/composables/utils";

export default defineComponent({
  name: "ConfigurationsPage",
  components: {
    IonContent,
    IonPage,
    ToolBar,
    CollapseToolBar,
    AppFooter,
    IonCard,
    IonItem,
    IonLabel,
    IonIcon,
    IonInput,
  },
  setup() {
    const serverAddress = ref<string | null>("");

    const { GetServerAddress, SetServerAddress } = Utils();

    GetServerAddress().then((address) => {
      serverAddress.value = address;
    });

    watch(
      () => [serverAddress.value],
      () => {
       
          SetServerAddress(serverAddress.value);
        
      }
    );

    return { serverOutline, serverAddress };
  },
});
</script>

<style scoped>
#container {
  padding-top: 15px;
}

ion-content {
  --ion-background-color: #eee;
}
</style>
