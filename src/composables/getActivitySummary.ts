import { ref } from "vue";
import { useStore } from "@/store";
import TokenCheck from "@/composables/tokenCheck";

const { logout } = TokenCheck()

const store = useStore();

const getActivitySummary = () => {

  const axios = ref(store.getters.axios)
  const message = ref<string>("");
  const code = ref<string>("");

  const token = ref(store.getters.user.token)

  const ward = ref(store.getters.selectedWard.name)

  const pending_orders = ref<string>("--");

  const rejected_orders = ref<string>("--");

  const authorized_results = ref<string>("--");

  const fetchSummary = (fromDate: string, toDate : string) => {
    axios.value
      .post("/activity/summary", {
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

            pending_orders.value = responseData.pending_orders;

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

  return { fetchSummary, pending_orders, rejected_orders, authorized_results, message };
};

export default getActivitySummary;
