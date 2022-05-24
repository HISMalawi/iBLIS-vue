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
            <ion-row>
              <ion-col>
                <ion-button color="primary" size="small" @click="LoadPrinters"
                  >Choose</ion-button
                >
              </ion-col>
              <ion-col>
                <ion-button
                  color="primary"
                  size="small"
                  @click="ConnectToPrinter"
                  >Test Connection</ion-button
                >
              </ion-col>
            </ion-row>
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
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/vue";
import { defineComponent, reactive, ref, watch } from "vue";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import AppFooter from "@/components/AppFooter.vue";
import { serverOutline, printOutline } from "ionicons/icons";
import Utils from "@/composables/utils";
import PrintProvider from "@/composables/printProvider";
import { MutationTypes, useStore } from "@/store";
import { Printer } from "@/interfaces/Printer";

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
    IonRow,
    IonCol,
    IonButton,
  },
  setup() {
    const store = useStore();

    const serverAddress = ref<string>("");

    let defaultPrinter = ref<string>("");

    const {
      GetServerAddress,
      SetServerAddress,
      GetDefaultPrinter,
    } = Utils();

    const {
      searchPrinters,
      testPrinterConnection,
      printers,
    } = PrintProvider();

    GetServerAddress().then((address) => {

      if (address !== null) {
        serverAddress.value = address;
      }

    });

    GetDefaultPrinter().then((printer)=>{

      if (printer !== null) {

        const printerArry = printer?.split("|");
        
        let check = false;

        if (printerArry[3] == "true") {

          check = true;
          
        } 

        store.commit(MutationTypes.SET_DEFAULT_PRINTER, {
          id:printerArry[0],
          name:printerArry[1],
          address:printerArry[2],
          checked:check,
        });


        
      }
      

    })

    searchPrinters();

    const LoadPrinters = () => {
      searchPrinters();

      if (printers.value.length > 0) {
        const AlertExitApp = () => {
          const presentAlert = async () => {
            const alert = await alertController.create({
              header: "Select Printer",
              inputs: printers.value,
              buttons: [
                {
                  text: "Done",
                  role: "cancel",
                  cssClass: "secondary",
                  handler: () => {
                    searchPrinters();
                  },
                },
                {
                  text: "REFRESH",
                  role: "refresh",
                  cssClass: "secondary",
                  handler: () => {
                    searchPrinters();
                  },
                },
              ],
            });
            await alert.present();
          };

          presentAlert();
        };

        AlertExitApp();
      } else {
        const AlertExitApp = () => {
          const presentAlert = async () => {
            const alert = await alertController.create({
              header: "Select Printer",
              message: "Please pair your davice to a printer",
              buttons: [
                {
                  text: "CANCEL",
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
      }
    };

    const ConnectToPrinter = () => {
      testPrinterConnection(store.getters.defaultPrinter.address);
    };

    watch(
      () => [serverAddress.value],
      () => {
        SetServerAddress(serverAddress.value);
      }
    );

    watch(
      () => [store.getters.defaultPrinter],
      () => {
        defaultPrinter.value = store.getters.defaultPrinter.name;
      }
    );

    return {
      LoadPrinters,
      serverAddress,
      serverOutline,
      printOutline,
      defaultPrinter,
      ConnectToPrinter,
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
