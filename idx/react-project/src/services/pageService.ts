export const getPages = async () => {
  const response = await fetch("/data/pageData.json");

  if (!response.ok) {
    throw new Error(
      `Failed to load pageData.json: ${response.status}`
    );
  }

  return response.json();
};