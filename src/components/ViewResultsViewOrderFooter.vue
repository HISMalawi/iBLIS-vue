<template>
  <ion-footer collapse="fade">
    <ion-toolbar>
      <ion-title size="small" slot="start"
        ><ion-button color="danger" @click="NavigateToMainMenu"
          >Cancel</ion-button
        >
      </ion-title>

    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import { IonFooter, IonTitle, IonToolbar, IonButton } from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ViewResultsViewOrderFooter",
  components: {
    IonFooter,
    IonTitle,
    IonToolbar,
    IonButton,
  },
  setup() {
    const router = useRouter();

    const NavigateToMainMenu = () => {
      router.push({ name: "ViewResults", replace: true });
    };

    return {
      NavigateToMainMenu 
    };
  },
});
</script>
