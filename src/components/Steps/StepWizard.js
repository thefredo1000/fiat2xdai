import React from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import StepsHeader from './StepsHeader'

function StepWizard() {
  var currStep = 1
  return (
    <div
      css={`
        padding: 5%;
      `}
    >
      <StepsHeader>{currStep}</StepsHeader>

      {currStep === 1 && <Step1> </Step1>}
      {currStep === 2 && <Step2> </Step2>}
    </div>
  )
}

export default StepWizard
