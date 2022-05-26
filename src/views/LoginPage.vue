<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-fab vertical="bottom" horizontal="start" slot="fixed">
        <ion-fab-button color="light" @click="NavigateToConfigurations">
          <ion-icon :icon="settingsOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <div id="container">
        <div id="flex-container">
          <ion-card class="login-card">
            <ion-card-content class="login-content">
              <ion-row>
                <ion-col class="login-avatar-col">
                  <img
                    class="login-avatar"
                    src="../assets/user-avater-icon.png"
                  />
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                  <ion-item class="custom-item">
                    <ion-label position="floating">Username</ion-label>
                    <ion-input v-model="authCred.username"></ion-input>
                  </ion-item>
                </ion-col>
              </ion-row>

              <ion-row>
                <ion-col>
                  <ion-item>
                    <ion-label position="floating">Password</ion-label>
                    <ion-input
                      type="password"
                      v-model="authCred.password"
                    ></ion-input>
                  </ion-item>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col class="error-msgs-col">
                  <ion-item>
                    <ion-label>Ward / Location</ion-label>
                    <ion-select v-model="selectedWard">
                      <ion-select-option
                        :value="ward"
                        v-for="ward in Wards"
                        :key="ward.id"
                        >{{ ward.name }}</ion-select-option
                      >
                    </ion-select>
                  </ion-item>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col class="error-msgs-col">
                  <ion-label class="error-msgs-label">{{ message }}</ion-label>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                  <ion-button expand="block" @click="Signin">Login</ion-button>
                </ion-col>
              </ion-row>
            </ion-card-content>
          </ion-card>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardContent,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonFab,
  IonFabButton,
  IonIcon,
  alertController
} from "@ionic/vue";
import { defineComponent, reactive, ref, watch, watchEffect } from "vue";
import { AuthRequest } from "@/interfaces/AuthRequest";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import Authenticate from "@/composables/authenticate";
import GetAllWards from "@/composables/getAllWards";
import { Ward } from "@/interfaces/Ward";
import { settingsOutline } from "ionicons/icons";

export default defineComponent({
  name: "LoginPage",
  components: {
    IonContent,
    IonPage,
    IonCard,
    IonCardContent,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonFab,
    IonFabButton,
    IonIcon,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const selectedWard = ref<Ward>({
      id: 0,
      name: "--- Select ---",
    });

    const { Wards, fetchWards } = GetAllWards();

    fetchWards();

    const { login, message } = Authenticate();

    const authCred: AuthRequest = reactive({
      username: "",
      password: "",
    });

    const Signin = () => {
      if (authCred.username == "") {
        message.value = "Username is required";
      } else if (authCred.password == "") {
        message.value = "Password is required";
      } else if (selectedWard.value.id == 0) {
        message.value = "Requesting Ward / Location is required";
      } else {
        login(authCred, selectedWard.value);
      }
    };

    const NavigateToConfigurations = () => {
      router.push({ name: "Configurations", replace: true });
    };


    watchEffect(() => {
      if (store.getters.isLoggedIn) {
        router.push({ name: "Home", replace: true });
      }
    });

    watch(
      () => [selectedWard.value],
      () => {
        message.value = "";
      }
    );

    watch(
      () => [authCred.username],
      () => {
        message.value = "";
      }
    );

    watch(
      () => [authCred.password],
      () => {
        message.value = "";
      }
    );

    return { authCred, Signin, message, Wards, selectedWard, settingsOutline , NavigateToConfigurations};
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

#container {
  padding-top: 15px;
}

ion-content {
  --ion-background-color: #eee;
}
.login-card {
  width: 400px;
  margin-top: 6%;
  padding: 10px;
  background-color: white;
}
.login-avatar {
  height: 140px;
  width: auto;
  align-items: center;
  align-self: center;
  border-radius: 10px;
}
.login-avatar-col {
  text-align: center;
}
.error-msgs-col {
  text-align: center;
}
.error-msgs-label {
  color: rgb(201, 19, 19);
}
</style>
