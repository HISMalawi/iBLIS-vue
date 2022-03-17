import { ref } from "vue";
import { useStore } from "@/store";
import { SpecimenType } from "@/interfaces/SpecimenType";
import TokenCheck from "@/composables/tokenCheck";

const { logout } = TokenCheck()

const store = useStore();

const specimenTypes = ref<SpecimenType[]>([]);

const getSpecimenTypes = () => {

  const axios = ref(store.getters.axios)

  const token = ref(store.getters.user.token)

  const message = ref<string>("");
  const code = ref<string>("");

  const fetchSpecimenTypes = () => {
    axios.value
      .post("/specimen_types", {
        token: token.value,
      })
      .then(function (response: any) {
        if (response.statusText === "OK") {

          if (response.data == "Invalid Token") logout()

          code.value = response.data.code;

          const responseData = response.data.data;

          if (code.value == "200") {

            specimenTypes.value = responseData[0]

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

  return { fetchSpecimenTypes, message, specimenTypes };
};

export default getSpecimenTypes;
