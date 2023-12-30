import { boot } from "quasar/wrappers";
import { input, clearableInput, roundButton, textButton } from "src/utils/visuals";

export default boot(async ({ app }) => {
  app.config.globalProperties.$visualInput = input;
  app.config.globalProperties.$visualClearable = clearableInput;
  app.config.globalProperties.$visualRoundButton = roundButton;
  app.config.globalProperties.$visualTextButton = textButton;
});
