export function shouldNotifyUser(alertFrequency: number) {
  if (localStorage.getItem('last-notified') == null) {
    localStorage.setItem('last-notified', (+new Date()).toString())
    return true
  }

  const notifyTime = new Date(parseInt(localStorage.getItem('last-notified')!))
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - notifyTime.getTime())
  const minutesPassed = Math.ceil(diffTime / (1000 * 60))

  return minutesPassed > alertFrequency
}
