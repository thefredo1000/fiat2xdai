import React from 'react'

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
        THIS IS WORK IN PROGRESS!
      </div>
    )
  }
}

export default Step4
