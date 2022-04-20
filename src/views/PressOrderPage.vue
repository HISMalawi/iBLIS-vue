<template>
  <ion-page>
    <tool-bar pageTitle="iBLIS | Press Order" defaltBackButtonLink="/orders" />

    <ion-content :fullscreen="true">
      <collapse-tool-bar pageTitle="iBLIS | Press Order" />

      <div id="container">
        <ion-grid>
          <ion-row>
            <ion-col size="3" class="custom-aside">
              <ion-list>
                <ion-list-header class="card-3">
                  <ion-label class="gender-label"> SELECT TEST</ion-label>
                </ion-list-header>
                <ion-item v-for="test in Tests" :key="test.id">
                  <ion-label>{{ test.name }}</ion-label>
                  <ion-checkbox
                    :disabled="disableTests || test.isChecked"
                    slot="start"
                    @update:modelValue="test.isChecked = $event"
                    :modelValue="test.isChecked"
                    @click="SelectTest(test)"
                  >
                  </ion-checkbox>
                </ion-item>
              </ion-list>
            </ion-col>
            <ion-col size="9">
              <ion-list v-if="specimenTypes.length > 0">
                <ion-radio-group v-model="selectedSpecimen">
                  <ion-list-header class="card-1">
                    <ion-label class="gender-label"> SELECT SPECIMEN</ion-label>
                  </ion-list-header>
                  <ion-item
                    v-for="specimen in specimenTypes"
                    :key="specimen.id"
                  >
                    <ion-label>{{ specimen.name }}</ion-label>
                    <ion-radio
                      :value="specimen"
                      :disabled="disableSpecimen"
                    ></ion-radio>
                  </ion-item>
                </ion-radio-group>
              </ion-list>

              <ion-list
                v-if="
                  Object.keys(selectedSpecimen).length > 0 &&
                  specimenTypes.length != 0
                "
              >
                <ion-radio-group v-model="selectedTestReason">
                  <ion-list-header class="card-1">
                    <ion-label class="gender-label">
                      MAIN TEST(S) REASON</ion-label
                    >
                  </ion-list-header>
                  <ion-item>
                    <ion-label>Routine</ion-label>
                    <ion-radio
                      value="Routine"
                      :disabled="disableReason"
                    ></ion-radio>
                  </ion-item>
                  <ion-item>
                    <ion-label>Targeted</ion-label>
                    <ion-radio
                      value="Targeted"
                      :disabled="disableReason"
                    ></ion-radio>
                  </ion-item>
                  <ion-item>
                    <ion-label>Confirmatory</ion-label>
                    <ion-radio
                      value="Confirmatory"
                      :disabled="disableReason"
                    ></ion-radio>
                  </ion-item>
                  <ion-item>
                    <ion-label>Start</ion-label>
                    <ion-radio
                      value="Start"
                      :disabled="disableReason"
                    ></ion-radio>
                  </ion-item>
                  <ion-item>
                    <ion-label>Repeat / Missing</ion-label>
                    <ion-radio
                      value="Repeat"
                      :disabled="disableReason"
                    ></ion-radio>
                  </ion-item>
                </ion-radio-group>
              </ion-list>

              <ion-grid
                v-if="selectedTestReason != '' || preparedOrderTests.length > 0"
              >
                <ion-row>
                  <ion-col class="head-col"> Test </ion-col>
                  <ion-col class="head-col"> Specimen </ion-col>
                  <ion-col class="head-col"> Reason </ion-col>
                  <ion-col class="head-col"> Action </ion-col>
                </ion-row>

                <ion-row class="cus-row"
                  v-for="(testPre, index) in preparedOrderTests"
                  :key="testPre.specimen.id"
                >
                  <ion-col class="body-col">
                    <ion-row v-for="test in testPre.tests" :key="test.id">
                      <ion-col>{{ test.name }}</ion-col>
                    </ion-row>
                  </ion-col>
                  <ion-col class="body-col">
                    <ion-row
                      ><ion-col>{{ testPre.specimen.name }}</ion-col></ion-row
                    >
                  </ion-col>
                  <ion-col class="body-col">
                    <ion-row
                      ><ion-col>{{ testPre.reason }}</ion-col></ion-row
                    >
                  </ion-col>
                  <ion-col class="body-col action-btn">
                    <ion-row
                      ><ion-col
                        ><ion-button
                          @click="DeleteOrder(index, testPre.tests)"
                          color="danger"
                          size="small"
                          >X</ion-button
                        ></ion-col
                      ></ion-row
                    >
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>

    <press-order-footer
      @SaveOrder="SaveOrder"
      @NewOrder="NewOrder"
      @PlaceOrder="PlaceOrder"
      :disableSave="disableSave"
      :selectedTestReason="selectedTestReason"
      :preparedOrderTests="preparedOrderTests"
    />
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonRadioGroup,
  IonLabel,
  IonListHeader,
  IonCheckbox,
  IonRadio,
  onIonViewDidLeave,
  IonButton,
} from "@ionic/vue";
import { defineComponent, reactive, ref, watch } from "vue";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import PressOrderFooter from "@/components/PressOrderFooter.vue";
import { useStore } from "@/store";
import GetTests from "@/composables/getTests";
import GetSpecimenTypesByTestType from "@/composables/getSpecimenTypesByTestType";
import { Test } from "@/interfaces/Test";
import { SpecimenType } from "@/interfaces/SpecimenType";
import { PreparedOrderTests } from "@/interfaces/PreparedOrderTests";
import CreateOrder from "@/composables/createOrder";
import { Order } from "@/interfaces/Order";
import { VisitType } from "@/interfaces/VisitType";

