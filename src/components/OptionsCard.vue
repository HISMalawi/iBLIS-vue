<template>
  <ion-card class="opt-card">
    <ion-card-content class="opt-content">
      <ion-row>
        <ion-col>
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
      </ion-row>

      <ion-label>{{ btnTitle }}</ion-label>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { IonCard, IonCardContent, IonLabel, IonCol, IonRow } from "@ionic/vue";
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
  background-color: white;
}
.opt-content {
  text-align: center;
}

.opt-img {
  height: 60px !important;
  width: auto !important;
  align-items: center;
}

@media screen and (max-width: 1138px) and (max-height: 712px) {
  .opt-card {
    min-width: 300px;
  }
}

@media screen and (max-width: 712px) and (max-height: 1138px) {
  .opt-card {
    min-width: 300px;
  }
}
</style>
