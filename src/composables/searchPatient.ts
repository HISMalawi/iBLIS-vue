import { ref, watch } from "vue";
import { MutationTypes, useStore } from "@/store";
import { Patient } from "@/interfaces/Patient";
import TokenCheck from "@/composables/tokenCheck";

const { logout } = TokenCheck()

const store = useStore();

const patients = ref<Patient[]>([]);

const message = ref<string>("");

const code = ref<string>("");

watch(
  () => [patients.value],
  () => {
    
    setTimeout(()=> {

      store.commit(MutationTypes.SEARCH_PATIENT_IN_PROGRESS, false);

    }, 1500)
  }
);

const SearchPatient = () => {

  const axios = ref(store.getters.axios)

  const token = ref(store.getters.user.token)

  const search = (value: string) => {
    axios.value
      .post("/patients/search", {
        token: token.value,
        value: value
      })
      .then(function (response: any) {
        if (response.statusText === "OK") {

          if (response.data == "Invalid Token") logout()

          code.value = response.data.code;

          const responseData = response.data.data;

          if (code.value == "200") {

            patients.value = responseData[0]


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
  
  return { search, message, patients, code };
};

export default SearchPatient;
