<template>
  <ion-page>
    
    <tool-bar pageTitle="iBLIS | Search / Register" defaltBackButtonLink="/home"/>
    
    <ion-content :fullscreen="true">

      <collapse-tool-bar pageTitle="iBLIS | Search / Register"/>
    
      <div id="container">

          <div id="flex-container">

            <options-card
              @OpenView="Navigate"
              btnTitle="Search"
              icon="search"
              CusClass="card-3"
            />

            <options-card
              @OpenView="Navigate"
              btnTitle="Register"
              icon="register"
              CusClass="card-2"
            /> 
             
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
import OptionsCard from "@/components/OptionsCard.vue";
import ToolBar from "@/components/ToolBar.vue";
import AppFooter from "@/components/AppFooter.vue";

export default defineComponent({
  name: 'SearchOrRegisterPage',
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

    const Navigate = (viewName: string) => {
      switch (viewName) {
        
        case "Search":
          // code block

          router.push("/search");
          break;
        case "Register":
          // code block

          router.push("register");
          break;
        default:
        // code block
      }
    };

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
