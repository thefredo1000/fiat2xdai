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

  return (
    <div
      css={`
        padding: 2% 3%;
        background-color: ${theme.surfacePressed};
        border-radius: 30px;
        width: 500px;
        margin: 0 auto;
        position: center;
        border-width: 1px;
        border-color: ${theme.border};
        border-style: solid;
      `}
    >
      <Header
        primary={
          <div
            css={`
              font-size: 25px;
            `}
          >
            DEPOSIT XDAI
          </div>
        }
        secondary={
          <ButtonBase
            onClick={() => copy(wallet.account)}
            focusRingRadius={RADIUS}
            css={`
              display: flex;
              align-items: center;
              justify-self: flex-end;
              padding: ${0.5 * GU}px;
              &:active {
                background: ${theme.surfacePressed};
              }
            `}
          >
            <IdentityBadge
              entity={wallet.account}
              compact
              badgeOnly
              css="cursor: pointer"
            />
          </ButtonBase>
        }
      />
      
      <Box>
          <div
            id="header"
            css={`
              padding-bottom: 10px;
              ${textStyle("label2")}
            `}
          >
            <div
              css={`
                float:left;
                width:50%;
              `}
            >
              Available to deposit
            </div>
            <div
              css={`
                float:right;
                width:50%;
                text-align:right;
              `}
            >
              <span css="display:block">{xDaiBalance} xDai</span>
            </div>
          </div>
          <br />
          <div
            css={`
              ${textStyle("label2")}
              width:100%;
            `}
          >
          <TextInput
            wide
            value={xDaiValue}
            onChange={event => {
              if (event.target.value >= 0) {
                setXDaiValue(event.target.value)
              } else {
                setXDaiValue(0)
              }
            }}
            adornment={
              <div
                css={`
                  ${textStyle("label1")}
                  padding-right: 5px
                `}
              >
                XDAI
              </div>
            }
            adornmentPosition="end"
          />
          </div>
          <br />
          <div
            css={`
              ${textStyle("label2")}
              width:100%;
            `}
          >
          </div>
          <br />
          <Button
            wide
            disabled={(parseFloat(xDaiValue) > parseFloat(xDaiBalance) || !xDaiValue || xDaiValue === 0)}
            onClick={() => {
              deposit(xDaiValue * (10 ** 18)).then(res => {
                setXDaiValue(0)
                setVisible(true)
              }).catch(res => {

              })
            }}
          >
            DEPOSIT
            
          </Button>
          <br />
        </Box>
    </div>
  )
}

export default AgaveDepositCard
