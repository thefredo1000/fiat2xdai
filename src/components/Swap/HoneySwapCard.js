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
import { Fetcher, ChainId, Token, Route, Trade, TokenAmount, TradeType, Percent } from '@1hive/honeyswap-sdk'

import IdentityBadge from '../IdentityBadge'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'
import { ethers } from 'ethers'
import { networkFromChainId } from '@aragon/connect-core'

import './style/HoneySwapCard.css'
const HoneySwapCard = (props) =>{
  window.$fiatValue = 100
  const copy = useCopyToClipboard()
  const wallet = useWallet()
  const theme = useTheme()

  const chainId = ChainId.XDAI
  const provider = new ethers.providers.Web3Provider(
    window.web3.currentProvider,
    networkFromChainId(chainId)
  )

  async function swap(amountIn) {

    const USDC: Token = await Fetcher.fetchTokenData(chainId, '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83', provider)
    const WXDAI: Token = await Fetcher.fetchTokenData(chainId, '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d', provider, 'WXDAI', "Wrapped XDAI")
    
    const pair = await Fetcher.fetchPairData(USDC, WXDAI, provider)
    const route = new Route([pair], WXDAI)

    const trade = new Trade(route, new TokenAmount(WXDAI, amountIn.toString()), TradeType.EXACT_INPUT)
  
    const slippageTolerance = new Percent('50', '10000') // 50 bips, or 0.50%
  
    const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw // needs to be converted to e.g. hex
    const amountOutMinHex = ethers.BigNumber.from(amountOutMin.toString()).toHexString();
    const path = [WXDAI.address, USDC.address]
    const to = wallet.account // should be a checksummed recipient address
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20 // 20 minutes from the current Unix time
    const value = trade.inputAmount.raw // // needs to be converted to e.g. hex
    const inputAmountHex = ethers.BigNumber.from(value.toString()).toHexString();
  
    const honeyswap = new ethers.Contract(
      '0x1C232F01118CB8B424793ae03F870aa7D0ac7f77',
      ['function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)'],
      provider.getSigner()
    )
  
    const tx = await honeyswap.swapExactETHForTokens(
      amountOutMinHex,
      path,
      to,
      deadline,
      {value: inputAmountHex}
    )
    return (tx)
  }

  var xDaiBalance = (wallet.balance / (10 ** 18)).toFixed(3)
  var [xDaiValue, setXDaiValue] = useState((xDaiBalance - 1).toFixed(3))

  var [priceUSDC, setPriceUSDC] = useState(0)
  var [USDCValue, setUSDCValue] = useState(0)

  async function setPairData() {

    const USDC: Token = await Fetcher.fetchTokenData(chainId, '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83', provider)
    const WXDAI: Token = await Fetcher.fetchTokenData(chainId, '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d', provider, 'WXDAI', "Wrapped XDAI")

    const pair = await Fetcher.fetchPairData(USDC, WXDAI, provider).then(pair => {
      const route = new Route([pair], WXDAI)
      var price = route.midPrice.invert().toSignificant(6)
      setPriceUSDC(price)
      setUSDCValue((xDaiValue / price).toFixed(6))
    })
    return pair
  }
  setPairData()

  // WIP
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
                setUSDCValue(event.target.value / priceUSDC)
                setXDaiValue(event.target.value)
              } else {
                setUSDCValue(0)
                setXDaiValue(0)
              }
              console.log(xDaiValue, xDaiBalance)
              console.log(parseFloat(xDaiValue) > parseFloat(xDaiBalance))
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
            value={USDCValue}
            disabled
            onChange={event => {
              if (event.target.value > 0) {
                setUSDCValue(event.target.value * priceUSDC)
                setXDaiValue(event.target.value)
              } else {
                setUSDCValue(0)
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
                USDC
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

              swap(xDaiValue * (10 ** 18)).then(res => {
                props.setStep(props.currStep + 1)
              })
            }}
          >
            SWAP
          </Button>
        </Box>
    </div>
  )
}

export default HoneySwapCard
