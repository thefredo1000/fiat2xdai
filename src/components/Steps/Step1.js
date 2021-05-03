import React from 'react'
import RampKeys from '../../keys/ramp-key'
import { Button, Text } from '@1hive/1hive-ui'
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk'

function Step1() {
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
        Buy xDai With Fiat
      </h1>
      <div
        css={`
          max-width: 450px;
          margin-top: 20px;
          padding-left: 10px;
          border-left: 4px solid #21bf73;
        `}
      >
        <Text>
          Zero Bridging Fees From Mainnet. Use the RAMP platform to skip the
          fuss of bridging and get straight to trading.
        </Text>
      </div>
      <br />
      <Button
        onClick={() => {
          new RampInstantSDK(RampKeys)
            .on('*', event => {
              console.log(event)
            })
            .show()
        }}
      >
        Buy Now
      </Button>
    </div>
  )
}

export default Step1
