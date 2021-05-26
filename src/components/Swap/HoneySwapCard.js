import React, { useState } from 'react'

import {
  Button,
  TextInput,
  useTheme,
  GU,
  Header,
  RADIUS,
  ButtonBase,
} from '@1hive/1hive-ui'
import { useWallet } from 'use-wallet'
import { Fetcher, ChainId } from '@1hive/honeyswap-sdk'

import IdentityBadge from '../IdentityBadge'
import xDaiIcon from '../../assets/xDai-icon.png'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'
import { ethers } from 'ethers'
import { networkFromChainId } from '@aragon/connect-core'

function HoneySwapCard(props) {
  window.$fiatValue = 100
  const copy = useCopyToClipboard()
  const wallet = useWallet()
  const theme = useTheme()

  // xDai Chain and HNY Token Address
  const chainId = ChainId.XDAI
  const tokenAddress = '0x71850b7e9ee3f13ab46d67167341e4bdc905eef9'

  const provider = new ethers.providers.Web3Provider(
    window.web3.currentProvider,
    networkFromChainId(chainId)
  )

  Fetcher.fetchTokenData(chainId, tokenAddress, provider)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })

  // WIP
  var xDaiBalance = window.$fiatValue
  var [xDaiValue, setXDaiValue] = useState(xDaiBalance - 1)
  var [hnyValue, setHNYValue] = useState(xDaiBalance / 800)
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
            SWAP
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
      <div
        css={`
          padding: 5%;
          border-radius: 20px;
          width: 100%;
          margin: 0 auto;
          position: center;
          border-width: 1px;
          background-color: ${theme.surfaceInteractive};
          border-color: ${theme.border};
          border-style: solid;
        `}
      >
        <table width="100%">
          <tr>
            <td width="70%">From</td>
            <td width="30%">Balance: {xDaiBalance}</td>
          </tr>
          <tr>
            <td>
              <TextInput
                value={xDaiValue}
                adornment={<Button size="mini" label="MAX" mode="strong" />}
                adornmentPosition="end"
                onChange={event => {
                  if (event.target.value > 0) {
                    setHNYValue(event.target.value / 600)
                    setXDaiValue(event.target.value)
                  } else {
                    setHNYValue(0)
                    setXDaiValue(0)
                  }
                }}
              />
            </td>
            <td
              css={`
                font-size: 32px;
                font-weight: 1000;
              `}
            >
              <img
                width="24px"
                css={`
                  margin: 0px 10px 0px 0px;
                `}
                src={xDaiIcon}
              />
              XDAI
            </td>
          </tr>
        </table>

        <table width="100%">
          <tr>
            <td width="70%">To</td>
          </tr>
          <tr>
            <td>
              <TextInput
                value={hnyValue}
                adornment={<Button size="mini" label="MAX" mode="strong" />}
                adornmentPosition="end"
                onChange={event => {
                  if (event.target.value > 0) {
                    setHNYValue(event.target.value * 600)
                    setXDaiValue(event.target.value)
                  } else {
                    setHNYValue(0)
                    setXDaiValue(0)
                  }
                }}
              />
            </td>
            <td
              css={`
                font-size: 32px;
                font-weight: 1000;
              `}
            >
              <img
                width="24px"
                css={`
                  margin: 0px 10px 0px 0px;
                `}
                src="https://raw.githubusercontent.com/1Hive/default-token-list/master/src/assets/xdai/0x71850b7E9Ee3f13Ab46d67167341E4bDc905Eef9/logo.png"
              />
              HNY
            </td>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default HoneySwapCard
