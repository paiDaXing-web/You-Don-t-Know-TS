import { defineClientConfig } from "@vuepress/client";
import copy from "../.plugins/plugins/copy";
export default defineClientConfig({
  async setup() {
    if (!__VUEPRESS_SSR__) {
      // 运行在客户端
      copy();
    }
  },
});
