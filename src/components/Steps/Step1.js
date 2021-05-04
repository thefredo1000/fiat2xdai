import React from 'react'
import { Button, Text } from '@1hive/1hive-ui'
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk'
import axios from 'axios'

import RampKeys from '../../keys/ramp-key'

class Step1 extends React.Component {
  constructor(currStep) {
    super(currStep)
    this.currStep = currStep.children
  }

  render() {
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
              .on('PURCHASE_SUCCESSFUL', event => {
                var payload = {
                  type: 'PURCHASE_SUCCESSFUL',
                  id: event.id,
                  _id: event.id,
                  fiatCurrency: event.fiatCurrency,
                  fiatValue: event.fiatValue,
                  poolFee: event.poolFee,
                  rampFee: event.rampFee,
                  receiverAddress: event.receiverAddress,
                  createdAt: event.createdAt,
                  updatedAt: event.updatedAt,
                  status: event.status,
                }
                // Save the info
                axios
                  .post('http://localhost:8082/api/tickets', payload)
                  .then(res => {
                    console.log('post request works')
                  })
                // Get the info
                axios
                  .get('http://localhost:8082/api/tickets/' + payload.id)
                  .then(res => {
                    console.log('get request works!')
                  })
              })
              .on('*', event => {
                console.log(event)
              })
              .on('WIDGET_CLOSE', event => {
                this.props.setStep(this.currStep + 1)
              })
              .show()
          }}
        >
          Buy Now
        </Button>

        <Button
          onClick={() => {
            this.props.setStep(this.currStep + 1)
          }}
        >
          Next Step
        </Button>
      </div>
    )
  }
}

export default Step1
