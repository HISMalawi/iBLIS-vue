import { BluetoothSerial } from "@awesome-cordova-plugins/bluetooth-serial/ngx";
import { reactive } from "vue";
import { alertController } from "@ionic/vue";

const printProvider = () => {
  const btSerial: BluetoothSerial = reactive({} as BluetoothSerial);

  const searchPrinters = () => {
    return btSerial.list();
  };

  const connectToPrinter = (address: string) => {
    return btSerial.connect(address);
  };

  const printTestPage = (address: string) => {
    let printData =
      "iBLIS Print Test Page \n\n\n\n Hello ============================ \n\n\n";

    let xyz = connectToPrinter(address).subscribe(
      (data) => {
        btSerial.write(printData).then(
          (dataz) => {
            console.log("WRITE SUCCESS", dataz);

            const AlertExitApp = () => {
              const presentAlert = async () => {
                const alert = await alertController.create({
                  cssClass: "order-status-alert",
                  header: "SUCCESS!",
                  message: "iBLIS is able to print",
                  buttons: [
                    {
                      text: "OK",
                      role: "cancel",
                      cssClass: "secondary",
                    },
                  ],
                });
                await alert.present();
              };

              presentAlert();
            };

            AlertExitApp();

            xyz.unsubscribe();
          },
          (errx) => {
            const AlertExitApp = () => {
              const presentAlert = async () => {
                const alert = await alertController.create({
                  cssClass: "order-status-alert",
                  header: "ERROR!",
                  message: "iBLIS is NOT able to print : " + errx,
                  buttons: [
                    {
                      text: "CANCEL",
                      role: "cancel",
                      cssClass: "secondary",
                    },
                    {
                      text: "RETRY",
                      role: "accept",
                      cssClass: "secondary",
                      handler: () => {
                        AlertExitApp();
                      },
                    },
                  ],
                });
                await alert.present();
              };

              presentAlert();
            };

            AlertExitApp();
          }
        );
      },
      (err) => {
        console.log("CONNECTION ERROR", err);

        const AlertExitApp = () => {
          const presentAlert = async () => {
            const alert = await alertController.create({
              cssClass: "order-status-alert",
              header: "CONNECTION ERROR!",
              message: "iBLIS is NOT able to connect to Printer",
              buttons: [
                {
                  text: "DISMISS",
                  role: "cancel",
                  cssClass: "secondary",
                },
              ],
            });
            await alert.present();
          };

          presentAlert();
        };

        AlertExitApp();
      }
    );
  };

  return {
    searchPrinters,
    connectToPrinter,
    printTestPage,
  };
};

export default printProvider;
