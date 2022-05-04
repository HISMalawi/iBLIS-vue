<template>
  <ion-content>
      <ion-list>
        <ion-item :button="true" :detail="false">
          <ion-label>Profile</ion-label>
        </ion-item>
        <ion-item @click="LogOut" :button="true" :detail="false">
          <ion-label>Log Out</ion-label>
        </ion-item>
      </ion-list>
  </ion-content>
</template>

<script>
import { IonContent, IonList, IonItem, IonLabel } from '@ionic/vue';
import { defineComponent } from 'vue';
import TokenCheck from "@/composables/tokenCheck";

export default defineComponent({
  name: 'ToolBarOptions',
  components: { 
      IonContent,
      IonList, IonItem, IonLabel
  },
  setup() {

      const { logout } = TokenCheck();

      const LogOut = () => {

          logout();

      }

      return { LogOut }
  }
});
</script>