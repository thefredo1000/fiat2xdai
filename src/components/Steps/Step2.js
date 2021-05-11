import React from 'react'
import AccountModuleAlt from '../Account/AccountModuleAlt'

import HoneyswapInt from '../../assets/honeyswap-interface.svg'

class Step2 extends React.Component {
  constructor(currStep) {
    super(currStep)
    this.currStep = currStep.children
  }

  render() {
    return (
      <div
        css={`
          padding: 2% 5% 0% 5%;
          justify-content: space-between;
          display: flex;
          align-items: center;
        `}
      >
        <div
          css={`
            margin-top: -10%;
          `}
        >
          <AccountModuleAlt
            currStep={this.currStep}
            setStep={this.props.setStep}
          />
        </div>
        <img
          src={HoneyswapInt}
          alt="Honeyswap"
          css={`
            width: 850px;
            padding-left: 10%;
            padding-right: 5%;
          `}
        />
      </div>
    )
  }
}

export default Step2
