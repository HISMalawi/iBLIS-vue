<template>
  <ion-footer collapse="fade">
    <ion-toolbar>
      <ion-title size="small" slot="start"
        ><ion-button color="danger" @click="NavigateToMainMenu"
          >Finish</ion-button
        >
      </ion-title>
      <ion-title size="small" slot="end" v-if="enableNewOrder"
        ><ion-button  @click="NavigateToPlaceOrder"
          >New Order</ion-button
        >
      </ion-title>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import { IonFooter, IonTitle, IonToolbar, IonButton } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";

export default defineComponent({
  name: "OrdersFooter",
  components: {
    IonFooter,
    IonTitle,
    IonToolbar,
    IonButton,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const enableNewOrder = ref<boolean>(false);

    if (store.getters.createdOrders.length > 0) {

        enableNewOrder.value = true;
        
    }

    const NavigateToMainMenu = () => {
      router.push({ name: "PatientDashboard", replace: true });
    };

    const NavigateToPlaceOrder = () => {
      router.push({ name: "PressOrder", replace: true });
    };

    return {
      NavigateToMainMenu, NavigateToPlaceOrder, enableNewOrder
    };
  },
});
</script>
