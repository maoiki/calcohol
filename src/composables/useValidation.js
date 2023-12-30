import { useI18n } from "vue-i18n";

export default function useValidation() {
  const { t } = useI18n();

  const emailValidation = () => (val) =>
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      val
    ) || t("emailRequired");

  const passwordValidation = () => (val) =>
    (val && val.length >= 6) || t("passwordMinimum");

  const usernameValidation = () => (val) =>
    (val && val.length >= 1) || t("nameRequired");

  return {
    emailValidation,
    passwordValidation,
    usernameValidation,
  };
}
