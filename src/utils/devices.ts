export const breakpoints = {
  mobile: 768,
  tablet: 1024,
}

const devices = {
  mobile: `(max-width: ${breakpoints.mobile}px)`,
  tablet: `(max-width: ${breakpoints.tablet}px)`,
  desktop: `(min-width: ${breakpoints.tablet}px)`,
}

export default devices
