export function hexToRgba(hex: string, opacity: number) {
  // Check for 3-digit or 6-digit hex code
  const result = /^#?([a-f\d]{3}|[a-f\d]{6})$/i.exec(hex);

  if (!result) {
    return "rgba(0,0,0,0.05)"; // Invalid hex
  }

  // Handle 3-digit hex by expanding it to 6-digit
  let hexValue = result[1];

  if (hexValue.length === 3) {
    hexValue = hexValue
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Extract RGB values
  const color = {
    r: parseInt(hexValue.substring(0, 2), 16),
    g: parseInt(hexValue.substring(2, 4), 16),
    b: parseInt(hexValue.substring(4, 6), 16),
  };

  return `rgba(${color.r}, ${color.g}, ${color.b},${opacity})`;
}

export function createNestedObject(obj: any, path: string) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

export function dateFormat(date: number): string {
  const dateValue = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  return (
    String.fromCharCode(8206) + dateValue.toLocaleDateString("fa", options)
  );
}
