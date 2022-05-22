import { Storage } from "@capacitor/storage";
import { MutationTypes, useStore } from "@/store";
const store = useStore();

const utils = () => {
  const CapitalizeFirstLetter = (string: string) => {
    const input = string;
    const output = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();

    return output;
  };

  const CapitalizeAllFirstLetters = (string: string) => {
    const input = string.toLowerCase();
    const inputArry = input.split(" ");

    for (let index = 0; index < inputArry.length; index++) {
      inputArry[index] =
        inputArry[index].charAt(0).toUpperCase() + inputArry[index].slice(1);
    }

    const output = inputArry.join(" ");

    return output;
  };

  const SetServerAddress = async (address: string | null) => {
    await Storage.set({
      key: "server-address",
      value: `${address}`,
    });

    const axios = require("axios").create({
      baseURL: `${address}`,
      timeout: process.env.VUE_APP_REQUEST_TIMEOUT,
    });

    store.commit(MutationTypes.SET_AXIOS, axios);
  };

  const GetServerAddress = async () => {
    const { value } = await Storage.get({ key: "server-address" });

    return value;
  };

  return {
    CapitalizeFirstLetter,
    CapitalizeAllFirstLetters,
    SetServerAddress,
    GetServerAddress,
  };
};

export default utils;
