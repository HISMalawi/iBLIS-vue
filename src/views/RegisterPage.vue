<template>
  <ion-page>
    <tool-bar
      pageTitle="iBLIS | Register Client"
      defaltBackButtonLink="/home"
    />

    <ion-content :fullscreen="true">
      <collapse-tool-bar pageTitle="iBLIS | Register Client" />

      <div id="container">
        <ion-item v-if="currentPage == 1">
          <ion-label position="floating"> First Name </ion-label>
          <ion-input
            v-model="client.first_name"
            placeholder="First Name"
          ></ion-input>
        </ion-item>

        <ion-item v-if="currentPage == 2">
          <ion-label position="floating"> Last Name </ion-label>
          <ion-input
            v-model="client.last_name"
            placeholder="Last Name"
          ></ion-input>
        </ion-item>

        <ion-list v-if="currentPage == 3">
          <ion-radio-group v-model="client.gender">
            <ion-list-header class="card-3">
              <ion-label class="gender-label"> Gender </ion-label>
            </ion-list-header>

            <ion-item>
              <ion-label>Male</ion-label>
              <ion-radio value="0"></ion-radio>
            </ion-item>

            <ion-item>
              <ion-label>Female</ion-label>
              <ion-radio value="1"></ion-radio>
            </ion-item>
          </ion-radio-group>
        </ion-list>

        <ion-list v-if="currentPage == 4">
          <ion-list-header class="card-3">
            <ion-label class="gender-label"> Date of Birth </ion-label>
          </ion-list-header>

          <ion-datetime
            presentation="date"
            @ionChange="(ev: DatetimeCustomEvent) => dateOfBirth = formatDate(ev.detail.value)"
            placeholder="Date of Birth"
          ></ion-datetime>
        </ion-list>

        <ion-list v-if="currentPage == 5">
          <ion-list-header class="card-3 other-info-head">
            <ion-label class="gender-label"> Other Info </ion-label>
          </ion-list-header>

          <ion-item>
            <ion-label position="floating"> External Patient Number </ion-label>
            <ion-input
              v-model="patient.externalPatientNumber"
              placeholder="External Patient Number"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="floating"> Phone Number </ion-label>
            <ion-input
              v-model="patient.phoneNumber"
              placeholder="Phone Number"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="floating"> Address </ion-label>
            <ion-input
              v-model="patient.physicalAddress"
              placeholder="Address"
            ></ion-input>
          </ion-item>
        </ion-list>

        <ion-list v-if="currentPage == 6">
          <ion-list-header class="card-3">
            <ion-label class="gender-label"> Client Summary</ion-label>
          </ion-list-header>

          <ion-item>
            <ion-label
              >Name:{{
                " " + patient.firstname + " " + patient.lastname
              }}</ion-label
            >
          </ion-item>

          <ion-item>
            <ion-label v-if="patient.gender == '1'">Gender: Female</ion-label>
            <ion-label v-if="patient.gender == '0'">Gender: Male</ion-label>
          </ion-item>

          <ion-item>
            <ion-label>DOB:{{ " " + patient.dob }}</ion-label>
          </ion-item>

          <ion-item>
            <ion-label v-if="patient.externalPatientNumber == ''"
              >External Patient Number:{{ " " + "N/A" }}</ion-label
            >
            <ion-label v-if="patient.externalPatientNumber !== ''"
              >External Patient Number:{{
                " " + patient.externalPatientNumber
              }}</ion-label
            >
          </ion-item>

          <ion-item>
            <ion-label v-if="patient.phoneNumber == ''"
              >Phone:{{ " " + "N/A" }}</ion-label
            >
            <ion-label v-if="patient.phoneNumber !== ''"
              >Phone:{{ " " + patient.phoneNumber }}</ion-label
            >
          </ion-item>

          <ion-item>
            <ion-label v-if="patient.physicalAddress == ''"
              >Address:{{ " " + "N/A" }}</ion-label
            >
            <ion-label v-if="patient.physicalAddress !== ''"
              >Address:{{ " " + patient.physicalAddress }}</ion-label
            >
          </ion-item>
        </ion-list>

        <ion-list class="poss-match-list" v-if="currentPage == 7">
          <ion-radio-group v-model="selectedPatient">
            <ion-list-header class="card-4-yellow">
              <ion-label class="matches-label"> Select Client </ion-label>
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

        <ion-list v-if="currentPage == 8">
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
            <ion-label>DOB:{{ " " + selectedPatient.dob }}</ion-label>
          </ion-item>

          <ion-item>
            <ion-label v-if="selectedPatient.phone_number == ''"
              >Phone:{{ " " + "N/A" }}</ion-label
            >
            <ion-label v-if="selectedPatient.phone_number !== ''"
              >Phone:{{ " " + selectedPatient.phone_number }}</ion-label
            >
          </ion-item>

          <ion-item>
            <ion-label v-if="selectedPatient.address == ''"
              >Address:{{ " " + "N/A" }}</ion-label
            >
            <ion-label v-if="selectedPatient.address !== ''"
              >Address:{{ " " + selectedPatient.address }}</ion-label
            >
          </ion-item>
        </ion-list>
      </div>
    </ion-content>

    <register-patient-footer
      @NavigateBack="MovePreviousField"
      @NavigateNext="MoveNextField"
      @RegisterClient="RegisterClient"
      :currentPage="currentPage"
      :numberOfPages="numberOfPages"
      :client="client"
      :patient="patient"
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
  IonDatetime,
} from "@ionic/vue";
import { defineComponent, reactive, ref, watch } from "vue";
import { useStore } from "@/store";
// import { useRouter } from "vue-router";
import { format, parseISO } from "date-fns";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import RegisterPatientFooter from "@/components/RegisterPatientFooter.vue";
import { PatientReg } from "@/interfaces/PatientReg";
import { SearchClient } from "@/interfaces/SearchClient";
import AddPatient from "@/composables/addPatient";
import { Patient } from "@/interfaces/Patient";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "RegisterPage",
  components: {
    IonContent,
    IonPage,
    ToolBar,
    CollapseToolBar,
    IonInput,
    IonList,
    IonRadio,
    IonRadioGroup,
    IonItem,
    IonLabel,
    IonListHeader,
    IonDatetime,
    RegisterPatientFooter,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const { save } = AddPatient();

    const numberOfPages = ref<number>(4);
    const currentPage = ref<number>(1);

    const patient: PatientReg = reactive({} as PatientReg);

    const selectedPatient = ref<Patient>({} as Patient);

    patient.externalPatientNumber = "";
    patient.phoneNumber = "";
    patient.physicalAddress = "";
    patient.age = -1;

    const dateOfBirth = ref();

    const client = ref<SearchClient>({} as SearchClient);

    if (store.getters.previousLink == "/search") {
      client.value.first_name = store.getters.searchClient.first_name;
      client.value.last_name = store.getters.searchClient.last_name;

      if (store.getters.searchClient.gender == "Female") {
        client.value.gender = "1";
      } else {
        client.value.gender = "0";
      }
    }

    const RegisterClient = () => {
      save(patient);
      // search(
      //   client.value.first_name + " " + client.value.last_name,
      //   client.value.gender
      // );
      // MoveNextField();
    };

    const MoveNextField = () => {
      if (currentPage.value == 5) {
        patient.firstname = client.value.first_name.trim();
        patient.lastname = client.value.last_name.trim();
        patient.gender = client.value.gender;
      }
      currentPage.value = currentPage.value + 1;
    };

    const MovePreviousField = () => {
      currentPage.value = currentPage.value - 1;
    };

    const formatDate = (value: string) => {
      return format(parseISO(value), "yyyy-MM-dd");
    };

    watch(
      () => [dateOfBirth.value],
      () => {
        patient.dob = dateOfBirth.value;
      }
    );

    watch(
      () => [store.getters.selectedPatient],
      () => {
        router.push({ name: "PatientDashboard", replace: true });
      }
    );

    return {
      numberOfPages,
      currentPage,
      client,
      MoveNextField,
      MovePreviousField,
      formatDate,
      RegisterClient,
      dateOfBirth,
      patient,
      selectedPatient,
    };
  },
});
</script>

<style scoped>

ion-content {
  --ion-background-color: #eee;
}


ion-textarea {
  border: solid 2px rgb(202, 201, 201);
  border-radius: 8px;
  background-color: white;
  font-size: 23px;
}

.ext-pat-num-field {
  margin-bottom: 10px;
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
.other-info-head {
  margin-bottom: 20px;
}

.cus-label {
  margin-bottom: 15px !important;
}
</style>
