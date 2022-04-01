<template>
  <ion-page>
    
    <tool-bar pageTitle="iBLIS | Register" defaltBackButtonLink="/search_or_register"/>
    
    <ion-content :fullscreen="true">

      <collapse-tool-bar pageTitle="iBLIS | Register"/>
    
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
import { useRouter } from "vue-router";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import AppFooter from "@/components/AppFooter.vue";

export default defineComponent({
  name: 'RegisterPage',
  components: {
    IonContent,
    IonPage,
    ToolBar,
    CollapseToolBar,
    AppFooter,
  },
  setup(){

    const router = useRouter();

    
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
