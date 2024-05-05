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
  try {
    const response = await fetch(`${FETCH_JOBS}`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        limit: limit,
        offset: offset,
      }),
    });

    const data = await response.json();

    let totalFilteredData = data.jdList;
    let totalCount = data.totalCount;

    if (minExperience) {
      totalFilteredData = totalFilteredData.filter(
        (job) => job.minExp >= minExperience
      );
      totalCount = totalFilteredData.length;
    }
    if (companyName) {
      totalFilteredData = totalFilteredData.filter((job) =>
        job.companyName?.toLowerCase().includes(companyName?.toLowerCase())
      );
    }
    if (role) {
      totalFilteredData = totalFilteredData.filter(
        (job) => job.jobRole?.toLowerCase() === role?.toLowerCase()
      );
    }
    if (location) {
      totalFilteredData = totalFilteredData.filter((job) =>
        job.location?.toLowerCase().includes(location?.toLowerCase())
      );
    }
    if (minBasePay) {
      totalFilteredData = totalFilteredData.filter(
        (job) => job.minJdSalary >= minBasePay
      );
    }

    if (totalFilteredData.length) {
      return { jdList: totalFilteredData, totalCount: totalCount };
    }

    return data;
  } catch (error) {
    console.error("Error fetching job data:", error);
    throw error;
  }
};

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
