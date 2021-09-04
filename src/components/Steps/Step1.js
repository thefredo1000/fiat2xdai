import React from 'react'
import { Text } from '@1hive/1hive-ui'
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk'
import axios from 'axios'

import './Style/Step1.css'

class Step1 extends React.Component {
  constructor(currStep) {
    super(currStep)
    this.currStep = currStep.children
  }

  componentDidMount() {
    this.loadRamp()
  }

  loadRamp() {
    var rampContainer = document.createElement('div')
    rampContainer.id = 'ramp-container'
    rampContainer.style.height = '600px'
    document.getElementById('container').appendChild(rampContainer)

    // Rikeby test SDK
    new RampInstantSDK({
      hostAppName: 'Fiat to xDai',
      hostLogoUrl: 'https://ramp.network/assets/images/Logo.svg',
      swapAsset: 'XDAI',
      hostApiKey: 'sca3hysq6tknkgyery4w6xxktd3wufygnmaut3zy',
      variant: 'embedded-desktop',
      containerNode: rampContainer,
    })
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
          connected: false
        }
        // Save the info
        axios.post('http://localhost:8082/api/tickets', payload).then(res => {
          console.log('post request works')
        })
        // Get the info
        axios
          .get('http://localhost:8082/api/tickets/' + payload.id)
          .then(res => {
            window.$id = res.data.id
            window.$fiatValue = res.data.fiatValue
          })
        this.setStep(this.currStep + 1)
      })
      .show()
  }

  render() {
    return (
      <div className="step1Container">
        <h1 className="rampTitle">Buy xDai With Fiat</h1>
        <div className="rampParagraph">
          <Text>
            Zero Bridging Fees From Mainnet. Use the RAMP platform to skip the
            fuss of bridging and get straight to trading.
          </Text>
        </div>
      </div>
    )
  }
}

export default Step1
