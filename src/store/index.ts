import {
  Store as VuexStore,
  ActionContext,
  ActionTree,
  createStore,
  GetterTree,
  MutationTree,
  DispatchOptions,
  CommitOptions,
} from "vuex";
import { User } from "@/interfaces/User";
import { Axios } from "axios";
import { Patient } from "@/interfaces/Patient";
import { TestResult } from "@/interfaces/TestResult";
import { Ward } from "@/interfaces/Ward";
import { reactive } from "vue";
import { SearchClient } from "@/interfaces/SearchClient";
import { Specimen } from "@/interfaces/Specimen";

const axios = require("axios").create({
  baseURL: process.env.VUE_APP_SERVICE_BASE_URL,
  timeout: process.env.VUE_APP_REQUEST_TIMEOUT,
});

const user: User = reactive({} as User);

const test: TestResult = reactive({} as TestResult);

const searchClient: SearchClient = reactive({} as SearchClient);

const selectedWard: Ward = reactive({} as Ward);

const selectedSpecimen: Specimen = reactive({} as Specimen);

const createdOrdersTrackingNum: string[] = [];

const patient: Patient = reactive({} as Patient);

export type State = {
  lockTimeOut:number,
  patientFilter: string,
  resultsFilter: string,
  fromDate: string;
  toDate: string;
  counter: number;
  registeringPatient: boolean;
  viewingOrders: boolean;
  searchingPatient: boolean;
  viewingPatient: boolean;
  viewingPatientDetails: boolean;
  viewingTestResults: boolean;
  createPatientOrder: boolean;
  viewingPatientPreviousOrders: boolean;
  viewingDashboard: boolean;
  user: User;
  loggedIn: boolean;
  axios: Axios;
  selectedPatient: Patient;
  selectedTest: TestResult;
  searchingInProgress: boolean;
  selectedWard: Ward;
  searchClient: SearchClient;
  previousLink: string;
  createdOrdersTrackingNum: string[];
  selectedSpecimen: Specimen;
};

const state: State = {
  lockTimeOut:process.env.VUE_APP_TIMEOUT_IN_SECONDS * 1000,
  patientFilter: "",
  resultsFilter: "",
  fromDate: "",
  toDate: "",
  counter: 0,
  registeringPatient: false,
  viewingOrders: false,
  searchingPatient: false,
  viewingPatient: false,
  viewingPatientDetails: true,
  viewingTestResults: false,
  createPatientOrder: false,
  viewingPatientPreviousOrders: false,
  viewingDashboard: true,
  user: user,
  loggedIn: false,
  axios: axios,
  selectedPatient: patient,
  selectedTest: test,
  searchingInProgress: false,
  selectedWard: selectedWard,
  searchClient: searchClient,
  previousLink: "#",
  createdOrdersTrackingNum: createdOrdersTrackingNum,
  selectedSpecimen: selectedSpecimen,
};

