import React, { useState } from 'react'

import {
  GU,
} from '@1hive/1hive-ui'
import { 
  Button,
  TextInput,
  useTheme,
  Header,
  RADIUS,
  ButtonBase,
  Box,
  textStyle,
  Popover
} from '@aragon/ui'
import { useWallet } from 'use-wallet'
import { ChainId } from '@1hive/honeyswap-sdk'

import IdentityBadge from '../IdentityBadge'
import ContinueDeposit from './ContinueDeposit'

import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'
import { ethers } from 'ethers'
import { networkFromChainId } from '@aragon/connect-core'

const AgaveDepositCard = (props) =>{
  window.$fiatValue = 100
  const copy = useCopyToClipboard()
  const wallet = useWallet()
  const theme = useTheme()

  const chainId = ChainId.XDAI
  const provider = new ethers.providers.Web3Provider(
    window.web3.currentProvider,
    networkFromChainId(chainId)
  )

  async function deposit(amountIn) {
    const inputAmountHex = ethers.BigNumber.from(amountIn.toString());
    const onBehalfOf = wallet.account
    const referralCode = 0
    const depositXDAI = new ethers.Contract(
      '0x0bb31c42d0692369ba681a925c254feb605c327b',
      ['function depositETH(address onBehalfOf, uint16 referralCode) external payable'],
      provider.getSigner()
    )
    const tx = await depositXDAI.depositETH(onBehalfOf, referralCode, { value: inputAmountHex })
    return (tx)
  }

  var xDaiBalance = (wallet.balance / (10 ** 18)).toFixed(3)
  var [xDaiValue, setXDaiValue] = useState((xDaiBalance - 1).toFixed(3))
  
  const [visible, setVisible] = useState(false)
  const opener = React.createRef()

  const depositStatus = {
    CONTINUE : 0,
    APPROVE : 1,
    DEPOSIT : 2,
    FINISH : 3
  }
  let status = depositStatus.CONTINUE
  return (
   <ContinueDeposit />
    )
}

export default AgaveDepositCard
