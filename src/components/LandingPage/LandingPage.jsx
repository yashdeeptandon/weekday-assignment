import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import styles from "./LandingPage.module.css";
import Card from "../Common/Card";
import { Fetch_Job_Data } from "../../CommonHelperFunctions";
const LandingPage = () => {
  //! STATES

  const [minExp, setMinExp] = useState("default");
  const [role, setRole] = useState("default");
  const [companyName, setCompanyName] = useState("default");
  const [location, setLocation] = useState("default");
  const [minBasePay, setMinBasePay] = useState("default");
  const [techStack, setTechStack] = useState("default");
  const [jobData, setJobData] = useState();

  //! HANDLER FUNCTIONS

  const handleMinExpChange = (event) => {
    setMinExp(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleMinBasePayChange = (event) => {
    setMinBasePay(event.target.value);
  };
  const handleTechStackChange = (event) => {
    setTechStack(event.target.value);
  };

  //! USE EFFECT

  useEffect(() => {
    const fetchData = async () => {
      const data = await Fetch_Job_Data();
      setJobData(data);
    };

    fetchData();
  }, []);

  console.log(jobData);

  return (
    <div className={styles.landingPage}>
      <div className={`${styles.landingPage_content_area} w-full h-full`}>
        <div className="flex justify-center">Search Jobs</div>
        {/* Filter */}
        <div className="flex flex-row gap-2.5 flex-wrap mt-8">
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
                <MenuItem value="default">Select Minimum Experience</MenuItem>
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
                <MenuItem value="default">Select Role</MenuItem>
                <MenuItem value="Backend">Backend</MenuItem>
                <MenuItem value="Frontend">Frontend</MenuItem>
                <MenuItem value="Fullstack">Fullstack</MenuItem>
                <MenuItem value="IOS">IOS</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* Company Name */}
          <div className="w-[200px]">
            <FormControl fullWidth>
              <InputLabel id="companyName">Company Name</InputLabel>
              <Select
                labelId="companyName"
                value={companyName}
                label="Company Name"
                onChange={handleCompanyNameChange}
              >
                <MenuItem value="default">Select Company Name</MenuItem>
                <MenuItem value="Weekday">Weekday</MenuItem>
                <MenuItem value="Apple">Apple</MenuItem>
                <MenuItem value="Microsoft">Microsoft</MenuItem>
                <MenuItem value="Google">Google</MenuItem>
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
                <MenuItem value="default">Select Location</MenuItem>
                <MenuItem value="Banglore">Banglore</MenuItem>
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
                <MenuItem value="default">Select Minimum Base Pay</MenuItem>
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
                <MenuItem value="default">Select Tech Stack</MenuItem>
                <MenuItem value="MERN">MERN</MenuItem>
                <MenuItem value="MEAN">MEAN</MenuItem>
                <MenuItem value="Python">Python</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="w-[calc(100% - 100px)] h-[700px] flex flex-row flex-wrap gap-[100px] overflow-y-auto">
          {jobData?.jdList?.map((item) => (
            <Card jobDetails={item} key={item.jdUid} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
