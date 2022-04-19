<template>
  <ion-footer collapse="fade">
    <ion-toolbar>
      <ion-title size="small" slot="start"
        ><ion-button color="danger" @click="NavigateToMainMenu"
          >Cancel</ion-button
        >
      </ion-title>

      <ion-title size="small" slot="end"
        ><ion-button>New Test</ion-button>
      </ion-title>

      <ion-title size="small" slot="end"
        ><ion-button :disabled="disableSave" @click="SAVE">Save</ion-button>
      </ion-title>

      <ion-title size="small" slot="end"
        ><ion-button class="press-order">Place Order</ion-button>
      </ion-title>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import { IonFooter, IonTitle, IonToolbar, IonButton } from "@ionic/vue";
import { defineComponent, ref, watch } from "vue";
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
  },
  emits: ['PlaceOrder', 'SaveOrder'],
  setup(props, { emit }) {

    const router = useRouter();

    const disableSave = ref<boolean>(true);

    const NavigateToMainMenu = () => {
      router.push({ name: "Orders", replace: true });
    };

    const SAVE = () => {
      emit("SaveOrder");
    };

    watch(
      () => [props.selectedTestReason],
      () => {
        if (props.selectedTestReason !== "") {
          disableSave.value = false;
        }
      }
    );

    return {
      NavigateToMainMenu,
      SAVE,
      disableSave,
    };
  },
});
</script>
<style scoped>
.press-order {
  --background: green;
}
</style>
