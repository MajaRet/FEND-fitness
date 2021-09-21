// Device sizes to create media queries with styled-components
const makeMinWidthString = (minWidth: number) => `(min-width: ${minWidth}px)`;
const device = {
  phoneLarge: makeMinWidthString(375),
  tabletPortrait: makeMinWidthString(768),
  tabletLandscape: makeMinWidthString(1024),
  desktop: makeMinWidthString(1440),
  desktopLarge: makeMinWidthString(1920),
};

export default device;
