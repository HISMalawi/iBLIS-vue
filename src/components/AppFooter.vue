<template>

  <ion-footer collapse="fade">
    <ion-toolbar>
      <ion-title slot="end">v1.0</ion-title>
    </ion-toolbar>
  </ion-footer>

</template>

<script lang="ts">
import {
  IonFooter, 
  IonTitle, 
  IonToolbar,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppFooter",
  components: {
    IonFooter,
    IonTitle,
    IonToolbar
  },
  setup() {
    return { };
  },
});
</script>

<style></style>
