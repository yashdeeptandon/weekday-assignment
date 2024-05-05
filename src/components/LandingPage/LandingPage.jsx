import { useCallback, useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import styles from "./LandingPage.module.css";
import Card from "../Common/Card";
import { Fetch_Job_Data } from "../../CommonHelperFunctions";
import Loading from "../Common/Loading";
import { useDispatch } from "react-redux";
import { LandingPageActions } from "../../redux/reducers/LandingPage/LandingPageSlice";
import { FETCH_JOBS } from "../../utils";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const LandingPage = () => {
  //! STATES

  const [minExp, setMinExp] = useState("");
  const [role, setRole] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [minBasePay, setMinBasePay] = useState("");
  const [techStack, setTechStack] = useState("");
  const [jobData, setJobData] = useState();
  const [filteredJobData, setFilteredJobData] = useState({
    jdList: [],
    totalCount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const limit = 10; // Number of jobs to fetch per request or Number of items per page
  const dispatch = useDispatch();

  //! HANDLER FUNCTIONS
  const handleMinExpChange = (event) => {
    setFilteredJobData({
      jdList: [],
      totalCount: 0,
    });
    setMinExp(event.target.value);
    setPage(0);
  };

  const handleRoleChange = (event) => {
    setFilteredJobData({
      jdList: [],
      totalCount: 0,
    });
    setRole(event.target.value);
    setPage(0);
  };

  const handleCompanyNameChange = (event) => {
    setFilteredJobData({
      jdList: [],
      totalCount: 0,
    });
    setCompanyName(event.target.value);
    setPage(0);
  };

  const handleLocationChange = (event) => {
    setFilteredJobData({
      jdList: [],
      totalCount: 0,
    });
    setLocation(event.target.value);
    setPage(0);
  };

  const handleMinBasePayChange = (event) => {
    setFilteredJobData({
      jdList: [],
      totalCount: 0,
    });
    setMinBasePay(event.target.value);
    setPage(0);
  };
  const handleTechStackChange = (event) => {
    setFilteredJobData({
      jdList: [],
      totalCount: 0,
    });
    setTechStack(event.target.value);
    setPage(0);
  };

  const handleScroll = () => {
    const element = document.querySelector(".job-main-content");
    const bottom =
      element.scrollTop + element.clientHeight >= element.scrollHeight;

    if (bottom && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  //! USE Callback

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const offset = page * limit;
    try {
      const data = await Fetch_Job_Data(
        limit,
        offset,
        minExp,
        companyName,
        location,
        techStack,
        role,
        minBasePay,
        page
      );
      updateJobData(data);
    } catch (error) {
      console.error("Error fetching job data:", error);
      // Handle error here, e.g., show error message to the user
    } finally {
      setIsLoading(false);
    }
  }, [
    page,
    limit,
    minExp,
    companyName,
    location,
    techStack,
    role,
    minBasePay,
    setIsLoading,
  ]);

  const fetchFilteredData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${FETCH_JOBS}`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          limit: 1000,
          offset: 0,
        }),
      });

      const data = await response.json();

      let totalFilteredData = data.jdList;

      if (minExp) {
        totalFilteredData = totalFilteredData.filter(
          (job) => job.minExp >= minExp
        );
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

      const currentData = totalFilteredData.filter(
        (_, index) => index >= page * 10 && index < (page + 1) * 10
      );

      if (currentData.length) {
        setJobData({
          jdList: [],
          totalCount: 0,
        });
        setFilteredJobData((prevData) => ({
          jdList: [...prevData.jdList, ...currentData],
          totalCount: totalFilteredData?.length,
        }));
        setIsLoading(false);
      } else {
        setJobData({
          jdList: [],
          totalCount: 0,
        });
        setFilteredJobData({
          jdList: currentData,
          totalCount: totalFilteredData?.length,
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching job data:", error);
      throw error;
    }
  }, [
    page,
    minExp,
    companyName,
    location,
    techStack,
    role,
    minBasePay,
    setIsLoading,
  ]);

  const updateJobData = useCallback(
    (data) => {
      dispatch(LandingPageActions.setJobsData(data?.jdList));
      dispatch(LandingPageActions.setJobsCount(data?.totalCount));

      if (page > 1) {
        setJobData((prevData) => ({
          ...data,
          jdList: [
            ...(prevData?.jdList || []),
            ...data.jdList.filter(
              (newItem) =>
                !prevData.jdList.some(
                  (prevItem) => prevItem.jdUid === newItem.jdUid
                )
            ),
          ],
        }));
      } else {
        setJobData(data);
      }
    },
    [page]
  );

  //! USE Effect

  useEffect(() => {
    if (minExp || companyName || location || techStack || role || minBasePay) {
      fetchFilteredData();
    } else {
      fetchData();
    }
  }, [
    page,
    minExp,
    companyName,
    location,
    techStack,
    role,
    minBasePay,
    fetchData,
    fetchFilteredData,
  ]);

  useEffect(() => {
    const element = document.querySelector(".job-main-content");
    element.addEventListener("scroll", handleScroll);
    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className={styles.landingPage}>
      <div className={`${styles.landingPage_content_area} w-full h-full`}>
        <div className={`flex justify-center ${styles.with_notification}`}>
          Search Jobs
          <div className={`${styles.notification_circle}`}>
            {jobData?.totalCount || filteredJobData?.totalCount}
          </div>
        </div>

        {/* Filter */}
        <div className="flex flex-row gap-2.5 flex-wrap mt-8 justify-center">
          {/* Min Experience */}
          <div className="w-[200px]">
            <FormControl fullWidth>
              <InputLabel id="min_exp">Minimum Experience</InputLabel>
              <Select
                labelId="min_exp"
                value={minExp}
                label="Minimum Experience"
                onChange={handleMinExpChange}
              >
                <MenuItem value="">Select Minimum Experience</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* Role */}
          <div className="w-[200px]">
            <FormControl fullWidth>
              <InputLabel id="role">Role</InputLabel>
              <Select
                labelId="role"
                value={role}
                label="Role"
                onChange={handleRoleChange}
              >
                <MenuItem value="">Select Role</MenuItem>
                <MenuItem value="Android">Android</MenuItem>
                <MenuItem value="Frontend">Frontend</MenuItem>
                <MenuItem value="Tech lead">Tech Lead</MenuItem>
                <MenuItem value="Backend">Backend</MenuItem>
                <MenuItem value="IOS">IOS</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* Location */}
          <div className="w-[200px]">
            <FormControl fullWidth>
              <InputLabel id="location">Location</InputLabel>
              <Select
                labelId="location"
                value={location}
                label="Location"
                onChange={handleLocationChange}
              >
                <MenuItem value="">Select Location</MenuItem>
                <MenuItem value="Bangalore">Bangalore</MenuItem>
                <MenuItem value="Remote">Remote</MenuItem>
                <MenuItem value="Delhi">Delhi</MenuItem>
                <MenuItem value="Noida">Noida</MenuItem>
                <MenuItem value="Gurgaon">Gurgaon</MenuItem>
                <MenuItem value="Pune">Pune</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* Min Base Pay */}
          <div className="w-[200px]">
            <FormControl fullWidth>
              <InputLabel id="basePay">Minimum Base Pay</InputLabel>
              <Select
                labelId="basePay"
                value={minBasePay}
                label="Minimum Base Pay"
                onChange={handleMinBasePayChange}
              >
                <MenuItem value="">Select Minimum Base Pay</MenuItem>
                <MenuItem value="0L">0L</MenuItem>
                <MenuItem value="10L">10L</MenuItem>
                <MenuItem value="20L">20L</MenuItem>
                <MenuItem value="30L">30L</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* Tech Stack */}
          <div className="w-[200px]">
            <FormControl fullWidth>
              <InputLabel id="techStack">Tech Stack</InputLabel>
              <Select
                labelId="techStack"
                value={techStack}
                label="Tech Stack"
                onChange={handleTechStackChange}
              >
                <MenuItem value="">Select Tech Stack</MenuItem>
                <MenuItem value="MERN">MERN</MenuItem>
                <MenuItem value="MEAN">MEAN</MenuItem>
                <MenuItem value="Python">Python</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* Company Name */}
          <div className="w-[200px]">
            <TextField
              id="outlined-basic"
              label="Search Company Name"
              variant="outlined"
              value={companyName}
              onChange={handleCompanyNameChange}
            />
          </div>
        </div>
        <div
          className={`${styles.job_main_content} job-main-content w-[calc(100% - 100px)] h-[640px] flex flex-row flex-wrap gap-[200px] justify-center overflow-y-auto`}
        >
          {isLoading && <Loading />}
          {jobData?.jdList?.length ? (
            jobData?.jdList?.map((item) => (
              <Card jobDetails={item} key={item.jdUid} />
            ))
          ) : (
            <></>
          )}
          {filteredJobData?.jdList.length ? (
            filteredJobData?.jdList?.map((item) => (
              <Card jobDetails={item} key={item.jdUid} />
            ))
          ) : (
            <></>
          )}
          {!jobData?.jdList?.length && !filteredJobData?.jdList?.length ? (
            <div className="mt-[50px]">No Jobs Found!</div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
