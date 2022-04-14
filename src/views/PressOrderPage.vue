<template>
  <ion-page>
    <tool-bar
      pageTitle="iBLIS | Press Order"
      defaltBackButtonLink="/client_dashboard"
    />

    <ion-content :fullscreen="true">
      <collapse-tool-bar pageTitle="iBLIS | Press Order" />

      <div id="container">
        <ion-grid>
          <ion-row>
            <ion-col size="3" class="custom-aside">
              <ion-list>
                <ion-radio-group>
                  <ion-list-header class="card-3">
                    <ion-label class="gender-label"> SELECT TEST</ion-label>
                  </ion-list-header>
                  <ion-item>
                    <ion-label>Male</ion-label>
                    <ion-radio value="Male"></ion-radio>
                  </ion-item>
                  <ion-item>Menu Item</ion-item>
                  <ion-item>Menu Item</ion-item>
                  <ion-item>Menu Item</ion-item>
                  <ion-item>Menu Item</ion-item>
                  <ion-item>Menu Item</ion-item>
                  <ion-item>Menu Item</ion-item>
                  <ion-item>Menu Item</ion-item>
                  <ion-item>Menu Item</ion-item>
                  <ion-item>Menu Item</ion-item>
                  <ion-item>Menu Item</ion-item>
                  <ion-item>Menu Item</ion-item>
                  <ion-item>Menu Item</ion-item>
                  <ion-item>Menu Item</ion-item>
                  <ion-item>Menu Item</ion-item>
                </ion-radio-group>
              </ion-list>
            </ion-col>
            <ion-col size="6"></ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>

    <app-footer />
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonRadioGroup,
  IonLabel,
  IonRadio,
  IonListHeader
} from "@ionic/vue";
import { defineComponent } from "vue";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import AppFooter from "@/components/AppFooter.vue";

export default defineComponent({
  name: "PressOrderPage",
  components: {
    IonContent,
    IonPage,
    ToolBar,
    CollapseToolBar,
    AppFooter,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonItem,
    IonRadioGroup,
    IonLabel,
    IonRadio,
    IonListHeader
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
ion-content {
  --ion-background-color: #eee;
}

.custom-aside {
  border-right: solid 1px rgb(202, 201, 201);
}
</style>
