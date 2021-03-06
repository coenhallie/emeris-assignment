<template>
  <div class="flex justify-center py-8">
    <div class="shadow-md min-w-min w-3/12 rounded-3xl py-4 bg-white dark:bg-gray-800">
      <div class="flex justify-between">
        <h3 class="p-4 text-2xl font-medium dark:text-white">Swap</h3>
      </div>
      <div class="m-2 p-2 border-solid border border-gray-100 dark:border-opacity-10 rounded-3xl">
        <h3 class="font-semibold text-left dark:text-white">From</h3>
        <div class="grid grid-flow-col auto-cols-max justify-between">
          <input type="number" placeholder="0.0" v-model="toTokenAmount" min="0"
          class="form-input px-4 py-1 text-3xl border-0 focus:outline-none dark:text-white dark:bg-gray-800">
          <button v-if="main.fromToken === ''" @click="main.openTokenModal('from')" class="px-3 w-42 text-white flex items-center font-semibold
          rounded-3xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 dark:text-white"> Select token
          <svg width="17" height="7" fill="none">
            <path d="M.972 1l5.233 5 5.234-5" stroke="#fff"></path>
          </svg>
          </button>
          <button v-if="main.fromToken !== ''" @click="main.openTokenModal('from')" class="px-3 w-42 text-white flex items-center font-semibold
          rounded-3xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 dark:text-white">
          <img :src="`icons/${main.fromToken.token}.png`" :alt="main.fromToken.token" class="w-7 h-7 mr-3">
          {{main.fromToken.token}}
          <svg width="17" height="7" fill="none">
            <path d="M.972 1l5.233 5 5.234-5" stroke="#fff"></path>
          </svg>
          </button>
        </div>
        <p v-if="fromToken.balance" class="text-left text-sm font-semibold text-gray-500 dark:text-white">Balance: {{fromToken.balance}} {{fromToken.token}}</p>
      </div>
      <div class="flex align-middle justify-center"><img :src="arrowDivider" alt="arrow-divider" class="m-4 text-center" /></div>
      <div class="m-2 p-2 border-solid border border-gray-100 dark:border-opacity-10 rounded-3xl">
        <h3 class="font-semibold text-left dark:text-white">To (estimated)</h3>
        <div class="grid grid-flow-col
        auto-cols-max justify-between">
          <p v-if="main.poolTokenInfo" class="text-3xl dark:text-white py-1">{{ calculateAmount }}</p>
          <p v-if="!main.poolTokenInfo" class="text-3xl dark:text-white py-1">0</p>
          <button v-if="main.toToken === ''" @click="main.openTokenModal('to')" class="px-3 w-42 text-white flex items-center font-semibold
          rounded-3xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"> Select token
          <svg width="17" height="7" fill="none">
            <path d="M.972 1l5.233 5 5.234-5" stroke="#fff"></path>
          </svg>
          </button>
          <button v-if="main.toToken !== ''" @click="main.openTokenModal('to')" class="px-3 w-42 text-white flex items-center font-semibold
          rounded-3xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 dark:text-white">
          <img :src="`icons/${main.toToken.token}.png`" :alt="main.toToken.token" class="w-7 h-7 mr-3">
           {{main.toToken.token}}
          <svg width="17" height="7" fill="none">
            <path d="M.972 1l5.233 5 5.234-5" stroke="#fff"></path>
          </svg>
          </button>
        </div>
      </div>
      <token-selection-modal v-if="main.showTokenModal" />
      <div class="m-4">
         <button disabled class="px-3 py-4 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 w-full rounded-3xl
         text-lg text-white font-semibold">{{buttonText}}</button>
      </div>
      <div v-if="main.poolTokenPrice"> {{main.poolTokenInfo}} per 1 {{main.toToken}} </div>
    </div>
  </div>
  <token-pool-details v-if="main.poolTokenInfo" />
</template>

<script>
import {
  ref, computed,
} from 'vue';
import { storeToRefs } from 'pinia';
import { useTokenStore } from '@/store/useTokens';
import TokenPoolDetails from '@/components/TokenPoolDetails.vue';
import TokenSelectionModal from '@/components/TokenSelectionModal.vue';
import settingsGear from '@/assets/gear.svg';
import arrowDown from '@/assets/arrowDown.svg';
import arrowDivider from '@/assets/arrowDivider.svg';
import arrowDownWhite from '@/assets/arrowDownWhite.svg';

export default {
  name: 'TokenSwapContainer',
  components: {
    TokenSelectionModal,
    TokenPoolDetails,
  },
  setup() {
    const main = useTokenStore();
    const toTokenAmount = ref(0);
    const {
      openTokenModal, showTokenModal, tokens, toToken, fromToken, filterTokens, fetchPools, pools, poolTokenInfo, balances,
    } = storeToRefs(main);
    main.fetchPools();

    main.$subscribe(() => {
      main.poolTokenInfo = main.pools.find((pool) => (pool.tokenA === main.fromToken.token) && (pool.tokenB === main.toToken.token));
    });

    const calculateAmount = computed(() => Math.round((toTokenAmount.value / main.poolTokenInfo.price) * 100) / 100);

    const buttonText = computed(() => {
      if (toTokenAmount.value > main.fromToken.balance) {
        return `Not enough ${main.fromToken.token}`;
      }
      if (!toToken.value && !fromToken.value) {
        return 'Select token';
      }
      if (!main.poolTokenInfo && toToken) {
        return 'Insufficient liquidity for this trade.';
      }
      if (toToken && main.poolTokenInfo) {
        return 'Swap';
      }
      return 'Swap';
    });

    return {
      settingsGear,
      arrowDown,
      arrowDivider,
      arrowDownWhite,
      TokenSelectionModal,
      openTokenModal,
      main,
      tokens,
      toToken,
      pools,
      balances,
      fromToken,
      buttonText,
      filterTokens,
      fetchPools,
      TokenPoolDetails,
      poolTokenInfo,
      showTokenModal,
      toTokenAmount,
      calculateAmount,
    };
  },
};
</script>
