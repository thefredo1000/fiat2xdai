import React from 'react'
import { Button } from '@1hive/1hive-ui'
import { useWallet } from 'use-wallet'
import HoneySwapCard from '../Swap/HoneySwapCard'

function Step3(props) {
  const wallet = useWallet()
  console.log(wallet)
  console.log(window.$id)
  return (
    <div
      css={`
        padding: 5%;
      `}
    >
      <h1
        css={`
          margin-top: 0px;
          font-size: 30px;
          font-weight: 700;
          font-family: Poppins, sans-serif;
        `}
      >
        Step 3
      </h1>
      <div
        css={`
          padding-left: auto;
          padding-right: auto;
          margin: auto;
        `}
      >
        <HoneySwapCard />
      </div>
      <h1>Ernest {window.$fiatValue}</h1>
      <br />
      <Button
        onClick={() => {
          props.setStep(props.currStep + 1)
        }}
      >
        Next Step
      </Button>
    </div>
  )
}

export default Step3
