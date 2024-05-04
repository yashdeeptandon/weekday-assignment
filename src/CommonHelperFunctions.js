import { FETCH_JOBS } from "./utils";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export const Fetch_Job_Data = async () => {
  const body = JSON.stringify({
    limit: 10,
    offset: 0,
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
