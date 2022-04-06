<template>
  <ion-page>
    <tool-bar pageTitle="iBLIS | Search" defaltBackButtonLink="/home" />

    <ion-content :fullscreen="true">
      <collapse-tool-bar pageTitle="iBLIS | Search" />

      <div id="container">
        <ion-input
          v-if="currentPage == 1"
          v-model="searchClient.first_name"
          placeholder="First Name"
        ></ion-input>

        <ion-input
          v-if="currentPage == 2"
          v-model="searchClient.last_name"
          placeholder="Last Name"
        ></ion-input>

        <ion-list v-if="currentPage == 3">
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

        <ion-card v-if="currentPage == 4" class="card-3">
          <ion-card-content>
            <ion-row>
              <ion-col size="10">
                <ion-row>
                  <ion-col size="12">
                    <h1>Search info</h1>
                  </ion-col>
                  <ion-col size="12">
                    <div class="bolder">
                      <h2>
                        <span class="light-text">Name :</span>
                        {{
                          searchClient.first_name + " " + searchClient.last_name
                        }}
                      </h2>
                    </div>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col size="12">
                    <div class="bolder">
                      <h2>
                        <span class="light-text">Gender :</span>
                        {{ searchClient.gender }}
                      </h2>
                    </div>
                  </ion-col>
                </ion-row>
              </ion-col>
            </ion-row>
          </ion-card-content>
        </ion-card>

        <ion-list class="poss-match-list" v-if="currentPage == 4">
          <ion-radio-group v-model="selectedPatient ">
          <ion-list-header class="card-4-yellow">
            <ion-label class="matches-label"> Possible Matches </ion-label>
          </ion-list-header>

          <ion-item v-for="patient in patients" :key="patient.id">
            <ion-label>{{patient.name + ", " + patient.gender + ", " + patient.age + "yrs" }}</ion-label>
            <ion-radio :value="patient"></ion-radio>
          </ion-item>
          </ion-radio-group>
        </ion-list>

        <ion-list v-if="currentPage == 5">
            <ion-list-header class="card-3">
              <ion-label class="gender-label"> Client Summary</ion-label>
            </ion-list-header>

            <ion-item>
              <ion-label>Name:{{" "+ selectedPatient.name}}</ion-label>
            </ion-item>

            <ion-item>
              <ion-label>Gender:{{" "+ selectedPatient.gender}}</ion-label>
            </ion-item>

            <ion-item>
              <ion-label>DOB:{{" "+ selectedPatient.dob}}</ion-label>
            </ion-item>

            <ion-item>
              <ion-label v-if="selectedPatient.phone_number == null">Phone:{{" "+ "N/A" }}</ion-label>
              <ion-label v-if="selectedPatient.phone_number !== null">Phone:{{" "+ selectedPatient.phone_number }}</ion-label>
            </ion-item>

            <ion-item>
              <ion-label v-if="selectedPatient.address == null">Address:{{" "+ "N/A" }}</ion-label>
              <ion-label v-if="selectedPatient.address !== null">Address:{{" "+ selectedPatient.address}}</ion-label>
            </ion-item>

        </ion-list>


      </div>
    </ion-content>

    <search-patient-footer
      @NavigateBack="MovePreviousField"
      @NavigateNext="MoveNextField"
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
  IonCard,
  IonCardContent,
  IonRow,
  IonCol,
  onIonViewDidLeave,
} from "@ionic/vue";
import { defineComponent, ref, watch } from "vue";
// import { useRouter } from "vue-router";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import SearchPatientFooter from "@/components/SearchPatientFooter.vue";
import { SearchClient } from "@/interfaces/SearchClient";
import { Patient } from '@/interfaces/Patient';
import SearchPatient from "@/composables/searchPatient";

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
    IonCard,
    IonCardContent,
    IonRow,
    IonCol,
  },
  setup() {
    // const router = useRouter();

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

    watch(
      () => [currentPage.value],
      () => {
        if (currentPage.value == 4) {

          patients.value.length = 0;

          search(
            searchClient.value.first_name + " " + searchClient.value.last_name, searchClient.value.gender
          );

        }
      }
    );

    onIonViewDidLeave(() => {
      searchClient.value.first_name = "";
      searchClient.value.last_name = "";
      searchClient.value.gender = "";
    });



    return {
      currentPage,
      numberOfPages,
      searchClient,
      MoveNextField,
      MovePreviousField,
      patients,
      selectedPatient,
    };
  },
});
</script>

<style scoped>
#container {
  padding: 15px;
}

ion-content {
  --ion-background-color: #eee;
}

ion-input {
  border: solid 2px rgb(202, 201, 201);
  border-radius: 8px;
  background-color: white;
  font-size: 23px;
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
