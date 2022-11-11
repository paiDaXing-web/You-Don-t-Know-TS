<template>
  <div id="app">
    <iframe
      :src="surl"
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
export default {
  name: "App",
  props: ["surl"],
};
</script>
