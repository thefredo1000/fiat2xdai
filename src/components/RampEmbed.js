import React from 'react'
import RampKeys from '../keys/ramp-key'
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk'

function RampEmbed(text) {
  return (
    <button
      onClick={() => {
        console.log(RampKeys)
        new RampInstantSDK(RampKeys).show()
      }}
      color="primary"
    >
      Open RAMP
    </button>
  )
}

export default RampEmbed
