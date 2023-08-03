import { boot } from "quasar/wrappers";
import { input } from "src/utils/visuals";

export default boot(async ({ app }) => {
  app.config.globalProperties.$visualInput = input;
});
