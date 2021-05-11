import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useWallet } from 'use-wallet'
import {
  Button,
  GU,
  RADIUS,
  IconConnect,
  springs,
  ButtonBase,
  useTheme,
  IconCopy,
  Text,
  textStyle,
  IconCheck,
  IconArrowRight,
} from '@1hive/1hive-ui'
import { Transition, animated } from 'react-spring/renderprops'

import IdentityBadge from '../IdentityBadge'
import ScreenError from './ScreenError'
import ScreenProvidersAlt from './ScreenProvidersAlt'
import ScreenConnected from './ScreenConnected'
import ScreenConnecting from './ScreenConnecting'
import HeaderPopover from '../Header/HeaderPopover'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'
import { getProviderFromUseWalletId } from '../../ethereum-providers'

import { getUseWalletProviders } from '../../lib/web3-utils'

const SCREENS = [
  {
    id: 'providers',
    title: 'xDai Chain Provider',
    height:
      4 * GU + // header
      (12 + 1.5) * GU * (getUseWalletProviders().length / 2) + // buttons
      7 * GU, // footer
  },
  {
    id: 'connecting',
    title: 'xDai Chain Provider',
    height: 38 * GU,
  },
  {
    id: 'connected',
    title: 'Active wallet',
    height: 22 * GU,
  },
  {
    id: 'error',
    title: 'xDai Chain Provider',
    height: 50 * GU,
  },
]

function AccountModuleAlt(props, { compact }) {
  console.log(props)
  const theme = useTheme()
  const copy = useCopyToClipboard()
  const buttonRef = useRef()
  const wallet = useWallet()
  const [opened, setOpened] = useState(false)
  const [animate, setAnimate] = useState(false)
  const [activatingDelayed, setActivatingDelayed] = useState(false)
  const [activationError, setActivationError] = useState(null)
  const popoverFocusElement = useRef()

  const { account, activating } = wallet

  const clearError = useCallback(() => setActivationError(null), [])

  const toggle = useCallback(() => setOpened(opened => !opened), [])

  const providerInfo = getProviderFromUseWalletId(wallet.activated)

  const handleCancelConnection = useCallback(() => {
    wallet.deactivate()
  }, [wallet])

  const activate = useCallback(
    async providerId => {
      try {
        await wallet.activate(providerId)
      } catch (error) {
        setActivationError(error)
      }
    },
    [wallet]
  )

  // Don’t animate the slider until the popover has opened
  useEffect(() => {
    if (!opened) {
      return
    }
    setAnimate(false)
    const timer = setTimeout(() => {
      setAnimate(true)
    }, 0)
    return () => clearTimeout(timer)
  }, [opened])

  // Always show the “connecting…” screen, even if there are no delay
  useEffect(() => {
    if (activationError) {
      setActivatingDelayed(null)
    }

    if (activating) {
      setActivatingDelayed(activating)
      return
    }

    const timer = setTimeout(() => {
      setActivatingDelayed(null)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [activating, activationError])

  const previousScreenIndex = useRef(-1)

  const { screenIndex, direction } = useMemo(() => {
    const screenId = (() => {
      if (activationError) return 'error'
      if (activatingDelayed) return 'connecting'
      if (account) return 'connected'
      return 'providers'
    })()

    const screenIndex = SCREENS.findIndex(screen => screen.id === screenId)
    const direction = previousScreenIndex.current > screenIndex ? -1 : 1

    previousScreenIndex.current = screenIndex

    return { direction, screenIndex }
  }, [account, activationError, activatingDelayed])

  const screen = SCREENS[screenIndex]
  const screenId = screen.id

  const handlePopoverClose = useCallback(
    reject => {
      if (screenId === 'connecting' || screenId === 'error') {
        // reject closing the popover
        return false
      }
      setOpened(false)
      setActivationError(null)
    },
    [screenId]
  )

  // Prevents to lose the focus on the popover when a screen leaves while an
  // element inside is focused (e.g. when clicking on the “disconnect” button).
  useEffect(() => {
    if (popoverFocusElement.current) {
      popoverFocusElement.current.focus()
    }
  }, [screenId])

  return (
    <div css="width: 100%">
      <h1
        css={`
          margin-top: 0px;
          font-size: 40px;
          font-weight: 700;
          font-family: Poppins, sans-serif;
        `}
      >
        {screen.id === 'connected'
          ? 'Active Wallet'
          : 'Connect your Metamask account for Honeyswap'}
      </h1>
      <div
        css={`
          padding: 5% 0%;
        `}
      >
        <Text>
          To swap your xDai to Honey using Honeyswap you need to enable your
          Metamask account.
        </Text>
      </div>
      <div
        ref={buttonRef}
        tabIndex="0"
        css={`
          display: flex;
          justify-content: space-around;
          outline: 0;
        `}
      >
        {screen.id === 'connected' ? (
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
        ) : (
          <div>
            <Button
              icon={<IconConnect />}
              label="Enable Account"
              onClick={toggle}
              display={compact ? 'icon' : 'all'}
              mode="strong"
              wide
              css={`
                margin-top: ${2 * GU}px;
              `}
            />
          </div>
        )}

        <HeaderPopover
          animateHeight={animate}
          heading={screen.title}
          height={screen.height}
          width={51 * GU}
          onClose={handlePopoverClose}
          opener={buttonRef.current}
          visible={opened}
        >
          <div ref={popoverFocusElement} tabIndex="0" css="outline: 0">
            <Transition
              native
              immediate={!animate}
              config={springs.smooth}
              items={{
                screen,
                // This is needed because use-wallet throws an error when the
                // activation fails before React updates the state of `activating`.
                // A future version of use-wallet might return an
                // `activationError` object instead, making this unnecessary.
                activating: screen.id === 'error' ? null : activatingDelayed,
                wallet,
              }}
              keys={({ screen }) => screen.id + activatingDelayed}
              from={{
                opacity: 0,
                transform: `translate3d(${3 * GU * direction}px, 0, 0)`,
              }}
              enter={{ opacity: 1, transform: `translate3d(0, 0, 0)` }}
              leave={{
                opacity: 0,
                transform: `translate3d(${3 * GU * -direction}px, 0, 0)`,
              }}
            >
              {({ screen, activating, wallet }) => ({ opacity, transform }) => (
                <animated.div
                  style={{ opacity, transform }}
                  css={`
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                  `}
                >
                  {(() => {
                    if (screen.id === 'connecting') {
                      return (
                        <ScreenConnecting
                          providerId={activating}
                          onCancel={handleCancelConnection}
                        />
                      )
                    }
                    if (screen.id === 'connected') {
                      return <ScreenConnected wallet={wallet} />
                    }
                    if (screen.id === 'error') {
                      return (
                        <ScreenError
                          error={activationError}
                          onBack={clearError}
                        />
                      )
                    }
                    return <ScreenProvidersAlt onActivate={activate} />
                  })()}
                </animated.div>
              )}
            </Transition>
          </div>
        </HeaderPopover>
      </div>
      <br />
      <div css="display: block; padding-left: 75%;">
        {screen.id === 'connected' ? (
          <Button
            icon={<IconArrowRight />}
            display={compact ? 'icon' : 'all'}
            onClick={() => {
              props.setStep(props.currStep + 1)
            }}
            label="Continue"
            css="display: flex; justify-content: right; align-items:right;"
          />
        ) : (
          <Text> </Text>
        )}
      </div>
    </div>
  )
}

export default AccountModuleAlt