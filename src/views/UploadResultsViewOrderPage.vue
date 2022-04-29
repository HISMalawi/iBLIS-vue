<template>
  <ion-page>
    <tool-bar
      :pageTitle="'iBLIS | Order : ' + Specimen.accession_number"
      defaltBackButtonLink="/view_results"
    />

    <ion-content :fullscreen="true">
      <collapse-tool-bar
        :pageTitle="'iBLIS | Order : ' + Specimen.accession_number"
      />

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
                        <span class="light-text"
                          >Name : {{ Patient.name }}</span
                        >
                      </h2>
                    </div>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col size="12">
                    <div class="bolder">
                      <h2>
                        <span class="light-text"
                          >Gender : {{ Patient.gender }}</span
                        >
                      </h2>
                    </div>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col size="12">
                    <div class="bolder">
                      <h2>
                        <span class="light-text">Age : {{ Patient.age }}</span>
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
                        <span class="light-text"
                          >Sample : {{ Specimen.specimen_type }}
                        </span>
                      </h2>
                    </div>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col size="12">
                    <div class="bolder">
                      <h2>
                        <span class="light-text"
                          >Reason : {{ Specimen.priority }}</span
                        >
                      </h2>
                    </div>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col size="12">
                    <div class="bolder">
                      <h2>
                        <span class="light-text"
                          >Date Collected :
                          {{ getDate(Specimen.date_of_collection) }}</span
                        >
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

          <ion-row
            v-for="Test in Tests"
            :key="Test.id"
            @click="OpenUploadResultsModal(Test, Test.name)"
          >
            <ion-col class="cus-row" v-if="Test.specimen_id == Specimen.id">
              <ion-row>
                <ion-col>{{ Test.name }}</ion-col>
              </ion-row>
            </ion-col>
            <ion-col class="cus-row" v-if="Test.specimen_id == Specimen.id">
              <ion-row v-for="Result in Results" :key="Result.id">
                <ion-col v-if="Result.test_id == Test.id">{{
                  Result.measure_name + " : " + Result.result
                }}</ion-col>
              </ion-row>
            </ion-col>
            <ion-col class="cus-row" v-if="Test.specimen_id == Specimen.id">
              <ion-row>
                <ion-col> {{ getDate(Test.time_created) }} </ion-col>
              </ion-row>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>

      <!-- Card Modal -->
      <ion-modal
        :is-open="showModal"
        :swipe-to-close="true"
        :presenting-element="$parent.$refs.ionRouterOutlet"
        @didDismiss="setModalOpen(false)"
      >
        <ion-content>
          <modal-tool-bar
            :pageTitle="'Test | ' + modalTitleTestName"
            @CloseModal="setModalOpen(false)"
          />

          <ion-grid>
            <ion-row class="cus-row" v-for="Measure in Measures" :key="Measure.id">
              <ion-col>
                <ion-row
                  ><ion-col class="title-col">{{ Measure.name }}</ion-col>
                </ion-row
                >
              </ion-col>
              <ion-col>
                <ion-input
                      placeholder="Results"
                      :value="Measure.result"
                      disabled="true"
                    ></ion-input> 
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-content>
      </ion-modal>
    </ion-content>

    <upload-results-view-order-footer />
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonModal,
  IonInput,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import ModalToolBar from "@/components/ModalToolBar.vue";
import UploadResultsViewOrderFooter from "@/components/UploadResultsViewOrderFooter.vue";
import { useStore } from "@/store";
import { Specimen } from "@/interfaces/Specimen";
import { Patient } from "@/interfaces/Patient";
import GetPatientOrders from "@/composables/getPatientOrders";
import GetTestsResults from "@/composables/getTestsResults";
import { TestResult } from "@/interfaces/TestResult";
import GetTestMeasures from "@/composables/getTestMeasures";
export default defineComponent({
  name: "UploadResultsViewOrderPage",
  components: {
    IonContent,
    IonPage,
    ToolBar,
    ModalToolBar,
    CollapseToolBar,
    UploadResultsViewOrderFooter,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonModal,
    IonInput,
  },
  setup() {
    const store = useStore();

    const showModal = ref<boolean>(false);
    const modalTitleTestName = ref<string>("");

    const Patient: Patient = store.getters.selectedPatient;

    const Specimen: Specimen = store.getters.selectedSpecimen;

    const { fetchMeasures, Measures } = GetTestMeasures();

    const { fetchOrders, Tests, TestWithResults } = GetPatientOrders();

    const { Results, fetchTestResults } = GetTestsResults();

    fetchOrders(parseInt(store.getters.selectedPatient.patient_number));

    fetchTestResults(TestWithResults.value);

    const OpenUploadResultsModal = (Test: TestResult, TestName: string) => {
      Measures.value.length = 0;

      fetchMeasures(Test.id);
      modalTitleTestName.value = TestName;
      showModal.value = true;
    };

    const setModalOpen = (b: boolean) => {
      showModal.value = b;
    };

    const getDate = (date_string: string) => {
      let date_time: string = date_string;

      return date_time.substring(0, 10);
    };

    return {
      Specimen,
      Patient,
      Tests,
      getDate,
      Results,
      showModal,
      modalTitleTestName,
      OpenUploadResultsModal,
      setModalOpen,
      Measures,
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

.head-title-col {
  text-align: center;
}

.body-grid {
  padding: 0 10px;
}

.cus-row {
  border-bottom: solid 1px rgb(202, 201, 201);
}

.title-col{
  padding-top: 15px;
}

ion-input {
  border: solid 2px rgb(202, 201, 201);
  border-radius: 8px;
  background-color: white;
  font-size: 20px;
}
</style>
