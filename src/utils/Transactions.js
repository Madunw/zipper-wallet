import axios from 'axios'

/**
 * Fetches asset transfers from a specific address using Alchemy RPC.
 * @param {string} address - The Ethereum address to fetch asset transfers from.
 * @param {string} rpcUrlAlchemy - The Alchemy RPC URL.
 * @returns {Array} - An array of asset transfers.
 */
export async function getAssetTransfersFromAddress(address, rpcUrlAlchemy) {
  try {
    const options = {
      method: 'POST',
      url: rpcUrlAlchemy,
      headers: { accept: 'application/json', 'content-type': 'application/json' },
      data: {
        id: 1,
        jsonrpc: '2.0',
        method: 'alchemy_getAssetTransfers',
        params: [
          {
            fromBlock: '0x0',
            toBlock: 'latest',
            fromAddress: address,
            category: ['external'],
            withMetadata: false,
            excludeZeroValue: true,
            maxCount: '0x3e8'
          }
        ]
      }
    }
    const response = await axios.request(options)
    console.log(response.data.result.transfers)
    return response.data.result.transfers
  } catch (error) {
    console.error(error)
  }
}

/**
 * Fetches asset transfers to a specific address using Alchemy RPC.
 * @param {string} address - The Ethereum address to fetch asset transfers to.
 * @param {string} rpcUrlAlchemy - The Alchemy RPC URL.
 * @returns {Array} - An array of asset transfers.
 */
export async function getAssetTransfersToAddress(address, rpcUrlAlchemy) {
  try {
    const options = {
      method: 'POST',
      url: rpcUrlAlchemy,
      headers: { accept: 'application/json', 'content-type': 'application/json' },
      data: {
        id: 1,
        jsonrpc: '2.0',
        method: 'alchemy_getAssetTransfers',
        params: [
          {
            fromBlock: '0x0',
            toBlock: 'latest',
            toAddress: address,
            category: ['external'],
            withMetadata: false,
            excludeZeroValue: true,
            maxCount: '0x3e8'
          }
        ]
      }
    }
    const response = await axios.request(options)
    console.log(response.data.result.transfers)
    return response.data.result.transfers
  } catch (error) {
    console.error(error)
  }
}
