<template>
  <ion-page>
    <tool-bar
      pageTitle="iBLIS | Orders"
      defaltBackButtonLink="/client_dashboard"
    />

    <ion-content :fullscreen="true">
      <collapse-tool-bar pageTitle="iBLIS | Orders" />

      <div id="container">
        <ion-modal
          :is-open="startDateModal"
          @didDismiss="OpenStartDateModal(false)"
        >
          <ion-content force-overscroll="false">
            <date-modal-tool-bar
              pageTitle="Start Date"
              @CloseDateModals="CloseDateModals"
            />
            <ion-datetime
              class="cus-datetime"
              presentation="date"
              @ionChange="(ev: DatetimeCustomEvent) => fromDate = formatDate(ev.detail.value)"
            ></ion-datetime>
          </ion-content>
        </ion-modal>

        <ion-modal
          :is-open="endDateModal"
          @didDismiss="OpenEndDateModal(false)"
        >
          <ion-content force-overscroll="false">
            <date-modal-tool-bar
              pageTitle="End Date"
              @CloseDateModals="CloseDateModals"
            />
            <ion-datetime
              class="cus-datetime"
              presentation="date"
              @ionChange="(ev: DatetimeCustomEvent) => toDate = formatDate(ev.detail.value)"
            ></ion-datetime>
          </ion-content>
        </ion-modal>

        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-item>
                <ion-label position="floating"> Start Date </ion-label>
                <ion-input
                  v-model="fromDate"
                  :placeholder="fromDate"
                  @click="OpenStartDateModal(true)"
                  readonly
                ></ion-input>
              </ion-item>
            </ion-col>

            <ion-col>
              <ion-item>
                <ion-label position="floating"> End Date </ion-label>
                <ion-input
                  v-model="toDate"
                  :placeholder="toDate"
                  @click="OpenEndDateModal(true)"
                  readonly
                ></ion-input>
              </ion-item>
            </ion-col>
          </ion-row>
        </ion-grid>

        <ion-grid>
          <ion-row>
            <ion-col class="head-col"> Accession #</ion-col>
            <ion-col class="head-col"> Test(s) </ion-col>
            <ion-col class="head-col"> Specimen </ion-col>
            <ion-col class="head-col"> Reason </ion-col>
            <ion-col class="head-col"> Date Ordered </ion-col>
            <ion-col class="head-col"> Action </ion-col>
          </ion-row>

          <ion-row
            class="cus-row"
            v-for="Specimen in Specimens"
            :key="Specimen.id"
            :class="Specimen.class"
          >
            <ion-col>
              <ion-row
                ><ion-col>{{ Specimen.accession_number }}</ion-col></ion-row
              >
            </ion-col>
            <ion-col>
              <ion-row v-for="Test in Tests" :key="Test.id">
                <ion-col v-if="Test.specimen_id == Specimen.id">{{
                  Test.name
                }}</ion-col>
              </ion-row>
            </ion-col>
            <ion-col>
              <ion-row
                ><ion-col>{{ Specimen.specimen_type }}</ion-col></ion-row
              >
            </ion-col>
            <ion-col>
              <ion-row
                ><ion-col>{{ Specimen.priority }}</ion-col></ion-row
              >
            </ion-col>
            <ion-col>
              <ion-row
                ><ion-col>{{ getDateCollected(Specimen) }}</ion-col>
              </ion-row>
            </ion-col>

            <ion-col>
              <ion-button color="primary" size="small" @click="PrintBarcode(Specimen)">Print</ion-button
              >
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>

    <orders-footer />
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  onIonViewDidLeave,
  IonItem,
  IonLabel,
  IonInput,
  IonModal,
  IonDatetime,
  IonButton,
  alertController
} from "@ionic/vue";
import { defineComponent, ref, watchEffect } from "vue";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import OrdersFooter from "@/components/OrdersFooter.vue";
import GetPatientOrders from "@/composables/getPatientOrders";
import { ActionTypes, MutationTypes, useStore } from "@/store";
import { Specimen } from "@/interfaces/Specimen";
import { useRouter } from "vue-router";
import { format, parseISO } from "date-fns";
import DateModalToolBar from "@/components/DateModalToolBar.vue";
import PrintProvider from "@/composables/printProvider";

