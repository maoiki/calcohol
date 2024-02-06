import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";

export default function useNotify() {
  const $q = useQuasar();
  const { t } = useI18n();

  const notifySuccess = (message) => {
    $q.notify({
      type: "positive",
      message: message || t("operationSucess"),
    });
  };

  const notifyError = (message) => {
    $q.notify({
      type: "negative",
      message: message || t("operationFail"),
    });
  };

  const notifyUpdate = (message) => {
    $q.notify({
      message: message || t("newContent"),
      icon: "fas fa-download",
      closeBtn: t("refresh"),
      timeout: 10000,
      onDismiss() {
        location.reload(true);
      },
    });
  };

  return {
    notifySuccess,
    notifyError,
    notifyUpdate
  };
}
