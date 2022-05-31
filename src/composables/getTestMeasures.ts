import { ref } from "vue";
import { useStore } from "@/store";
import TokenCheck from "@/composables/tokenCheck";
import { Measure } from "@/interfaces/Measure";

const { logout } = TokenCheck()

const store = useStore();

const Measures = ref<Measure[]>([]);

const getTestMeasures = () => {

  const axios = ref(store.getters.axios)

  const token = ref(store.getters.user.token)

  const message = ref<string>("");
  const code = ref<string>("");

  const fetchMeasures = (testtype_id: number) => {
    axios.value
      .post("/test/measures", {
        token: token.value,
        testtype_id:testtype_id,
      })
      .then(function (response: any) {
        if (response.statusText === "OK") {

          if (response.data == "Invalid Token") logout()

          code.value = response.data.code;

          const responseData = response.data.data;


          if (code.value == "200") {

            Measures.value = responseData.measures;

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

  return { fetchMeasures, message , Measures };
};

export default getTestMeasures;
