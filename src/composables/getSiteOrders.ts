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
const Patients = ref<PatientDash[]>([]);
const Tests = ref<TestResult[]>([]);

const BGSpecimens = ref<Specimen[]>([]);
const BGTestWithResults = ref<TestResult[]>([]);
const BGSpecimensWithResults = ref<number[]>([]);
const BGPatients = ref<PatientDash[]>([]);
const BGTests = ref<TestResult[]>([]);

const getSiteOrders = () => {

  const axios = ref(store.getters.axios)

  const token = ref(store.getters.user.token)

  const ward = ref(store.getters.selectedWard.name)

  const message = ref<string>("");
  const code = ref<string>("");

  const fetchOrders = () => {

    axios.value
      .post("/ward/orders", {
        token: token.value,
        ward:ward.value,
        from:store.getters.fromDate,
        to:store.getters.toDate
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

  const BGfetchOrders = () => {

    axios.value
      .post("/ward/orders", {
        token: token.value,
        ward:ward.value,
        from:store.getters.fromDate,
        to:store.getters.toDate
      })
      .then(function (response: any) {
        if (response.statusText === "OK") {

          if (response.data == "Invalid Token") logout()

          code.value = response.data.code;

          const responseData = response.data.data;


          if (code.value == "200") {

            BGTestWithResults.value = responseData.tests_with_results

            BGTests.value = responseData.tests_with_details

            BGTests.value.forEach(test => {

              BGTestWithResults.value.forEach(result_test => {

                if (test.id == result_test.id) {

                    test = Object.assign(test, { class:"has"})
                  
                } 

              });

            });

            BGTestWithResults.value.forEach(test => {

              BGSpecimensWithResults.value.push(test.specimen_id)
              
            });


            BGSpecimens.value = responseData.specimens

            BGPatients.value = responseData.patients


            for (let index = 0; index < BGSpecimens.value.length; index++) {

              if (BGSpecimensWithResults.value.includes(BGSpecimens.value[index].id)) {

                  BGSpecimens.value[index] = Object.assign(BGSpecimens.value[index], { class:"results-ready"})
              
              } else {

                BGSpecimens.value[index] = Object.assign(BGSpecimens.value[index], { class:"from-db"})
                
              }
              
            }

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
 

  setInterval(() => {

      BGfetchOrders();


  }, 10000);

  watch(

      () => [BGSpecimens.value],
      () => {

          Patients.value = BGPatients.value
          Tests.value = BGTests.value
          // Specimens.value = BGSpecimens.value
          // BGfetchOrders();

          if (store.getters.resultsFilter == "With Results") {
            Specimens.value = filterWithResults()

            if (store.getters.patientFilter.length > 0) Specimens.value = filterPatient()

          } else if (store.getters.resultsFilter == "Without Results") {
            Specimens.value = filterWithoutResults()

            if (store.getters.patientFilter.length > 0) Specimens.value = filterPatient()

          } else if (store.getters.resultsFilter == "All") {
            Specimens.value = filterAllResults()

            if (store.getters.patientFilter.length > 0) Specimens.value = filterPatient()
            
          }


      }
  );

  watch(

    () => [store.getters.fromDate],
    () => {

      Specimens.value.length = 0

      BGfetchOrders();

    }
);

watch(

  () => [store.getters.toDate],
  () => {

    Specimens.value.length = 0

    BGfetchOrders();

  }
);

const filterAllResults = () => {
  
  return BGSpecimens.value
}


const filterWithResults = () => {
  
  return BGSpecimens.value.filter((specimen) => BGSpecimensWithResults.value.includes(specimen.id))
}

const filterWithoutResults = () => {

  return BGSpecimens.value.filter((specimen) => !BGSpecimensWithResults.value.includes(specimen.id))
}

const filterPatient = () => {

  let patients :PatientDash[] = []

  patients = Patients.value.filter((pat) => pat.name.toLowerCase() == store.getters.patientFilter.toLowerCase())

  let specimen_ids: number[] = []

  patients.forEach(patient => {

    if (!specimen_ids.includes(patient.specimen_id)) {

      specimen_ids.push(patient.specimen_id)

    }
    
  });

  return BGSpecimens.value.filter((specimen) => specimen_ids.includes(specimen.id))
}

watch(
  () => [store.getters.resultsFilter],
  () => {
    if (store.getters.resultsFilter == "With Results") {
      Specimens.value = filterWithResults()

      if (store.getters.patientFilter.length > 0) Specimens.value = filterPatient()

    } else if (store.getters.resultsFilter == "Without Results") {
      Specimens.value = filterWithoutResults()

      if (store.getters.patientFilter.length > 0) Specimens.value = filterPatient()

    } else if (store.getters.resultsFilter == "All") {
      Specimens.value = filterAllResults()

      if (store.getters.patientFilter.length > 0) Specimens.value = filterPatient()
    }
  }
);

watch(
  () => [store.getters.patientFilter],
  () => {

    if (store.getters.patientFilter.length > 0){

      Specimens.value = filterPatient()

    } else {

      BGfetchOrders();

    }    
    
  }
);

  return { fetchOrders, BGfetchOrders, Specimens, Patients, Tests, BGSpecimensWithResults };
};

export default getSiteOrders;