export default defineComponent({
  name: "OrdersPage",
  components: {
    IonContent,
    IonPage,
    ToolBar,
    CollapseToolBar,
    OrdersFooter,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonInput,
    IonModal,
    IonDatetime,
    DateModalToolBar,
    IonButton,
  },
  setup() {
    const store = useStore();

    const router = useRouter();

    const startDateModal = ref<boolean>(false);
    const endDateModal = ref<boolean>(false);

    const { iMove3 } = PrintProvider();

    const now = new Date()
      .toISOString()
      .replace(/T/, " ") // replace T with a space
      .replace(/\..+/, "")
      .substring(0, 10);

    const fromDate = ref<string>("");

    const toDate = ref<string>("");

    fromDate.value = now;

    toDate.value = now;

    const { fetchOrders, Specimens, Tests } = GetPatientOrders();

    fetchOrders(
      parseInt(store.getters.selectedPatient.patient_number),
      fromDate.value,
      toDate.value
    );

    const getDateCollected = (Specimen: Specimen) => {
      let date_time: string = Specimen.date_of_collection;

      return date_time.substring(0, 10);
    };

    const ViewOrder = (Specimen: Specimen) => {
      store.dispatch(ActionTypes.SET_SELECTED_SPECIMEN, Specimen);

      router.push({ name: "ViewOrder", replace: true });
    };

    onIonViewDidLeave(() => {
      store.commit(MutationTypes.CLEAR_ORDER, "CLEAR");
    });

    const formatDate = (value: string) => {
      return format(parseISO(value), "yyyy-MM-dd");
    };

    const OpenStartDateModal = (b: boolean) => {
      if (!b) {
        fetchOrders(
          parseInt(store.getters.selectedPatient.patient_number),
          fromDate.value,
          toDate.value
        );
      }

      startDateModal.value = b;
    };

    const OpenEndDateModal = (b: boolean) => {
      if (!b) {
        fetchOrders(
          parseInt(store.getters.selectedPatient.patient_number),
          fromDate.value,
          toDate.value
        );
      }

      endDateModal.value = b;
    };

    const CloseDateModals = () => {
      fetchOrders(
        parseInt(store.getters.selectedPatient.patient_number),
        fromDate.value,
        toDate.value
      );

      startDateModal.value = false;

      endDateModal.value = false;
    };

    const PrintBarcode = (Specimen : Specimen) => {

      if (store.getters.defaultPrinter.address == "") {
        const AlertExitApp = () => {
          const presentAlert = async () => {
            const alert = await alertController.create({
              header: "Heads Up!",
              message:
                "Barcode printer not configured, Click configure to setup or proceed to ignore!",
              buttons: [
                {
                  text: "CONFIGURE",
                  cssClass: "secondary",
                  handler: () => {
                    router.push({ name: "Configurations", replace: false });
                  },
                },
                {
                  text: "IGNORE",
                  role: "cancel",
                  cssClass: "secondary",
                  handler: () => {

                    console.log("Confirm Cancel");
                    
                  },
                },
              ],
            });
            await alert.present();
          };

          presentAlert();
        };

        AlertExitApp();

      } else if(store.getters.defaultPrinter.address !== "") {

        if (store.getters.defaultPrinter.name.substring(0, 7) == "iMOVE 3") {
          const { PrintBarcode } = iMove3();

          PrintBarcode(Specimen.accession_number);

        } else {

          alert("Printer not supported");

        }
      }
    };

    watchEffect(() => {
      if (!store.getters.isLoggedIn) {
        router.push({ name: "Login", replace: true });
      }
    });

    return {
      CloseDateModals,
      OpenEndDateModal,
      OpenStartDateModal,
      formatDate,
      fromDate,
      toDate,
      startDateModal,
      endDateModal,
      Specimens,
      getDateCollected,
      Tests,
      ViewOrder,
      PrintBarcode,
    };
  },
});
</script>

<style scoped>
ion-content {
  --ion-background-color: #eee;
}

.head-col {
  text-align: left;
  background: #ffffe2;
  border-left: solid 1px rgb(202, 201, 201);
}

.is-new {
  background-color: rgba(61, 231, 146, 0.281) !important;
}

.cus-row {
  border-bottom: solid 1px rgb(202, 201, 201);
}
.cus-datetime {
  align-self: center !important;
  margin: auto;
  margin-top: 20px;
}
</style>
