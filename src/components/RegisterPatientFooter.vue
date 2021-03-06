<template>
  <ion-footer collapse="fade">
    <ion-toolbar>
      <ion-title v-if="currentPage == 1" size="small" slot="start"
        ><ion-button color="danger" @click="NavigateToMainMenu"
          >Cancel</ion-button
        ></ion-title
      >
      <ion-title v-if="currentPage > 1" size="small" slot="start"
        ><ion-button color="medium" @click="NavigateBack"
          >Back</ion-button
        ></ion-title
      >

      <ion-title
        v-if="currentPage < 8 && currentPage != 2"
        size="small"
        slot="end"
        ><ion-button @click="NavigateNext" :disabled="disableNext"
          >Next</ion-button
        ></ion-title
      >

      <ion-title size="small" slot="end" v-if="currentPage == 2 && Object.keys(selectedPatient).length == 0"
        ><ion-button @click="RegisterClient">Save</ion-button></ion-title
      >

      <ion-title size="small" slot="end" v-if="currentPage == 2 && Object.keys(selectedPatient).length > 0"
        ><ion-button
          :disabled="disableProceed"
          @click="NavigateToPatientDashboard"
          >Proceed</ion-button
        ></ion-title
      >
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import { IonFooter, IonTitle, IonToolbar, IonButton } from "@ionic/vue";
import { defineComponent, PropType, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { MutationTypes, useStore } from "@/store";
import { PatientReg } from "@/interfaces/PatientReg";
import { SearchClient } from "@/interfaces/SearchClient";
import { Patient } from "@/interfaces/Patient";

export default defineComponent({
  name: "RegisterPatientFooter",
  components: {
    IonFooter,
    IonTitle,
    IonToolbar,
    IonButton,
  },
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    numberOfPages: {
      type: Number,
      required: true,
    },
    patient: {
      type: Object as PropType<PatientReg>,
      required: true,
    },
    client: {
      type: Object as PropType<SearchClient>,
      required: true,
    },
    selectedPatient: {
      type: Object as PropType<Patient>,
      required: true,
    },
  },
  emits: ["NavigateNext", "NavigateBack", "RegisterClient"],
  setup(props, { emit }) {
    const store = useStore();

    const router = useRouter();

    const disableNext = ref<boolean>(true);

    const disableProceed = ref<boolean>(true);

    if (store.getters.previousLink == "/search") {
      disableNext.value = false;
      store.commit(MutationTypes.SET_PREVIOUS_LINK, "#");
    } else {
      store.commit(MutationTypes.SET_PREVIOUS_LINK, "#");
      disableNext.value = true;
    }

    const NavigateToMainMenu = () => {
      router.push({ name: "Home", replace: true });
    };

    const RegisterClient = () => {
      emit("RegisterClient");
    };

    const NavigateToPatientDashboard = () => {
      store.commit(MutationTypes.SET_SELECTED_PATIENT, props.selectedPatient);

      router.push({ name: "PatientDashboard", replace: true });
    };

    const NavigateNext = () => {
      emit("NavigateNext");
    };

    const NavigateBack = () => {
      emit("NavigateBack");
    };

    watch(
      () => [props.selectedPatient],
      () => {
        disableProceed.value = false;
      }
    );

    watch(
      () => [
        props.client.first_name,
        props.client.last_name,
        props.client.gender,
        props.currentPage,
        props.patient.dob,
        props.patient.phoneNumber,
        props.patient.physicalAddress,
        props.selectedPatient,
        props.selectedPatient.name,
      ],
      () => {
        if (
          props.currentPage == 1 &&
          "first_name" in props.client &&
          props.client.first_name !== "" &&
          "last_name" in props.client &&
          props.client.last_name !== "" &&
          "gender" in props.client &&
          props.client.gender !== "" &&
          "dob" in props.patient &&
          props.patient.dob !== ""
        ) {
          disableNext.value = false;
        } else if (
          Object.keys(props.selectedPatient).length > 0 &&
          props.selectedPatient.name.length > 0
        ) {
          disableNext.value = false;
        } else {
          disableNext.value = true;
        }
      }
    );

    return {
      NavigateNext,
      NavigateBack,
      NavigateToMainMenu,
      disableNext,
      RegisterClient,
      NavigateToPatientDashboard,
      disableProceed,
    };
  },
});
</script>

<style>
.client-found {
  --background: green;
}
</style>
