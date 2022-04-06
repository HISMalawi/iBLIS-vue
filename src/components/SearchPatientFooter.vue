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
      <ion-title size="small" slot="end" v-if="newClient"
        ><ion-button @click="NavigateToRegisterClient">New Client</ion-button></ion-title
      >
      <ion-title size="small" slot="end"
        ><ion-button @click="NavigateNext" :disabled="enableNext" :class="clientFound ? 'client-found':''">Next</ion-button></ion-title
      >
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import { IonFooter, IonTitle, IonToolbar, IonButton } from "@ionic/vue";
import { defineComponent, PropType, ref, watch } from "vue";
import { useRouter } from "vue-router";
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
  emits: ["NavigateNext", "NavigateBack"],
  setup(props, { emit }) {

    const enableNext = ref<boolean>(true);

    const clientFound = ref<boolean>(false);

    const newClient = ref<boolean>(false);

    const router = useRouter();

    const NavigateToMainMenu = () => {
      router.push({ name: 'Home', replace: true })
    }

    const NavigateToRegisterClient = () => {
      router.push({ name: 'Register', replace: true })
    }

    const NavigateNext = () => {

      emit("NavigateNext");
     
    };

    watch(
      () => [props.searchClient.first_name, props.searchClient.last_name, props.searchClient.gender, props.currentPage],
      () => {

        if (props.currentPage == 1 && 'first_name' in props.searchClient  && props.searchClient.first_name !== "" ) {

          enableNext.value = false

        } else if (props.currentPage == 2 && 'last_name' in props.searchClient && props.searchClient.last_name !== "" ){

          enableNext.value = false

        } else if (props.currentPage == 3 && 'gender' in props.searchClient && props.searchClient.gender !== ""){

          enableNext.value = false

        } else {

          enableNext.value = true

        }

      }
    );

    watch(
      () => [props.selectedPatient],
      () => {
        
        enableNext.value = false;

      }
    );

    watch(
      () => [props.currentPage, props.selectedPatient.name],
      () => {

        if (props.currentPage == 4 && Object.keys(props.selectedPatient).length > 0 && props.selectedPatient.name.length > 0){
         
            clientFound.value = true;

        } else {

          clientFound.value = false;

        }

        if (props.currentPage == 4) {

          newClient.value = true;
          
        } else {

          newClient.value = false;

        }
        
        enableNext.value = false;

      }
    );

    const NavigateBack = () => {
      emit("NavigateBack");
    };

    return { NavigateNext, NavigateBack, NavigateToMainMenu, enableNext, clientFound, newClient, NavigateToRegisterClient};
  },
});
</script>

<style>
.client-found {
  --background:green;
}
</style>
