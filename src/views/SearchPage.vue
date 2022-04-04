<template>
  <ion-page>
    <tool-bar
      pageTitle="iBLIS | Search"
      defaltBackButtonLink="/search_or_register"
    />

    <ion-content :fullscreen="true">
      <collapse-tool-bar pageTitle="iBLIS | Search" />

      <div id="container">
        <ion-input v-if="currentPage == 1" placeholder="First Name"></ion-input>
        <ion-input v-if="currentPage == 2" placeholder="Last Name"></ion-input>

        <ion-list v-if="currentPage == 3">
          <ion-radio-group>
            <ion-list-header>
              <ion-label class="gender-label"> Gender </ion-label>
            </ion-list-header>

            <ion-item>
              <ion-label>Male</ion-label>
              <ion-radio value="male"></ion-radio>
            </ion-item>

            <ion-item>
              <ion-label>Female</ion-label>
              <ion-radio value="female"></ion-radio>
            </ion-item>

            
          </ion-radio-group>
        </ion-list>

        <ion-card v-if="currentPage == 4" class="card-4 card-4-yellow">
            <ion-card-content>
              <ion-row>
                <ion-col size="10">
                  <ion-row>
                    <ion-col size="12">
                      <h1>Search info</h1>
                    </ion-col>
                    <ion-col size="12">
                      <div class="bolder"><h2> <span class="light-text">Name</span> --</h2></div>
                    </ion-col>
                  </ion-row>
                  <ion-row>
                    <ion-col size="12">
                      <div class="bolder"><h2> <span class="light-text">Gender</span> -- </h2></div>
                    </ion-col>
                  </ion-row>
                </ion-col>
                <ion-col size="2" class="dashboard-card-icon-col">
                  <ion-icon :icon="bandageOutline" style="" class="dashboard-card-icon"></ion-icon>
                </ion-col>
              </ion-row>
            </ion-card-content>
          </ion-card>
      </div>
    </ion-content>

    <search-patient-footer
      @NavigateBack="MovePreviousField"
      @NavigateNext="MoveNextField"
      :currentPage="currentPage"
      :numberOfPages="numberOfPages"
    />
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonInput, IonList, IonRadioGroup, IonItem, IonLabel, IonRadio, IonCard, IonCardContent, IonRow, IonCol} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import SearchPatientFooter from "@/components/SearchPatientFooter.vue";

export default defineComponent({
  name: "SearchPage",
  components: {
    IonContent,
    IonPage,
    ToolBar,
    CollapseToolBar,
    SearchPatientFooter,
    IonInput,
    IonList, 
    IonRadioGroup, 
    IonItem, 
    IonLabel, 
    IonRadio,
    IonCard, IonCardContent, IonRow, IonCol
  },
  setup() {
    const router = useRouter();
    const numberOfPages = ref<number>(4);
    const currentPage = ref<number>(1);

    const MoveNextField = () => {
      currentPage.value = currentPage.value + 1;
    };

    const MovePreviousField = () => {
      currentPage.value = currentPage.value - 1;
    };

    return { currentPage, numberOfPages, MoveNextField, MovePreviousField };
  },
});
</script>

<style scoped>
#container {
  padding: 15px;
}

ion-content {
  --ion-background-color: #eee;
}

ion-input {
  border: solid 3px rgb(226, 224, 224);
  border-radius: 8px;
  background-color: white;
  font-size: 23px;
}
.gender-label {
  font-size: 23px;
}
</style>
