import React from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import StepsHeader from './StepsHeader'

/*
  The Step Wizard manages the view for each step
  */

class StepWizard extends React.Component {
  constructor(props) {
    super(props)
    this.setStep = this.setStep.bind(this)
    this.currStep = 1
  }

  setStep(currStep) {
    this.currStep = currStep
    this.forceUpdate()
  }

  // Maybe create an array for each step?
  render() {
    return (
      <div
        css={`
          margin: 5%;
        `}
      >
        <StepsHeader>{this.currStep}</StepsHeader>
        <div
          css={`
            background-color: white;
            border-radius: 5px;
            border: 1px solid #efefef;
          `}
        >
          {this.currStep === 1 && (
            <Step1 setStep={this.setStep}>
              {this.currStep}
            </Step1> /* Loads the first step */
          )}
          {this.currStep === 2 && (
            <Step2 setStep={this.setStep}>
              {this.currStep}
            </Step2> /* Loads the Second step */
          )}
          {this.currStep === 3 && (
            <Step3 setStep={this.setStep}>
              {this.currStep}
            </Step3> /* Loads the Third step */
          )}
        </div>
      </div>
    )
  }
}

export default StepWizard
