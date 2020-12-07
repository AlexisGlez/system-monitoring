export function formatUptime(uptimeInSeconds: number) {
  const d = Math.floor(uptimeInSeconds / (3600 * 24))
  const h = Math.floor((uptimeInSeconds % (3600 * 24)) / 3600)
  const m = Math.floor((uptimeInSeconds % 3600) / 60)
  const s = Math.floor(uptimeInSeconds % 60)
  return `${d}d, ${h}h, ${m}m, ${s}s`
}
