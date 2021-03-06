<template>
  <ion-page>
    <tool-bar
      pageTitle="iBLIS | Activity Summary"
      defaltBackButtonLink="/home"
    />

    <ion-content :fullscreen="true">
      <collapse-tool-bar pageTitle="iBLIS | Activity Summary" />

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
            <ion-col class="head-col"> Category</ion-col>
            <ion-col class="head-col"> Value </ion-col>
            <ion-col class="head-col"> Action </ion-col>
          </ion-row>

          <ion-row>
            <ion-col>
              <ion-row>
                <ion-col>Peding Orders</ion-col>
              </ion-row>
            </ion-col>
            <ion-col>
              <ion-row>
                <ion-col>{{ pending_orders }}</ion-col>
              </ion-row>
            </ion-col>
            <ion-col>
              <ion-button
                color="primary"
                size="small"
                @click="NavigateToPendingOrders"
                >View</ion-button
              >
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col>
              <ion-row>
                <ion-col>Rejected Orders</ion-col>
              </ion-row>
            </ion-col>
            <ion-col>
              <ion-row>
                <ion-col>{{ rejected_orders }}</ion-col>
              </ion-row>
            </ion-col>
            <ion-col>
              <ion-button
                color="primary"
                size="small"
                @click="NavigateToRejectedOrders"
                >View</ion-button
              >
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col>
              <ion-row>
                <ion-col>Authorized Results</ion-col>
              </ion-row>
            </ion-col>
            <ion-col>
              <ion-row>
                <ion-col>{{ authorized_results }}</ion-col>
              </ion-row>
            </ion-col>
            <ion-col> </ion-col>
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
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonModal,
  IonDatetime,
} from "@ionic/vue";
import { defineComponent, ref, watchEffect } from "vue";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import PendingOrdersFooter from "@/components/PendingOrdersFooter.vue";
import GetActivitySummary from "@/composables/getActivitySummary";
import { useRouter } from "vue-router";
import { format, parseISO } from "date-fns";
import DateModalToolBar from "@/components/DateModalToolBar.vue";
import { MutationTypes, useStore } from "@/store";

export default defineComponent({
  name: "SummaryPage",
  components: {
    IonContent,
    IonPage,
    ToolBar,
    CollapseToolBar,
    IonGrid,
    IonRow,
    IonCol,
    PendingOrdersFooter,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonModal,
    IonDatetime,
    DateModalToolBar,
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

    fromDate.value = format(parseISO(now), "dd-MMM-yyyy");

    toDate.value = format(parseISO(now), "dd-MMM-yyyy");

    const {
      fetchSummary,
      pending_orders,
      rejected_orders,
      authorized_results,
    } = GetActivitySummary();

    fetchSummary(fromDate.value, toDate.value);

    const NavigateToPendingOrders = () => {
      router.push({ name: "PendingOrders", replace: true });
    };

    const NavigateToRejectedOrders = () => {
      router.push({ name: "RejectedOrders", replace: true });
    };

    const formatDate = (value: string) => {
      return format(parseISO(value), "dd-MMM-yyyy");
    };

    const OpenStartDateModal = (b: boolean) => {
      if (!b) {
        fetchSummary(fromDate.value, toDate.value);

        store.commit(MutationTypes.SET_FROM_DATE, fromDate.value);

        store.commit(MutationTypes.SET_TO_DATE, toDate.value);

        store.commit(MutationTypes.SET_PREVIOUS_LINK, "/summary");
      }

      startDateModal.value = b;
    };

    const OpenEndDateModal = (b: boolean) => {
      if (!b) {
        fetchSummary(fromDate.value, toDate.value);

        store.commit(MutationTypes.SET_FROM_DATE, fromDate.value);

        store.commit(MutationTypes.SET_TO_DATE, toDate.value);

        store.commit(MutationTypes.SET_PREVIOUS_LINK, "/summary");
      }

      endDateModal.value = b;
    };

    const CloseDateModals = () => {
      fetchSummary(fromDate.value, toDate.value);

      store.commit(MutationTypes.SET_FROM_DATE, fromDate.value);

      store.commit(MutationTypes.SET_TO_DATE, toDate.value);

      store.commit(MutationTypes.SET_PREVIOUS_LINK, "/summary");

      startDateModal.value = false;

      endDateModal.value = false;
    };

    watchEffect(() => {
      if (!store.getters.isLoggedIn) {
        router.push({ name: "Login", replace: true });
      }
    });

    return {
      pending_orders,
      rejected_orders,
      authorized_results,
      NavigateToPendingOrders,
      NavigateToRejectedOrders,
      fromDate,
      toDate,
      formatDate,
      startDateModal,
      endDateModal,
      OpenStartDateModal,
      OpenEndDateModal,
      CloseDateModals,
    };
  },
});
</script>

<style scoped>
.head-col {
  text-align: left;
  background: #ffffe2;
  border-left: solid 1px rgb(202, 201, 201);
}
ion-content {
  --ion-background-color: #eee;
}
.gender-label {
  font-size: 23px;
}

.cus-datetime {
  align-self: center !important;
  margin: auto;
  margin-top: 20px;
}
</style>
