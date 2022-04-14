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
                  <ion-item v-for="test in Tests" :key="test.id">
                    <ion-label>{{test.name}}</ion-label>
                    <ion-radio :value="test"></ion-radio>
                  </ion-item>
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
import { useStore } from "@/store";
import { Patient } from "@/interfaces/Patient";
import GetTests from "@/composables/getTests";

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

    const store = useStore();

    let selectedPatient: Patient = store.getters.selectedPatient;

    const { fetchTests, Tests } = GetTests();

    fetchTests();
    
    return {Tests};
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
