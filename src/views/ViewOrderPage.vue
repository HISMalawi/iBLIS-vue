<template>
  <ion-page>
    <tool-bar
      :pageTitle="'iBLIS | Order : ' + Specimen.accession_number"
      defaltBackButtonLink="/orders"
    />

    <ion-content :fullscreen="true">
      <collapse-tool-bar pageTitle="iBLIS | Orders" />

      <div id="container">
        
      </div>
    </ion-content>

    <view-order-footer/>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from "@ionic/vue";
import { defineComponent, reactive } from "vue";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import ViewOrderFooter from "@/components/ViewOrderFooter.vue";
import { useStore } from "@/store";
import { Specimen } from "@/interfaces/Specimen";
export default defineComponent({
  name: "ViewOrderPage",
  components: {
    IonContent,
    IonPage,
    ToolBar,
    CollapseToolBar,
    ViewOrderFooter,
  },
  setup() {
    const store = useStore();

    const Specimen :Specimen = store.getters.selectedSpecimen;


    return { Specimen };
  },
});
</script>

<style scoped>
ion-content {
  --ion-background-color: #eee;
}

.head-col {
  text-align: left;
  background: #ffffe2;
  border-left: solid 1px rgb(202, 201, 201);
}

/* ion-col {
  --ion-grid-column-padding: 10px;
} */

.cus-row {
  border-bottom: solid 1px rgb(202, 201, 201);
}
</style>
