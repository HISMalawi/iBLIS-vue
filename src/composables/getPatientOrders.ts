import { ref } from "vue";
import { useStore } from "@/store";
import { Specimen } from "@/interfaces/Specimen";
import { TestResult } from "@/interfaces/TestResult";
import TokenCheck from "@/composables/tokenCheck";
import { TestUser } from "@/interfaces/TestUser";

const { logout } = TokenCheck();

const store = useStore();

const Specimens = ref<Specimen[]>([]);
const TestWithResults = ref<TestResult[]>([]);
const Tests = ref<TestResult[]>([]);
const Users = ref<TestUser[]>([]);
const SpecimensWithResults = ref<Specimen[]>([]);

const getPatientOrders = () => {
  const axios = ref(store.getters.axios);

  const token = ref(store.getters.user.token);

  const message = ref<string>("");
  const code = ref<string>("");

  const fetchOrders = (patient_id: number) => {
    axios.value
      .post("/patient/orders", {
        token: token.value,
        patient_id: patient_id,
      })
      .then(function (response: any) {
        if (response.statusText === "OK") {
          if (response.data == "Invalid Token") logout();

          code.value = response.data.code;

          const responseData = response.data.data;

          if (code.value == "200") {

            Users.value = responseData.users;

            Tests.value = responseData.tests;

            TestWithResults.value = responseData.tests_with_results;

            Specimens.value = responseData.specimens;

            TestWithResults.value.forEach((test) => {

              Specimens.value.forEach(specimen => {

                if (specimen.id == test.specimen_id) {

                  // UNFINISHED BUSINESS!!!
                  
                    SpecimensWithResults.value.push(specimen);
                    if (SpecimensWithResults.value.length > 1){
                      SpecimensWithResults.value.forEach(sp => {
                        if (sp.id == specimen.id){
                          const index = SpecimensWithResults.value.indexOf(sp)
                          SpecimensWithResults.value.splice(index,1);
                        }
                      })
                    }  
                  
                }
                
              });
              
            });

            Specimens.value.forEach((Specimen) => {
              if (
                store.getters.createdOrders.includes(Specimen.accession_number)
              ) {
                Specimen = Object.assign(Specimen, { class: "is-new" });
              } else {
                Specimen = Object.assign(Specimen, { class: "is-old" });
              }
            });

            message.value = response.data.message;
          } else {
            Specimens.value.length = 0;
            message.value = response.data.message;
          }
        }
      })
      .catch(function (error: any) {
        message.value = error.message;
      });
  };

  return { fetchOrders, Specimens, Tests, Users, TestWithResults, SpecimensWithResults };
};

export default getPatientOrders;
