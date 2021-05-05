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

function StepHeader(step) {
  const cellCSS = `
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center
    background-color: #94ddd6;
    width: 70px;
    height: 70px;
    border-radius: 100%;
    padding-top: 15%;
    color: #313635;
    `
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
      <TableCell css="padding: 10px">
        <div css={cellCSS}>
          {stepIcon}
          <div css="display: block; margin-top: -10%;">Step {i}</div>
        </div>
      </TableCell>
    )
    if (i + 1 <= numOfSteps && numOfSteps < 10) {
      stepList.push(
        <TableCell css="width: 15%; padding-left:0px; padding-right: 0px">
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
