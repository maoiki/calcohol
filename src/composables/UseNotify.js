import { useQuasar } from "quasar";

export default function useNotify() {
  const $q = useQuasar();

  const notifySuccess = (message) => {
    $q.notify({
      type: "positive",
      message: message || "Operation successfully completed",
    });
  };

  const notifyError = (message) => {
    $q.notify({
      type: "negative",
      message: message || 'Ops! Something went wrong',
    });
  };

  return {
    notifySuccess,
    notifyError,
  }
}
