import React from 'react'
import {
  IconCircleCheck,
  IconCross,
  Table,
  TableRow,
  TableCell,
  ProgressBar,
  IconTarget,
} from '@1hive/1hive-ui'

import './Style/StepsHeader.css'

function StepHeader(step) {
  var currStep = step.children

  var numOfSteps = 7
  var iconSize = numOfSteps > 6 ? 'medium' : 'small'

  var stepList = []
  var stepIcon
  for (var i = 1; i <= numOfSteps; i++) {
    if (currStep > i) {
      stepIcon = <IconCircleCheck size={iconSize} />
    } else if (currStep === i) {
      stepIcon = <IconTarget size={iconSize} />
    } else {
      stepIcon = <IconCross size={iconSize} />
    }
    stepList.push(
      <TableCell className="tableCell">
        <div className="cellContainer">
          {stepIcon}
          <div className="cellText">Step {i}</div>
        </div>
      </TableCell>
    )
    if (i + 1 <= numOfSteps && numOfSteps < 10) {
      stepList.push(
        <TableCell className="cellProgressBar">
          <ProgressBar
            value={currStep >= i + 1 ? 1.0 : 0.0}
            animate={currStep > i}
          />
        </TableCell>
      )
    }
  }

  return (
    <div css="text-align: center">
      <Table noSideBorders={false}>
        <TableRow>{stepList}</TableRow>
      </Table>
      <br />
    </div>
  )
}

export default StepHeader
