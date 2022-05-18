<template>
  <ion-footer collapse="fade">
    <ion-toolbar>
      <ion-title size="small" slot="start"
        ><ion-button color="danger" @click="NavigateToMainMenu"
          >Finish</ion-button
        >
      </ion-title>

      <ion-title size="small" slot="end">v1.0</ion-title>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import { IonFooter, IonTitle, IonToolbar, IonButton } from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "PatientDashboardFooter",
  components: {
    IonFooter,
    IonTitle,
    IonToolbar,
    IonButton,
  },
  setup() {
    const router = useRouter();

    const NavigateToMainMenu = () => {
      router.push({ name: "Home", replace: true });
    };

    return {
      NavigateToMainMenu,
    };
  },
});
</script>
