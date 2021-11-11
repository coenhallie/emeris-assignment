<template>
  <div class="fixed inset-0 flex items-center justify-center">
  </div>
  <TransitionRoot appear :show="main.showTokenModal" as="template">
    <Dialog as="div" @close="main.showTokenModal = false">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Select a token
              </DialogTitle>
              <input v-model="tokenSearch" type="text" placeholder="search token" class="my-3 rounded-2xl w-full">
              <div v-if="main.toOrFrom === 'from' " class="flex flex-col h-64 overflow-auto">
                <button @click="main.selectFromToken(token)" v-for="(token, index) in main.balances" :key="index" class="text-lg text-left py-3 hover:bg-gray-100 flex justify-between">
                  <img :src="`icons/${token.token}.png`" :alt="token.token" class="w-7 h-7"> {{token.token}} <div class="text-right pr-4 text-gray-400">{{token.balance}}</div>
                </button>
              </div>
              <div v-if="main.toOrFrom === 'to' " class="flex flex-col h-64 overflow-auto">
                <button @click="main.selectToToken(token)" v-for="(token, index) in main.balances" :key="index" class="text-lg text-left py-3 hover:bg-gray-100 flex justify-between">
                  <img :src="`icons/${token.token}.png`" :alt="token.token" class="w-7 h-7"> {{token.token}} <div class="text-right pr-4 text-gray-400">{{token.balance}}</div>
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTokenStore } from '@/store/useTokens';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from '@headlessui/vue';

export default {
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
  },

  setup() {
    const tokenSearch = ref([]);
    const main = useTokenStore();
    const { tokens, showTokenModal, toOrFrom } = storeToRefs(main);

    return {
      tokens,
      main,
      toOrFrom,
      tokenSearch,
      showTokenModal,
      useTokenStore,
    };
  },
};
</script>
