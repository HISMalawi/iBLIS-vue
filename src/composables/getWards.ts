import { ref } from "vue";
import { useStore } from "@/store";
import { Ward } from "@/interfaces/Ward";
import { VisitType } from "@/interfaces/VisitType";
import TokenCheck from "@/composables/tokenCheck";

const { logout } = TokenCheck()

const store = useStore();

const Wards = ref<Ward[]>([]);

const getWards = () => {

  const axios = ref(store.getters.axios)

  const token = ref(store.getters.user.token)

  const message = ref<string>("");
  const code = ref<string>("");

  const fetchWards = (visit_type: VisitType) => {
    axios.value
      .post("/wards", {
        token: token.value,
        id:visit_type.id,
      })
      .then(function (response: any) {
        if (response.statusText === "OK") {

          if (response.data == "Invalid Token") logout()

          code.value = response.data.code;

          const responseData = response.data.data;


          if (code.value == "200") {

            Wards.value = responseData[0]

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

  return { fetchWards, message, Wards };
};

export default getWards;
