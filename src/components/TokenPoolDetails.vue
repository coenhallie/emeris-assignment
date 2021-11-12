<template>
<transition name="fade">
  <div class="flex justify-center">
    <div class="flex flex-col shadow-md min-w-min w-3/12 rounded-3xl py-4 bg-white dark:bg-gray-800">
      <div class="grid grid-cols-2 dark:text-white">
        <b> Pool ID:</b> {{main.poolTokenInfo.poolId}}
        <b> from: </b> {{main.poolTokenInfo.tokenB}} -> {{main.poolTokenInfo.tokenA}}
        <b> price: </b> {{main.poolTokenInfo.price}}
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useTokenStore } from '@/store/useTokens';

export default {
  name: 'TokenPoolDetails',
  setup() {
    const main = useTokenStore();
    const { poolTokenInfo } = storeToRefs(main);
    return {
      main,
      poolTokenInfo,
    };
  },
};
</script>
