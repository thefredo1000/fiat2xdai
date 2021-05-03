import React from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import StepsHeader from './StepsHeader'

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
        {currStep === 1 && <Step1> </Step1>}
        {currStep === 2 && <Step2> </Step2>}
      </div>
    </div>
  )
}

export default StepWizard
