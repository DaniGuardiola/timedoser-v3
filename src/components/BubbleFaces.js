// react
import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { normalizeDigits } from '../modules/time-lib'
import Icon from './icons'

// ----------------
// utils

const styleSwitch = (prop, options) => props => options[props[prop]] || ''

// ----------------
// style constants

const STYLE = {
  duration: 2,
  blobTransitionDuration: 0.4,
  blobTimingFunction: 'ease-in-out',
  blobLoadingColor: '#fff',
  blobLoadingCursor: 'progress',
  blobStandbyColor: '#607d8b',
  blobWorkColor: '#2196f3',
  blobWorkEndColor: '#1976d2',
  blobBreakColor: '#009688'
}

const ANIM = {
  blobWaveScroll: keyframes`
    from {
      margin-left: 0px;
    }

    to {
      margin-left: -220px;
    }`,
  blobWaveScrollLoading: keyframes`
    from {
      margin-left: 0px;
    }

    to {
      margin-left: -240px;
    }`,
  blobWaveColors: keyframes`
    0% {
      stroke: #009688;
    }
    25% {
      stroke: #2196f3;
    }
    50% {
      stroke: #9c27b0;
    }
    75% {
      stroke: #2196f3;
    }
    100% {
      stroke: #009688;
    }`,
  blobWaveDraw: keyframes`
    from {
      stroke-dashoffset: 0;
    }

    to {
      stroke-dashoffset: -336;
    }`
}

// ----------------
// generic styles

const layerStyles = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;`

const transitionSetup = css`
  transition-duration: ${STYLE.blobTransitionDuration}s;
  transition-timing-function: ${STYLE.blobTimingFunction};`

const defaultTransition = p => css`
  ${p => console.log('yooooooooooooo!!!!', p)}
  opacity: ${p.on ? 1 : 0};
  ${transitionSetup}
  transition-property: opacity;`

// ----------------
// break layer

const BreakDiv = styled.div`
  ${layerStyles}
  ${defaultTransition}`

function Break (props) {
  return (
    <BreakDiv {...props}>
      <Icon icon='start' size={30} />
    </BreakDiv>
  )
}

// ----------------
// start layer

const StartDiv = styled.div`
  ${layerStyles}
  ${defaultTransition}
  display: flex;
  align-items: center;
  justify-content: center;`

function Start (props) {
  return (
    <StartDiv {...props}>
      <Icon icon='start' size={30} shadow />
    </StartDiv>
  )
}

// ----------------
// time layer

const TimeDiv = styled.div`
  ${layerStyles}
  ${defaultTransition}`

const TimeSpan = styled.span`
  text-align: center;
  color: #fff;
  display: block;
  line-height: 40px;
  height: 40px;
  width: 60px;
  margin: 50% 0 0 50%;
  transform: translate(-50%, -50%);
  font-weight: 700;
  font-family: Inconsolata;`

const MM = styled.span`
  ${p => p.hidden && 'display: none;'}
  font-size: ${p => p.big ? 36 : 28}px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);`

const SS = styled.span`
  font-size: ${p => p.big ? 34 : p.small ? 20 : 24}px;
  color: ${p => p.big ? '#fff' : 'rgba(255, 255, 255, 0.82)'};`

function Time (props) {
  const { minutes, seconds } = props

  return (
    <TimeDiv {...props}>
      <TimeSpan>
        <MM
          hidden={+minutes <= 0}
          big={+minutes < 10}
        >{minutes}</MM>
        <SS
          big={+minutes <= 0}
          small={+minutes > 9}
        >{normalizeDigits(seconds)}</SS>
      </TimeSpan>
    </TimeDiv>
  )
}

// ----------------
// wave layer

const WaveDiv = styled.div`
  ${layerStyles}`

const waveScrollTransition = p => css`
  margin-top: ${p.on ? '50%' : '100%'};
  transform: translate(0, ${p.on ? '-50%' : '0'});
  opacity: ${p.active && p.on ? 1 : 0.2};
  filter: ${!p.active ? 'blur(2px)' : 'blur(0)'};
  ${transitionSetup}
  transition-property: margin-top, opacity, filter, transform;`

const waveSvgWrapperType = p => styleSwitch('type', {
  dash: css`
    height: 57.5px;
    transform: translate(0, -50%);
    ${defaultTransition}`,
  scroll: css`
    height: 25px;
    ${waveScrollTransition}` })(p)

const WaveSvgWrapper = styled.div`
  width: 100%;
  margin-top: 50%;
  overflow: none;
  ${waveSvgWrapperType}`

const waveSvgType = p => styleSwitch('type', {
  dash: css`
    height: 47.5px;
    border-top: 10px solid transparent;
    animation: ${ANIM.blobWaveScrollLoading} ${STYLE.duration * 4}s cubic-bezier(
      0.72,
      0.41,
      0.41,
      0.72) infinite;`,
  scroll: css`
    height: 25px;
    border-top: 4px solid transparent;
    transform: translate(0, 0);
    animation: ${ANIM.blobWaveScroll} ${STYLE.duration * 7}s linear infinite;` })(p)

const WaveSvg = styled.svg`
  margin-left: -60px;
  fill: none;
  box-sizing: initial;
  ${waveSvgType}`

const wavePathType = p => styleSwitch('type', {
  dash: css`
    animation: ${ANIM.blobWaveColors} ${STYLE.duration * 2}s ease-in-out infinite,
      ${ANIM.blobWaveDraw} ${STYLE.duration * 2}s linear infinite;
    stroke-dashoffset: 0;
    stroke-dasharray: 68 16;
    stroke-width: 4px;`,
  scroll: css`
    stroke-width: ${!p.active ? 12 : 4};
    ${transitionSetup}
    transition-property: stroke-width;` })(p)

const WavePath = styled.path`
  ${wavePathType}  
  stroke: #fff;`

