<template>
  <ion-page>
    <tool-bar pageTitle="iBLIS" />

    <ion-content :fullscreen="true">
      <collapse-tool-bar pageTitle="iBLIS" />

      <div id="container">
        <div id="flex-container">
         
            <options-card
              @OpenView="Navigate"
              btnTitle="Search / Register"
              icon="search"
              CusClass="card-3"
            />
            
            <options-card
              @OpenView="Navigate"
              btnTitle="Summary"
              icon="results"
              CusClass="card-2"
            />
            <options-card
              @OpenView="Navigate"
              btnTitle="Pending Orders"
              icon="pending"
              CusClass="card-4-orange"
            />
            <options-card class="last-option"
              @OpenView="Navigate"
              btnTitle="Configurations"
              icon="configurations"
              CusClass="card-4-violet"
            />
         
        </div>
      </div>
    </ion-content>

    <app-footer />
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import AppFooter from "@/components/AppFooter.vue";
import OptionsCard from "@/components/OptionsCard.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    IonContent,
    IonPage,
    ToolBar,
    CollapseToolBar,
    AppFooter,
    OptionsCard,
  },
  setup() {
    const router = useRouter();

    const Navigate = (viewName: string) => {
      switch (viewName) {
        
        case "Search / Register":
          // code block

          router.push("/search_or_register");
          break;
        case "Summary":
          // code block

          router.push("/summary");
          break;
    
        case "Pending Orders":
          // code block

          router.push("/pending_orders");
          break;
        case "Configurations":
          // code block

          router.push("/configurations");
          break;
        default:
        // code block
      }
    };

    return { Navigate };
  },
});
</script>

<style scoped>
#flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}


@media screen and (max-width: 1138px) and (max-height: 712px) {
  .last-option {
    margin-right: auto;
    order: 2;
  }
}

#container {
  padding-top: 15px;
}

ion-content {
  --ion-background-color: #eee;
}
</style>
