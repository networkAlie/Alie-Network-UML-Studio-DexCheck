
/**
 * Copies a given string to the user's clipboard.
 * @param text The text to copy.
 * @returns A promise that resolves to true if successful, false otherwise.
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (!navigator.clipboard) {
    console.error("Clipboard API not available");
    return false;
  }
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy text: ", err);
    return false;
  }
};

/**
 * Triggers a browser download for the given SVG content.
 * @param filename The desired name of the downloaded file (without extension).
 * @param svgContent The SVG content as a string.
 */
export const downloadSvg = (filename: string, svgContent: string): void => {
  if (!svgContent) {
    console.error("No SVG content to download.");
    return;
  }
  const blob = new Blob([svgContent], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename.replace(/ /g, "_")}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
