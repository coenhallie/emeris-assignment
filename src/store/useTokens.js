/* eslint-disable no-sequences */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { defineStore } from 'pinia';
import axios from 'axios';

export const useTokenStore = defineStore('main', {
  state: () => ({
    tokens: [],
    balances: [],
    pools: [],
    accountAddress: '',
    fromToken: '',
    toToken: '',
    poolTokenInfo: {},
    toTokenAmount: 0,
    showTokenModal: false,
    toOrFrom: '',
  }),
  actions: {
    selectToToken(toToken) {
      this.toToken = toToken;
      this.showTokenModal = false;
    },
    selectFromToken(fromToken) {
      this.fromToken = fromToken;
      this.showTokenModal = false;
    },
    toTokenAmount(amount) {
      this.toTokenAmount = amount;
    },
    fetchTokens() {
      return axios.get('https://my-json-server.typicode.com/coenhallie/emeris-assignment/tokens').then((response) => {
        this.tokens = response.data;
      });
    },
    fetchBalances() {
      return axios.get('https://my-json-server.typicode.com/coenhallie/emeris-assignment/balances').then((response) => {
        this.balances = response.data;
      });
    },
    fetchPools() {
      return axios.get('https://my-json-server.typicode.com/coenhallie/emeris-assignment/pools').then((response) => {
        this.pools = response.data;
      });
    },
    fetchAccountAddress() {
      return axios.get('https://my-json-server.typicode.com/coenhallie/emeris-assignment/addresses').then((response) => {
        const { address } = response.data[0];
        this.accountAddress = `${address.slice(0, 4)} ... ${address.slice(address.length - 4, address.length)}`;
      });
    },
    openTokenModal(value) {
      this.fetchTokens();
      this.fetchBalances();
      this.showTokenModal = true;
      this.toOrFrom = value;
    },
  },
});
