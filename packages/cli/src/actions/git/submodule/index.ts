import { registerSubmodule } from "./register";
import { unregisterSubmodule } from "./unregister";
import { updateSubmodules } from "./update";

export default {
  register: registerSubmodule,
  unregister: unregisterSubmodule,
  update: updateSubmodules
}