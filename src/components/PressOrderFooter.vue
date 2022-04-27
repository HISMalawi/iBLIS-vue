<template>
  <ion-footer collapse="fade">
    <ion-toolbar>
      <ion-title size="small" slot="start"
        ><ion-button color="danger" @click="NavigateToMainMenu"
          >Cancel</ion-button
        >
      </ion-title>

      <ion-title size="small" slot="end"
        ><ion-button @click="NewOrder">New Order</ion-button>
      </ion-title>

      <ion-title size="small" slot="end"
        ><ion-button :disabled="disableSave" @click="SAVE">Save</ion-button>
      </ion-title>

      <ion-title size="small" slot="end"
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
    uploadingOrders:{
      type: Boolean,
      required: true,
    },
    disableSave: {
      type: Boolean,
      required: true,
    },
    preparedOrderTests: {
      type: Object as PropType<PreparedOrderTests>,
      required: true,
    },
  },
  emits: ["NewOrder", "SaveOrder", "PlaceOrder"],
  setup(props, { emit }) {
    const router = useRouter();

    const NavigateToMainMenu = () => {
      router.push({ name: "Orders", replace: true });
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

    return {
      NavigateToMainMenu,
      SAVE,
      NewOrder,
      PlaceOrder,
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
