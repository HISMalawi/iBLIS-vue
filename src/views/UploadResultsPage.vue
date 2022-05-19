<template>
  <ion-page>
    <tool-bar
      pageTitle="iBLIS | Upload Results"
      defaltBackButtonLink="/client_dashboard"
    />

    <ion-content :fullscreen="true">
      <collapse-tool-bar pageTitle="iBLIS | Upload Results" />

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
            <ion-col class="head-col"> Date Ordered </ion-col>
          </ion-row>

          <ion-row
            class="cus-row"
            v-for="Specimen in Specimens"
            :key="Specimen.id"
            @click="ViewOrder(Specimen)"
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
                ><ion-col>{{ getDateCollected(Specimen) }}</ion-col>
              </ion-row>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>

    <view-results-footer />
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
} from "@ionic/vue";
import { defineComponent, ref, watchEffect } from "vue";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import ViewResultsFooter from "@/components/ViewResultsFooter.vue";
import GetPatientOrders from "@/composables/getPatientOrders";
import { ActionTypes, useStore } from "@/store";
import { Specimen } from "@/interfaces/Specimen";
import { useRouter } from "vue-router";
import { format, parseISO } from "date-fns";
import DateModalToolBar from "@/components/DateModalToolBar.vue";

export default defineComponent({
  name: "UploadResultsPage",
  components: {
    IonContent,
    IonPage,
    ToolBar,
    CollapseToolBar,
    ViewResultsFooter,
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

      router.push({ name: "UploadResultsViewOrder", replace: true });
    };

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

    watchEffect(() => {
      if (!store.getters.isLoggedIn) {
        router.push({ name: "Login", replace: true });
      }
    });

    return { CloseDateModals, OpenEndDateModal, OpenStartDateModal, formatDate, fromDate, toDate,startDateModal, endDateModal, Specimens, getDateCollected, Tests, ViewOrder };
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

/* ion-col {
  --ion-grid-column-padding: 10px;
} */

.cus-row {
  border-bottom: solid 1px rgb(202, 201, 201);
}
</style>
