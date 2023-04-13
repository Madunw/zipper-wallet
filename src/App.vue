<template>
  <el-card class="container">
    <div class="header">
      <!-- Render Networks component -->
      <Networks />
      <img src="./assets/logo.png"/>
    </div>

    <el-divider></el-divider>
    <div class="account">
      <h3>Account</h3>
      <!-- Render Account component -->
      <Account />
      <!-- Render CreateAccount component -->
    <CreateAccount />
    </div>

    <el-collapse>
      <el-collapse-item title="Transfer" name="1">
        <!-- Render Transfer component -->
        <Transfer />
      </el-collapse-item>
      <el-collapse-item title="Transactions" name="2">
        <!-- Render Transactions component -->
        <Transactions />
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script setup>
import Networks from './components/Networks.vue'
import CreateAccount from './components/CreateAccount.vue'
import Account from './components/Account.vue'
import Transactions from './components/Transactions.vue'
import Transfer from './components/Transfer.vue'


</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 500px;
  margin: auto;
}
.header {
  margin-bottom: 20px;
}
.header img{
  width: 300px;
  margin: auto;
}
</style>
