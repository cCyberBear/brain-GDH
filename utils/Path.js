import { parse } from "react-native-redash";

export const getPathXCenter = (currentPath) => {
  const curves = parse(currentPath).curves;
  const startPoint = curves[0].to;
  const endPoint = curves[curves.length - 1].to;
  const centerX = (startPoint.x + endPoint.x) / 2;
  return centerX;
};
export const getPathXCenterByIndex = (tabPaths, index) => {
  const curves = tabPaths[index].curves;
  const startPoint = curves[0].to;
  const endPoint = curves[curves.length - 1].to;
  const centerX = (startPoint.x + endPoint.x) / 2;
  return centerX;
};
export function adjustBrightness(color, percentage) {
  // Validate input color format
  if (!color.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)) {
    console.error("Invalid color format");
    return null;
  }

  // Remove the hash symbol and convert to a 6-digit color if it's 3-digit
  color = color.replace(/^#/, "");
  if (color.length === 3) {
    color = color
      .split("")
      .map(function (hex) {
        return hex + hex;
      })
      .join("");
  }

  // Convert the color to RGB
  var r = parseInt(color.substring(0, 2), 16);
  var g = parseInt(color.substring(2, 4), 16);
  var b = parseInt(color.substring(4, 6), 16);

  // Adjust brightness
  r = Math.min(255, Math.max(0, Math.round((r * (100 + percentage)) / 100)));
  g = Math.min(255, Math.max(0, Math.round((g * (100 + percentage)) / 100)));
  b = Math.min(255, Math.max(0, Math.round((b * (100 + percentage)) / 100)));

  // Convert back to hex
  var adjustedColor =
    "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);

  return adjustedColor;
}
