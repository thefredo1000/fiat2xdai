import cipher from './icons/Cipher.png'
import metamask from './icons/Metamask.png'
import status from './icons/Status.png'
import wallet from './icons/wallet.svg'
import fortmatic from './icons/Fortmatic.svg'
import portis from './icons/Portis.svg'

// See the corresponding prop type, EthereumProviderType, in prop-types.js.
const PROVIDERS = new Map(
  [
    {
      id: 'metamask',
      name: 'Metamask',
      type: 'Desktop',
      image: metamask,
      strings: {
        'your Ethereum provider': 'Metamask',
      },
    },
    {
      id: 'status',
      name: 'Status',
      type: 'Mobile',
      image: status,
      strings: {
        'your Ethereum provider': 'Status',
      },
    },
    {
      id: 'cipher',
      name: 'Cipher',
      type: 'Mobile',
      image: cipher,
      strings: {
        'your Ethereum provider': 'Cipher',
      },
    },
    {
      id: 'fortmatic',
      name: 'Fortmatic',
      type: 'Any',
      image: fortmatic,
      strings: {
        'your Ethereum provider': 'Fortmatic',
      },
    },
    {
      id: 'portis',
      name: 'Portis',
      type: 'Any',
      image: portis,
      strings: {
        'your Ethereum provider': 'Portis',
      },
    },
    {
      id: 'unknown',
      name: 'Unknown',
      type: 'Desktop',
      image: wallet,
      strings: {
        'your Ethereum provider': 'your provider',
      },
    },
  ].map(provider => [provider.id, provider])
)

// Get a providers object for a given ID.
function getProvider(providerId) {
  return PROVIDERS.get(providerId)
}

// Get a string that depends on the current Ethereum provider.
// The default string is used as an identifier (à la gettext).
function getProviderString(string, providerId = 'unknown') {
  const provider = getProvider(providerId)
  return (provider && provider.strings[string]) || string
}

// Get an identifier for the provider, if it can be detected.
function identifyProvider(provider) {
  if (provider && provider.isMetaMask) {
    return 'metamask'
  }
  return 'unknown'
}

// Get a provider from its useWallet() identifier.
function getProviderFromUseWalletId(id) {
  if (id === 'injected') {
    return (
      getProvider(identifyProvider(window.ethereum)) || getProvider('unknown')
    )
  }
  return getProvider(id) || getProvider('unknown')
}

export {
  getProvider,
  identifyProvider,
  getProviderString,
  getProviderFromUseWalletId,
}
export default PROVIDERS
