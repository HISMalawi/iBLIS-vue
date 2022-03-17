<template>
  <ion-page>
    
    <tool-bar pageTitle="iBLIS"/>
    
    <ion-content :fullscreen="true">

      <collapse-tool-bar pageTitle="iBLIS"/>
    
      <div id="container">

          <div id="flex-container">

            <options-card @OpenView="Navigate" btnTitle="Search" icon="search"/> 
            <options-card @OpenView="Navigate" btnTitle="Register" icon="register"/> 
            <options-card @OpenView="Navigate" btnTitle="Order" icon="order"/>
            <options-card @OpenView="Navigate" btnTitle="Results" icon="results"/> 
            <options-card @OpenView="Navigate" btnTitle="Pending" icon="pending"/> 
            <options-card @OpenView="Navigate" btnTitle="Configurations" icon="configurations"/> 
             
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

    const router = useRouter();

    const Navigate = (viewName : string) => {

        
        switch(viewName) {
          case "Search":
            // code block

            router.push("/search");
            break;
          case "Register":
            // code block

            router.push("/register");
            break;
          case "Order":
            // code block
            
            router.push("/order");
            break;
          case "Results":
            // code block
            
            router.push("/results");
            break;
          case "Pending":
            // code block
            
            router.push("/pending");
            break;
          case "Configurations":
            // code block
            
            router.push("/configurations");
            break;
          default:
            // code block
        }
    }

    return { Navigate }
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