export enum MutationTypes {
  SET_LOCK_TIMEOUT = "SETTING_LOCK_TIMEOUT",
  SET_AXIOS = "SETTING_AXIOS",
  SET_PATIENT_FILTER = "SETTING_PATIENT_FILTER",
  SET_RESULTS_FILTER = "SETTING_RESULTS_FILTER",
  SET_FROM_DATE = "SETTING_FROM_DATE",
  SET_TO_DATE = "SETTING_TO_DATE",
  INC_COUNTER = "SET_COUNTER",
  LOGIN = "LOGIN_USER",
  LOGOUT = "LOGOUT_USER",
  SEARCH_PATIENT = "SEARCHING_PATIENT",
  VIEW_PATIENT = "VIEWING_PATIENT",
  REGISTER_PATIENT = "REGISTERING_PATIENT",
  VIEW_ORDERS = "VIEWING_ORDERS",
  VIEW_DASHBOARD = "VIEWING_DASHBOARD",
  VIEW_TEST_RESULTS = "VIEWING_TEST_RESULTS",
  OPEN_PATIENT_DETAILS = "OPENING_PATIENT_DETAILS",
  OPEN_PATIENT_PLACE_ORDER = "OPENING_PATIENT_PLACE_ORDER",
  VIEW_PATIENT_PREVIOUS_ORDERS = "VIEWING_PATIENT_PREVIOUS_ORDERS",
  SET_SELECTED_PATIENT = "SETTING_SELECTED_PATIENT",
  SET_SELECTED_TEST = "SETTING_SELECTED_TEST",
  SEARCH_PATIENT_IN_PROGRESS = "SEARCHING_PATIENT_IN_PROGRESS",
  SET_SELECTED_WARD = "SETTING_SELECTED_WARD",
  SET_SEARCH_CLIENT = "SETTING_SEARCH_CLIENT",
  SET_PREVIOUS_LINK = "SETTING_PREVIOUS_LINK",
  ADD_ORDER = "ADDING_ORDER",
  CLEAR_ORDER = "CLEARING_ORDERS",
  SET_SELECTED_SPECIMEN = "SETTING_SELECTED_SPECIMEN"
}

export enum ActionTypes {
  SET_LOCK_TIMEOUT = "SETTING_LOCK_TIMEOUT",
  SET_AXIOS = "SETTING_AXIOS",
  SET_PATIENT_FILTER = "SETTING_PATIENT_FILTER",
  SET_RESULTS_FILTER = "SETTING_RESULTS_FILTER",
  SET_FROM_DATE = "SETTING_FROM_DATE",
  SET_TO_DATE = "SETTING_TO_DATE",
  INC_COUNTER = "SET_COUNTER",
  LOGIN = "LOGIN_USER",
  LOGOUT = "LOGOUT_USER",
  SEARCH_PATIENT = "SEARCHING_PATIENT",
  VIEW_PATIENT = "VIEWING_PATIENT",
  REGISTER_PATIENT = "REGISTERING_PATIENT",
  VIEW_ORDERS = "VIEWING_ORDERS",
  VIEW_DASHBOARD = "VIEWING_DASHBOARD",
  VIEW_TEST_RESULTS = "VIEWING_TEST_RESULTS",
  OPEN_PATIENT_DETAILS = "OPENING_PATIENT_DETAILS",
  OPEN_PATIENT_PLACE_ORDER = "OPENING_PATIENT_PLACE_ORDER",
  VIEW_PATIENT_PREVIOUS_ORDERS = "VIEWING_PATIENT_PREVIOUS_ORDERS",
  SET_SELECTED_PATIENT = "SETTING_SELECTED_PATIENT",
  SET_SELECTED_TEST = "SETTING_SELECTED_TEST",
  SEARCH_PATIENT_IN_PROGRESS = "SEARCHING_PATIENT_IN_PROGRESS",
  SET_SELECTED_WARD = "SETTING_SELECTED_WARD",
  SET_SEARCH_CLIENT = "SETTING_SEARCH_CLIENT",
  SET_PREVIOUS_LINK = "SETTING_PREVIOUS_LINK",
  ADD_ORDER = "ADDING_ORDER",
  CLEAR_ORDER = "CLEARING_ORDERS",
  SET_SELECTED_SPECIMEN = "SETTING_SELECTED_SPECIMEN"
}

