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
            <ion-col class="head-col"> Test(s) </ion-col>
            <ion-col class="head-col"> Specimen </ion-col>
            <ion-col class="head-col"> Date Ordered </ion-col>
            <ion-col class="head-col"> Date Accepted </ion-col>
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
                </ion-row
              >
            </ion-col>
            <ion-col>
              <ion-row
                ><ion-col>{{ getDateAccepted(Specimen) }}</ion-col>
                </ion-row
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
import { IonContent, IonPage, IonGrid, IonRow, IonCol } from "@ionic/vue";
import { defineComponent } from "vue";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import OrdersFooter from "@/components/OrdersFooter.vue";
import GetPatientOrders from "@/composables/getPatientOrders";
import { useStore } from "@/store";
import { Specimen } from "@/interfaces/Specimen";
import { useRouter } from "vue-router";

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

    const router = useRouter();

    const { fetchOrders, Specimens, Tests } = GetPatientOrders();

    fetchOrders(parseInt(store.getters.selectedPatient.patient_number));

    const getDateCollected = (Specimen: Specimen) => {
      let date_time: string = Specimen.date_of_collection;

      return date_time.substring(0, 10);
    };

    const getDateAccepted = (Specimen: Specimen) => {
      let date_time: string = Specimen.time_accepted;

      return date_time.substring(0, 10);
    };

    const ViewOrder = (Specimen: Specimen) => {

      router.push({ name: "ViewOrder", replace: true });

    }

    return { Specimens, getDateCollected, getDateAccepted, Tests, ViewOrder };
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
