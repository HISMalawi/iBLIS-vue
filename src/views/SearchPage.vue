<template>
  <ion-page>
    
    <tool-bar/>
    
    <ion-content :fullscreen="true">

      <collapse-tool-bar/>
    
      <div id="container">

          <div id="flex-container">

            
             
          </div>
      </div>
    </ion-content>

    <app-footer />

  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import CollapseToolBar from "@/components/CollapseToolBar.vue"
import ToolBar from "@/components/ToolBar.vue"
import AppFooter from "@/components/AppFooter.vue"

export default defineComponent({
  name: 'SearchPage',
  components: {
    IonContent,
    IonPage,
    ToolBar,
    CollapseToolBar,
    AppFooter
  },
  setup(){

  

    return { }
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
  padding-top: 15px;
}

ion-content{
  --ion-background-color:#eee;
}

</style>
