import { BluetoothSerial } from "@awesome-cordova-plugins/bluetooth-serial";
import { ref } from "vue";
import { alertController } from "@ionic/vue";
import { Printer } from "@/interfaces/Printer";
import { useStore } from "@/store";
import Utils from "@/composables/utils";
import iMove3Printer from "@/composables/iMove3Printer";

const store = useStore();

const printProvider = () => {
  const btSerial = BluetoothSerial;
  const printers = ref<Printer[]>([]);

  const { SetDefaultPrinter } = Utils();

  const searchPrinters = () => {
    btSerial.list().then((printerz) => {
      printers.value = printerz;

      printers.value.forEach((printer) => {
        printer = Object.assign(printer, { type: "radio" });
        printer = Object.assign(printer, { label: printer.name });
        printer = Object.assign(printer, { value: printer.id });
        printer = Object.assign(printer, {
          handler: () => {
            SetDefaultPrinter(printer);

          },
        });

        if (printer.id == store.getters.defaultPrinter.id) {
          printer.checked = true;
        }
      });
    });
  };

  const testPrinterConnection = (address: string) => {
    const conn = btSerial.connect(address).subscribe((data) => {
      const feedback = JSON.stringify(data);

      if (feedback == '"OK"') {
        const AlertExitApp = () => {
          const presentAlert = async () => {
            const alert = await alertController.create({
              header: "SUCCESS!",
              message: "Printer Connected",
              buttons: [
                {
                  text: "OK",
                  role: "cancel",
                  cssClass: "secondary",
                  handler: () => {
                    conn.unsubscribe();
                  }
                },
              ],
            });
            await alert.present();
          };

          presentAlert();
        };

        AlertExitApp();
      } else {
        const AlertExitApp = () => {
          const presentAlert = async () => {
            const alert = await alertController.create({
              header: "ERROR!",
              message: JSON.stringify(data),
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
      }
    });
  };

  const connectToPrinter = (address: string) => {
    return btSerial.connect(address);
  };

  const printTestPage = (address: string) => {
    const printData =
      "iBLIS Print Test Page \n\n\n\n Hello ============================ \n\n\n";

    const xyz = connectToPrinter(address).subscribe(
      () => {
        btSerial.write(printData).then(
          (dataz) => {
            console.log("WRITE SUCCESS", dataz);

            const AlertExitApp = () => {
              const presentAlert = async () => {
                const alert = await alertController.create({
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

  const printLabel = (printData: any) => {

    const xyz = connectToPrinter(store.getters.defaultPrinter.address).subscribe(
      () => {
        btSerial.write(printData).then(
          (dataz) => {
            console.log("WRITE SUCCESS", dataz);

            const AlertExitApp = () => {
              const presentAlert = async () => {
                const alert = await alertController.create({
                  header: "SUCCESS!",
                  message: "iBLIS label print successful",
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

  const iMove3 = () => {

    const PrintTest = async () => {

      const { value } = await iMove3Printer.PrintTest({ value: 'Hello World!' });

      const AlertExitApp = () => {
        const presentAlert = async () => {
          const alert = await alertController.create({
            header: "SUCCESS!",
            message: value,
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

    }

    const PrintBarcode = async (accession_number: string) => {

      const { value } = await iMove3Printer.PrintBarcode({ value: accession_number, printer_id: store.getters.defaultPrinter.id });

      const AlertExitApp = () => {
        const presentAlert = async () => {
          const alert = await alertController.create({
            header: "SUCCESS!",
            message: "Label printed for accession number: "+value,
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

    }


    return { PrintTest, PrintBarcode }

  };

  return {
    printers,
    searchPrinters,
    connectToPrinter,
    printTestPage,
    testPrinterConnection,
    printLabel,
    iMove3
  };
};

export default printProvider;
