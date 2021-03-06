<template>
  <ion-page>
    <tool-bar pageTitle="iBLIS" v-if="$store.state.loggedIn" />

    <ion-content :fullscreen="true">
      <collapse-tool-bar pageTitle="iBLIS" />

      <div id="container">
        <div id="flex-container" v-if="$store.state.loggedIn">
          <options-card
            @OpenView="Navigate"
            btnTitle="Search Client"
            icon="search"
            CusClass="card-3"
          />

          <options-card
            @OpenView="Navigate"
            btnTitle="Register Client"
            icon="register"
            CusClass="card-2"
          />

          <options-card
            @OpenView="Navigate"
            btnTitle="Activity Summary"
            icon="results"
            CusClass="card-1"
          />
          <options-card
            @OpenView="Navigate"
            btnTitle="Pending Orders"
            icon="pending"
            CusClass="card-4-orange"
          />

          <options-card
            @OpenView="Navigate"
            btnTitle="Rejected Orders"
            icon="rejected"
            CusClass="card-4-gray"
          />

          <options-card
            @OpenView="Navigate"
            btnTitle="Configurations"
            icon="configurations"
            CusClass="card-4-violet"
          />

          <options-card
            class="item-empty"
            @OpenView="Navigate"
            btnTitle="Configurations"
            icon="configurations"
            CusClass="card-4-violet"
          />

          <options-card
            class="item-empty"
            @OpenView="Navigate"
            btnTitle="Configurations"
            icon="configurations"
            CusClass="card-4-violet"
          />


        </div>
      </div>
    </ion-content>

    <app-footer v-if="$store.state.loggedIn"/>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  useBackButton,
  alertController,
} from "@ionic/vue";
import { defineComponent, watchEffect } from "vue";
import { useRouter } from "vue-router";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import AppFooter from "@/components/AppFooter.vue";
import OptionsCard from "@/components/OptionsCard.vue";
import { useStore } from "@/store";
import { Plugins } from "@capacitor/core";
const { App } = Plugins;

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
    const store = useStore();

    const router = useRouter();

    const Navigate = (viewName: string) => {
      switch (viewName) {
        case "Search Client":
          // code block

          router.push("/search");
          break;
        case "Register Client":
          // code block

          router.push("/register");
          break;
        case "Activity Summary":
          // code block

          router.push("/summary");
          break;

        case "Pending Orders":
          // code block

          router.push("/pending_orders");
          break;

        case "Rejected Orders":
          // code block

          router.push("/rejected_orders");
          break;

        case "Configurations":
          // code block

          router.push("/configurations");
          break;
        default:
        // code block
      }
    };

    watchEffect(() => {
      if (!store.getters.isLoggedIn) {
        router.push({ name: "Login", replace: true });
      }
    });

    const AlertExitApp = () => {
      const presentAlert = async () => {
        const alert = await alertController.create({
          cssClass: "order-status-alert",
          header: "Attention!",
          message: "Are you sure you want to Exit?",
          buttons: [
            {
              text: "CANCEL",
              role: "cancel",
              cssClass: "secondary",
            },
            {
              text: "EXIT",
              role: "accept",
              cssClass: "secondary",
              handler: () => {
                App.exitApp();
              },
            },
          ],
        });
        await alert.present();
      };

      presentAlert();
    };

    useBackButton(5, () => {
      if (router.currentRoute.value.name == "Home") {
        AlertExitApp();
      } else if (router.currentRoute.value.name == "Login") {
        App.exitApp();
      } else {
        router.push({ name: "Home", replace: true });
      }
    });

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

.item-empty {
  visibility: hidden;
}

#container {
  padding-top: 15px;
}

ion-content {
  --ion-background-color: #eee;
}
</style>