export type Mutations<S = State> = {
  [MutationTypes.SET_LOCK_TIMEOUT](state: S, payload: number): void;
  [MutationTypes.SET_AXIOS](state: S, payload: Axios): void;
  [MutationTypes.SET_PATIENT_FILTER](state: S, payload: string): void;
  [MutationTypes.SET_RESULTS_FILTER](state: S, payload: string): void;
  [MutationTypes.SET_FROM_DATE](state: S, payload: string): void;
  [MutationTypes.SET_TO_DATE](state: S, payload: string): void;
  [MutationTypes.INC_COUNTER](state: S, payload: number): void;
  [MutationTypes.LOGIN](state: S, payload: User): void;
  [MutationTypes.LOGOUT](state: S, payload: boolean): void;
  [MutationTypes.SEARCH_PATIENT](state: S, payload: boolean): void;
  [MutationTypes.VIEW_PATIENT](state: S, payload: boolean): void;
  [MutationTypes.REGISTER_PATIENT](state: S, payload: boolean): void;
  [MutationTypes.VIEW_ORDERS](state: S, payload: boolean): void;
  [MutationTypes.VIEW_DASHBOARD](state: S, payload: boolean): void;
  [MutationTypes.VIEW_TEST_RESULTS](state: S, payload: boolean): void;
  [MutationTypes.OPEN_PATIENT_DETAILS](state: S, payload: boolean): void;
  [MutationTypes.OPEN_PATIENT_PLACE_ORDER](state: S, payload: boolean): void;
  [MutationTypes.VIEW_PATIENT_PREVIOUS_ORDERS](state: S, payload: boolean): void;
  [MutationTypes.SET_SELECTED_PATIENT](state: S, payload: Patient): void;
  [MutationTypes.SET_SELECTED_TEST](state: S, payload: TestResult): void;
  [MutationTypes.SEARCH_PATIENT_IN_PROGRESS](state: S, payload: boolean): void;
  [MutationTypes.SET_SELECTED_WARD](state: S, payload: Ward): void;
  [MutationTypes.SET_SEARCH_CLIENT](state: S, payload: SearchClient): void;
  [MutationTypes.SET_PREVIOUS_LINK](state: S, payload: string): void;
  [MutationTypes.ADD_ORDER](state: S, payload: string): void;
  [MutationTypes.CLEAR_ORDER](state: S, payload: string): void;
  [MutationTypes.SET_SELECTED_SPECIMEN](state: S, payload: Specimen): void;
};

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_LOCK_TIMEOUT](state: State, payload: number) {
    state.lockTimeOut = payload * 1000;
  },
  [MutationTypes.SET_AXIOS](state: State, payload: Axios) {
    state.axios = payload;
  },
  [MutationTypes.SET_PATIENT_FILTER](state: State, payload: string) {
    state.patientFilter = payload;
  },
  [MutationTypes.SET_RESULTS_FILTER](state: State, payload: string) {
    state.resultsFilter = payload;
  },
  [MutationTypes.SET_FROM_DATE](state: State, payload: string) {
    state.fromDate = payload;
  },
  [MutationTypes.SET_TO_DATE](state: State, payload: string) {
    state.toDate = payload;
  },
  [MutationTypes.INC_COUNTER](state: State, payload: number) {
    state.counter += payload;
  },
  [MutationTypes.LOGIN](state: State, payload: User) {
    state.user = payload;
    state.loggedIn = true;
  },
  [MutationTypes.LOGOUT](state: State, payload: boolean) {
    state.user = user;
    state.loggedIn = !payload;
  },
  [MutationTypes.SEARCH_PATIENT](state: State, payload: boolean) {
    state.searchingPatient = payload;
  },
  [MutationTypes.VIEW_PATIENT](state: State, payload: boolean) {
    state.viewingPatient = payload;
  },
  [MutationTypes.VIEW_DASHBOARD](state: State, payload: boolean) {
    state.viewingDashboard = payload;
  },
  [MutationTypes.VIEW_TEST_RESULTS](state: State, payload: boolean) {
    state.viewingTestResults = payload;
  },
  [MutationTypes.REGISTER_PATIENT](state: State, payload: boolean) {
    state.registeringPatient = payload;
  },
  [MutationTypes.VIEW_ORDERS](state: State, payload: boolean) {
    state.viewingOrders = payload;
  },
  [MutationTypes.OPEN_PATIENT_DETAILS](state: State, payload: boolean) {
    state.viewingPatientDetails = payload;
  },
  [MutationTypes.OPEN_PATIENT_PLACE_ORDER](state: State, payload: boolean) {
    state.createPatientOrder = payload;
  },
  [MutationTypes.VIEW_PATIENT_PREVIOUS_ORDERS](state: State, payload: boolean) {
    state.viewingPatientPreviousOrders = payload;
  },
  [MutationTypes.SET_SELECTED_PATIENT](state: State, payload: Patient) {
    state.selectedPatient = payload;
  },
  [MutationTypes.SET_SELECTED_TEST](state: State, payload: TestResult) {
    state.selectedTest = payload;
  },
  [MutationTypes.SEARCH_PATIENT_IN_PROGRESS](state: State, payload: boolean) {
    state.searchingInProgress = payload;
  },
  [MutationTypes.SET_SELECTED_WARD](state: State, payload: Ward) {
    state.selectedWard = payload;
  },
  [MutationTypes.SET_SEARCH_CLIENT](state: State, payload: SearchClient) {
    state.searchClient = payload;
  },
  [MutationTypes.SET_PREVIOUS_LINK](state: State, payload: string) {
    state.previousLink = payload;
  },
  [MutationTypes.ADD_ORDER](state: State, payload: string) {
    state.createdOrdersTrackingNum.push(payload);
  },
  [MutationTypes.CLEAR_ORDER](state: State, payload: string) {

    if (payload) {

      state.createdOrdersTrackingNum.length = 0;
      
    }
    
  },
  [MutationTypes.SET_SELECTED_SPECIMEN](state: State, payload: Specimen) {
    state.selectedSpecimen = payload;
  },
};

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

