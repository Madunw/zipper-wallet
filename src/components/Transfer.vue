<template>
  <div class="input">
    To:
    <el-input
      type="text"
      placeholder="Enter Destination Address"
      v-model="destinationAddress"
      @keyup.enter="transferETH"
    />
  </div>

  <div class="input">
    Amount:
    <el-input type="text" placeholder="Enter Amount" v-model="amount" @keyup.enter="transferETH" />
  </div>
  <div class="input">
    Private Key:
    <el-input
      type="text"
      placeholder="Enter Private Key"
      v-model="privateKey"
      @keyup.enter="transferETH"
    />
  </div>
  <div class="button">
    <el-button type="success" @click="transferETH">Send</el-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { sendToken } from '../utils/Transfer.js'

export default {
  name: 'Transfer',
  data() {
    return {
      dialogVisible: false, // Dialog visibility flag, set to false by default
      destinationAddress: '', // Destination address input data
      amount: '', // Amount input data
      privateKey: '' // Private key input data
    }
  },
  computed: {
    ...mapState({
      transactionsFrom: (state) => state.transactionsFrom, // Get transactions from data from Vuex store
      transactionsTo: (state) => state.transactionsTo, // Get transactions to data from Vuex store
      rpcUrl: (state) => state.network.rpcUrlInfura // Get RPC URL from Vuex store
    })
  },
  methods: {
    async transferETH() {
      this.$message({
          message: 'Waiting for transaction to complete'
        })
      try {
        let result = await sendToken(
          this.amount, // Pass amount data to sendToken function
          this.destinationAddress, // Pass destination address data to sendToken function
          this.privateKey, // Pass private key data to sendToken function
          this.rpcUrl // Pass RPC URL to sendToken function
        )
        this.$message({
          message: 'Transfer Succeeded',
          type: 'success'
        })
        console.log(result)
      } catch (error) {
        this.$message({
          message: 'Transfer Failed',
          type: 'warning'
        })
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
.input {
  margin-bottom: 10px;
}
.button {
  margin-top: 6px;
  text-align: center;
}
</style>
