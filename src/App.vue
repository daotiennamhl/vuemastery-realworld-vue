<template>
  <div id="app">
    <div v-if="!isInstallMetamask">
      Bạn chưa cài đặt metamask, Vui lòng cài đặt 
      <button @click="startOnboarding">
        tại đây
      </button>
    </div>
    <div v-else-if="!isConnectMetamask">
      Bạn chưa kết nối Metamask với game. Vui lòng kết nối 
      <button @click="connectMetamask">
        tại đây
      </button>
    </div>
    <div>
      Bạn đã kết nối Metamask, đây là thông tin của bạn:
      <div>account Address: {{accounts[0]}}</div> 
      <div>
        account balance: {{balance}} ETH
      </div>
    </div>
  </div>
</template>

<script>
import MetaMaskOnboarding from '@metamask/onboarding';

export default {
  inject: ['web3'],
  data: () => ({
    errorMessage: '',
    isConnecting: false,
    accounts: [],
    balance: -1,
  }),
  computed: {
    isInstallMetamask() {
      return !!this.web3.currentProvider;
    },
  },
  async created() {
    console.log('created')
    if (this.isConnectMetamask()) {
      await this.getWalletData();
    }
  },
  methods: {
    async startOnboarding() {
      const onboarding = new MetaMaskOnboarding();
      onboarding.startOnboarding();
    },
    async connectMetamask() {
      const web3 = this.web3.currentProvider;
      this.isConnecting = true;
      this.errorMessage = 'Connecting to MetaMask...';
      web3
        .request({ method: 'eth_requestAccounts' })
        .then(() => {
          this.errorMessage = 'Success: MetaMask connected.';
          this.isConnecting = false;
        })
        .catch(() => {
          this.errorMessage = 'Error: MetaMask could not get permissions.';
          this.isConnecting = false;
        });
    },
    async isConnectMetamask() {
      this.web3.eth.getAccounts((err, accounts) => {
        return accounts.length > 0;
      })
      return false;
    },

    async getWalletData() {
      let that = this
      that.accounts = await this.web3.eth.requestAccounts();
      await this.web3.eth.getBalance(that.accounts[0]).then(res => {
        that.balance = this.web3.utils.fromWei(res);
      });
    }
  }
};
</script>