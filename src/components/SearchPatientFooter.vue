<template>
  <ion-footer collapse="fade">
    <ion-toolbar>
      <ion-title v-if="currentPage < 3" size="small" slot="start"
        ><ion-button color="danger" @click="NavigateToMainMenu"
          >Cancel</ion-button
        ></ion-title
      >
      <ion-title v-if="currentPage > 2" size="small" slot="start"
        ><ion-button color="medium" @click="NavigateBack"
          >Back</ion-button
        ></ion-title
      >
      <ion-title size="small" slot="end" v-if="newClient && currentPage == 2"
        ><ion-button @click="NavigateToRegisterClient">New Client</ion-button></ion-title
      >
      <ion-title v-if="currentPage < 3" size="small" slot="end"
        ><ion-button @click="SearchClient" :disabled="disableSearch">Search</ion-button></ion-title
      >

      <ion-title v-if="currentPage == 2" size="small" slot="end"
        ><ion-button @click="NavigateNext" :disabled="disableNext">Next</ion-button></ion-title
      >

      <ion-title size="small" slot="end" v-if="currentPage == 3"
        ><ion-button @click="NavigateToPatientDashboard" class="client-found">Proceed</ion-button></ion-title
      >
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import { IonFooter, IonTitle, IonToolbar, IonButton } from "@ionic/vue";
import { defineComponent, PropType, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { MutationTypes, useStore } from "@/store";
import { SearchClient } from "@/interfaces/SearchClient";
import { Patient } from "@/interfaces/Patient";


export default defineComponent({
  name: "SearchPatientFooter",
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
    searchClient: {
      type: Object as PropType<SearchClient>,
      required: true,
    },
    selectedPatient: {
      type: Object as PropType<Patient>,
      required: true,
    }
  },
  emits: ["NavigateNext", "NavigateBack", "NavigateToRegisterClient", "SearchClient"],
  setup(props, { emit }) {

    const store = useStore();

    const router = useRouter();

    const disableSearch = ref<boolean>(true);

    const disableNext = ref<boolean>(true);

    const clientFound = ref<boolean>(false);

    const newClient = ref<boolean>(false);

    const NavigateToMainMenu = () => {
      router.push({ name: 'Home', replace: true })
    }

    const NavigateToRegisterClient = () => {

      emit("NavigateToRegisterClient");
    }

    const NavigateToPatientDashboard = () => {

      store.commit(MutationTypes.SET_SELECTED_PATIENT, props.selectedPatient);

      router.push({ name: 'PatientDashboard', replace: true })
    }

    const NavigateNext = () => {

      emit("NavigateNext");
     
    };

    const NavigateBack = () => {
      emit("NavigateBack");
    };

    watch(
      () => [props.searchClient.first_name, props.searchClient.last_name, props.searchClient.gender, props.currentPage, props.selectedPatient.name],
      () => {

        if (props.currentPage == 1 && 'first_name' in props.searchClient  && props.searchClient.first_name !== "" && 'last_name' in props.searchClient && props.searchClient.last_name !== "" && 'gender' in props.searchClient && props.searchClient.gender !== "") {

          disableSearch.value = false
          

        } else if (props.currentPage == 2 && 'first_name' in props.searchClient  && props.searchClient.first_name !== "" && 'last_name' in props.searchClient && props.searchClient.last_name !== "" && 'gender' in props.searchClient && props.searchClient.gender !== "" ){

          disableSearch.value = false
          newClient.value = true

 
        } else {

          disableNext.value = true;
          disableSearch.value = true;

        }

      }
    );

    watch(
      () => [props.selectedPatient],
      () => {

        if (Object.keys(props.selectedPatient).length > 0 && props.selectedPatient.name.length > 0){
         
             disableNext.value = false;

        } else {

          disableNext.value = true;

        }
        
        

      }
    );

    watch(
      () => [props.currentPage, props.selectedPatient.name],
      () => {

        if (props.currentPage == 2 && Object.keys(props.selectedPatient).length > 0 && props.selectedPatient.name.length > 0){
         
            clientFound.value = true;

        } else {

          clientFound.value = false;

        }


      }
    );

    const SearchClient = () => {
      emit("SearchClient");
    }

    return { NavigateNext, NavigateBack, NavigateToMainMenu, disableNext, disableSearch, clientFound, newClient, NavigateToRegisterClient, NavigateToPatientDashboard, SearchClient};
  },
});
</script>

<style>
.client-found {
  --background:green;
}
</style>
