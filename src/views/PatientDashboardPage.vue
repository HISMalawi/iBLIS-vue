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
              <ion-col size="10">
                <ion-row>
                  <ion-col size="12">
                    <h1>Client Details</h1>
                  </ion-col>
                  <ion-col size="12">
                    <div class="bolder">
                      <h2>
                        <span class="light-text">Name : {{$store.state.selectedPatient.name + " (" + selectedPatientGender + ")"}}</span>
                      </h2>
                    </div>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col size="12">
                    <div class="bolder">
                      <h2>
                        <span class="light-text">Age : {{$store.state.selectedPatient.age}}</span>
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
            btnTitle="Orders"
            icon="order"
            CusClass="card-3"
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
        </div>
      </div>
    </ion-content>

    <patient-dashboard-footer/>
    
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonCard, IonCardContent, IonCol, IonRow} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import CollapseToolBar from "@/components/CollapseToolBar.vue";
import ToolBar from "@/components/ToolBar.vue";
import PatientDashboardFooter from "@/components/PatientDashboardFooter.vue";
import OptionsCard from "@/components/OptionsCard.vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "PatientDashboardPage",
  components: {
    IonContent,
    IonPage,
    ToolBar,
    CollapseToolBar,
    PatientDashboardFooter,
    OptionsCard, IonCard, IonCardContent, IonCol, IonRow
  },
  setup() {

    const store = useStore();

    let selectedPatientGender: string = store.getters.selectedPatient.gender;

    if (selectedPatientGender == "Female") {

      selectedPatientGender = "F";
      
    } else {

      selectedPatientGender = "M";
      
    }

    const router = useRouter();

    const Navigate = (viewName: string) => {
      switch (viewName) {
        
        case "Orders":
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

    return { Navigate, selectedPatientGender };
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
    order: 3;
  }
}

@media screen and (max-width: 712px) and (max-height: 1138px) {
  .last-option {
    margin-right: auto;
    max-width: 335px;
    min-width: 300px;
    order: 3;
  }
}

#container {
  padding-top: 15px;
}

ion-content {
  --ion-background-color: #eee;
}

.client-info-card{
  margin-bottom: 20px;
}
</style>
