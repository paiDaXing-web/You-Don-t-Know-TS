<template>
  <div id="app-1"></div>
</template>

<script>
// import MonacoEditor from "monaco-editor-vue";
import sdk from "@stackblitz/sdk";

sdk.embedProjectId("app-1", "typescript-kbnvmg", {
  forceEmbedLayout: true,
  openFile: "index.ts",
});
export default {
  name: "App",

  data() {
    return {
      options: {
        //Monaco Editor Options
      },
    };
  },
  methods: {
    onChange(value) {
      console.log(value);
    },
  },
};
</script>
