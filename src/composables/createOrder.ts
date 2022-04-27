import { ref } from "vue";
import { MutationTypes, useStore } from "@/store";
import { Order } from "@/interfaces/Order";
import TokenCheck from "@/composables/tokenCheck";

const { logout } = TokenCheck();

const store = useStore();

const createOrder = () => {
  const axios = ref(store.getters.axios);

  const token = ref(store.getters.user.token);

  const message = ref<string>("");
  const code = ref<string>("");
  const zpl = ref<string>("");

  const accessionNumber = ref<string>("");

  const save = (order: Order) => {
    axios.value
      .put("/orders/create", {
        token: token.value,
        order: order,
      })
      .then(function (response: any) {
        if (response.statusText === "OK") {
          if (response.data == "Invalid Token") logout();

          code.value = response.data.code;

          if (code.value == "200") {

            const data = response.data.data;

            accessionNumber.value = data.accessionNumber;

            store.commit(MutationTypes.ADD_ORDER, accessionNumber.value);

            message.value = data.message;

            zplGenerate(
              zpl,
              response.data.zplTestNames,
              store,
              accessionNumber
            );
          } else {
            message.value = response.data.message;
          }
        }
      })
      .catch(function (error: any) {
        message.value = error.message;
      });
  };

  return { save, message, code, accessionNumber, zpl };
};

function zplGenerate(
  zpl: any,
  zplTestNames: any,
  store: any,
  accessionNumber: any
) {
  const gender = store.getters.selectedPatient.gender == 0 ? "M" : "F";
  const patientName = store.getters.selectedPatient.name;
  const patientDOB = store.getters.selectedPatient.dob;
  const ward = store.getters.selectedWard.name;
  zpl.value = `^XA;
  ^FO50,60^ADN,16,10^FD${patientName}(${gender})^FS;
  ^FO50,90^ADN,16,10^FD${patientDOB}^FS;
  ^FO50,120^ADN,16,10^FD${ward}^FS;
  ^FO50, 140 ^BY 2 ^BC , 70, , , , A ^FD${accessionNumber.value}^FS \n`;

  let zplTestXAxis = 50;
  let zplTestYAxis = 250;
  zplTestNames.forEach((test: string) => {
    if (test != null) {
      if (test.length <= 5) {
        zpl.value += `^FO${zplTestXAxis},${zplTestYAxis}^ADN,16,10^FD${test.replaceAll(
          /\s/g,
          ""
        )}^FS \n`;
        zplTestXAxis += 65;
      } else {
        zpl.value += `^FO${zplTestXAxis},${zplTestYAxis}^ADN,16,10^FD${test.replaceAll(
          /\s/g,
          ""
        )}^FS \n`;
        zplTestXAxis = 50;
        zplTestYAxis += 20;
      }
    }
  });
  zpl.value += "^XZ";
}

export default createOrder;
