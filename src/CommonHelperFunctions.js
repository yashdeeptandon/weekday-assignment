import { FETCH_JOBS } from "./utils";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export const Fetch_Job_Data = async (
  limit,
  offset,
  minExperience,
  companyName,
  location,
  role,
  minBasePay
) => {
  console.log("Limit: ", limit);
  console.log("Offset: ", offset);
  console.log("Min Experience: ", minExperience);
  console.log("Company Name: ", companyName);
  console.log("Location: ", location);
  console.log("Role Helper: ", role);
  console.log("Min Base Pay: ", minBasePay);

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
  console.log("Data: ", data);

  let totalFilteredData = [];
  // Apply filters
  if (minExperience) {
    const filteredData = data?.jdList?.filter((job) => {
      return job?.minExp >= minExperience;
    });
    totalFilteredData = filteredData;
    // return { jdList: filteredData, totalCount: filteredData?.length };
  }
  if (companyName) {
    if (totalFilteredData.length) {
      totalFilteredData = totalFilteredData?.filter((job) => {
        return job?.companyName?.includes(companyName);
      });
    } else {
      const filteredData = data?.jdList?.filter((job) => {
        return job?.companyName?.includes(companyName);
      });
      totalFilteredData = filteredData;
    }

    // return { jdList: filteredData, totalCount: filteredData?.length };
  }
  if (role) {
    if (totalFilteredData.length) {
      totalFilteredData = totalFilteredData?.filter((job) => {
        return job?.jobRole === role?.toLowerCase();
      });
    } else {
      const filteredData = data?.jdList?.filter((job) => {
        return job?.jobRole === role?.toLowerCase();
      });
      totalFilteredData = filteredData;
    }

    // return { jdList: filteredData, totalCount: filteredData?.length };
  }
  if (location) {
    if (totalFilteredData.length) {
      totalFilteredData = totalFilteredData?.filter((job) => {
        return job?.location?.includes(location.toLowerCase());
      });
    } else {
      const filteredData = data?.jdList?.filter((job) => {
        return job?.location?.includes(location.toLowerCase());
      });
      totalFilteredData = filteredData;
    }

    // return { jdList: filteredData, totalCount: filteredData?.length };
  }
  if (minBasePay) {
    if (totalFilteredData.length) {
      totalFilteredData = totalFilteredData?.filter((job) => {
        return job?.minJdSalary >= minBasePay;
      });
    } else {
      const filteredData = data?.jdList?.filter((job) => {
        return job?.minJdSalary >= minBasePay;
      });
      totalFilteredData = filteredData;
    }

    // return { jdList: filteredData, totalCount: filteredData?.length };
  }
  console.log("Total Filter Data", totalFilteredData);

  if (totalFilteredData.length) {
    return { jdList: totalFilteredData, totalCount: totalFilteredData?.length };
  }

  return data;
};

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
