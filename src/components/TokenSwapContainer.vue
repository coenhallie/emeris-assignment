<template>
  <div class="flex justify-center py-8">
    <div class="shadow-md min-w-min w-3/12 rounded-3xl py-4 bg-white dark:bg-gray-800">
      <div class="flex justify-between">
        <h3 class="p-4 text-2xl font-medium dark:text-white">Swap</h3>
        <h3 class="p-4 text-xs"><img :src="settingsGear" alt="settings-logo" /></h3>
      </div>
      <div class="m-2 p-2 border-solid border border-gray-100 dark:border-opacity-10 rounded-3xl">
        <h3 class="font-semibold text-left dark:text-white">From</h3>
        <div class="grid grid-flow-col auto-cols-max justify-between">
          <input type="number" placeholder="0.0" v-model="main.toTokenAmount"
          class="form-input px-4 py-1 text-3xl border-0 focus:outline-none dark:text-white dark:bg-gray-800">
          <button v-if="main.fromToken === ''" @click="main.openTokenModal('from')" class="px-3 w-42 text-white flex items-center font-semibold
          rounded-3xl bg-blue-500 dark:text-white"> Select token
          <svg width="17" height="7" fill="none">
            <path d="M.972 1l5.233 5 5.234-5" stroke="#fff"></path>
          </svg>
          </button>
          <button v-if="main.fromToken !== ''" @click="main.openTokenModal('from')" class="px-3 w-42 text-white flex items-center font-semibold
          rounded-3xl bg-blue-500 dark:text-white"> 
          <img :src="`icons/${main.fromToken.token}.png`" :alt="main.fromToken.token" class="w-7 h-7 mr-3">
          {{main.fromToken.token}}
          <svg width="17" height="7" fill="none">
            <path d="M.972 1l5.233 5 5.234-5" stroke="#fff"></path>
          </svg>
          </button>
        </div>
        <p v-if="fromToken.balance" class="text-left text-sm font-semibold text-gray-500 dark:text-white">Balance: {{fromToken.balance}} {{fromToken.token}}</p>
      </div>
      <img :src="arrowDivider" alt="arrow-divider" class="m-4 text-center" />
      <div class="m-2 p-2 border-solid border border-gray-100 dark:border-opacity-10 rounded-3xl">
        <h3 class="font-semibold text-left dark:text-white">To (estimated)</h3>
        <div class="grid grid-flow-col
        auto-cols-max justify-between">
          <p class="text-3xl dark:text-white">$1,220</p>
          <button v-if="main.toToken === ''" @click="main.openTokenModal('to')" class="px-3 w-42 text-white flex items-center font-semibold
          rounded-3xl bg-blue-500"> Select token
          <svg width="17" height="7" fill="none">
            <path d="M.972 1l5.233 5 5.234-5" stroke="#fff"></path>
          </svg>
          </button>
          <button v-if="main.toToken !== ''" @click="main.openTokenModal('to')" class="px-3 w-42 text-white flex items-center font-semibold
          rounded-3xl bg-blue-500 dark:text-white">
          <img :src="`icons/${main.toToken.token}.png`" :alt="main.toToken.token" class="w-7 h-7 mr-3">
           {{main.toToken.token}}
          <svg width="17" height="7" fill="none">
            <path d="M.972 1l5.233 5 5.234-5" stroke="#fff"></path>
          </svg>
          </button>
        </div>
      </div>
      <TokenSelectionModal v-if="main.showTokenModal" />
      <div class="m-4">
        <button v-if="toToken" class="px-3 py-4 bg-blue-200 w-full rounded-3xl
         text-2xl text-blue-600 text-opacity-50 font-semibold dark:text-white"> swap</button>
         <button disabled v-if="!toToken" class="px-3 py-4 bg-blue-200 w-full rounded-3xl
         text-2xl text-blue-600 text-opacity-50 font-semibold dark:text-white dark:bg-blue-400"> Select token</button>
      </div>
    </div>
</div>
</template>

<script>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useTokenStore } from '@/store/useTokens';
import TokenSelectionModal from '@/components/TokenSelectionModal.vue';
import settingsGear from '@/assets/gear.svg';
import arrowDown from '@/assets/arrowDown.svg';
import arrowDivider from '@/assets/arrowDivider.svg';
import arrowDownWhite from '@/assets/arrowDownWhite.svg';

export default {
  name: 'Swapper',
  components: {
    TokenSelectionModal,
  },
  setup() {
    const openTokenSelectionModal = ref(false);
    const main = useTokenStore();

    const {
      openTokenModal, showTokenModal, tokens, toToken, fromToken, toTokenAmount, pools,
    } = storeToRefs(main);

    const convertTokenAmount = computed(() => pools.price);

    return {
      settingsGear,
      arrowDown,
      arrowDivider,
      arrowDownWhite,
      TokenSelectionModal,
      openTokenSelectionModal,
      openTokenModal,
      main,
      tokens,
      toToken,
      fromToken,
      showTokenModal,
      toTokenAmount,
      convertTokenAmount,
    };
  },
};
</script>

<style>

</style>
