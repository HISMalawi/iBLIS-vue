<template>
  <ion-page>
    <tool-bar pageTitle="iBLIS | Pending Orders" defaltBackButtonLink="/home" />

    <ion-content :fullscreen="true">
      <collapse-tool-bar pageTitle="iBLIS | Pending Orders" />

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
                  Test.test_name
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
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>

    <pending-orders-footer />
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonModal,
  IonDatetime,
onIonViewDidLeave,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import PendingOrdersFooter from "@/components/PendingOrdersFooter.vue";
import GetSiteOrders from "@/composables/getSiteOrders";
import { Specimen } from "@/interfaces/Specimen";
import DateModalToolBar from "@/components/DateModalToolBar.vue";
import { format, parseISO } from "date-fns";
import { MutationTypes, useStore } from "@/store";
import { useRouter } from "vue-router";
// import SetOrderStatus from "@/composables/setOrderStatus";

export default defineComponent({
  name: "PendingOrdersPage",
  components: {
    IonContent,
    IonPage,
    ToolBar,
    CollapseToolBar,
    PendingOrdersFooter,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonInput,
    IonModal,
    IonDatetime,
    DateModalToolBar
  },
  setup() {
    // const { set } = SetOrderStatus();
    const store = useStore();

    const router = useRouter();

    const startDateModal = ref<boolean>(false);
    const endDateModal = ref<boolean>(false);

    const now = new Date()
      .toISOString()
      .replace(/T/, " ") // replace T with a space
      .replace(/\..+/, "")
      .substring(0, 10);

    const fromDate = ref<string>("");

    const toDate = ref<string>("");

    if (store.getters.previousLink == "/summary") {

      fromDate.value = store.getters.fromDate;

      toDate.value = store.getters.toDate;
      
    } else {

      fromDate.value = now;

      toDate.value = now;

    }

    const { fetchOrders, Specimens, Tests } = GetSiteOrders();

    const formatDate = (value: string) => {
      return format(parseISO(value), "yyyy-MM-dd");
    };

    const OpenStartDateModal = (b: boolean) => {
      if (!b) {
        fetchOrders(fromDate.value, toDate.value);
      }

      startDateModal.value = b;
    };

    const OpenEndDateModal = (b: boolean) => {
      if (!b) {
        fetchOrders(fromDate.value, toDate.value);
      }

      endDateModal.value = b;
    };

    const CloseDateModals = () => {
      fetchOrders(fromDate.value, toDate.value);

      startDateModal.value = false;

      endDateModal.value = false;
    };

    const getDateCollected = (Specimen: Specimen) => {
      let date_time: string = Specimen.date_of_collection;

      return date_time.substring(0, 10);
    };

    fetchOrders(fromDate.value, toDate.value);

    onIonViewDidLeave(() => {

      store.commit(MutationTypes.SET_PREVIOUS_LINK, "");
      
    });

    // const ChangeStatus = (Specimen: Specimen) => {

    //   const presentAlert  = async () => {
    //   const alert = await alertController
    //     .create({
    //       cssClass: 'order-status-alert',
    //       header: 'Update Order Status',
    //       subHeader: Specimen.accession_number,
    //       message: 'This is an alert message.',
    //       buttons: [
    //         {
    //           text: 'CANCEL',
    //           role: 'cancel',
    //           cssClass: 'secondary',
    //         },
    //         {
    //           text: 'REJECT',
    //           role: 'reject',
    //           cssClass: 'secondary',
    //           handler: () => {
    //             set(Specimen.accession_number, 3);
    //             fetchOrders();
    //           },
    //         },
    //         {
    //           text: 'ACCEPT',
    //           role: 'accept',
    //           cssClass: 'secondary',
    //           handler: () => {
    //             set(Specimen.accession_number, 2);
    //             fetchOrders();
    //           },
    //         },
    //       ],
    //     });
    //   await alert.present();

    // }

    //   presentAlert();

    // }

    return { startDateModal, endDateModal, fromDate, toDate, Specimens, Tests, getDateCollected, formatDate, OpenStartDateModal, OpenEndDateModal, CloseDateModals};
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
  color: black;
}

ion-col {
  color: black;
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

ion-input[disabled],
ion-input[disabled="true"],
ion-input:disabled {
   --opacity: 1!important;
   opacity: 1!important;
}
</style>
