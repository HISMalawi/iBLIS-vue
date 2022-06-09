<template>
  <ion-page  v-if="$store.state.loggedIn">
    <tool-bar
      :pageTitle="'iBLIS | Order : ' + Specimen.accession_number"
      defaltBackButtonLink="/upload_results"
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
            <ion-col size="5" class="head-col"> Test </ion-col>
            <ion-col size="5" class="head-col"> Date </ion-col>
            <ion-col size="2" class="head-col"> Action </ion-col>
          </ion-row>

          <ion-row
            v-for="Test in Tests"
            :key="Test.id"
          >
            <ion-col size="5" class="cus-row" v-if="Test.specimen_id == Specimen.id">
              <ion-row>
                <ion-col >{{ Test.test_name }}</ion-col>
              </ion-row>
            </ion-col>

            <ion-col  size="5" class="cus-row" v-if="Test.specimen_id == Specimen.id">
              <ion-row>
                <ion-col > {{ getDate(Test.time_created) }} </ion-col>
              </ion-row>
            </ion-col>

            <ion-col size="2" class="cus-row" v-if="Test.specimen_id == Specimen.id">

              <ion-button color="primary" size="small" @click="OpenUploadResultsModal(Test, Test.test_name)">Enter Results</ion-button
              >
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
            @SaveChanges="SaveChanges"
          />

          <ion-grid>
            <ion-row
              class="cus-row"
              v-for="Measure in Measures"
              :key="Measure.id"
            >
              <ion-col>
                <ion-row
                  ><ion-col class="title-col">{{ Measure.name }}</ion-col>
                </ion-row>
              </ion-col>

              <ion-col
                v-if="
                  Measure.measure_type_name == 'Alphanumeric Values' &&
                  (getResult(Measure) == '0' || getResult(Measure) == '')
                "
              >
                <ion-select
                  v-model="Measure.result"
                  @click="TriggerForUpdate(Measure)"
                >
                  <ion-select-option
                    v-for="Range in Measure.ranges"
                    :key="Range.id"
                    :value="Range.alphanumeric"
                    >{{ Range.alphanumeric }}</ion-select-option
                  >
                </ion-select>
              </ion-col>

              <ion-col
                v-else-if="
                  Measure.measure_type_name == 'Alphanumeric Values' &&
                  getResult(Measure) !== '0'
                "
              >
                <ion-input
                  placeholder="Result"
                  :value="getResult(Measure)"
                  :disabled="true"
                ></ion-input>
              </ion-col>

              <ion-col v-else>
                <ion-input
                  v-if="getResult(Measure) == ''"
                  placeholder="Result"
                  :value="getResult(Measure)"
                  @change="resultChange(Measure, $event.target.value)"
                ></ion-input>

                <ion-input
                  v-else
                  placeholder="Result"
                  :value="getResult(Measure)"
                  :disabled="true"
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
  IonSelect,
  IonSelectOption,
  IonButton,
} from "@ionic/vue";
import { defineComponent, ref, watchEffect } from "vue";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import ModalToolBar from "@/components/ModalToolBar.vue";
import UploadResultsViewOrderFooter from "@/components/UploadResultsViewOrderFooter.vue";
import { useStore } from "@/store";
import { Specimen } from "@/interfaces/Specimen";
import { Patient } from "@/interfaces/Patient";
import GetPatientOrdersWithResults from "@/composables/getPatientOrdersWithResults";
// import GetTestsResults from "@/composables/getTestsResults";
import { TestResult } from "@/interfaces/TestResult";
import GetTestMeasures from "@/composables/getTestMeasures";
import { Measure } from "@/interfaces/Measure";
import UploadResults from "@/composables/uploadResults";
import { useRouter } from "vue-router";
import Utils from "@/composables/utils";
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
    IonSelect,
    IonSelectOption,
    IonButton
  },
  setup() {
    const store = useStore();

    const router = useRouter();

    const { formatDate } = Utils();

    watchEffect(() => {
      if (!store.getters.isLoggedIn) {
        router.push({ name: "Login", replace: true });
      }
    });

    const now = new Date()
      .toISOString()
      .replace(/T/, " ") // replace T with a space
      .replace(/\..+/, "")
      .substring(0, 10);

    const fromDate = ref<string>("");

    const toDate = ref<string>("");

    const selectedTestID = ref<number>(0);

    fromDate.value = now;

    toDate.value = now;

    const MeasuresToUpdate = ref<Measure[]>([]);
    const MeasuresToCheckForUpdate = ref<Measure[]>([]);

    const { upload } = UploadResults();

    const showModal = ref<boolean>(false);
    const modalTitleTestName = ref<string>("");

    const Patient: Patient = store.getters.selectedPatient;

    const Specimen: Specimen = store.getters.selectedSpecimen;

    const { fetchMeasures, Measures } = GetTestMeasures();

    const { fetchOrders, Tests, TestsResults } = GetPatientOrdersWithResults();

    // const { Results, fetchTestResults } = GetTestsResults();

    fetchOrders(parseInt(store.getters.selectedPatient.patient_number),fromDate.value, toDate.value);

    // fetchTestResults(TestWithResults.value);

    const OpenUploadResultsModal = (Test: TestResult, TestName: string) => {
     
      Measures.value.length = 0;

      selectedTestID.value = Test.id;

      fetchMeasures(Test.test_type_id);
      modalTitleTestName.value = TestName;
      showModal.value = true;
    };

    const setModalOpen = (b: boolean) => {
      showModal.value = b;

      if (b) {
        MeasuresToUpdate.value.length = 0;
      } else {
        MeasuresToCheckForUpdate.value.length = 0;
      }
    };

    const getDate = (date_string: string) => {
      let date_time: string = date_string;

      return formatDate(date_time.substring(0, 10));
    };

    const resultChange = (measure: Measure, update: string) => {
      if (getResult(measure) !== update) {
        for (let index = 0; index < MeasuresToUpdate.value.length; index++) {
          const element = MeasuresToUpdate.value[index];

          if (element.id == measure.id) {
            MeasuresToUpdate.value.splice(index, 1);
          }
        }

        measure.result = update;

        MeasuresToUpdate.value.push(measure);
      }
    };

    const SaveChanges = () => {
      if (MeasuresToUpdate.value.length > 0) {
        upload(MeasuresToUpdate.value, Specimen.accession_number, selectedTestID.value);

        // fetchOrders(parseInt(store.getters.selectedPatient.patient_number),fromDate.value, toDate.value);

        // fetchTestResults(TestWithResults.value);
      }

      for (
        let index = 0;
        index < MeasuresToCheckForUpdate.value.length;
        index++
      ) {
        const measure = MeasuresToCheckForUpdate.value[index];

        if (measure.result == "0") {
          MeasuresToCheckForUpdate.value.splice(index, 1);
        }

        if (index + 1 == MeasuresToCheckForUpdate.value.length) {
          upload(MeasuresToCheckForUpdate.value, Specimen.accession_number, selectedTestID.value);

          // fetchOrders(parseInt(store.getters.selectedPatient.patient_number),fromDate.value, toDate.value);

          // fetchTestResults(TestWithResults.value);
        }
      }
      fetchOrders(parseInt(store.getters.selectedPatient.patient_number),fromDate.value, toDate.value);
      // fetchTestResults(TestWithResults.value);
      showModal.value = false;
    };

    const TriggerForUpdate = (measure: Measure) => {
      let isAvailable = false;

      for (
        let index = 0;
        index < MeasuresToCheckForUpdate.value.length;
        index++
      ) {
        const element = MeasuresToCheckForUpdate.value[index];

        if (element.id == measure.id) {
          isAvailable = true;
        }
      }

      if (!isAvailable) {
        MeasuresToCheckForUpdate.value.push(measure);
      }
    };

    const getResult = (measure : Measure) => {

      let results = "";

      for (let index = 0; index < TestsResults.value.length; index++) {
        const result = TestsResults.value[index];

        if(result.measure_id == measure.id && result.test_id == selectedTestID.value){
            results = result.result;
        } 
        
      }

      return results;

    }

    return {
      Specimen,
      Patient,
      Tests,
      getDate,
      showModal,
      modalTitleTestName,
      OpenUploadResultsModal,
      setModalOpen,
      Measures,
      resultChange,
      SaveChanges,
      MeasuresToUpdate,
      TriggerForUpdate,
      getResult,
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

.title-col {
  padding-top: 15px;
}

ion-input {
  border: solid 2px rgb(202, 201, 201);
  border-radius: 8px;
  background-color: white;
  font-size: 20px;
}
</style>
