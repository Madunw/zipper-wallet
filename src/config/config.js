const ALCHEMY_API_KEY_MAINNET = 'Your Alchemy API Key'
const ALCHEMY_API_KEY_GOERLI = 'Your Alchemy API Key'
const INFURA_API_KEY_MAINNET = 'Your Infura API Key'

export const mainnet = {
  chainId: '1',
  name: 'Ethereum',
  asset: 'ETH',
  blockExplorerUrl: 'https://etherscan.io/',
  rpcUrlAlchemy: 'https://eth-mainnet.g.alchemy.com/v2/' + ALCHEMY_API_KEY_MAINNET,
  rpcUrlInfura: 'https://mainnet.infura.io/v3/' + INFURA_API_KEY_MAINNET
}

export const goerli = {
  chainId: '5',
  name: 'Goerli',
  asset: 'ETH',
  blockExplorerUrl: 'https://goerli.etherscan.io/',
  rpcUrlAlchemy: 'https://eth-goerli.g.alchemy.com/v2/' + ALCHEMY_API_KEY_GOERLI,
  rpcUrlInfura: 'https://goerli.infura.io/v3/' + INFURA_API_KEY_MAINNET
}

export const CHAINS_CONFIG = {
  [mainnet.name]: mainnet,
  [goerli.name]: goerli
}