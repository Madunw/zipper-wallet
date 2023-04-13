<template>
  <div class="networks">
    <div class="dropdown">
      <button class="dropbtn" @click="toggleDropdown">{{ network.name }}<img src="../assets/angle-down-solid.svg" /></button>
      <ul class="dropdown-content" v-show="isDropdownOpen">
        <li @click="switchNetwork('Ethereum')">Ethereum</li>
        <li @click="switchNetwork('Goerli')">Goerli</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Networks',
  data() {
    return {
      isDropdownOpen: false // 优化：使用布尔值标志下拉菜单是否展开
    }
  },
  computed: {
    ...mapState({
      network: (state) => state.network
    })
  },
  methods: {
    toggleDropdown() { // 优化：切换下拉菜单的展开状态
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    switchNetwork(networkName) {
      this.$store.commit('switchNetwork', networkName)
      this.refreshAccountData()
    },
    refreshAccountData() {
      this.$store.dispatch('getBalance')
      this.$store.dispatch('getTransactions')
    }
  }
}
</script>

<style scoped>
.dropbtn {
  background-color: #d4d8d4;
  color: rgb(26, 2, 2);
  padding: 10px;
  width: 100px;
  height: 34px;
  font-size: 12px;
  border: none;
  cursor: pointer;
}

.dropbtn img {
  float: right;
  width: 18px;
  height: 18px;
}

.dropdown {
  position: relative;
  margin: 10px auto;
}

.dropdown-content {
  list-style: none;
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  cursor: pointer;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #9dca9f;
}
</style>
