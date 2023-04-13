// Here is the Vuex store for data management

import { createStore } from 'vuex'
import { ethers } from 'ethers'
import { getAssetTransfersFromAddress, getAssetTransfersToAddress } from '../utils/Transactions.js'
import { CHAINS_CONFIG } from '../config/config.js'

export default createStore({
  state() {
    return {
      network: CHAINS_CONFIG.Goerli, // Wallet Network, default Goerli
      userAddress: '', // Wallet Address
      privateKey: '', // Wallet Private Key
      balance: '', // Wallet Balance
      transactionsFrom: [], // Transactions From userAddress
      transactionsTo: [] // Transactions To userAddress
    }
  },
  mutations: {
    switchNetwork(state, networkName) {
      // Update network based on networkName
      state.network = CHAINS_CONFIG[networkName]
    },
    setUserAddress(state, payload) {
      // Update userAddress
      state.userAddress = payload
    },
    setPrivateKey(state, payload) {
      // Update privateKey
      state.privateKey = payload
    },
    async getBalance(state) {
      // Get balance of userAddress from Ethereum provider
      const provider = new ethers.providers.JsonRpcProvider(state.network.rpcUrlInfura)
      const accountBalance = await provider.getBalance(state.userAddress)
      state.balance = parseFloat(ethers.utils.formatEther(accountBalance))
    },
    async getTransactions(state) {
      // Get transactions From and To userAddress from Alchemy API
      state.transactionsFrom = await getAssetTransfersFromAddress(
        state.userAddress,
        state.network.rpcUrlAlchemy
      )
      state.transactionsTo = await getAssetTransfersToAddress(
        state.userAddress,
        state.network.rpcUrlAlchemy
      )
    }
  },
  actions: {
    async refreshAccountData({ commit }) {
      // Refresh account data by committing getBalance and getTransactions mutations
      await commit('getBalance')
      await commit('getTransactions')
    }
  },
  getters: {},
  modules: {}
})
