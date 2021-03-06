<template>
  <ion-page>
    <tool-bar
      pageTitle="iBLIS | View Results"
      defaltBackButtonLink="/client_dashboard"
    />

    <ion-content :fullscreen="true">
      <collapse-tool-bar pageTitle="iBLIS | View Results" />

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
            <ion-col size="3">
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

            <ion-col size="3">
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

            <ion-col size="3">
              <ion-row>
                <ion-col size="1">
                  <ion-checkbox
                    v-model="checkboxSpecimen"
                    class="cb-enable-option"
                  ></ion-checkbox>
                </ion-col>
                <ion-col>
                  <ion-item class="cus-select">
                    <ion-label>Specimen</ion-label>
                    <ion-select v-model="selectedSpecimen">
                      <ion-select-option
                        :value="specimen"
                        v-for="specimen in specimenTypes"
                        :key="specimen.id"
                        >{{ specimen.name }}</ion-select-option
                      >
                    </ion-select>
                  </ion-item>
                </ion-col>
              </ion-row>
            </ion-col>

            <ion-col size="3">
              <ion-row>
                <ion-col size="1">
                  <ion-checkbox
                    v-model="checkboxTests"
                    class="cb-enable-option"
                  ></ion-checkbox>
                </ion-col>
                <ion-col>
                  <ion-item class="cus-select test-select">
                    <ion-label>Test (s)</ion-label>
                    <ion-select v-model="selectedTests" :multiple="true">
                      <ion-select-option
                        :value="test"
                        v-for="test in TestsSp"
                        :key="test.id"
                        >{{ test.name }}</ion-select-option
                      >
                    </ion-select>
                  </ion-item>
                </ion-col>
              </ion-row>
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
            v-for="Specimen in filterSpecimens"
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
                  Test.test_name
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
  IonSelect,
  IonSelectOption,
  IonCheckbox,
} from "@ionic/vue";
import { computed, defineComponent, ref, watch, watchEffect } from "vue";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import ViewResultsFooter from "@/components/ViewResultsFooter.vue";
import GetPatientOrders from "@/composables/getPatientOrders";
import { ActionTypes, useStore } from "@/store";
import { Specimen } from "@/interfaces/Specimen";
import { useRouter } from "vue-router";
import DateModalToolBar from "@/components/DateModalToolBar.vue";
import { format, parseISO } from "date-fns";
import GetSpecimenTypes from "@/composables/getSpecimenTypes";
import { SpecimenType } from "@/interfaces/SpecimenType";
import GetTestsBySpecimenTypeID from "@/composables/getTestsBySpecimenTypeID";
import { Test } from "@/interfaces/Test";
import Utils from "@/composables/utils";

export default defineComponent({
  name: "ViewResultsPage",
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
    DateModalToolBar,
    IonSelect,
    IonSelectOption,
    IonCheckbox,
  },
  setup() {
    const store = useStore();

    const router = useRouter();

    const { formatDate } = Utils();

    const checkboxSpecimen = ref<boolean>(false);

    const checkboxTests = ref<boolean>(false);

    const selectedSpecimen = ref<SpecimenType>({} as SpecimenType);

    const selectedTests = ref<Test[]>([]);

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

    const { fetchSpecimenTypes, specimenTypes } = GetSpecimenTypes();

    const { fetchTests, TestsSp } = GetTestsBySpecimenTypeID();

    const { fetchOrders, Specimens, Tests } = GetPatientOrders();


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

    fetchOrders(
      parseInt(store.getters.selectedPatient.patient_number),
      fromDate.value,
      toDate.value
    );

    fetchSpecimenTypes();

    const getDateCollected = (Specimen: Specimen) => {
      let date_time: string = Specimen.date_of_collection;

      return formatDate(date_time.substring(0, 10));
    };

    const ViewOrder = (Specimen: Specimen) => {
      store.dispatch(ActionTypes.SET_SELECTED_SPECIMEN, Specimen);

      router.push({ name: "ViewResultsViewOrder", replace: true });
    };

    watch(
      () => [selectedSpecimen.value],
      () => {

        if (Object.keys(selectedSpecimen.value).length > 0) {
          TestsSp.value.length = 0;
          selectedTests.value = [];
          fetchTests(selectedSpecimen.value.id);
        }
      }
    );

    watchEffect(() => {
      if (!store.getters.isLoggedIn) {
        router.push({ name: "Login", replace: true });
      }
    });

    const checkIfArrayContains = (array: number[], value: any) => {
      if(array.some((item) => item === value)){
        return true;
      } else {
        return false;
      }
    };

    const getSpecimenTestsID = (Specimen: Specimen) => {
      let specimen_tests_id: number[] = [];

      for (let i = 0; i < Tests.value.length; i++) {
        if (Tests.value[i].specimen_id == Specimen.id) {
          specimen_tests_id.push(Tests.value[i].id);
        }
      }

      return specimen_tests_id;
    }

    const filterSpecimens = computed(() => {
      let specimens;

      if (checkboxSpecimen.value && checkboxTests.value) {
        specimens = Specimens.value.filter(
          (specimen: Specimen) => specimen.specimen_status_id == 2 && checkIfArrayContains(getSpecimenTestsID(specimen), selectedTests.value[0].id)
        );
      } else if (checkboxSpecimen.value) {
        specimens = Specimens.value.filter(
          (specimen: Specimen) => specimen.specimen_status_id == 2 && specimen.specimen_type == selectedSpecimen.value.name
        );
      } else {
        specimens = Specimens.value.filter(
          (specimen: Specimen) => specimen.specimen_status_id == 2
        );
      }

      return specimens;
    });

    return {
      selectedTests,
      TestsSp,
      selectedSpecimen,
      startDateModal,
      endDateModal,
      fromDate,
      toDate,
      formatDate,
      OpenStartDateModal,
      OpenEndDateModal,
      CloseDateModals,
      Specimens,
      getDateCollected,
      Tests,
      ViewOrder,
      specimenTypes,
      filterSpecimens,
      checkboxSpecimen,
      checkboxTests,
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

/* ion-col {
  --ion-grid-column-padding: 10px;
} */

.cus-row {
  border-bottom: solid 1px rgb(202, 201, 201);
}
.cus-datetime {
  align-self: center !important;
  margin: auto;
  margin-top: 20px;
}

.cus-select {
  margin-top: 2px;
}
.cb-enable-option {
  margin-top: 15px;
}
</style>
