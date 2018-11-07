export const normalizeDigits = n => `${+n > 9 ? '' : '0'}${n}`

export const normalizeSeconds = s => {
  const minutes = Math.floor(s / 60)
  const seconds = s % 60
  const mm = normalizeDigits(minutes)
  const ss = normalizeDigits(seconds)

  return { total: s, minutes, seconds, mm, ss }
}
