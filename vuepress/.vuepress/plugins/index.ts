import { PluginConfig } from "vuepress";
// import { googleAnalyticsPlugin } from "@vuepress/plugin-google-analytics";
import { path } from "@vuepress/utils";
import sandboxPlugin from "vuepress-plugin-sandbox";
import pkg from "../../package.json";
console.log(pkg);

const getUnpkgUrl = (name: string, version = "latest", ending = "") =>
  `https://unpkg.com/${name}@${version}${ending}`;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getEsmUrl = (name: string, version = "latest", ending = "") =>
  `https://esm.sh/${name}@${version}`;

const vuepressPlugins: any = [
  // for doc search

  // for google search
  //   googleAnalyticsPlugin({
  //     id: "",
  //   }),
  // for demo sandbox
  sandboxPlugin({
    importMap: {
      imports: {
        "vue-xrender": getUnpkgUrl(
          "vue-xrender",
          pkg.version,
          "/dist/index.mjs"
        ),
        "class-mock": getUnpkgUrl("class-mock", pkg.version, "/dist/index.mjs"),
        "vue-demi": getUnpkgUrl("vue-demi", "latest", "/lib/v3/index.mjs"),
        "@faker-js/faker": getEsmUrl(
          "@faker-js/faker",
          "latest",
          "/dist/esm/index.mjs"
        ),
      },
    },
  }),
];

export const plugins = vuepressPlugins;
