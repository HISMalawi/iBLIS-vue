<template>
  <ion-header :translucent="true" v-if="$store.state.loggedIn">
    <ion-toolbar>
      <ion-buttons v-if="defaltBackButtonLink !== '#'" slot="start">
        <ion-back-button :default-href="defaltBackButtonLink"></ion-back-button>
      </ion-buttons>
      <ion-title>{{ pageTitle }}</ion-title>
      <ion-buttons slot="secondary">
        <ion-button>
          <ion-icon slot="icon-only" :icon="mailOutline"></ion-icon>
        </ion-button>
        <ion-button>
          <ion-icon slot="icon-only" :icon="notificationsOutline"></ion-icon>
        </ion-button>
        <ion-button @click="openPopover">
          <ion-icon slot="icon-only" :icon="personCircleSharp"></ion-icon>
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
import {
  notificationsOutline,
  mailOutline,
  personCircleSharp,
} from "ionicons/icons";
import { popoverController } from "@ionic/vue";
import { defineComponent } from "vue";
import TokenCheck from "@/composables/tokenCheck";
import ToolBarOptions from "@/components/ToolBarOptions.vue";

export default defineComponent({
  name: "ToolBar",
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

    const { logout } = TokenCheck()

    const LogOut = () => {
      logout();
    }

    const openPopover =  async  (ev: Event) => {
      const popover = await popoverController
        .create({
          component: ToolBarOptions,
          cssClass: 'my-custom-class',
          event: ev,
          translucent: true
        })
      await popover.present();
    }

    return { notificationsOutline, mailOutline, personCircleSharp, openPopover };
  },
});
</script>

<style></style>
