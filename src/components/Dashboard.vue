<template>
  <div>
    <TokenSwapContainer />
  </div>
</template>

<script>
import TokenSwapContainer from '@/components/TokenSwapContainer.vue';

export default {
  name: 'Dashboard',
  props: {
    msg: String,
  },
  components: {
    TokenSwapContainer,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
