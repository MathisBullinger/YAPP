export function formatTimeStamp(totalSeconds: number, crop = false): string {
  totalSeconds |= 0
  const seconds = totalSeconds % 60
  const minutes = ((totalSeconds - seconds) / 60) % 60
  const hours = (totalSeconds - minutes * 60 - seconds) / 60 ** 2

  let timeStr = [hours, minutes, seconds]
    .map(n => ('0' + n).substr(-2))
    .join(':')

  if (crop)
    while (timeStr.length && ['0', ':'].includes(timeStr[0]))
      timeStr = timeStr.substring(1)

  return timeStr
}
