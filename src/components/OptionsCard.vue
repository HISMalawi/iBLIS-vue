<template>
  <ion-card class="opt-card">
    <ion-card-content class="opt-content">
        
      <ion-row>
        <ion-col col-4></ion-col>
        <ion-col col-4>
          <img
            v-if="icon == 'search'"
            class="opt-img"
            src="../assets/search-icon.png"
          />

          <img
            v-if="icon == 'register'"
            class="opt-img"
            src="../assets/register-icon.png"
          />

          <img
            v-if="icon == 'order'"
            class="opt-img"
            src="../assets/sample-icon.png"
          />

          <img
            v-if="icon == 'results'"
            class="opt-img"
            src="../assets/results-icon.png"
          />

          <img
            v-if="icon == 'pending'"
            class="opt-img"
            src="../assets/pending-icon.png"
          />

          <img
            v-if="icon == 'configurations'"
            class="opt-img"
            src="../assets/configurations-icon.png"
          />

        </ion-col>
        <ion-col col-4></ion-col>
      </ion-row>

      <ion-label>{{ btnTitle }}</ion-label>

    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { IonCard, IonCardContent, IonLabel, IonCol, IonRow} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "OptionsCard",
  components: { IonCard, IonCardContent, IonLabel, IonCol, IonRow },
  props: {
    btnTitle: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  setup() {

    return {};
  },
});
</script>

<style scoped>
.opt-card {
  flex: 1;
  min-width: 160px;
  margin-top: 0px;
}
.opt-content {
  text-align: center;
}

.opt-img {
  width: 60px;
  text-align: center;
  display: block;
  align-self: center;
}
</style>
