<template>
  <ion-footer collapse="fade">
    <ion-toolbar>
      <ion-title size="small" slot="start"
        ><ion-button color="danger" @click="NavigateToMainMenu"
          >Cancel</ion-button
        >
      </ion-title>

      <ion-title size="small" slot="end" @click="NavigateToPressOrder"
        ><ion-button>Order</ion-button>
      </ion-title>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import { IonFooter, IonTitle, IonToolbar, IonButton } from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "OrdersFooter",
  components: {
    IonFooter,
    IonTitle,
    IonToolbar,
    IonButton,
  },
  setup() {
    const router = useRouter();

    const NavigateToMainMenu = () => {
      router.push({ name: "PatientDashboard", replace: true });
    };

    const NavigateToPressOrder = () => {
      router.push({ name: "PressOrder", replace: true });
    };

    return {
      NavigateToMainMenu, NavigateToPressOrder
    };
  },
});
</script>
