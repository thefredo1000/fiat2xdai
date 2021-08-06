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
  textStyle
} from '@aragon/ui'
import { useWallet } from 'use-wallet'
import { ChainId } from '@1hive/honeyswap-sdk'

import IdentityBadge from '../IdentityBadge'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'
import { ethers } from 'ethers'
import { networkFromChainId } from '@aragon/connect-core'

const XDAIWrapCard = (props) =>{
  window.$fiatValue = 100
  const copy = useCopyToClipboard()
  const wallet = useWallet()
  const theme = useTheme()

  const chainId = ChainId.XDAI
  const provider = new ethers.providers.Web3Provider(
    window.web3.currentProvider,
    networkFromChainId(chainId)
  )

  async function wrap(amountIn) {
    const inputAmountHex = ethers.BigNumber.from(amountIn.toString());
    const wrapXDAI = new ethers.Contract(
      '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
      ['function deposit() payable'],
      provider.getSigner()
    )
    const tx = await wrapXDAI.deposit({ value: inputAmountHex })
    return (tx)
  }

  var xDaiBalance = (wallet.balance / (10 ** 18)).toFixed(3)
  var [xDaiValue, setXDaiValue] = useState((xDaiBalance - 1).toFixed(3))

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
            WRAP XDAI
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
              FROM
            </div>
            <div
              css={`
                float:right;
                width:50%;
                text-align:right;
              `}
            >
              <span css="display:block">Balance: {xDaiBalance}</span>
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
              TO
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
            disabled
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
                WXDAI
              </div>
            }
            adornmentPosition="end"
          />
          </div>
          <br />
          <Button
            wide
            disabled={(parseFloat(xDaiValue) > parseFloat(xDaiBalance) || !xDaiValue || xDaiValue === 0)}
            onClick={() => {

              wrap(xDaiValue * (10 ** 18)).then(res => {
                props.setStep(4)
              })
            }}
          >
            WRAP
          </Button>
        </Box>
    </div>
  )
}

export default XDAIWrapCard
