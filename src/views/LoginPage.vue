<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <div id="flex-container">
          <ion-card class="login-card" @click="Navigate(btnTitle)">
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
                  <ion-item>
                    <ion-label position="floating">Username</ion-label>
                    <ion-input></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-label position="floating">Password</ion-label>
                    <ion-input></ion-input>
                  </ion-item>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>

                  <ion-button expand="block">Login</ion-button>
                  
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
  IonInput
} from "@ionic/vue";
import { defineComponent } from "vue";

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
    IonInput
  },
  setup() {
    return {};
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
  margin-top: 8%;
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
</style>
