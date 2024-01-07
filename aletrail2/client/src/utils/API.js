const search = async (query) => {
  const response = await fetch(
    `https://api.openbrewerydb.org/v1/breweries/search?query=${encodeURIComponent(
      query
    )}`
    // Note: No need for X-RapidAPI-Key and X-RapidAPI-Host headers with the new API
  );

  const data = await response.json();
  return data;
};

export const searchById = async (id) => {
  const response = await fetch(
    `https://api.openbrewerydb.org/v1/breweries/${id}`
  );
  const data = await response.json();
  return data;
};

export default { search, searchById };
