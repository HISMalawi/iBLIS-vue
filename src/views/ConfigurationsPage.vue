<template>
  <ion-page>
    <tool-bar pageTitle="iBLIS | Configurations" defaltBackButtonLink="/home" />

    <ion-content :fullscreen="true">
      <collapse-tool-bar pageTitle="iBLIS | Configurations" />

      <div id="container">
        <ion-card>
          <ion-item v-if="!$store.state.loggedIn">
            <ion-icon :icon="serverOutline" slot="start"></ion-icon>
            <ion-label position="floating"> Server Address </ion-label>
            <ion-input
              placeholder="http://0.0.0.0:3001/"
              v-model="serverAddress"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-icon :icon="printOutline" slot="start"></ion-icon>
            <ion-label position="floating"> Default Printer </ion-label>
            <ion-input
              v-model="defaultPrinter"
              readonly
              @click="LoadPrinters"
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
  alertController,
} from "@ionic/vue";
import { defineComponent, ref, watch } from "vue";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import AppFooter from "@/components/AppFooter.vue";
import { serverOutline, printOutline } from "ionicons/icons";
import Utils from "@/composables/utils";
import PrintProvider from "@/composables/printProvider";

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

    const defaultPrinter = ref<string>("");

    const { GetServerAddress, SetServerAddress } = Utils();

    const { searchPrinters, connectToPrinter, printTestPage } = PrintProvider();

    GetServerAddress().then((address) => {
      serverAddress.value = address;
    });

    const LoadPrinters = () => {

      searchPrinters().then(() => {
        const AlertExitApp = () => {
          const presentAlert = async () => {
            const alert = await alertController.create({
              cssClass: "order-status-alert",
              header: "SUCCESS!",
              message: "Done",
              buttons: [
                {
                  text: "OK",
                  role: "cancel",
                  cssClass: "secondary",
                },
              ],
            });
            await alert.present();
          };

          presentAlert();
        };

        AlertExitApp();
      });

      
    };

    watch(
      () => [serverAddress.value],
      () => {
        SetServerAddress(serverAddress.value);
      }
    );

    return {
      LoadPrinters,
      defaultPrinter,
      serverAddress,
      serverOutline,
      printOutline,
    };
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
