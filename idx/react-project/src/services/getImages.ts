import type { ImageData } from "../types/types";

export const getImages = async (): Promise<ImageData[]> => {
  const response = await fetch("/data/imageData.json");

  if (!response.ok) {
    throw new Error(
      `Failed to load imageData.json: ${response.status}`
    );
  }

  const data: ImageData[] = await response.json();

  return data;
};