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
                        <span class="light-text">Name : {{Patient.name}} ({{patientGender}}) </span>
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
                        <span class="light-text">Date Collected : {{getDateCollected(Specimen)}}</span>
                      </h2>
                    </div>
                  </ion-col>
                </ion-row>
              </ion-col>
              
            </ion-row>
          </ion-card-content>
        </ion-card>

        <ion-grid>
          <ion-row>

            <ion-col></ion-col>

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

    const patientGender = ref<string>(Patient.gender.substring(0,1));

    const Specimen :Specimen = store.getters.selectedSpecimen;

    const getDateCollected = (Specimen: Specimen) => {
      let date_time: string = Specimen.date_of_collection;

      return date_time.substring(0, 10);
    };

    return { Specimen, Patient, patientGender, getDateCollected };
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
