<template>
  <ion-header :translucent="true" v-if="$store.state.loggedIn">
    <ion-toolbar>
      <ion-title>{{ pageTitle }}</ion-title>

      <ion-title size="small" slot="end">
        <ion-button class="cus-btn" @click="SaveChanges">Done</ion-button>
      </ion-title>

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
  name: "DateModalToolBar",
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
  emits: ["CloseDateModals"],
  setup(props, { emit }) {


    const SaveChanges = () => {

      emit("CloseDateModals");
      
    }
    return {  SaveChanges };
  },
});
</script>

<style>
.cus-btn{
  margin-right: 10px;
}
</style>
