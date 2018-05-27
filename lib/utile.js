

export function isLarge() {
  return process.client && window.outerWidth > 1264
}

export function isMedium() {
  return  process.client && window.outerWidth <= 1264 && window.outerWidth > 960;
}

export function isPhone() {
  return process.client && window.outerWidth <= 1264
}