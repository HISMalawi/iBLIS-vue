<template>
  <ion-page>
    
    <tool-bar pageTitle="iBLIS | View Results" defaltBackButtonLink="/client_dashboard"/>
    
    <ion-content :fullscreen="true">

      <collapse-tool-bar pageTitle="iBLIS | View Results"/>
    
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

    <view-results-footer />

  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonGrid, IonRow, IonCol } from "@ionic/vue";
import { defineComponent } from "vue";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import ViewResultsFooter from "@/components/ViewResultsFooter.vue";
import GetPatientOrders from "@/composables/getPatientOrders";
import { ActionTypes, useStore } from "@/store";
import { Specimen } from "@/interfaces/Specimen";
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'ViewResultsPage',
  components: {
    IonContent,
    IonPage,
    ToolBar,
    CollapseToolBar,
    ViewResultsFooter,
    IonGrid,
    IonRow,
    IonCol,
  },
  setup(){
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

      store.dispatch(ActionTypes.SET_SELECTED_SPECIMEN, Specimen);

      router.push({ name: "ViewResultsViewOrder", replace: true });

    }

    return { Specimens, getDateCollected, getDateAccepted, Tests, ViewOrder };
  }
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
