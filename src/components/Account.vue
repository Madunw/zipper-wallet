<template>
  <div class="account" v-if="showAccount">
    <div>
      Address:
      <el-link type="success" :href="blockExplorerUrl + 'address/' + userAddress" target="_blank">{{
        userAddress
      }}</el-link>
    </div>
    <div>
      Balance: <b>{{ balance }}</b> {{ asset }}
    </div>
  </div>

  <div>
    <div v-if="showLogInInput">
      <el-input placeholder="Enter your wallet Address" v-model="addressInput"></el-input>
      <el-button type="success" @click="setAddress">Log In</el-button>
    </div>
    <el-button type="success" plain v-else @click="showLogInInput = true">Log In</el-button>
  </div>
</template>

<script>
import { ethers } from 'ethers'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Account',
  data() {
    return {
      addressInput: '',
      showLogInInput: false
    }
  },
  computed: {
    ...mapState({
      asset: (state) => state.network.asset,
      blockExplorerUrl: (state) => state.network.blockExplorerUrl,
      userAddress: (state) => state.userAddress,
      balance: (state) => state.balance
    }),
    showAccount() {
      return this.userAddress !== ''
    }
  },
  methods: {
    ...mapActions(['refreshAccountData']),
    async logIn() {
      const walletAddress = ethers.computeAddress(this.privateKey) //  get address from private key
      this.$store.commit('setUserAddress', walletAddress) // set address in store
      let privateKey = this.privateKey // Ethereum account private key needs to start with "0x"
      if (!privateKey.startsWith('0x')) {
        privateKey = '0x' + privateKey
      }
      this.$store.commit('setPrivateKey', privateKey) // set private key in store
      this.showLogInInput = false // hide input
      this.refreshData()
    },
    setAddress() {
      this.$store.commit('setUserAddress', this.addressInput) // set address in store
      this.refreshData()
      this.showLogInInput = false
    },
    refreshData() {
      this.refreshAccountData()
    }
  }
}
</script>

<style scoped>
.account {
  font-size: larger;
  font-weight: bold;
  margin-bottom: 10px;
}
b {
  font-weight: bold;
  font-size: larger;
}
</style>