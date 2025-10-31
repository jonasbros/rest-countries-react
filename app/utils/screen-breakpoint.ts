export default function getScreenBreakpoint(screenWidth: number) {
  const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  };

  if (screenWidth >= breakpoints["2xl"]) return "2xl";
  if (screenWidth >= breakpoints.xl) return "xl";
  if (screenWidth >= breakpoints.lg) return "lg";
  if (screenWidth >= breakpoints.md) return "md";
  if (screenWidth >= breakpoints.sm) return "sm";
  return "xs";
}
