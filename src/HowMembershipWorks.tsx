import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'

import { color, font } from './theme'
import { mediaQueries } from './mediaQueries'

const i18n = {
  t: (value: string) => value,
}

const Trans = ({ i18nKey, children }) => children

const Link = 'a'

const HowMembershipWorkContainer = styled.div`
  background: ${color.primaryVariant6};
  text-align: center;
  padding: 34px 0;
  overflow: hidden;
`

const Header = styled.span`
  font-family: ${font.bold};
  color: ${color.textVariant8};
  line-height: 1.21;
  margin-bottom: 34px;

  ${mediaQueries.sm.max`font-size: 22px`}
  ${mediaQueries.md.min`font-size: 28px`}
`

const ListContainer = styled.div`
  display: flex;
  position: relative;
`

const ShadowsOverlay = styled.div`
  pointer-events: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;

  &.left {
    background: linear-gradient(
      to right,
      ${color.primaryVariant6},
      rgba(255, 255, 255, 0)
    );
    background-size: 45px 100%;
    background-repeat: no-repeat;
  }

  &.right {
    background: linear-gradient(
      to left,
      ${color.primaryVariant6},
      rgba(255, 255, 255, 0)
    );
    background-position-x: 100%;
    background-size: 45px 100%;
    background-repeat: no-repeat;
  }

  &.left-and-right {
    background: linear-gradient(
        to right,
        ${color.primaryVariant6},
        rgba(255, 255, 255, 0)
      ),
      linear-gradient(to left, ${color.primaryVariant6}, rgba(255, 255, 255, 0))
        100% 100%;
    background-size: 45px 100%, 45px 100%;
    background-repeat: no-repeat;
  }
`

const List = styled.ol`
  display: flex;
  margin: 0 auto;
  padding: 0;
  overflow-x: auto;
  scroll-snap-type: x mandatory;

  /* Hide scrollbar in Firefox */
  scrollbar-width: none;

  /* Hide scrollbar in Webkit */
  ::-webkit-scrollbar {
    display: none;
  }

  /* List item number styling */

  --number-circle-size: 32px;
  list-style: none;
  counter-reset: list-counter;

  > li {
    counter-increment: list-counter;
    position: relative;
    padding-top: calc(var(--number-circle-size) - 6px);
    padding-left: 17px;
    padding-right: 17px;
    width: calc(220px + 17px);
    min-width: calc(220px + 17px);
    scroll-snap-align: center;
  }

  > li::before {
    content: counter(list-counter);
    color: ${color.text};
    background: ${color.background2};
    position: absolute;
    border-radius: 50%;
    line-height: var(--number-circle-size);
    width: var(--number-circle-size);
    height: var(--number-circle-size);
    left: calc(50% - var(--number-circle-size) / 2);
    top: 0;
  }
`

const Description1 = styled.p`
  font-family: ${font.bold};
  color: ${color.textVariant8};
  background: ${color.primaryVariant7};
  font-size: 18px;
  line-height: 1.44;
  border-radius: 4px;
  padding: 14px 6px;
`

const Description2 = styled.p`
  font-family: ${font.regular};
  color: ${color.textVariant8};
  font-size: 16px;
  line-height: 1.38;
`

const Description3 = styled.p`
  font-family: ${font.regular};
  color: ${color.textVariant8};
  font-size: 14px;
  line-height: 1.29;

  strong {
    font-family: ${font.bold};
  }
`

const StyledLink = styled(Link)`
  font-family: ${font.bold};
  color: ${color.primary};
  font-size: 16px;
  line-height: 1.63;
`

const ScrollDotContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  > * + * {
    margin-left: 10px;
  }
`

const ScrollDot = styled.button<{ active?: boolean }>`
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) =>
    active ? color.primary : color.textVariant9};

  :focus {
    outline-offset: 3px;
  }
