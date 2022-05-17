<template>
  <ion-page>
    
    <tool-bar pageTitle="iBLIS | Pending Orders" defaltBackButtonLink="/home"/>
    
    <ion-content :fullscreen="true">

      <collapse-tool-bar pageTitle="iBLIS | Pending Orders"/>
    
      <div id="container">
        <ion-grid>
          <ion-row>
            <ion-col class="head-col"> Accession #</ion-col>
            <ion-col class="head-col"> Test(s) </ion-col>
            <ion-col class="head-col"> Specimen </ion-col>
            <ion-col class="head-col"> Reason </ion-col>
            <ion-col class="head-col"> Date Ordered </ion-col>
          </ion-row>

          <ion-row
            class="cus-row"
            v-for="Specimen in Specimens"
            :key="Specimen.id"
            :class="Specimen.class"
          >
            <ion-col>
              <ion-row
                ><ion-col>{{ Specimen.accession_number }}</ion-col></ion-row
              >
            </ion-col>
            <ion-col>
              <ion-row v-for="Test in Tests" :key="Test.id">
                <ion-col v-if="Test.specimen_id == Specimen.id">{{
                  Test.test_name
                }}</ion-col>
              </ion-row>
            </ion-col>
            <ion-col>
              <ion-row
                ><ion-col>{{ Specimen.specimen_type }}</ion-col></ion-row
              >
            </ion-col>
            <ion-col>
              <ion-row
                ><ion-col>{{ Specimen.priority }}</ion-col></ion-row
              >
            </ion-col>
            <ion-col>
              <ion-row
                ><ion-col>{{ getDateCollected(Specimen) }}</ion-col>
                </ion-row
              >
            </ion-col>
           
          </ion-row>

          
        </ion-grid>
      </div>

    </ion-content>

    <pending-orders-footer />

  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { defineComponent } from 'vue';
import CollapseToolBar from "@/components/CollapseToolBar.vue"
import ToolBar from "@/components/ToolBar.vue"
import PendingOrdersFooter from "@/components/PendingOrdersFooter.vue"
import GetSiteOrders from "@/composables/getSiteOrders";
import { Specimen } from "@/interfaces/Specimen";
// import SetOrderStatus from "@/composables/setOrderStatus";

export default defineComponent({
  name: 'PendingOrdersPage',
  components: {
    IonContent,
    IonPage,
    ToolBar,
    CollapseToolBar,
    PendingOrdersFooter,
    IonGrid, IonRow, IonCol,
  },
  setup(){

    // const { set } = SetOrderStatus();

    const getDateCollected = (Specimen: Specimen) => {

      let date_time: string = Specimen.date_of_collection;

      return date_time.substring(0, 10);
    };

    const { fetchOrders, Specimens, Tests } = GetSiteOrders();

    fetchOrders();

    // const ChangeStatus = (Specimen: Specimen) => {

    //   const presentAlert  = async () => {
    //   const alert = await alertController
    //     .create({
    //       cssClass: 'order-status-alert',
    //       header: 'Update Order Status',
    //       subHeader: Specimen.accession_number,
    //       message: 'This is an alert message.',
    //       buttons: [
    //         {
    //           text: 'CANCEL',
    //           role: 'cancel',
    //           cssClass: 'secondary',
    //         },
    //         {
    //           text: 'REJECT',
    //           role: 'reject',
    //           cssClass: 'secondary',
    //           handler: () => {
    //             set(Specimen.accession_number, 3);
    //             fetchOrders();
    //           },
    //         },
    //         {
    //           text: 'ACCEPT',
    //           role: 'accept',
    //           cssClass: 'secondary',
    //           handler: () => {
    //             set(Specimen.accession_number, 2);
    //             fetchOrders();
    //           },
    //         },
    //       ],
    //     });
    //   await alert.present();

    // }

    //   presentAlert();

    // }
   
    return { Specimens, Tests, getDateCollected }
  }
});
</script>

<style scoped>

ion-content {
  --ion-background-color: #eee;
}

.head-col {
  text-align: left;
  background: #ffffe2;
  border-left: solid 1px rgb(202, 201, 201);
  color: black;
}

ion-col {
  color: black;
}

.is-new{
  background-color: rgba(61, 231, 146, 0.281) !important;
}

.cus-row {
  border-bottom: solid 1px rgb(202, 201, 201);
}

.order-status-alert {
  --width: 200px;
  --min-width: 200px;
}
</style>
