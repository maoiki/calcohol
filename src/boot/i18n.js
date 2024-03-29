import { boot } from "quasar/wrappers";
import { createI18n } from "vue-i18n";
import messages from "src/i18n/messages";
import numberFormats from "src/i18n/numberFormats";

export default boot(({ app }) => {
  const i18n = createI18n({
    locale: "pt-BR",
    globalInjection: true,
    messages,
    numberFormats,
  });

  // Set i18n instance on app
  app.use(i18n);
});
