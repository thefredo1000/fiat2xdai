import React from 'react'
import { useWallet } from 'use-wallet'
import XDAIWrapCard from '../Wrap/XDAIWrapCard'

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
        <XDAIWrapCard
          currStep={props.currStep}
          setStep={props.setStep}
        />
      </div>
      <br />
    </div>
  )
}

export default Step3
