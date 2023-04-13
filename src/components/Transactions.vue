<template>
  <el-tabs type="border-card" class="box-card" stretch>
    <el-tab-pane label="Sent">
      <el-card
        shadow="hover"
        v-for="transaction in transactionsFrom"
        :key="transaction"
        class="item"
      >
        <el-tooltip content="Check activity on the blockchain explorer" placement="top-end">
          <!-- click the transaction to see the details on the blockchain explorer -->
          <a
            class="card-link"
            :href="getTransactionUrl(transaction.hash)"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="value">{{ getTransactionValue(transaction) }}</div>
            <div class="from">To: {{ transaction.to }}</div>
          </a>
        </el-tooltip>
      </el-card>
    </el-tab-pane>
    <el-tab-pane label="Received">
      <el-card shadow="hover" v-for="transaction in transactionsTo" :key="transaction" class="item">
        <el-tooltip content="Check activity on the blockchain explorer" placement="top-end">
          <!-- click the transaction to see the details on the blockchain explorer -->
          <a
            class="card-link"
            :href="getTransactionUrl(transaction.hash)" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="value">{{ getTransactionValue(transaction) }}</div>
            <div class="from">From: {{ transaction.from }}</div>
          </a>
        </el-tooltip>
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Transactions',
  computed: {
    ...mapState({
      transactionsFrom: (state) => state.transactionsFrom,
      transactionsTo: (state) => state.transactionsTo,
      blockExplorerUrl: (state) => state.network.blockExplorerUrl
    }) // Get data from Vuex store
  },
  methods: {
    // Get transaction value and asset information
    getTransactionValue(transaction) {
      return transaction.value + transaction.asset;
    },
    // Get transaction explorer URL
    getTransactionUrl(hash) {
      return this.blockExplorerUrl + 'tx/' + hash;
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}
.item {
  height: 80px;
}
.value {
  font-size: 16px;
  font-weight: bold;
}
.from {
  font-size: 13px;
}
.box-card {
  width: 440px;
}
</style>