const WavePathD =
      'M 0 20 C 5 5 20 0 30 20 C 35 35 50 40 60 20 C 65 5 80 0 90 20 C 95 35 110 40 120 20 C 125 5 140 0 150 20 C 155 35 170 40 180 20 C 185 5 200 0 210 20 C 215 35 230 40 240 20 C 245 5 260 0 270 20 C 275 35 290 40 300 20 C 305 5 320 0 330 20 C 335 35 350 40 360 20 C 365 5 380 0 390 20 C 395 35 410 40 420 20 C 425 5 440 0 450 20 C 455 35 470 40 480 20 C 485 5 500 0 510 20 C 515 35 530 40 540 20 C 545 5 560 0 570 20 C 575 35 590 40 600 20 C 605 5 620 0 630 20 C 635 35 650 40 660 20 C 665 5 680 0 690 20 C 695 35 710 40 720 20 C 725 5 740 0 750 20 C 755 35 770 40 780 20 C 785 5 800 0 810 20 C 815 35 830 40 840 20 C 845 5 860 0 870 20 C 875 35 890 40 900 20 C 905 5 920 0 930 20 C 935 35 950 40 960 20 C 965 5 980 0 990 20 C 995 35 1010 40 1020 20 C 1025 5 1040 0 1050 20 C 1055 35 1070 40 1080 20 C 1085 5 1100 0 1110 20 C 1115 35 1130 40 1140 20 C 1145 5 1160 0 1170 20 C 1175 35 1190 40 1200 20 C 1205 5 1220 0 1230 20 C 1235 35 1250 40 1260 20 C 1265 5 1280 0 1290 20 C 1295 35 1310 40 1320 20 C 1325 5 1340 0 1350 20 C 1355 35 1370 40 1380 20 C 1385 5 1400 0 1410 20 C 1415 35 1430 40 1440 20 C 1445 5 1460 0 1470 20 C 1475 35 1490 40 1500 20 C 1505 5 1520 0 1530 20 C 1535 35 1550 40 1560 20 C 1565 5 1580 0 1590 20 C 1595 35 1610 40 1620 20 C 1625 5 1640 0 1650 20 C 1655 35 1670 40 1680 20 C 1685 5 1700 0 1710 20 C 1715 35 1730 40 1740 20 C 1745 5 1760 0 1770 20 C 1775 35 1790 40 1800 20 C 1805 5 1820 0 1830 20 C 1835 35 1850 40 1860 20'

function Wave (props) {
  const { type, on, active } = props
  console.log('on', on)
  return (
    <WaveDiv {...props}>
      <WaveSvgWrapper
        type={type}
        on={on}
        active={active}>
        <WaveSvg
          type={type}
          active={active}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1200 47.5'
        >
          <WavePath
            active={active}
            type={type}
            d={WavePathD}
          />
        </WaveSvg>
      </WaveSvgWrapper>
    </WaveDiv>
  )
}

// ----------------
// work end

const WorkEndDiv = styled.div`
  ${layerStyles}
  ${defaultTransition}`

function WorkEnd (props) {
  return (
    <WorkEndDiv {...props}>
      <Icon icon='start' size={30} />
    </WorkEndDiv>
  )
}

// ----------------
// default face

const layersOff = {
  break: false,
  start: false,
  wavedash: false,
  wavescroll: false,
  workend: false
}

const defaultFace = {
  ...layersOff,
  time: false,
  color: '#fff',
  colorLight: '#fff',
  cursor: 'default'
}

// ----------------
// faces

// loading
const loading = {
  wavedash: true,
  color: STYLE.blobLoadingColor,
  cursor: STYLE.blobLoadingCursor
}

// standby
const standby = {
  start: true,
  color: STYLE.blobStandbyColor,
  cursor: 'pointer'
}

// work
const work = {
  wavescroll: true,
  time: true,
  color: STYLE.blobWorkColor
}

// work
const workend = {
  wavescroll: true,
  workend: true,
  color: STYLE.blobWorkEndColor,
  cursor: 'pointer'
}

// break
const breakFace = {
  wavescroll: true,
  break: true,
  time: true,
  color: STYLE.blobBreakColor
}

// ----------------
// all faces

const faces = {
  loading: { ...defaultFace, ...loading },
  work: { ...defaultFace, ...work },
  workend: { ...defaultFace, ...workend },
  break: { ...defaultFace, ...breakFace },
  timeout: { ...defaultFace },
  standby: { ...defaultFace, ...standby }
}

// ----------------
// faces react component

const FacesDiv = styled.div`
  background-color: ${p => p.color};
  cursor: ${p => p.cursor};
  height: 100%;
  width: 100%;
  position: relative;
  ${transitionSetup}
  transition-property: background-color;
  border: 2px solid #fff;
  border-radius: 50%;`

export default function BlobFaces (props) {
  const { draggable, dragging, face, active, time } = props
  console.log(props)

  let f = { ...faces[face] }
  console.log('f.wavedash', f.wavedash)
  console.log('f.wavescroll', f.wavescroll)

  if (dragging || !active) f.time = false

  if (draggable && f.cursor === 'default') f.cursor = 'grab'
  if (dragging) f.cursor = 'grabbing'

  return (
    <FacesDiv
      color={f.color}
      cursor={f.cursor}>
      <Break on={face === 'break' && (dragging || !active)} />
      <Start on={f.start} />
      <Wave on={f.wavedash} type='dash' />
      <Wave on={f.wavescroll} type='scroll' active={face === 'work' && !f.time} />
      <Time on={f.time} {...time} />
      <WorkEnd on={f.workend} />
    </FacesDiv>
  )
}
