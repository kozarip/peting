export const fetchAdvertisements = async () => {
  const url = 'https://peting.hu/api/advertisement/all';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const responseJson = await response.json();
  return responseJson;
};
