import React from 'react'
import AccountModuleAlt from '../Account/AccountModuleAlt'
import { Link } from '@1hive/1hive-ui'

import MetamaskDownload from '../../assets/metamask-download.png'

class Step4 extends React.Component {
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
      </div>
    )
  }
}

export default Step4
