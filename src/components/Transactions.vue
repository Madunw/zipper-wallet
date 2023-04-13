<template>
  <el-tabs type="border-card" class="box-card" stretch>
    <el-tab-pane label="Sent">
      <el-card shadow="hover" v-for="(transaction, index) in paginatedTransactionsFrom" :key="index" class="item">
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
      <!--  Up to 5 results per page -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="transactionsFrom.length"
        :page-size="5"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-tab-pane>
    <el-tab-pane label="Received">
      <el-card shadow="hover" v-for="(transaction, index) in paginatedTransactionsTo" :key="index" class="item">
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
      <!--  Up to 5 results per page -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="transactionsTo.length"
        :page-size="5"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Transactions',
  data() {
    return {
      currentPageFrom: 1,
      currentPageTo: 1,
      pageSize: 5
    }
  },
  computed: {
    ...mapState({
      transactionsFrom: (state) => state.transactionsFrom,
      transactionsTo: (state) => state.transactionsTo,
      blockExplorerUrl: (state) => state.network.blockExplorerUrl
    }), // Get data from Vuex store
    paginatedTransactionsFrom() {
      const startIndex = (this.currentPageFrom - 1) * this.pageSize;
      const endIndex = this.currentPageFrom * this.pageSize;
      return this.transactionsFrom.slice(startIndex, endIndex);
    },
    paginatedTransactionsTo() {
      const startIndex = (this.currentPageTo - 1) * this.pageSize;
      const endIndex = this.currentPageTo * this.pageSize;
      return this.transactionsTo.slice(startIndex, endIndex);
    }
  },
  methods: {
    // Get transaction value and asset information
    getTransactionValue(transaction) {
      return transaction.value + transaction.asset;
    },
    // Get transaction explorer URL
    getTransactionUrl(hash) {
      return this.blockExplorerUrl + 'tx/' + hash;
    },
    handleCurrentChange(val) {
      this.currentPageFrom = val;
      this.currentPageTo = val;
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
