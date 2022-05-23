<template>
  <ion-page>
    <tool-bar pageTitle="iBLIS | Place Order" defaltBackButtonLink="/orders" />

    <ion-content :fullscreen="true">
      <collapse-tool-bar pageTitle="iBLIS | Place Order" />

      <div id="container">
        <ion-grid>
          <ion-row v-if="currentPage == 1">
            <ion-col>
              <ion-searchbar
                class="cus-search"
                placeholder="Search Specimen"
                v-model="searchSpecimen"
              ></ion-searchbar>

              <ion-list-header class="card-1">
                <ion-label class="gender-label"> SELECT SPECIMEN</ion-label>
              </ion-list-header>

              <ion-list>
                <ion-radio-group v-model="selectedSpecimen">
                  <ion-item
                    v-for="specimen in filteredSpecimenTypes"
                    :key="specimen.id"
                  >
                    <ion-label>{{ specimen.name }}</ion-label>
                    <ion-radio :value="specimen"></ion-radio>
                  </ion-item>
                </ion-radio-group>
              </ion-list>
            </ion-col>
          </ion-row>

          <ion-row v-if="currentPage == 2">
            <ion-col>
              <ion-row>
                <ion-chip v-for="test in selectedTests" :key="test.id">
                  <ion-label> {{ test.name }} </ion-label>
                </ion-chip>
              </ion-row>

              <ion-row>
                <ion-searchbar
                  class="cus-search"
                  placeholder="Search Test"
                  v-model="searchString"
                ></ion-searchbar>
              </ion-row>

              <ion-row>
                <ion-col size="4">
                  <ion-list-header class="card-3">
                    <ion-label class="gender-label"> SELECT TEST</ion-label>
                  </ion-list-header>

                  <ion-list class="custom-aside-list">
                    <ion-item v-for="test in filterTests" :key="test.id">
                      <ion-label>{{ test.name }}</ion-label>
                      <ion-checkbox
                        slot="start"
                        @update:modelValue="test.isChecked = $event"
                        :modelValue="test.isChecked"
                        @click="SelectTest(test)"
                      >
                      </ion-checkbox>
                    </ion-item>
                  </ion-list>
                </ion-col>

                <ion-col size="8">
                  <ion-list-header class="card-1">
                    <ion-label class="gender-label">
                      MAIN TEST(S) REASON</ion-label
                    >
                  </ion-list-header>

                  <ion-list>
                    <ion-radio-group v-model="selectedTestReason">
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
                </ion-col>
              </ion-row>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>

    <press-order-footer
      @PlaceOrder="PlaceOrder"
      @NavigateNext="MoveNextField"
      @NavigateBack="MovePreviousField"
      :currentPage="currentPage"
      :disableNext="disableNext"
      :disablePlaceOrder="disablePlaceOrder"
      :selectedTestReason="selectedTestReason"
      :uploadingOrders="uploadingOrders"
      :selectedTests="selectedTests"
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
  IonSearchbar,
  IonChip,
} from "@ionic/vue";
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watch,
  watchEffect,
} from "vue";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import PressOrderFooter from "@/components/PressOrderFooter.vue";
import { useStore } from "@/store";
import GetTestsBySpecimenTypeID from "@/composables/getTestsBySpecimenTypeID";
import GetSpecimenTypes from "@/composables/getSpecimenTypes";
import { Test } from "@/interfaces/Test";
import { SpecimenType } from "@/interfaces/SpecimenType";
import { PreparedOrderTests } from "@/interfaces/PreparedOrderTests";
import CreateOrder from "@/composables/createOrder";
import { Order } from "@/interfaces/Order";
import GetVisitTypes from "@/composables/getVisitTypes";
import router from "@/router";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
// import { saveAs } from "file-saver";
// import { el } from "date-fns/locale";

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
    IonSearchbar,
    IonChip,
  },
  setup() {
    const store = useStore();

    const currentPage = ref<number>(1);

    const searchString = ref<string>("");

    const searchSpecimen = ref<string>("");

    const { save, accessionNumber, zpl } = CreateOrder();

    const disableNext = ref<boolean>(true);

    const uploadingOrders = ref<boolean>(false);

    const disablePlaceOrder = ref<boolean>(true);

    const disableReason = ref<boolean>(true);

    const { fetchSpecimenTypes, specimenTypes } = GetSpecimenTypes();

    fetchSpecimenTypes();

    const { visitTypes, fetchVisitTypes } = GetVisitTypes();

    fetchVisitTypes();

    const selectedTests = ref<Test[]>([]);

    let selectedTest: Test = reactive({} as Test);

    const preparedOrderTests = ref<PreparedOrderTests[]>([]);

    const selectedSpecimen = ref<SpecimenType>({} as SpecimenType);

    const selectedTestReason = ref<string>("");

    const { fetchTests, TestsSp } = GetTestsBySpecimenTypeID();

    const MoveNextField = () => {
      currentPage.value = currentPage.value + 1;
    };

    const MovePreviousField = () => {
      currentPage.value = currentPage.value - 1;
    };

    const SelectTest = (obj: Test) => {
      selectedTest = obj;

      if (!selectedTest.isChecked) {
        selectedTests.value.push(selectedTest);
      } else {
        selectedTests.value.forEach((test) => {
          let index = selectedTests.value.indexOf(test);

          if (selectedTest == test) {
            selectedTests.value.splice(index, 1);
          }
        });
      }

      // disableTests.value = true;

      // specimenTypes.value.length = 0;

      // fetchSpecimenTypes(selectedTest.id);
    };

    const filterTests = computed(() => {
      return TestsSp.value.filter((test) =>
        test.name.toLowerCase().includes(searchString.value.toLowerCase())
      );
    });

    const filteredSpecimenTypes = computed(() => {
      return specimenTypes.value.filter((specimen) =>
        specimen.name.toLowerCase().includes(searchSpecimen.value.toLowerCase())
      );
    });

    watch(
      () => [currentPage.value],
      () => {
        if (currentPage.value == 1) {
          selectedTests.value.length = 0;
          selectedTestReason.value = "";
          disableReason.value = true;

          TestsSp.value.forEach((test) => {
            test.isChecked = false;
          });
        }
      }
    );

    watch(
      () => [selectedTestReason.value, selectedTests.value.length],
      () => {
        if (selectedTests.value.length > 0 && selectedTestReason.value !== "") {
          disablePlaceOrder.value = false;
        } else {
          disablePlaceOrder.value = true;
        }
      }
    );

    watch(
      () => [selectedTests.value.length],
      () => {
        if (selectedTests.value.length > 0 && currentPage.value == 2) {
          disableNext.value = false;
          disableReason.value = false;
        } else if (selectedTests.value.length < 1 && currentPage.value == 2) {
          disableNext.value = true;
          disableReason.value = true;
        }
      }
    );

    watch(
      () => [selectedSpecimen.value],
      () => {
        if (
          Object.keys(selectedSpecimen.value).length > 0 &&
          currentPage.value == 1
        ) {
          TestsSp.value.length = 0;
          fetchTests(selectedSpecimen.value.id);
          disableNext.value = false;
        }
      }
    );

    const PlaceOrder = () => {
      disablePlaceOrder.value = true;

      const orders: Order[] = [];

      let order: Order = {
        visit_type: visitTypes.value[0],
        requesting_location: store.getters.selectedWard,
        requesting_physician: "Requesting Physician",
        specimen_type_id: selectedSpecimen.value.id,
        tests: selectedTests.value,
        patient: store.getters.selectedPatient,
        reason: selectedTestReason.value,
        user: store.getters.user,
      };

      orders.push(order);

      Upload(orders);
    };

    const Upload = (orders: Order[]) => {
      uploadingOrders.value = true;

      let index = 0;

      setTimeout(() => {
        save(orders[index]);

        index = index + 1;
      }, 1000);

      watch(
        () => [accessionNumber.value],
        () => {
          if (index !== orders.length) {
            save(orders[index]);

            index = index + 1;
          }

          if (index == orders.length) {
            router.push({ name: "Orders", replace: true });
          }
        }
      );
    };

    onIonViewDidLeave(() => {
      specimenTypes.value.length = 0;
      selectedTestReason.value = "";
    });

    watchEffect(() => {
      if (!store.getters.isLoggedIn) {
        router.push({ name: "Login", replace: true });
      }
    });

    const download = async () => {
      let blob = new Blob([zpl.value], { type: "text/lbl;charset=utf-8" });
      // Convert photo to base64 format, required by Filesystem API to save
      const base64Data = await readAsBase64(blob);

      const fileName = `${accessionNumber.value}.lbl`;

      const writeFile = async () => {
        await Filesystem.writeFile({
          path: fileName,
          data: base64Data,
          directory: Directory.Documents,
          encoding: Encoding.UTF8,
        });
      };

      writeFile().then(() =>
      {
        console.log("Print Label");
      })
    };

    const readAsBase64 = async (blob: Blob) => {
      return (await convertBlobToBase64(blob)) as string;
    };

    const convertBlobToBase64 = (blob: Blob) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(blob);
      });

    watch(zpl, () => {
      download();
    });

    return {
      selectedTests,
      PlaceOrder,
      disablePlaceOrder,
      disableReason,
      SelectTest,
      disableNext,
      specimenTypes,
      selectedSpecimen,
      selectedTestReason,
      preparedOrderTests,
      uploadingOrders,
      currentPage,
      MoveNextField,
      MovePreviousField,
      searchString,
      searchSpecimen,
      filterTests,
      filteredSpecimenTypes,
    };
  },
});
</script>

<style scoped>
ion-content {
  --ion-background-color: #eee;
}

ion-chip {
  margin-bottom: 3px;
}

.cus-search {
  padding-left: 0px;
  padding-right: 0px;
}

.custom-aside-list {
  height: 100vh;
  padding-bottom: 120px;
  overflow-y: scroll;
}
</style>
