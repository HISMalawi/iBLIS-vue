<template>
  <ion-page>
    <tool-bar pageTitle="iBLIS | Search Client" defaltBackButtonLink="/home" />

    <ion-content :fullscreen="true">
      <collapse-tool-bar pageTitle="iBLIS | Search Client" />

      <div id="container">
        <ion-row v-if="currentPage < 3">
          <ion-col>
            <ion-list-header class="card-3">
              <ion-label class="gender-label"> Names </ion-label>
            </ion-list-header>
          </ion-col>
        </ion-row>

        <ion-row v-if="currentPage < 3">
          <ion-col>
            <ion-item>
              <ion-label position="floating"> First Name </ion-label>
              <ion-input
                v-model="searchClient.first_name"
                placeholder="First Name"
              ></ion-input>
            </ion-item>
          </ion-col>

          <ion-col>
            <ion-item >
              <ion-label position="floating"> Last Name </ion-label>
              <ion-input
                v-model="searchClient.last_name"
                placeholder="Last Name"
              ></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>

        <ion-row v-if="currentPage < 3">
          <ion-col>
            <ion-list>
              <ion-radio-group v-model="searchClient.gender">
                <ion-list-header class="card-3">
                  <ion-label class="gender-label"> Gender </ion-label>
                </ion-list-header>

                <ion-item>
                  <ion-label>Male</ion-label>
                  <ion-radio value="Male"></ion-radio>
                </ion-item>

                <ion-item>
                  <ion-label>Female</ion-label>
                  <ion-radio value="Female"></ion-radio>
                </ion-item>
              </ion-radio-group>
            </ion-list>
          </ion-col>
        </ion-row>


        <ion-list class="poss-match-list" v-if="currentPage == 2">
          <ion-radio-group v-model="selectedPatient">
            <ion-list-header class="card-4-yellow">
              <ion-label class="matches-label"> Possible Matches </ion-label>
            </ion-list-header>

            <ion-item v-for="patient in patients" :key="patient.id">
              <ion-label>{{
                patient.name +
                ", " +
                patient.gender +
                ", " +
                patient.age +
                "yrs"
              }}</ion-label>
              <ion-radio :value="patient"></ion-radio>
            </ion-item>
          </ion-radio-group>
        </ion-list>

        <ion-list v-if="currentPage == 3">
          <ion-list-header class="card-3">
            <ion-label class="gender-label"> Client Summary</ion-label>
          </ion-list-header>

          <ion-item>
            <ion-label>Name:{{ " " + selectedPatient.name }}</ion-label>
          </ion-item>

          <ion-item>
            <ion-label>Gender:{{ " " + selectedPatient.gender }}</ion-label>
          </ion-item>

          <ion-item>
            <ion-label>DOB:{{ " " + formatDate(selectedPatient.dob) }}</ion-label>
          </ion-item>

          <ion-item>
            <ion-label v-if="selectedPatient.phone_number == null"
              >Phone:{{ " " + "N/A" }}</ion-label
            >
            <ion-label v-if="selectedPatient.phone_number !== null"
              >Phone:{{ " " + selectedPatient.phone_number }}</ion-label
            >
          </ion-item>

          <ion-item>
            <ion-label v-if="selectedPatient.address == null"
              >Address:{{ " " + "N/A" }}</ion-label
            >
            <ion-label v-if="selectedPatient.address !== null"
              >Address:{{ " " + selectedPatient.address }}</ion-label
            >
          </ion-item>
        </ion-list>
      </div>
    </ion-content>

    <search-patient-footer
      @NavigateBack="MovePreviousField"
      @NavigateNext="MoveNextField"
      @NavigateToRegisterClient="NavigateToRegisterClient"
      @SearchClient="SearchClient"
      :currentPage="currentPage"
      :numberOfPages="numberOfPages"
      :searchClient="searchClient"
      :selectedPatient="selectedPatient"
    />
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonInput,
  IonList,
  IonRadio,
  IonRadioGroup,
  IonItem,
  IonLabel,
  IonListHeader,
  IonRow,
  IonCol,
  onIonViewDidLeave,
} from "@ionic/vue";
import { defineComponent, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import SearchPatientFooter from "@/components/SearchPatientFooter.vue";
import { SearchClient } from "@/interfaces/SearchClient";
import { Patient } from "@/interfaces/Patient";
import SearchPatient from "@/composables/searchPatient";
import { MutationTypes, useStore } from "@/store";
import Utils from "@/composables/utils";

export default defineComponent({
  name: "SearchPage",
  components: {
    IonContent,
    IonPage,
    ToolBar,
    CollapseToolBar,
    SearchPatientFooter,
    IonInput,
    IonList,
    IonRadio,
    IonRadioGroup,
    IonItem,
    IonLabel,
    IonListHeader,
    IonRow,
    IonCol,
  },
  setup() {
    const store = useStore();

    const router = useRouter();

    const { formatDate } = Utils();

    const numberOfPages = ref<number>(4);
    const currentPage = ref<number>(1);

    const searchClient = ref<SearchClient>({} as SearchClient);

    const selectedPatient = ref<Patient>({} as Patient);

    const { search, patients } = SearchPatient();

    patients.value.length = 0;

    const MoveNextField = () => {
      currentPage.value = currentPage.value + 1;
    };

    const MovePreviousField = () => {
      if (currentPage.value == 4 || currentPage.value > 4) {
        selectedPatient.value.name = "";
      }

      currentPage.value = currentPage.value - 1;
    };

    const NavigateToRegisterClient = () => {
      store.commit(MutationTypes.SET_SEARCH_CLIENT, searchClient.value);

      store.commit(MutationTypes.SET_PREVIOUS_LINK, "/search");

      router.push({ name: "Register", replace: true });
    };

    onIonViewDidLeave(() => {
      searchClient.value.first_name = "";
      searchClient.value.last_name = "";
      searchClient.value.gender = "";
    });

    watchEffect(() => {
      if (!store.getters.isLoggedIn) {
        router.push({ name: "Login", replace: true });
      }
    });

    const SearchClient = () => {

      currentPage.value = 2;

      patients.value.length = 0;

          search(
            searchClient.value.first_name.trim() +
              " " +
              searchClient.value.last_name.trim(),
            searchClient.value.gender
          );

    }

    return {
      currentPage,
      numberOfPages,
      searchClient,
      MoveNextField,
      MovePreviousField,
      NavigateToRegisterClient,
      patients,
      selectedPatient,
      SearchClient,
      formatDate,
    };
  },
});
</script>

<style scoped>
ion-content {
  --ion-background-color: #eee;
}

.gender-label {
  font-size: 23px;
}
.matches-label {
  font-size: 22px;
}
.poss-match-list {
  padding: 0 10px;
}
</style>
