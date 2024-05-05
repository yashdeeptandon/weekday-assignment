import { useEffect, useState } from "react";
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

const LandingPage = () => {
  //! STATES

  const [minExp, setMinExp] = useState("");
  const [role, setRole] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [minBasePay, setMinBasePay] = useState("");
  const [techStack, setTechStack] = useState("");
  const [jobData, setJobData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [jobCount, setJobCount] = useState(0);
  const [page, setPage] = useState(0);
  const limit = 10; // Number of jobs to fetch per request or Number of items per page
  const dispatch = useDispatch();

  //! HANDLER FUNCTIONS

  const handleMinExpChange = (event) => {
    setMinExp(event.target.value);
    setPage(0);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
    setPage(0);
  };

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
    setPage(0);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    setPage(0);
  };

  const handleMinBasePayChange = (event) => {
    setMinBasePay(event.target.value);
    setPage(0);
  };
  const handleTechStackChange = (event) => {
    setTechStack(event.target.value);
    setPage(0);
  };

  //! USE EFFECT
  useEffect(() => {
    const fetchData = async () => {
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
          minBasePay
        );

        dispatch(LandingPageActions.setJobsData(data?.jdList));
        dispatch(LandingPageActions.setJobsCount(data?.totalCount));
        setJobCount(data?.totalCount);

        if (page > 1) {
          setJobData((prevData) => ({
            ...data,
            jdList: [...(prevData?.jdList || []), ...data.jdList], // Append new job listings
          }));
        } else {
          setJobData(data);
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
        // Handle error here, e.g., show error message to the user
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, minExp, companyName, location, techStack, role, minBasePay]); // Fetch data when the page state changes

  const handleScroll = () => {
    const element = document.querySelector(".job-main-content");
    const bottom =
      element.scrollTop + element.clientHeight >= element.scrollHeight;

    if (bottom && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

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
          <div className={`${styles.notification_circle}`}>{jobCount}</div>
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
                <MenuItem value="Backend">Backend</MenuItem>
                <MenuItem value="Frontend">Frontend</MenuItem>
                <MenuItem value="Fullstack">Fullstack</MenuItem>
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
          {jobData?.jdList?.map((item) => (
            <Card jobDetails={item} key={item.jdUid} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
