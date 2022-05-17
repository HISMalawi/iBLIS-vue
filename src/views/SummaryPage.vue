<template>
  <ion-page>
    <tool-bar
      pageTitle="iBLIS | Activity Summary"
      defaltBackButtonLink="/home"
    />

    <ion-content :fullscreen="true">
      <collapse-tool-bar pageTitle="iBLIS | Activity Summary" />

      <div id="container">
        <ion-grid>
          <ion-row>
            <ion-col class="head-col"> Category</ion-col>
            <ion-col class="head-col"> Value </ion-col>
            <ion-col class="head-col"> Action </ion-col>
          </ion-row>

          <ion-row>
            <ion-col> Peding Orders</ion-col>
            <ion-col> {{ pending_orders }} </ion-col>
            <ion-col> View </ion-col>
          </ion-row>

          <ion-row>
            <ion-col> Rejected Orders</ion-col>
            <ion-col> {{ rejected_orders }} </ion-col>
            <ion-col> View </ion-col>
          </ion-row>

        </ion-grid>
      </div>
    </ion-content>

    <pending-orders-footer />
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonGrid, IonRow, IonCol } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import PendingOrdersFooter from "@/components/PendingOrdersFooter.vue";
import GetActivitySummary from "@/composables/getActivitySummary";

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
  },
  setup() {

    const now = new Date()
      .toISOString()
      .replace(/T/, " ") // replace T with a space
      .replace(/\..+/, "")
      .substring(0, 10);

    const fromDate = ref<string>();

    const toDate = ref<string>();

    fromDate.value = now;

    toDate.value = now;

    const { fetchSummary, pending_orders, rejected_orders, authorized_results } = GetActivitySummary();

    fetchSummary(fromDate.value,toDate.value);

    return { pending_orders, rejected_orders, authorized_results };
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
</style>
