export function bytesToKilobytes(bytes: number): string {
  const bytesInOneKB = 1024;
  const kilobytes = bytes / bytesInOneKB;
  return kilobytes.toFixed(2);
}

export function bytesToMegabytes(bytes: number): string {
  const bytesInOneMB = 1024 * 1024;
  const megabytes = bytes / bytesInOneMB;
  return megabytes.toFixed(2);
}

export function bytesToGigabytes(bytes: number): string {
  const bytesInOneGB = 1024 * 1024 * 1024;
  const gigabytes = bytes / bytesInOneGB;
  return gigabytes.toFixed(2);
}

export function bytesToKilobits(bytes: number) {
  const bytesToBits = bytes * 8;
  const bitsToKilobits = bytesToBits / 1_000;
  return bitsToKilobits.toFixed(2);
}

export function bytesToMegabits(bytes: number) {
  const bytesToBits = bytes * 8;
  const bitsToMegabits = bytesToBits / 1_000_000;
  return bitsToMegabits.toFixed(2);
}

export function formatSpeed(speed: number): string {
  const kilobytesPerSecond = bytesToKilobytes(speed);
  const megabytesPerSecond = bytesToMegabytes(speed);

  if (parseFloat(megabytesPerSecond) > 1) {
    return `${megabytesPerSecond}MB/s`;
  } else {
    return `${kilobytesPerSecond}KB/s`;
  }
}

export function formatSize(sizeInBytes: number) {
  const gigabytes = parseFloat(bytesToGigabytes(sizeInBytes));
  if (gigabytes > 1) {
    return `${gigabytes.toFixed(2)}GB`;
  } else {
    const megabytes = parseFloat(bytesToMegabytes(sizeInBytes));
    return `${megabytes.toFixed(2)}MB`;
  }
}

export function debounce(func: () => void, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(), delay);
  };
}
