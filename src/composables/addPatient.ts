import { ref } from "vue";
import { useStore } from "@/store";
import { PatientReg } from "@/interfaces/PatientReg";
import TokenCheck from "@/composables/tokenCheck";

const { logout } = TokenCheck()

const store = useStore();

const addPatient = () => {

  const axios = ref(store.getters.axios)

  const token = ref(store.getters.user.token)

  const message = ref<string>("");
  const code = ref<string>("");

  const save = (patient: PatientReg) => {
    axios.value
      .put("/patients/register", {
        token: token.value,
        patient:patient,
      })
      .then(function (response: any) {
        if (response.statusText === "OK") {

          if (response.data == "Invalid Token") logout()

          code.value = response.data.code;

          const responseData = response.data.data;


          if (code.value == "200") {

            message.value = response.data.message;

          } else {

            message.value = response.data.message;

          }

        }
      })
      .catch(function (error: any) {
        message.value = error.message;
      });
  };

  return { save, code, message};
};

export default addPatient;