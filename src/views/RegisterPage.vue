<template>
  <ion-page>
    <tool-bar pageTitle="iBLIS | Register" defaltBackButtonLink="/home" />

    <ion-content :fullscreen="true">
      <collapse-tool-bar pageTitle="iBLIS | Register" />

      <div id="container">
        <ion-input
          v-if="currentPage == 1"
          v-model="client.first_name"
          placeholder="First Name"
        ></ion-input>

        <ion-input
          v-if="currentPage == 2"
          v-model="client.last_name"
          placeholder="Last Name"
        ></ion-input>

        <ion-list v-if="currentPage == 3">
          <ion-radio-group v-model="client.gender">
            <ion-list-header class="card-3">
              <ion-label class="gender-label"> Gender </ion-label>
            </ion-list-header>

            <ion-item>
              <ion-label>Male</ion-label>
              <ion-radio value="Male"></ion-radio>
            </ion-item>

            <ion-item>
              <ion-label>Female</ion-label>
              <ion-radio value="Female"></ion-radio>
            </ion-item>
          </ion-radio-group>
        </ion-list>

        <ion-list v-if="currentPage == 4">
            <ion-list-header class="card-3">
              <ion-label class="gender-label"> Date of Birth </ion-label>
            </ion-list-header>

            <ion-datetime 	presentation="date" placeholder="Date of Birth"></ion-datetime>
          

        </ion-list>

        

      </div>
    </ion-content>

    <register-patient-footer
      @NavigateBack="MovePreviousField"
      @NavigateNext="MoveNextField"
      :currentPage="currentPage"
      :numberOfPages="numberOfPages"
      :client="client"
    />
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonInput,
  IonList,
  IonRadio,
  IonRadioGroup,
  IonItem,
  IonLabel,
  IonListHeader,
  IonDatetime,
} from "@ionic/vue";
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "@/store";
// import { useRouter } from "vue-router";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import RegisterPatientFooter from "@/components/RegisterPatientFooter.vue";
import { Patient } from "@/interfaces/Patient";
import { SearchClient } from "@/interfaces/SearchClient";

export default defineComponent({
  name: "RegisterPage",
  components: {
    IonContent,
    IonPage,
    ToolBar,
    CollapseToolBar,
    IonInput,
    IonList,
    IonRadio,
    IonRadioGroup,
    IonItem,
    IonLabel,
    IonListHeader,
    IonDatetime,
    RegisterPatientFooter,
  },
  setup() {
    const store = useStore();
    // const router = useRouter();

    const numberOfPages = ref<number>(4);
    const currentPage = ref<number>(1);

    const patient: Patient = reactive({} as Patient);

    const client = ref<SearchClient>({} as SearchClient);

    if (store.getters.previousLink == "/search") {
      client.value.first_name = store.getters.searchClient.first_name;
      client.value.last_name = store.getters.searchClient.last_name;
      client.value.gender = store.getters.searchClient.gender;
    }

    const MoveNextField = () => {
      currentPage.value = currentPage.value + 1;
    };

    const MovePreviousField = () => {
      currentPage.value = currentPage.value - 1;
    };

    return {
      numberOfPages,
      currentPage,
      client,
      MoveNextField,
      MovePreviousField,
    };
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
  border: solid 2px rgb(202, 201, 201);
  border-radius: 8px;
  background-color: white;
  font-size: 23px;
}
.gender-label {
  font-size: 23px;
}
.matches-label {
  font-size: 22px;
}
.poss-match-list {
  padding: 0 10px;
}
</style>
