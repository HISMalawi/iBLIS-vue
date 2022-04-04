<template>
  <ion-footer collapse="fade">
    <ion-toolbar>
      <ion-title v-if="currentPage > 1" size="small" slot="start"
        ><ion-button color="medium" @click="NavigateBack"
          >Back</ion-button
        ></ion-title
      >
      <ion-title size="small" slot="end"
        ><ion-button @click="NavigateNext">Next</ion-button></ion-title
      >
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import { IonFooter, IonTitle, IonToolbar, IonButton } from "@ionic/vue";
import { defineComponent } from "vue";

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
  },
  emits: ["NavigateNext", "NavigateBack"],
  setup(props, context) {
    const NavigateNext = () => {
      context.emit("NavigateNext");
    };

    const NavigateBack = () => {
      context.emit("NavigateBack");
    };

    return { NavigateNext, NavigateBack };
  },
});
</script>

<style></style>
