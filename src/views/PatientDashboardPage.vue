<template>
  <ion-page>
    <tool-bar
      pageTitle="iBLIS | Client Dashboard"
      defaltBackButtonLink="/home"
    />

    <ion-content :fullscreen="true">
      <collapse-tool-bar pageTitle="iBLIS | Client Dashboard" />

      <div id="container">
        <ion-card class="card-4-orange client-info-card">
          <ion-card-content>
            <ion-row>
              <ion-col size="2">
                <ion-row>
                  <ion-col size="12">
                    <img class="client-ava" src="../assets/client-icon.png" />
                  </ion-col>
                </ion-row>
              </ion-col>
              <ion-col size="8">
                <ion-row>
                  <ion-col size="12">
                    <h1>Client Details</h1>
                  </ion-col>
                  <ion-col size="12">
                    <div class="bolder">
                      <h2>
                        <span class="light-text"
                          >Name :
                          {{
                            selectedPatient.name +
                            " (" +
                            selectedPatient.gender +
                            ")"
                          }}</span
                        >
                      </h2>
                    </div>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col size="12">
                    <div class="bolder">
                      <h2>
                        <span class="light-text"
                          >Age : {{ selectedPatient.age }}</span
                        >
                      </h2>
                    </div>
                  </ion-col>
                </ion-row>
              </ion-col>
            </ion-row>
          </ion-card-content>
        </ion-card>

        <div id="flex-container" v-if="$store.state.loggedIn">
          <options-card
            @OpenView="Navigate"
            btnTitle="Place Order"
            icon="order"
            CusClass="card-3"
          />

          <options-card
            @OpenView="Navigate"
            btnTitle="View Orders"
            icon="results"
            CusClass="card-2"
          />

          <options-card
            @OpenView="Navigate"
            btnTitle="View Results"
            icon="view-results"
            CusClass="card-1"
          />

          <options-card
            class="last-option"
            @OpenView="Navigate"
            btnTitle="Upload Results"
            icon="upload-results"
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

    <patient-dashboard-footer />
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardContent,
  IonCol,
  IonRow,
} from "@ionic/vue";
import { defineComponent, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import PatientDashboardFooter from "@/components/PatientDashboardFooter.vue";
import OptionsCard from "@/components/OptionsCard.vue";
import { useStore } from "@/store";
import { Patient } from "@/interfaces/Patient";

export default defineComponent({
  name: "PatientDashboardPage",
  components: {
    IonContent,
    IonPage,
    ToolBar,
    CollapseToolBar,
    PatientDashboardFooter,
    OptionsCard,
    IonCard,
    IonCardContent,
    IonCol,
    IonRow,
  },
  setup() {
    const store = useStore();

    const selectedPatient = ref<Patient>(store.getters.selectedPatient);

    const router = useRouter();

    const Navigate = (viewName: string) => {
      switch (viewName) {
        case "Place Order":
          // code block

          router.push("/press_order");
          break;

        case "View Orders":
          // code block

          router.push("/orders");
          break;

        case "View Results":
          // code block

          router.push("/view_results");
          break;

        case "Upload Results":
          // code block

          router.push("/upload_results");
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

    return { Navigate, selectedPatient };
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

ion-content {
  --ion-background-color: #eee;
}
.item-empty {
  visibility: hidden;
}

.client-info-card {
  margin-bottom: 20px;
}

.client-ava{
  width: 110px;
  height:110px;
  float: right;
  margin-right: 15px;
}
</style>
