import { useState, useEffect } from 'react'
import interact from 'interactjs'
import * as $ from '../constants'

export default class Drag {
  constructor (selector, opt) {
    this.enabled = false

    this.selector = selector
    this.dragging = false

    this.handle = opt.handle || this.selector
    this.restrict = opt.restrict
      ? {
        restriction: 'parent',
        endOnly: true,
        elementRect: opt.restrict
      }
      : null

    this.x = null
    this.y = null

    const nothing = () => {}

    this._onStart = opt.start || nothing
    this._onEnd = opt.end || nothing
    this._onInertia = opt.inertia || nothing

    this._setup()
  }

  // ----------------
  // enable / disable

  enable () {
    if (this.enabled) return
    this.enabled = true

    this.interact.draggable({
      enabled: true
    })
  }

  disable () {
    if (!this.enabled) return
    this.enabled = false

    this.interact.draggable({
      enabled: false
    })
  }

  cleanup () {
    this.interact.unset()
  }

  // ----------------
  // setup

  _setup () {
    this.interact = interact(this.selector, {
      allowFrom: this.handle
    })
    this.interact.draggable({
      enabled: false,
      inertia: {
        resistance: 7,
        minSpeed: 100,
        endSpeed: 20
      },
      onstart: e => this._start(e),
      onmove: e => this._move(e),
      onend: e => this._end(e),
      oninertiastart: e => this._inertia(e),
      restrict: this.restrict || null,
      snap: {
        targets: [{
          x: 0,
          range: Infinity
        }, {
          x: window.innerWidth,
          range: Infinity
        }],
        endOnly: true
      }
    })
  }

  // ----------------
  // lifecycle

  _start (event) {
    if (this.dragging || !this.enabled) return

    this.dragging = true

    const { top, left } = event.target.getClientRects()[0]

    this.x = left
    this.y = top

    this._onStart(event)
  }

  _move (event) {
    const target = event.target

    this.x = (this.x || 0) + event.dx
    this.y = (this.y || 0) + event.dy

    target.style.transform = `translate(${this.x}px, ${this.y}px)`
  }

  _inertia (event) {
    this._onInertia(event)
  }

  _end (event) {
    if (!this.dragging) return

    this.dragging = false

    event.target.style.transform = ''

    this._onEnd(event)
  }
}

export function useDrag (opt, n) {
  const [drag, setDrag] = useState()

  // setup and cleanup
  useEffect(() => {
    const { top, bottom, x } = $.TIMER_COLLISION

    const restrict = {
      top: top / $.TIMER_HEIGHT,
      bottom: 1 - bottom / $.TIMER_HEIGHT,
      left: x.active / $.TIMER_WIDTH,
      right: 1 - x.active / $.TIMER_WIDTH
    }

    const dragInstance = new Drag(opt.class, {
      start: opt.onDrag,
      end: event => {
        opt.onDrop(event.page.x - event.x0, event.page.y - event.y0)
      },
      inertia: opt.onInertiaStart,
      restrict,
      handle: opt.handleClass
    })

    setDrag(dragInstance)

    // return dragInstance.cleanup()
  }, [])

  // enable / disable dragging
  useEffect(() => {
    if (drag) {
      opt.draggable && drag.enable()
      !opt.draggable && drag.disable()
    }
  }, [opt.draggable])

  // component style
  const [transform, setTransform] = useState(false)
  useEffect(() => {
    const posX = opt.x - $.BUBBLE_MARGIN_LEFT
    const posY = opt.y - $.BUBBLE_MARGIN_TOP

    !opt.dragging && setTransform(`translate(${posX}px, ${posY}px)`)
    opt.dragging && setTransform(false)
  }, [opt.dragging, opt.x, opt.y])

  const style = transform ? { transform } : {}

  return style
}
