export const getComponentMapData = async () => {
  const response = await fetch("/data/ComponentMapData.json");

  if (!response.ok) {
    throw new Error(
      `Failed to load ComponentMapData.json: ${response.status}`
    );
  }

  return response.json();
};