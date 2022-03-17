import { MutationTypes, useStore } from "@/store";

const tokenCheck = () => { 

    const store = useStore()

    const logout = () => {

        store.commit(MutationTypes.LOGOUT, true);

    }

    return { logout }
}

export default tokenCheck;