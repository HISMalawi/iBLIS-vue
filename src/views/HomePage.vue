<template>
  <ion-page>
    
    <tool-bar/>
    
    <ion-content :fullscreen="true">

      <collapse-tool-bar/>
    
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

    <app-footer />

  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { notificationsOutline, mailOutline} from "ionicons/icons"
import { defineComponent } from 'vue';
import CollapseToolBar from "@/components/CollapseToolBar.vue"
import ToolBar from "@/components/ToolBar.vue"
import AppFooter from "@/components/AppFooter.vue"
import OptionsCard from "@/components/OptionsCard.vue"

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonPage,
    ToolBar,
    CollapseToolBar,
    AppFooter,
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
