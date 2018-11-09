// ----------------
// config

// dimensions
export const TIMER_WIDTH = 400
export const TIMER_HEIGHT = 400
export const BUBBLE_DIAMETER = 64

// bubble margin
export const BUBBLE_MARGIN_TOP = 300

// sticky depth
export const STICKY_ACTIVE_DEPTH = -24
export const STICKY_INACTIVE_DEPTH = 4
export const STICKY_HIDDEN_DEPTH = BUBBLE_DIAMETER + 12

// collision
export const BUBBLE_COLLISION_MARGIN = 40

// ----------------
// computed

// bubble positions
export const BUBBLE_POSITION_LEFT = {
  active: -STICKY_ACTIVE_DEPTH,
  inactive: -STICKY_INACTIVE_DEPTH,
  hidden: -STICKY_HIDDEN_DEPTH
}
export const BUBBLE_POSITION_RIGHT = {
  active: window.screen.availWidth - (BUBBLE_DIAMETER - STICKY_ACTIVE_DEPTH),
  inactive: window.screen.availWidth - (BUBBLE_DIAMETER - STICKY_INACTIVE_DEPTH),
  hidden: window.screen.availWidth - (BUBBLE_DIAMETER - STICKY_HIDDEN_DEPTH)
}

// bubble margins
export const BUBBLE_MARGIN_BOTTOM = TIMER_HEIGHT - (BUBBLE_MARGIN_TOP + BUBBLE_DIAMETER)
export const BUBBLE_MARGIN_X = (TIMER_WIDTH - BUBBLE_DIAMETER) / 2 // centered
export const BUBBLE_MARGIN_LEFT = BUBBLE_MARGIN_X // for consistency
export const BUBBLE_MARGIN_RIGHT = BUBBLE_MARGIN_X // for consistency

// exports
export const BUBBLE_POSITION = {}
export const STICKY_X_TIMER = {}
export const TIMER_COLLISION = {}

// sticky bubble position
BUBBLE_POSITION.left = BUBBLE_POSITION_LEFT
BUBBLE_POSITION.right = BUBBLE_POSITION_RIGHT

// timer collision top bottom
TIMER_COLLISION.top = BUBBLE_MARGIN_TOP - BUBBLE_COLLISION_MARGIN
TIMER_COLLISION.bottom = BUBBLE_MARGIN_BOTTOM - BUBBLE_COLLISION_MARGIN

// timer collision x left right
TIMER_COLLISION.x = {
  active: BUBBLE_MARGIN_LEFT - BUBBLE_POSITION_LEFT.active,
  inactive: BUBBLE_MARGIN_LEFT - BUBBLE_POSITION_LEFT.inactive,
  hidden: BUBBLE_MARGIN_LEFT - BUBBLE_POSITION_LEFT.hidden
}

export const TIMER_POSITION_Y_CENTER =
  (window.screen.availHeight - BUBBLE_DIAMETER) / 2
