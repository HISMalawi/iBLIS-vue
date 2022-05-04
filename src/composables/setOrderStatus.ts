import { ref } from "vue";
import { useStore } from "@/store";
import TokenCheck from "@/composables/tokenCheck";

const { logout } = TokenCheck()

const store = useStore();

const setOrderStatus = () => {

  const axios = ref(store.getters.axios)

  const token = ref(store.getters.user.token)

  const message = ref<string>("");
  const code = ref<string>("");

  const set = (accession_number: string, status: number) => {
    axios.value
      .post("/order/status", {
        token: token.value,
        accession_number: accession_number,
        status: status,
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

  return { set, message, code };
};

export default setOrderStatus;
