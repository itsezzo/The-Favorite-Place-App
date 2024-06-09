// const API_KEY = '2aa356d27a324f48942b3ca8a3965df3';
const API_KEY = 'acd45ed028364bf6a6f4a1c1dc1e8072';

export function getPosition(lat, lan) {
  const url =
    `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=400&height=200&center=lonlat%3A${lat}%2C${lan}&zoom=14.3497&marker=lonlat%3A${lat}%2C${lan}%3Btype%3Aawesome%3Bcolor%3A%23bb3f73%3Bsize%3Ax-large%3Bicon%3Apaw&apiKey=` +
    API_KEY;
  return url;
}

export async function getAddress(lat, lan) {
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lan}&apiKey=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch address!');
  }
  const data = await response.json();
  const address = data.features[0].properties.formatted;
  // console.log(data.features[0].properties.formatted);
  return address;
}
