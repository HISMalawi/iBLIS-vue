<template>
  <ion-page>
    <tool-bar
      pageTitle="iBLIS | Orders"
      defaltBackButtonLink="/client_dashboard"
    />

    <ion-content :fullscreen="true">
      <collapse-tool-bar pageTitle="iBLIS | Orders" />

      <div id="container">
        <ion-grid>
          <ion-row>
            <ion-col class="head-col"> Accession #</ion-col>
            <ion-col class="head-col"> Test Name </ion-col>
            <ion-col class="head-col"> Specimen </ion-col>
            <ion-col class="head-col"> Ordered </ion-col>
            <ion-col class="head-col"> Result </ion-col>
            <ion-col class="head-col"> Released </ion-col>
          </ion-row>

          <ion-row v-for="Specimen in Specimens" :key="Specimen.id">
            <ion-col> {{ Specimen.accession_number}}</ion-col>
            <ion-col> Test Name </ion-col>
            <ion-col> {{ Specimen.specimen_type}}</ion-col>
            <ion-col> Ordered </ion-col>
            <ion-col> Result </ion-col>
            <ion-col> Released </ion-col>
          </ion-row>

        </ion-grid>
      </div>
    </ion-content>

    <orders-footer />
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonGrid, IonRow, IonCol } from "@ionic/vue";
import { defineComponent } from "vue";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import OrdersFooter from "@/components/OrdersFooter.vue";
import GetPatientOrders from "@/composables/getPatientOrders";
import { useStore } from "@/store";

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
  },
  setup() {
    const store = useStore();

    const { fetchOrders, Specimens } = GetPatientOrders();

    fetchOrders(parseInt(store.getters.selectedPatient.patient_number));

    return { Specimens };
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
</style>