export interface Actions {
  [ActionTypes.SET_LOCK_TIMEOUT]({ commit }: AugmentedActionContext, payload: number): void;

  [ActionTypes.SET_PATIENT_FILTER]({ commit }: AugmentedActionContext, payload: string): void;

  [ActionTypes.SET_RESULTS_FILTER]({ commit }: AugmentedActionContext, payload: string): void;

  [ActionTypes.SET_FROM_DATE]({ commit }: AugmentedActionContext, payload: string): void;

  [ActionTypes.SET_TO_DATE]({ commit }: AugmentedActionContext, payload: string): void;

  [ActionTypes.INC_COUNTER]({ commit }: AugmentedActionContext, payload: number): void;

  [ActionTypes.LOGIN]({ commit }: AugmentedActionContext, payload: User): void;

  [ActionTypes.LOGOUT]({ commit }: AugmentedActionContext, payload: boolean): void;

  [ActionTypes.SET_SELECTED_PATIENT]({ commit }: AugmentedActionContext, payload: Patient): void;

  [ActionTypes.SET_SELECTED_TEST]({ commit }: AugmentedActionContext, payload: TestResult): void;

  [ActionTypes.SET_SELECTED_WARD]({ commit }: AugmentedActionContext, payload: Ward): void;

  [ActionTypes.SET_SEARCH_CLIENT]({ commit }: AugmentedActionContext, payload: SearchClient): void;

  [ActionTypes.SET_PREVIOUS_LINK]({ commit }: AugmentedActionContext, payload: string): void;

  [ActionTypes.ADD_ORDER]({ commit }: AugmentedActionContext, payload: string): void;

