import { boot } from "quasar/wrappers";
import { mlInput, priceInput, abvInput } from "src/utils/forms";

export default boot(async ({ app }) => {
  app.config.globalProperties.$formMlInput = mlInput;
  app.config.globalProperties.$formAbvInput = abvInput;
  app.config.globalProperties.$formPriceInput = priceInput;
});
