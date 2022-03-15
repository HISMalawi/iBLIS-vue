<template>
  <ion-card class="opt-card">
    <ion-card-content>
      {{btnTitle}}
    </ion-card-content>
  </ion-card>

</template>

<script lang="ts">
import { IonCard, IonCardContent } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { IonCard, IonCardContent },
  props: { 
      btnTitle : {
          type: String,
          required: true
      }
    },
  setup() {

    return { };
  }
});

</script>

<style scoped>

    ion-card {
        /* --background : black; */
    }

    .opt-card {
        flex: 1;
        min-width: 150px;
        height: 80px;
        margin-top: 0px;
    }

</style>