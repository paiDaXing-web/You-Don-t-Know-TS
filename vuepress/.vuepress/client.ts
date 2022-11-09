import { defineClientConfig } from "@vuepress/client";
import { configLoadSandbox } from "vuepress-plugin-sandbox/client";
import pkg from "../../package.json";
import vueXrenderTypes from "vue-xrender/dist/index.d.ts?raw";
import classMockTypes from "class-mock/dist/index.d.ts?raw";

export default defineClientConfig({
  async enhance({ app }) {
    app.config.globalProperties.version = pkg.version;

    if (!__VUEPRESS_SSR__) {
      configLoadSandbox((preOptions) => {
        return {
          ...preOptions,
          pkgCdn: {
            "@vue/runtime-dom"(version) {
              return `https://unpkg.com/vue@${version}/dist/vue.esm-browser.js`;
            },
          },
          themes: {
            light: {
              "--theme-color": "#ff3d00",
            },
            dark: {
              "--theme-color": "#ff774e",
            },
          },
          lifeCycle: {
            // TODO: FIX types declaration
            loadTsLibs(_, defaultTsLibs) {
              const tsLibs = [
                {
                  content: `declare module 'vue-xrender' { ${vueXrenderTypes} }`,
                },
                {
                  content: `declare module 'class-mock' { ${classMockTypes} }`,
                },
                { content: `declare module '@faker-js/*'` },
              ];
              return [...defaultTsLibs, ...tsLibs];
            },
            loadWorkers: async () => {
              await Promise.all([
                // load workers
                (async () => {
                  const [
                    { default: EditorWorker },
                    { default: JsonWorker },
                    { default: HtmlWorker },
                    { default: TsWorker },
                    { default: CssWorker },
                  ] = await Promise.all([
                    import("monaco-editor/esm/vs/editor/editor.worker?worker"),
                    import(
                      "monaco-editor/esm/vs/language/json/json.worker?worker"
                    ),
                    import(
                      "monaco-editor/esm/vs/language/html/html.worker?worker"
                    ),
                    import(
                      "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
                    ),
                    import(
                      "monaco-editor/esm/vs/language/css/css.worker?worker"
                    ),
                  ]);

                  self.MonacoEnvironment = {
                    getWorker: function (workerId, label) {
                      switch (label) {
                        case "json":
                          return new JsonWorker();
                        case "css":
                        case "scss":
                        case "less":
                          return new CssWorker();
                        case "html":
                        case "handlebars":
                        case "razor":
                          return new HtmlWorker();
                        case "typescript":
                        case "javascript":
                          return new TsWorker();
                        default:
                          return new EditorWorker();
                      }
                    },
                  };
                })(),
              ]);
            },
          },
        };
      }, self);
    }
  },
});