export default defineComponent({
  name: "PressOrderPage",
  components: {
    IonContent,
    IonPage,
    ToolBar,
    CollapseToolBar,
    PressOrderFooter,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonItem,
    IonRadioGroup,
    IonRadio,
    IonLabel,
    IonListHeader,
    IonCheckbox,
    IonButton,
  },
  setup() {
    const store = useStore();

    const { save } = CreateOrder();

    const disableSave = ref<boolean>(true);

    const disableTests = ref<boolean>(false);

    const disableSpecimen = ref<boolean>(false);

    const disableReason = ref<boolean>(false);

    const { fetchSpecimenTypes, specimenTypes } = GetSpecimenTypesByTestType();

    let selectedTest: Test = reactive({} as Test);

    const preparedOrderTests = ref<PreparedOrderTests[]>([]);

    const selectedSpecimen = ref<SpecimenType>({} as SpecimenType);

    const selectedTestReason = ref<string>("");

    const { fetchTests, Tests } = GetTests();

    fetchTests();

    const SelectTest = (obj: Test) => {
      selectedTest = obj;

      disableTests.value = true;

      specimenTypes.value.length = 0;

      fetchSpecimenTypes(selectedTest.id);
    };

    watch(
      () => [selectedTestReason.value],
      () => {
        if (selectedTestReason.value !== "") {
          disableSave.value = false;
        }
      }
    );

    const SaveOrder = () => {
      if (preparedOrderTests.value.length > 0) {
        preparedOrderTests.value.forEach((preTest) => {
          if (preTest.specimen.id !== selectedSpecimen.value.id) {
            let tests: Test[] = [];

            tests.push(selectedTest);

            let testDetails: PreparedOrderTests = {
              tests: tests,
              specimen: selectedSpecimen.value,
              reason: selectedTestReason.value,
            };

            preparedOrderTests.value.push(testDetails);
          } else {
            preTest.tests.push(selectedTest);
          }
        });
      } else {
        let tests: Test[] = [];

        tests.push(selectedTest);

        let testDetails: PreparedOrderTests = {
          tests: tests,
          specimen: selectedSpecimen.value,
          reason: selectedTestReason.value,
        };

        preparedOrderTests.value.push(testDetails);
      }

      disableSpecimen.value = true;
      disableReason.value = true;
      disableSave.value = true;
    };

    const NewOrder = () => {
      preparedOrderTests.value.forEach((element) => {
        if (!element.tests.includes(selectedTest)) {
          selectedTest.isChecked = false;
        }
      });

      specimenTypes.value.length = 0;
      selectedTestReason.value = "";

      disableTests.value = false;
      disableSpecimen.value = false;
      disableReason.value = false;
    };

    const PlaceOrder = () => {
      // let order: Order = {
      //     visit_type: selectedVisitType.value,
      //     requesting_location: store.getters.selectedWard,
      //     requesting_physician: "Test",
      //     specimen_type_id: selectedSpecimenType.value,
      //     tests: checkedTests.value,
      //     patient: store.getters.selectedPatient,
      //     user: store.getters.user,
      // };
      //   save(order);
    };

    const DeleteOrder = (index: number, tests: Test[]) => {
      tests.forEach((test) => {
        for (let index = 0; index < Tests.value.length; index++) {
          const element = Tests.value[index];

          if (element.id == test.id) {
            element.isChecked = false;
          }
        }
      });

      preparedOrderTests.value.splice(index, 1);
    };

    onIonViewDidLeave(() => {
      specimenTypes.value.length = 0;
      selectedTestReason.value = "";
    });

    return {
      Tests,
      NewOrder,
      PlaceOrder,
      disableSpecimen,
      DeleteOrder,
      disableReason,
      SelectTest,
      disableTests,
      disableSave,
      specimenTypes,
      selectedSpecimen,
      selectedTestReason,
      SaveOrder,
      preparedOrderTests,
    };
  },
});
</script>

<style scoped>
ion-content {
  --ion-background-color: #eee;
}

.custom-aside {
  border-right: solid 1px rgb(202, 201, 201);
}
.head-col {
  text-align: center;
  background: #ffffe2;
  border-left: solid 1px rgb(202, 201, 201);
}
.action-btn {
  text-align: center;
}

.cus-row{
  border-bottom: solid 1px rgb(202, 201, 201);
}
</style>