`

export const HowMembershipWork: React.FC<{}> = () => {
  const listRef = React.useRef<HTMLOListElement>(null)

  const [listIsOverflowed, setListIsOverflowed] = React.useState(false)
  const [isLIVisible, setIsLIVisible] = React.useState<
    [boolean, boolean, boolean, boolean]
  >([false, false, false, false])

  function handleListItemVisibilityChange(): void {
    function isChildAtIndexVisible(index: number): boolean {
      if (listRef.current) {
        const { scrollLeft, offsetWidth } = listRef.current
        const { children } = listRef.current
        const child = children[index] as HTMLLIElement
        const midpoint = child.offsetLeft + child.offsetWidth / 2
        const isChildVisible =
          scrollLeft + offsetWidth > midpoint && scrollLeft < midpoint
        return isChildVisible
      }

      return false
    }

    const isFirstLIVisibe = isChildAtIndexVisible(0)
    const isSecondLIVisible = isChildAtIndexVisible(1)
    const isThirdLIVisible = isChildAtIndexVisible(2)
    const isFourthVisible = isChildAtIndexVisible(3)
    setIsLIVisible([
      isFirstLIVisibe,
      isSecondLIVisible,
      isThirdLIVisible,
      isFourthVisible,
    ])
  }

  React.useEffect(() => {
    function handleResize(): void {
      const _listIsOverflowed = listRef.current
        ? listRef.current.offsetWidth < listRef.current.scrollWidth
        : false
      setListIsOverflowed(_listIsOverflowed)
      handleListItemVisibilityChange()
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  function scrollIntoView(index: number): () => void {
    return (): void => {
      listRef.current?.children[index]?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <HowMembershipWorkContainer>
      <Header as="h2">{i18n.t('How membership works')}</Header>

      <ListContainer>
        <ShadowsOverlay
          className={classnames({
            left:
              listRef.current &&
              listRef.current.scrollLeft + listRef.current.offsetWidth ===
                listRef.current.scrollWidth,
            right: listRef.current && listRef.current.scrollLeft === 0,
            'left-and-right':
              listRef.current &&
              listRef.current.scrollLeft > 0 &&
              listRef.current.scrollLeft + listRef.current.offsetWidth <
                listRef.current.scrollWidth,
          })}
        />
        <List ref={listRef} onScroll={handleListItemVisibilityChange}>
          <li>
            <Description1>
              {i18n.t('Choose a plan and who’s covered.')}
            </Description1>

            <Description2>
              {i18n.t(
                'Stitch works with your health insurance to protect your finances.*',
              )}
            </Description2>

            <Description3>
              <Trans i18nKey="Membership begins 30 days and then the first of the month after signing up">
                *Membership begins <strong>30 days</strong> and then the first
                of the month after signing up.
              </Trans>
            </Description3>
          </li>

          <li>
            <Description1>
              {i18n.t('You or a loved one ends up injured or sick.')}
            </Description1>

            <Description2>
              {i18n.t(
                'Your health insurance pays a portion, but if you have a high deductible you might be left with a bunch of bills.',
              )}
            </Description2>

            <StyledLink to={'#'}>{i18n.t('See what we mean')}</StyledLink>
          </li>

          <li>
            <Description1>
              {i18n.t('File a claim online with Stitch.')}
            </Description1>

            <Description2>
              {i18n.t(
                'It’s easy to file a claim online and get the help you need right away. We pay you based on your treatments or diagnosis.',
              )}
            </Description2>
            <StyledLink to={'#'}>{i18n.t('See how claims work')}</StyledLink>
          </li>

          <li>
            <Description1>
              {i18n.t('Use the money however you want.')}
            </Description1>

            <Description2>
              {i18n.t(
                'Unlike your health insurance, you can use the money to pay for anything; from your mortgage bill to groceries.',
              )}
            </Description2>
          </li>
        </List>
      </ListContainer>

      {listIsOverflowed && (
        <ScrollDotContainer>
          <ScrollDot
            active={isLIVisible[0]}
            onClick={scrollIntoView(0)}
            aria-label={i18n.t('Scroll to No. 1')}
          />
          <ScrollDot
            active={isLIVisible[1]}
            onClick={scrollIntoView(1)}
            aria-label={i18n.t('Scroll to No. 2')}
          />
          <ScrollDot
            active={isLIVisible[2]}
            onClick={scrollIntoView(2)}
            aria-label={i18n.t('Scroll to No. 3')}
          />
          <ScrollDot
            active={isLIVisible[3]}
            onClick={scrollIntoView(3)}
            aria-label={i18n.t('Scroll to No. 4')}
          />
        </ScrollDotContainer>
      )}
    </HowMembershipWorkContainer>
  )
}
