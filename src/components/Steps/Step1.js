import React from 'react'
import RampKeys from '../../keys/ramp-key'
import { Button } from '@1hive/1hive-ui'
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk'

function Step1() {
  return (
    <div
      css={`
        padding: 5%;
      `}
    >
      Buy xDai with Ramp
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
