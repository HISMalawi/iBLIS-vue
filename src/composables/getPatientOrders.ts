import { ref, watch } from "vue";
import { useStore } from "@/store";
import { Specimen } from "@/interfaces/Specimen";
import { TestResult } from "@/interfaces/TestResult";
import TokenCheck from "@/composables/tokenCheck";
import { PatientDash } from "@/interfaces/PatientDash";

const { logout } = TokenCheck()

const store = useStore();

const Specimens = ref<Specimen[]>([]);
const TestWithResults = ref<TestResult[]>([]);
const SpecimensWithResults = ref<number[]>([]);


const getPatientOrders = () => {

  const axios = ref(store.getters.axios)

  const token = ref(store.getters.user.token)

  const message = ref<string>("");
  const code = ref<string>("");

  const fetchOrders = (patient_id: number) => {

    axios.value
      .post("/patient/orders", {
        token: token.value,
        patient_id:patient_id
      })
      .then(function (response: any) {
        if (response.statusText === "OK") {

          if (response.data == "Invalid Token") logout()

          code.value = response.data.code;

          const responseData = response.data.data;


          if (code.value == "200") {

            TestWithResults.value = responseData.tests_with_results

            TestWithResults.value.forEach(test => {

              SpecimensWithResults.value.push(test.specimen_id)
              
            });

            Specimens.value = responseData.specimens

            for (let index = 0; index < Specimens.value.length; index++) {

              if (SpecimensWithResults.value.includes(Specimens.value[index].id)) {

                  Specimens.value[index] = Object.assign(Specimens.value[index], { class:"results-ready"})
              
              } else {

                Specimens.value[index] = Object.assign(Specimens.value[index], { class:"from-db"})
                
              }
              
              
            }

            message.value = response.data.message;

          } else {

            Specimens.value.length = 0
            message.value = response.data.message;
          }

        }
      })
      .catch(function (error: any) {
        message.value = error.message;
      });
  };
 
  return { fetchOrders, Specimens };
};

export default getPatientOrders;
