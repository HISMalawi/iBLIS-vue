<template>
  <ion-header collapse="condense" v-if="$store.state.loggedIn">
    <ion-toolbar>
      <ion-buttons v-if="defaltBackButtonLink !== '#'"  slot="start">
        <ion-back-button :default-href="defaltBackButtonLink"></ion-back-button>
      </ion-buttons>
      <ion-title size="large">{{pageTitle}}</ion-title>
      <ion-buttons slot="secondary">
        <ion-button>
          <ion-icon slot="icon-only" :icon="mailOutline"></ion-icon>
        </ion-button>
        <ion-button>
          <ion-icon slot="icon-only" :icon="notificationsOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonBackButton,
  IonIcon,
} from "@ionic/vue";
import { notificationsOutline, mailOutline } from "ionicons/icons";
import { defineComponent } from "vue";

export default defineComponent({
  name: "CollapseToolBar",
  components: {
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonBackButton,
    IonIcon,
  },
  props: {
    pageTitle: {
      type: String,
      required: false,
      default: "iBLIS",
    },
    defaltBackButtonLink: {
      type: String,
      required: false,
      default: "#",
    },
  },
  setup() {
    return { notificationsOutline, mailOutline };
  },
});
</script>

<style></style>
