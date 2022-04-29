<template>
  <ion-header :translucent="true" v-if="$store.state.loggedIn">
    <ion-toolbar>
      <ion-title>{{ pageTitle }}</ion-title>

      <ion-title size="small" slot="end">
        <ion-button color="danger" @click="CloseModal">Close</ion-button>
      </ion-title
      >
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ModalToolBar",
  components: {
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton
  },
  props: {
    pageTitle: {
      type: String,
      required: false,
      default: "iBLIS",
    },
  },
  emits: ["CloseModal"],
  setup(props, { emit }) {

    const CloseModal = () => {

      emit("CloseModal");
      
    }
    return { CloseModal };
  },
});
</script>

<style></style>
