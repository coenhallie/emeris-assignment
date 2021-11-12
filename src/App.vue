<template>
  <div class="grid grid-cols-2 dark:bg-gray-700 bg-gray-100 border-b border-gray-300 dark:border-gray-500">
    <button class="bg-red text-black rounded-lg text-lg">{{main.accountAddress}}</button>
    <button class="text-left" @click="toggleMode()"> toggle Theme </button>
  </div>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-700">
    <router-view/>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useTokenStore } from '@/store/useTokens';

export default {
  setup() {
    const main = useTokenStore();
    const { accountAddress, fetchAccountAddress } = storeToRefs(main);
    main.fetchAccountAddress();

    const toggleMode = () => {
      if (localStorage.theme === undefined) {
        localStorage.theme = 'dark';
      }
      // eslint-disable-next-line no-unused-expressions
      localStorage.theme === 'light' ? localStorage.theme = 'dark' : localStorage.theme = 'light';
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    return {
      main,
      toggleMode,
      accountAddress,
      fetchAccountAddress,
    };
  },

};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
