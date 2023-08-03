import { boot } from "quasar/wrappers";
import { input, roundButton } from "src/utils/visuals";

export default boot(async ({ app }) => {
  app.config.globalProperties.$visualInput = input;
  app.config.globalProperties.$visualRoundButton = roundButton;
});
