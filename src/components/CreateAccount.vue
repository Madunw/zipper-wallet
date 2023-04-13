<template>
  <div class="create-account">
    <!-- Create Account button -->
    <el-button type="success" plain @click="createAccount">Create Account</el-button>
    <div v-if="showRecoverInput">
      <label for="seed-phrase">Seed Phrase:</label>
      <!-- Input field for seed phrase -->
      <el-input
        v-model="seedPhrase"
        placeholder="Your Seed Phrase:"
        @keyup.enter="recoverAccount"
      />

      <!-- Recover Account button -->
      <el-button type="success" @click="recoverAccount">Recover Account</el-button>
    </div>
    <!-- Button to show recover input -->
    <el-button type="success" plain v-else @click="showRecoverInput = true"
      >Recover Account</el-button
    >
  </div>
</template>

<script>
import { ethers } from 'ethers'
export default {
  name: 'CreateAccount',
  data() {
    return {
      showRecoverInput: false,
      seedPhrase: '',
      address: ''
    }
  },
  methods: {
    createAccount() {
      // Generate a new wallet
      const wallet = ethers.Wallet.createRandom()
      // Get the seed phrase, private key, and address
      const seedPhrase = wallet.mnemonic.phrase
      const privateKey = wallet.privateKey
      const address = wallet.address

      // Do something with the seed phrase, private key, and address
      console.log('Seed phrase:', seedPhrase)
      console.log('Private key:', privateKey)
      console.log('Address:', address)

      // Show an alert with the generated seed phrase, private key, and address
      this.$alert(
        `Seed Phrase: \n${seedPhrase}\nPrivate Key: \n${privateKey}\nAddress: \n${address}\n\nPlease make sure to securely store the above information.\nThis information will only be shown once.`.replace(
          /\n/g,
          '<br>'
        ),
        'Important Notice',
        {
          confirmButtonText: 'OK',
          dangerouslyUseHTMLString: true
        }
      )

      // Commit the user's address and private key to the store
      this.$store.commit('setUserAddress', address)
      this.$store.commit('setPrivateKey', privateKey)
      // Call the refreshAccountData() method
      this.refreshAccountData()
    },

    recoverAccount() {
      // Generate a new wallet from the seed phrase
      const wallet = ethers.Wallet.fromPhrase(this.seedPhrase)

      // Get the private key and address
      const privateKey = wallet.privateKey
      const address = wallet.address

      // Do something with the private key and address
      console.log('Recovered private key:', privateKey)
      console.log('Recovered address:', address)

      // Show an alert with the recovered private key and address
      this.$alert(
        `Private Key: \n${privateKey}\nAddress: \n${address}\n\nPlease make sure to securely store the above information.\nThis information will only be shown once.`.replace(
          /\n/g,
          '<br>'
        ),
        'Important Notice',
        {
          confirmButtonText: 'OK',
          dangerouslyUseHTMLString: true
        }
      )

      // Reset the seed phrase and hide the recover input
      this.seedPhrase = ''
      this.showRecoverInput = false
    },

    refreshAccountData() {
      // Dispatch the refreshAccountData() action to the store
      this.$store.dispatch('refreshAccountData')
    }
  }
}
</script>

<style scoped>
.create-account {
  display: flex;
  flex-direction: column;
}
</style>