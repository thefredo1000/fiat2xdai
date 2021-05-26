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
      hostLogoUrl:
        'https://cdn-images-1.medium.com/max/2600/1*nqtMwugX7TtpcS-5c3lRjw.png',
      variant: 'embedded-desktop',
      url: 'https://ri-widget-staging.firebaseapp.com/',
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
            console.log('get request works!')
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
