import React from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import StepsHeader from './StepsHeader'

/*
  The Step Wizard manages the view for each step
  */

function StepWizard() {
  var currStep = 1
  return (
    <div
      css={`
        margin: 5%;
      `}
    >
      <StepsHeader>{currStep}</StepsHeader>
      <div
        css={`
          background-color: white;
          border-radius: 5px;
          border: 1px solid #efefef;
        `}
      >
        {currStep === 1 && <Step1> </Step1> /* Loads the first step */}
        {currStep === 2 && <Step2> </Step2> /* Loads the second step */}
      </div>
    </div>
  )
}

export default StepWizard
