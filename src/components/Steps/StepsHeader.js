import React from 'react'
import {
  IconCoin,
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
  return (
    <div css="text-align: center">
      <Table noSideBorders={false}>
        <TableRow>
          <TableCell>
            <Text css={cellCSS}>
              <IconCoin size="large" />
              <br />
              Step 1
            </Text>
          </TableCell>

          <TableCell>
            <ProgressBar value={currStep === 2 ? 1.0 : 0.0} />
          </TableCell>

          <TableCell>
            <Text css={cellCSS}>
              <IconCoin size="large" />
              <br />
              Step 2
            </Text>
          </TableCell>

          <TableCell>
            <ProgressBar value={currStep === 3 ? 1.0 : 0.0} />
          </TableCell>

          <TableCell>
            <Text css={cellCSS}>
              <IconCoin size="large" />
              <br />
              Step 3
            </Text>
          </TableCell>

          <TableCell>
            <ProgressBar value={currStep === 4 ? 1.0 : 0.0} />
          </TableCell>

          <TableCell>
            <Text css={cellCSS}>
              <IconCoin size="large" />
              <br />
              Step 4
            </Text>
          </TableCell>
        </TableRow>
      </Table>
      <br />
      Step {step.children}
    </div>
  )
}

export default StepHeader
