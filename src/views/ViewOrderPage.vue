<template>
  <ion-page>
    <tool-bar
      :pageTitle="'iBLIS | Order : ' + Specimen.accession_number"
      defaltBackButtonLink="/orders"
    />

    <ion-content :fullscreen="true">
      <collapse-tool-bar pageTitle="iBLIS | Orders" />

      <div id="container">

        <ion-card class="card-3 client-info-card">
          <ion-card-content>
            <ion-row>
              <ion-col size="6">
                <ion-row>
                  <ion-col size="12">
                    <h1>Client Details</h1>
                  </ion-col>
                  <ion-col size="12">
                    <div class="bolder">
                      <h2>
                        <span class="light-text">Name : {{Patient.name}}</span>
                      </h2>
                    </div>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col size="12">
                    <div class="bolder">
                      <h2>
                        <span class="light-text">Gender : {{Patient.gender}}</span>
                      </h2>
                    </div>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col size="12">
                    <div class="bolder">
                      <h2>
                        <span class="light-text">Age : {{Patient.age}}</span>
                      </h2>
                    </div>
                  </ion-col>
                </ion-row>
              </ion-col>

              <ion-col size="6">
                <ion-row>
                  <ion-col size="12">
                    <h1>Order Details</h1>
                  </ion-col>
                  <ion-col size="12">
                    <div class="bolder">
                      <h2>
                        <span class="light-text">Sample : {{Specimen.specimen_type}}  </span>
                      </h2>
                    </div>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col size="12">
                    <div class="bolder">
                      <h2>
                        <span class="light-text">Reason : {{Specimen.priority}}</span>
                      </h2>
                    </div>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col size="12">
                    <div class="bolder">
                      <h2>
                        <span class="light-text">Date Collected : {{getDate(Specimen.date_of_collection)}}</span>
                      </h2>
                    </div>
                  </ion-col>
                </ion-row>
              </ion-col>
              
            </ion-row>
          </ion-card-content>
        </ion-card>

        <ion-grid class="body-grid">
          <ion-row>
            <ion-col class="head-title-col card-3">Lab Results</ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="head-col"> Test </ion-col>
            <ion-col class="head-col"> Result </ion-col>
            <ion-col class="head-col"> Date </ion-col>
          </ion-row>

          <ion-row v-for="Test in Tests" :key="Test.id">
            <ion-col class="cus-row" v-if="Test.specimen_id == Specimen.id"> {{Test.name}} </ion-col>
            <ion-col class="cus-row" v-if="Test.specimen_id == Specimen.id"> Result </ion-col>
            <ion-col class="cus-row" v-if="Test.specimen_id == Specimen.id"> {{getDate(Test.time_created)}} </ion-col>
          </ion-row>

        </ion-grid>
        
      </div>
    </ion-content>

    <view-order-footer/>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonCard, IonCardContent, } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import ViewOrderFooter from "@/components/ViewOrderFooter.vue";
import { useStore } from "@/store";
import { Specimen } from "@/interfaces/Specimen";
import { Patient } from "@/interfaces/Patient";
import GetPatientOrders from "@/composables/getPatientOrders";
export default defineComponent({
  name: "ViewOrderPage",
  components: {
    IonContent,
    IonPage,
    ToolBar,
    CollapseToolBar,
    ViewOrderFooter,
    IonGrid, IonRow, IonCol,
    IonCard, IonCardContent, 
  },
  setup() {
    const store = useStore();

    const Patient: Patient = store.getters.selectedPatient;

    const Specimen :Specimen = store.getters.selectedSpecimen;

    const { fetchOrders, Tests } = GetPatientOrders();

    fetchOrders(parseInt(store.getters.selectedPatient.patient_number));

    const getDate = (date_string: string) => {
      let date_time: string = date_string;

      return date_time.substring(0, 10);
    };

    console.log(Tests);

    return { Specimen, Patient, Tests, getDate };
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

.head-title-col {
  text-align: center;
}

.body-grid{
  padding: 0 10px;
}

.cus-row {
  border-bottom: solid 1px rgb(202, 201, 201);
}

</style>
