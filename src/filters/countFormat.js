export default (f, digit) => {
  if (f === 'NaN') return '--'
  let d = digit || 2
  let m = Math.pow(10, d)
  return Math.round(f * m, 10) / m
}
