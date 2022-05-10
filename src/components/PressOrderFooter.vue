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
          :disabled="preparedOrderTests.length < 1 || uploadingOrders"
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
import { PreparedOrderTests } from "@/interfaces/PreparedOrderTests";
import {
  IonFooter,
  IonTitle,
  IonToolbar,
  IonButton,
  IonSpinner,
} from "@ionic/vue";
import { defineComponent, PropType } from "vue";
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
    preparedOrderTests: {
      type: Object as PropType<PreparedOrderTests>,
      required: true,
    },
  },
  emits: ["NewOrder", "SaveOrder", "PlaceOrder", "NavigateNext", "NavigateBack"],
  setup(props, { emit }) {
    const router = useRouter();

    const NavigateToMainMenu = () => {
      router.push({ name: "PatientDashboard", replace: true });
    };

    const SAVE = () => {
      emit("SaveOrder");
    };

    const NewOrder = () => {
      emit("NewOrder");
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
      SAVE,
      NewOrder,
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
