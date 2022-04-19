<template>
  <ion-page>
    <tool-bar
      pageTitle="iBLIS | Press Order"
      defaltBackButtonLink="/orders"
    />

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
                    :disabled="disableTests"
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
                  <ion-item v-for="specimen in specimenTypes" :key="specimen.id">
                    <ion-label>{{specimen.name}}</ion-label>
                    <ion-radio :value="specimen"></ion-radio>
                  </ion-item>
                </ion-radio-group>
              </ion-list>

              <ion-list v-if="Object.keys(selectedSpecimen).length > 0">
                <ion-radio-group v-model="selectedTestReason">
                  <ion-list-header class="card-1">
                    <ion-label class="gender-label">
                      MAIN TEST(S) REASON</ion-label
                    >
                  </ion-list-header>
                  <ion-item>
                    <ion-label>Routine</ion-label>
                    <ion-radio value="Routine"></ion-radio>
                  </ion-item>
                  <ion-item>
                    <ion-label>Targeted</ion-label>
                    <ion-radio value="Targeted"></ion-radio>
                  </ion-item>
                  <ion-item>
                    <ion-label>Confirmatory</ion-label>
                    <ion-radio value="Confirmatory"></ion-radio>
                  </ion-item>
                  <ion-item>
                    <ion-label>Start</ion-label>
                    <ion-radio value="Start"></ion-radio>
                  </ion-item>
                  <ion-item>
                    <ion-label>Repeat / Missing</ion-label>
                    <ion-radio value="Repeat"></ion-radio>
                  </ion-item>
                </ion-radio-group>
              </ion-list>

              <ion-grid v-if="selectedTestReason != ''">
                <ion-row>
                  <ion-col class="head-col"> Test </ion-col>
                  <ion-col class="head-col"> Specimen </ion-col>
                  <ion-col class="head-col"> Reason </ion-col>
                  <ion-col class="head-col"> Action </ion-col>
                </ion-row>
              </ion-grid>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>

    <press-order-footer
    @SaveOrder="SaveOrder" 
    :selectedTestReason="selectedTestReason"/>

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
} from "@ionic/vue";
import { defineComponent, reactive, ref } from "vue";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import PressOrderFooter from "@/components/PressOrderFooter.vue";
import { useStore } from "@/store";
import { Patient } from "@/interfaces/Patient";
import GetTests from "@/composables/getTests";
import GetSpecimenTypesByTestType from "@/composables/getSpecimenTypesByTestType";
import { Test } from "@/interfaces/Test";
import { SpecimenType } from "@/interfaces/SpecimenType";

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
  },
  setup() {

    const store = useStore();

    const disableTests = ref<boolean>(false);

    const { fetchSpecimenTypes, specimenTypes } = GetSpecimenTypesByTestType();

    let selectedPatient: Patient = store.getters.selectedPatient;

    let selectedTest :Test = reactive({} as Test);

    const selectedSpecimen = ref<SpecimenType>({} as SpecimenType);

    const selectedTestReason = ref<string>("");

    const { fetchTests, Tests } = GetTests();

    fetchTests();

    const SelectTest = (obj : Test) => {
      
      selectedTest = obj;

      disableTests.value = true;

      specimenTypes.value.length = 0;

      fetchSpecimenTypes(selectedTest.id);

    }

    const SaveOrder = () => {
      console.log("sdhcjd");
    }

    onIonViewDidLeave(() => {
      specimenTypes.value.length = 0;
      selectedTestReason.value = "";
    });


    return { Tests, SelectTest, disableTests , specimenTypes, selectedSpecimen, selectedTestReason, SaveOrder };
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
</style>
