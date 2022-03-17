import { MutationTypes, useStore } from "@/store";

const toggleViews = () => {
  const store = useStore();

  const OpenPatientDetails = (value: boolean) => {

    store.commit(MutationTypes.VIEW_PATIENT_PREVIOUS_ORDERS, !value);
    store.commit(MutationTypes.OPEN_PATIENT_PLACE_ORDER, !value);
    store.commit(MutationTypes.VIEW_PATIENT, value);
    store.commit(MutationTypes.OPEN_PATIENT_DETAILS, value);
  };

  const OpenCreatePatientOrder = (value: boolean) => {

    store.commit(MutationTypes.OPEN_PATIENT_DETAILS, !value);
    store.commit(MutationTypes.VIEW_PATIENT_PREVIOUS_ORDERS, !value);
    store.commit(MutationTypes.OPEN_PATIENT_PLACE_ORDER, value);
  };

  const OpenPatientPreviousOrders = (value: boolean) => {

    store.commit(MutationTypes.OPEN_PATIENT_DETAILS, !value);
    store.commit(MutationTypes.OPEN_PATIENT_PLACE_ORDER, !value);
    store.commit(MutationTypes.VIEW_PATIENT_PREVIOUS_ORDERS, value);
  };


  const OpenPatientSearchResultsView = () => {

    store.commit(MutationTypes.VIEW_DASHBOARD, false);
    store.commit(MutationTypes.VIEW_TEST_RESULTS, false);
    store.commit(MutationTypes.VIEW_ORDERS, false);
    store.commit(MutationTypes.REGISTER_PATIENT, false);
    store.commit(MutationTypes.SEARCH_PATIENT, true);
  };

  const ClosePatientSearchResultsView = () => {
    store.commit(MutationTypes.VIEW_PATIENT, false);
    store.commit(MutationTypes.SEARCH_PATIENT, false);
  };

  const OpenPatientRegForm = () => {

    store.commit(MutationTypes.VIEW_DASHBOARD, false);
    store.commit(MutationTypes.VIEW_TEST_RESULTS, false);
    store.commit(MutationTypes.VIEW_ORDERS, false);
    store.commit(MutationTypes.SEARCH_PATIENT, false);
    store.commit(MutationTypes.VIEW_PATIENT, false);
    store.commit(MutationTypes.REGISTER_PATIENT, true);
  };

  const OpenDashboard = () => {
    store.commit(MutationTypes.VIEW_TEST_RESULTS, false);
    store.commit(MutationTypes.VIEW_ORDERS, false);
    store.commit(MutationTypes.SEARCH_PATIENT, false);
    store.commit(MutationTypes.VIEW_PATIENT, false);
    store.commit(MutationTypes.REGISTER_PATIENT, false);

    store.commit(MutationTypes.VIEW_DASHBOARD, true);
  };

  const OpenViewOrdersView = () => {

    store.commit(MutationTypes.VIEW_DASHBOARD, false);
    store.commit(MutationTypes.SEARCH_PATIENT, false);
    store.commit(MutationTypes.VIEW_PATIENT, false);
    store.commit(MutationTypes.REGISTER_PATIENT, false);

    store.commit(MutationTypes.VIEW_ORDERS, true);
  };

  const OpenViewTestResults = () => {
    store.commit(MutationTypes.VIEW_TEST_RESULTS, true);
  };

  const CloseViewTestResults = () => {
    store.commit(MutationTypes.VIEW_TEST_RESULTS, false);
  };

  const ClosePatientRegForm = () => {
    store.commit(MutationTypes.REGISTER_PATIENT, false);
  };

  return {
    OpenPatientSearchResultsView,
    ClosePatientSearchResultsView,
    OpenPatientDetails,
    OpenCreatePatientOrder,
    OpenPatientRegForm,
    ClosePatientRegForm,
    OpenViewOrdersView,
    OpenViewTestResults,
    CloseViewTestResults,
    OpenDashboard,
    OpenPatientPreviousOrders
  };
};

export default toggleViews;
