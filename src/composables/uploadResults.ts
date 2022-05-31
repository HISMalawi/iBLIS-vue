import { ref } from "vue";
import { useStore } from "@/store";
import TokenCheck from "@/composables/tokenCheck";
import { Measure } from "@/interfaces/Measure";

const { logout } = TokenCheck()

const store = useStore();

const uploadResults = () => {

  const axios = ref(store.getters.axios)

  const token = ref(store.getters.user.token)

  const message = ref<string>("");
  const code = ref<string>("");

  const upload = (measures: Measure[], accessionNumber: string, test_id: number) => {

    axios.value
      .post("/test/results/upload", {
        token: token.value,
        measures:measures,
        accession_number: accessionNumber,
        test_id: test_id,
        user_id:store.getters.user.id,
      })
      .then(function (response: any) {
        if (response.statusText === "OK") {

          if (response.data == "Invalid Token") logout()

          code.value = response.data.code;


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
 
  return { upload, message, code };
};

export default uploadResults;
