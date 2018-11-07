// ----------------
// config

// dimensions
export const TIMER_WIDTH = 400
export const TIMER_HEIGHT = 400
export const BLOB_DIAMETER = 64

// blob margin
export const BLOB_MARGIN_TOP = 300

// sticky depth
export const STICKY_ACTIVE_DEPTH = -24
export const STICKY_INACTIVE_DEPTH = 4
export const STICKY_HIDDEN_DEPTH = BLOB_DIAMETER + 12

// collision
export const BLOB_COLLISION_MARGIN = 40

// ----------------
// computed

// blob positions
export const BLOB_POSITION_LEFT = {
  active: -STICKY_ACTIVE_DEPTH,
  inactive: -STICKY_INACTIVE_DEPTH,
  hidden: -STICKY_HIDDEN_DEPTH
}
export const BLOB_POSITION_RIGHT = {
  active: window.screen.availWidth - (BLOB_DIAMETER - STICKY_ACTIVE_DEPTH),
  inactive: window.screen.availWidth - (BLOB_DIAMETER - STICKY_INACTIVE_DEPTH),
  hidden: window.screen.availWidth - (BLOB_DIAMETER - STICKY_HIDDEN_DEPTH)
}

// blob margins
export const BLOB_MARGIN_BOTTOM = TIMER_HEIGHT - (BLOB_MARGIN_TOP + BLOB_DIAMETER)
export const BLOB_MARGIN_X = (TIMER_WIDTH - BLOB_DIAMETER) / 2 // centered
export const BLOB_MARGIN_LEFT = BLOB_MARGIN_X // for consistency
export const BLOB_MARGIN_RIGHT = BLOB_MARGIN_X // for consistency

// exports
export const BLOB_POSITION = {}
export const STICKY_X_TIMER = {}
export const TIMER_COLLISION = {}

// sticky blob position
BLOB_POSITION.left = BLOB_POSITION_LEFT
BLOB_POSITION.right = BLOB_POSITION_RIGHT

// timer collision top bottom
TIMER_COLLISION.top = BLOB_MARGIN_TOP - BLOB_COLLISION_MARGIN
TIMER_COLLISION.bottom = BLOB_MARGIN_BOTTOM - BLOB_COLLISION_MARGIN

// timer collision x left right
TIMER_COLLISION.x = {
  active: BLOB_MARGIN_LEFT - BLOB_POSITION_LEFT.active,
  inactive: BLOB_MARGIN_LEFT - BLOB_POSITION_LEFT.inactive,
  hidden: BLOB_MARGIN_LEFT - BLOB_POSITION_LEFT.hidden
}

export const TIMER_POSITION_Y_CENTER =
  (window.screen.availHeight - BLOB_DIAMETER) / 2
