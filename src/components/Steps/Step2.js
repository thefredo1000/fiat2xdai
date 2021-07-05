import React from 'react'
import AccountModuleAlt from '../Account/AccountModuleAlt'
import { Link } from '@1hive/1hive-ui'

import MetamaskDownload from '../../assets/metamask-download.png'

class Step2 extends React.Component {
  constructor(currStep) {
    super(currStep)
    this.currStep = currStep.children
  }

  render() {
    return (
      <div
        css={`
          padding: 0% 5% 0% 5%;
          justify-content: space-between;
          display: flex;
          align-items: center;
        `}
      >
        <AccountModuleAlt
          currStep={this.currStep}
          setStep={this.props.setStep}
        />
        <div
          css={`
            width: 70%;
            padding-left: 5%;
            padding-right: 5%;
            padding-top: 10%;
            padding-bottom: 20%;
          `}
        >
          <Link href="https://metamask.io/download">
            <img
              src={MetamaskDownload}
              alt="Metamask"
              css={`
                width: 100%;
              `}
            />
          </Link>
        </div>
      </div>
    )
  }
}

export default Step2
