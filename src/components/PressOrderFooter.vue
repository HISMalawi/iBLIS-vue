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
        ><ion-button :disabled="preparedOrderTests.length < 1" class="press-order">Place Order</ion-button>
      </ion-title>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import { PreparedOrderTests } from "@/interfaces/PreparedOrderTests";
import { IonFooter, IonTitle, IonToolbar, IonButton } from "@ionic/vue";
import { defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "PressOrderFooter",
  components: {
    IonFooter,
    IonTitle,
    IonToolbar,
    IonButton,
  },
  props: {
    selectedTestReason: {
      type: String,
      required: true,
    },
    disableSave: {
      type: Boolean,
      required: true,
    },
    preparedOrderTests: {
      type: Object as PropType<PreparedOrderTests>,
      required: true,
    }
  },
  emits: ['NewOrder', 'SaveOrder'],
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

    return {
      NavigateToMainMenu,
      SAVE,
      NewOrder
    };
  },
});
</script>
<style scoped>
.press-order {
  --background: green;
}
</style>
