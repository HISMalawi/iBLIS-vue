import { ref } from "vue";
import { useStore } from "@/store";
import { Test } from "@/interfaces/Test";
import TokenCheck from "@/composables/tokenCheck";

const { logout } = TokenCheck()

const store = useStore();

const Tests = ref<Test[]>([]);

const getTests = () => {

  const axios = ref(store.getters.axios)

  const token = ref(store.getters.user.token)

  const message = ref<string>("");
  const code = ref<string>("");

  const fetchTests = (specimen_type_id: number) => {
    axios.value
      .post("/tests", {
        token: token.value,
        specimen_type_id:specimen_type_id,
      })
      .then(function (response: any) {
        if (response.statusText === "OK") {

          if (response.data == "Invalid Token") logout()

          code.value = response.data.code;

          const responseData = response.data.data;


          if (code.value == "200") {

            Tests.value = responseData[0]

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

  return { fetchTests, message, Tests };
};

export default getTests;
