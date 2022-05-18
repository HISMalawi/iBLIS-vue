import { ref } from "vue";
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
const Patients = ref<PatientDash[]>([]);
const Tests = ref<TestResult[]>([]);


const getSiteOrders = () => {

  const axios = ref(store.getters.axios)

  const token = ref(store.getters.user.token)

  const ward = ref(store.getters.selectedWard.name)

  const message = ref<string>("");
  const code = ref<string>("");

  const fetchOrders = (fromDate: string, toDate : string) => {

    axios.value
      .post("/ward/pending/orders", {
        token: token.value,
        ward:ward.value,
        from: fromDate,
        to: toDate,
      })
      .then(function (response: any) {
        if (response.statusText === "OK") {

          if (response.data == "Invalid Token") logout()

          code.value = response.data.code;

          const responseData = response.data.data;


          if (code.value == "200") {

            TestWithResults.value = responseData.tests_with_results

            Tests.value = responseData.tests_with_details

            Tests.value.forEach(test => {

              TestWithResults.value.forEach(result_test => {

                if (test.id == result_test.id) {

                    test = Object.assign(test, { class:"has"})
                  
                } 

              });

            });

            TestWithResults.value.forEach(test => {

              SpecimensWithResults.value.push(test.specimen_id)
              
            });

            Specimens.value = responseData.specimens

            Patients.value = responseData.patients

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


  return { fetchOrders, Specimens, Patients, Tests };
};

export default getSiteOrders;