  [ActionTypes.SET_SELECTED_SPECIMEN]({ commit }: AugmentedActionContext, payload: Specimen): void;
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.SET_LOCK_TIMEOUT]({ commit }, payload: number) {
    commit(MutationTypes.SET_LOCK_TIMEOUT, payload);
  },
  [ActionTypes.SET_PATIENT_FILTER]({ commit }, payload: string) {
    commit(MutationTypes.SET_PATIENT_FILTER, payload);
  },
  [ActionTypes.SET_RESULTS_FILTER]({ commit }, payload: string) {
    commit(MutationTypes.SET_RESULTS_FILTER, payload);
  },
  [ActionTypes.SET_FROM_DATE]({ commit }, payload: string) {
    commit(MutationTypes.SET_FROM_DATE, payload);
  },
  [ActionTypes.SET_TO_DATE]({ commit }, payload: string) {
    commit(MutationTypes.SET_TO_DATE, payload);
  },
  [ActionTypes.INC_COUNTER]({ commit }, payload: number) {
    commit(MutationTypes.INC_COUNTER, payload);
  },
  [ActionTypes.LOGIN]({ commit }, payload: User) {
    commit(MutationTypes.LOGIN, payload);
  },
  [ActionTypes.LOGOUT]({ commit }, payload: boolean) {
    commit(MutationTypes.LOGOUT, payload);
  },
  [ActionTypes.SET_SELECTED_PATIENT]({ commit }, payload: Patient) {
    commit(MutationTypes.SET_SELECTED_PATIENT, payload);
  },
  [ActionTypes.SET_SELECTED_TEST]({ commit }, payload: TestResult) {
    commit(MutationTypes.SET_SELECTED_TEST, payload);
  },
  [ActionTypes.SET_SELECTED_WARD]({ commit }, payload: Ward) {
    commit(MutationTypes.SET_SELECTED_WARD, payload);
  },
  [ActionTypes.SET_SEARCH_CLIENT]({ commit }, payload: SearchClient) {
    commit(MutationTypes.SET_SEARCH_CLIENT, payload);
  },
  [ActionTypes.SET_PREVIOUS_LINK]({ commit }, payload: string) {
    commit(MutationTypes.SET_PREVIOUS_LINK, payload);
  },
  [ActionTypes.ADD_ORDER]({ commit }, payload: string) {
    commit(MutationTypes.ADD_ORDER, payload);
  },
  [ActionTypes.SET_SELECTED_SPECIMEN]({ commit }, payload: Specimen) {
    commit(MutationTypes.SET_SELECTED_SPECIMEN, payload);
  },
};

export type Getters = {
  lockTimeOut(state: State): number;
  patientFilter(state: State): string;
  resultsFilter(state: State): string;
  fromDate(state: State): string;
  toDate(state: State): string;
  doubleCounter(state: State): number;
  user(state: State): User;
  axios(state: State): Axios;
  isLoggedIn(state: State): boolean;
  selectedPatient(state: State): Patient;
  selectedTest(state: State): TestResult;
  isSearchingInProgress(state: State): boolean;
  selectedWard(state: State): Ward;
  searchClient(state: State): SearchClient;
  previousLink(state: State): string;
  createdOrders(state: State): string[];
  selectedSpecimen(state: State): Specimen;
};

export const getters: GetterTree<State, State> & Getters = {
  lockTimeOut: (state) => {
    return state.lockTimeOut / 1000;
  },
  patientFilter: (state) => {
    return state.patientFilter;
  },
  resultsFilter: (state) => {
    return state.resultsFilter;
  },
  fromDate: (state) => {
    return state.fromDate;
  },
  toDate: (state) => {
    return state.toDate;
  },
  doubleCounter: (state) => {
    return state.counter * 2;
  },
  user: (state) => {
    return state.user;
  },
  axios: (state) => {
    return state.axios;
  },
  isLoggedIn: (state) => {
    return state.loggedIn;
  },
  selectedPatient: (state) => {
    return state.selectedPatient;
  },

  selectedTest: (state) => {
    return state.selectedTest;
  },
  isSearchingInProgress: (state) => {
    return state.searchingInProgress;
  },
  selectedWard: (state) => {
    return state.selectedWard;
  },
  searchClient: (state) => {
    return state.searchClient;
  },
  previousLink: (state) => {
    return state.previousLink;
  },
  createdOrders: (state) => {
    return state.createdOrdersTrackingNum;
  },
  selectedSpecimen: (state) => {
    return state.selectedSpecimen;
  }
};

export type Store = Omit<
  VuexStore<State>,
  "getters" | "commit" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};

export const store = createStore({
  state,
  getters,
  mutations,
  actions,
});

export function useStore() {
  return store as Store;
}
