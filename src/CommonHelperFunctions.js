import { FETCH_JOBS } from "./utils";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export const Fetch_Job_Data = async (limit, offset) => {
  console.log("Limit: ", limit);
  console.log("Offset: ", offset);
  const body = JSON.stringify({
    limit: limit,
    offset: offset,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body,
  };

  const response = await fetch(`${FETCH_JOBS}`, requestOptions);
  const data = await response.json();
  return data;
};

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
