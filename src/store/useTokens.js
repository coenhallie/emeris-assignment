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
      return axios.get('http://localhost:3000/tokens').then((response) => {
        this.tokens = response.data;
      });
    },
    fetchBalances() {
      return axios.get('http://localhost:3000/balances').then((response) => {
        this.balances = response.data;
      });
    },
    fetchPools() {
      return axios.get('http://localhost:3000/pools').then((response) => {
        this.pools = response.data;
      });
    },
    fetchAccountAddress() {
      return axios.get('http://localhost:3000/addresses').then((response) => {
        this.accountAddress = response.data[0].address;
      });
    },
    openTokenModal(value) {
      this.fetchTokens();
      this.fetchBalances();
      this.fetchPools();
      this.showTokenModal = true;
      this.toOrFrom = value;
    },
  },
});
