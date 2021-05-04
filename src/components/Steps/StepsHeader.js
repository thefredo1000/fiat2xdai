import React from 'react'
import {
  IconCircleCheck,
  IconCross,
  Table,
  TableRow,
  TableCell,
  Text,
  ProgressBar,
} from '@1hive/1hive-ui'

function StepHeader(step) {
  const cellCSS = `
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center`
  var currStep = step.children

  var numOfSteps = 5
  var iconSize = numOfSteps > 6 ? 'medium' : 'tiny'

  var stepList = []
  for (var i = 1; i <= numOfSteps; i++) {
    stepList.push(
      <TableCell>
        <Text css={cellCSS}>
          {currStep >= i + 1 ? (
            <IconCircleCheck size={iconSize} />
          ) : (
            <IconCross size={iconSize} />
          )}
          <br />
          Step {i}
        </Text>
      </TableCell>
    )
    if (i + 1 <= numOfSteps && numOfSteps < 6) {
      stepList.push(
        <TableCell css="width: 10%">
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
