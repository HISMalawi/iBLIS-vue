<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <div id="container">

          <div id="flex-container">

            <options-card btnTitle="Settings"/> 
            <options-card btnTitle="Setting"/> 
            <options-card btnTitle="Setting"/> 
            <options-card btnTitle="Setting"/> 
            <options-card btnTitle="Setting"/> 
            <options-card btnTitle="Setting"/> 
            
          
          </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
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
    OptionsCard
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
