import { ref } from "vue";
import { useStore } from "@/store";
import { TestResults } from "@/interfaces/TestResults";
import TokenCheck from "@/composables/tokenCheck";

const { logout } = TokenCheck()

const store = useStore();

const Results = ref<TestResults[]>([]);

const getTestResults = () => {

  const axios = ref(store.getters.axios)

  const token = ref(store.getters.user.token)

  const message = ref<string>("");
  const code = ref<string>("");

  const fetchTestResults = (test_id: number) => {

    axios.value
      .post("/test/results", {
        token: token.value,
        test_id:test_id,
      })
      .then(function (response: any) {
        if (response.statusText === "OK") {

          if (response.data == "Invalid Token") logout()

          code.value = response.data.code;

          const responseData = response.data.data;


          if (code.value == "200") {

            Results.value = responseData[0]

            message.value = response.data.message;

          } else {

            Results.value.length = 0
            message.value = response.data.message;
          }

        }
      })
      .catch(function (error: any) {
        message.value = error.message;
      });
  };
 
  return { fetchTestResults, message, Results, code };
};

export default getTestResults;
