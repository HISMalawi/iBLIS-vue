<template>
  <ion-footer collapse="fade">
    <ion-toolbar>
      <ion-title size="small" slot="start" v-if="currentPage == 1"
        ><ion-button color="danger" @click="NavigateToMainMenu"
          >Cancel</ion-button
        >
      </ion-title>

      <ion-title v-if="currentPage > 1" size="small" slot="start"
        ><ion-button color="medium" @click="NavigateBack"
          >Back</ion-button
        ></ion-title
      >

      <ion-title size="small" slot="end"
        ><ion-button :disabled="disableNext" v-if="currentPage == 1" @click="NavigateNext">Next</ion-button>
      </ion-title>

      <ion-title size="small" slot="end" v-if="currentPage == 2"
        ><ion-button
          :disabled="disablePlaceOrder"
          @click="PlaceOrder"
          class="press-order"
          >Place Order
          <ion-spinner v-if="uploadingOrders" class="sp" name="circles"></ion-spinner>
        </ion-button>
      </ion-title>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import {
  IonFooter,
  IonTitle,
  IonToolbar,
  IonButton,
  IonSpinner,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "PressOrderFooter",
  components: {
    IonFooter,
    IonTitle,
    IonToolbar,
    IonButton,
    IonSpinner,
  },
  props: {
    selectedTestReason: {
      type: String,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    uploadingOrders:{
      type: Boolean,
      required: true,
    },
    disableNext: {
      type: Boolean,
      required: true,
    },
    disablePlaceOrder: {
      type: Boolean,
      required: true,
    },
  },
  emits: [ "PlaceOrder", "NavigateNext", "NavigateBack"],
  setup(props, { emit }) {
    const router = useRouter();

    const NavigateToMainMenu = () => {
      router.push({ name: "PatientDashboard", replace: true });
    };

    const PlaceOrder = () => {
      emit("PlaceOrder");
    };

    const NavigateNext = () => {

      emit("NavigateNext");
     
    };

    const NavigateBack = () => {

      emit("NavigateBack");
     
    };

    return {
      NavigateToMainMenu,
      PlaceOrder,
      NavigateNext,
      NavigateBack
    };
  },
});
</script>
<style scoped>
.press-order {
  --background: green;
}
.sp {
  margin-left: 5px;
}
</style>
