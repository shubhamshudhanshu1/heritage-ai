export const fetchSettingSchemasApi = async (params) => {
  let API_URL = "/api/settingSchema";
  const queryParams = new URLSearchParams(params).toString();
  const response = await fetch(`${API_URL}?${queryParams}`);

  if (!response.ok) {
    throw new Error("Failed to fetch setting schemas");
  }

  return response.json();
};
