<template>
  <div id="app">
    <iframe
      src="https://stackblitz.com/edit/typescript-fkaayq?embed=1&file=demo.ts&hideExplorer=1&hideNavigation=1&view=editor"
      scrolling="no"
      border="0"
      frameborder="no"
      framespacing="0"
      allowfullscreen="true"
      width="100%"
      height="400px"
    >
    </iframe>
  </div>
</template>

<script>
import sdk from "@stackblitz/sdk";

export default {
  name: "App",
  components: {},
  mounted: {},
  data() {
    return {
      options: {
        //Monaco Editor Options
      },
    };
  },
  mounted: () => {
    console.log(1);
  },
  methods: {
    onChange(value) {
      console.log(value);
    },
  },
};
</script>
