<template>
  <ion-header :translucent="true" v-if="$store.state.loggedIn">
    <ion-toolbar>
      <ion-title>{{ pageTitle }}</ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import {
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ModalToolBar",
  components: {
    IonHeader,
    IonTitle,
    IonToolbar,
  },
  props: {
    pageTitle: {
      type: String,
      required: false,
      default: "iBLIS",
    },
  },
  setup() {
    return { };
  },
});
</script>

<style></style>
