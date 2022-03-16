<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>iBLIS</ion-title>
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
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">iBLIS</ion-title>
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
    
      <div id="container">

          <div id="flex-container">

            <options-card btnTitle="Search" icon="search"/> 
            <options-card btnTitle="Register" icon="register"/> 
            <options-card btnTitle="Order" icon="order"/>
            <options-card btnTitle="Results" icon="results"/> 
            <options-card btnTitle="Pending" icon="pending"/> 
            <options-card btnTitle="Configurations" icon="configurations"/> 
             
          </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/vue';
import { notificationsOutline, mailOutline} from "ionicons/icons"
import { defineComponent } from 'vue';
import OptionsCard from "@/components/OptionsCard.vue"

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons, 
    IonButton,
    IonIcon,
    OptionsCard
  },
  setup(){

    return { notificationsOutline, mailOutline }
  }
});
</script>

<style scoped>

#flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content:center;
}

#container {
  height: 100%;
  background: #eee;
  padding-top: 15px;
}
</style>
