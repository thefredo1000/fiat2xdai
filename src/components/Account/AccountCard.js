import React from 'react'
import { useWallet } from 'use-wallet'
import {
  Button,
  GU,
  RADIUS,
  ButtonBase,
  IconCopy,
  textStyle,
  IconCheck,
  useTheme,
} from '@1hive/1hive-ui'

import IdentityBadge from '../IdentityBadge'
import { getProviderFromUseWalletId } from '../../ethereum-providers'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'

function AccountCard() {
  const copy = useCopyToClipboard()
  const theme = useTheme()
  const wallet = useWallet()

  const providerInfo = getProviderFromUseWalletId(wallet.activated)

  return (
    <div
      css={`
        width: 75%;
        border: 1px solid #efefef;
        border-radius: 10px;
        padding: 5%;
      `}
    >
      <div
        css={`
          display: flex;
          align-items: center;
          width: 100%;
        `}
      >
        <div
          css={`
            display: flex;
            align-items: center;
            margin-right: ${3 * GU}px;
          `}
        >
          <img
            src={providerInfo.image}
            alt=""
            css={`
              width: ${2.5 * GU}px;
              height: ${2.5 * GU}px;
              margin-right: ${0.5 * GU}px;
              transform: translateY(-2px);
            `}
          />
          <span>
            {providerInfo.id === 'unknown' ? 'Wallet' : providerInfo.name}
          </span>
        </div>
        <div
          css={`
            display: flex;
            align-items: center;
            justify-content: flex-end;
            width: 100%;
          `}
        >
          <ButtonBase
            onClick={() => copy(wallet.account)}
            focusRingRadius={RADIUS}
            css={`
              display: flex;
              align-items: center;
              justify-self: flex-end;
              padding: ${0.5 * GU}px;
              &:active {
                background: ${theme.surfacePressed};
              }
            `}
          >
            <IdentityBadge
              entity={wallet.account}
              compact
              badgeOnly
              css="cursor: pointer"
            />
            <IconCopy
              css={`
                color: ${theme.hint};
              `}
            />
          </ButtonBase>
        </div>
      </div>
      <div
        css={`
          display: flex;
          align-items: center;
          margin-top: ${1 * GU}px;
          color: ${theme.positive};
          ${textStyle('label2')};
        `}
      >
        <IconCheck size="small" />
        <span
          css={`
            margin-left: ${0.5 * GU}px;
          `}
        >
          Connected to xDai Network
        </span>
      </div>
      <Button
        onClick={() => wallet.deactivate()}
        mode="strong"
        wide
        css={`
          margin-top: ${1 * GU}px;
        `}
      >
        Disconnect wallet
      </Button>
    </div>
  )
}

export default AccountCard
