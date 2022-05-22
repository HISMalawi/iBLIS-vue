<template>
  <ion-page>
    <tool-bar pageTitle="iBLIS | Configurations" defaltBackButtonLink="/home" />

    <ion-content :fullscreen="true">
      <collapse-tool-bar pageTitle="iBLIS | Configurations" />

      <div id="container">
        <ion-card>
          <ion-item>
            <ion-icon :icon="serverOutline" slot="start"></ion-icon>
            <ion-label position="floating"> Server Address </ion-label>
            <ion-input
              placeholder="Server Address"
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
  IonInput
} from "@ionic/vue";
import { defineComponent } from "vue";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import AppFooter from "@/components/AppFooter.vue";
import { serverOutline} from "ionicons/icons";

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
    IonInput
  },
  setup() {
    return { serverOutline };
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
