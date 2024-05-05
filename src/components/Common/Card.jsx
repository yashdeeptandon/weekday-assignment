import { useState } from "react";
import { capitalizeFirstLetter } from "../../CommonHelperFunctions";
import tick from "../../assets/tick.png";
import FadingText from "./FadingText";
import "./Card.css";

const Card = (props) => {
  const jobDetails = props?.jobDetails;
  // const [expanded, setExpanded] = useState(false);
  return (
    <div className="w-[350px] h-[600px] mt-[50px] pop-up">
      <div className="w-full h-full flex flex-col items-start border rounded-2xl p-4">
        {/* Company Details */}
        <div>
          <div className="flex flex-row">
            <img
              className="w-10 h-10 border rounded-lg"
              src={jobDetails?.logoUrl}
              alt="company-logo"
            ></img>
            <div className="flex flex-col ml-3">
              <a
                target="_blank"
                href={jobDetails?.jdLink}
                className="font-medium text-stone-500 hover:underline"
              >
                {jobDetails?.companyName}
              </a>
              <div className="font-normal">
                {capitalizeFirstLetter(jobDetails?.jobRole)}
              </div>
              <div className="text-sm font-normal">
                {`${capitalizeFirstLetter(jobDetails?.location)} | Exp: ${
                  jobDetails?.minExp || "0"
                }-${jobDetails?.maxExp || "0"}`}
              </div>
            </div>
          </div>
        </div>
        {/* Estimated Salary */}
        <div className="flex flex-row items-center mt-2">
          <div>{`Estimated Salary: ${jobDetails?.salaryCurrencyCode} ${
            jobDetails?.minJdSalary || "0"
          } - ${jobDetails?.maxJdSalary || "0"} LPA`}</div>
          <img className="w-4 h-4 ml-3" src={tick} alt="tick-icon"></img>
        </div>
        {/* About Company */}
        <div className="mt-2">
          <div>About Company: </div>
          <div className="font-bold text-sm">About us</div>
          <FadingText maxHeight="250px">
            {jobDetails?.jobDetailsFromCompany}
          </FadingText>
          <a
            href={jobDetails?.jdLink}
            target="_blank"
            className="flex flex-row text-blue-600 font-sans justify-center mt-[-5px]"
          >
            View job
          </a>
        </div>
        {/* Minimum Experience */}
        <div className="mt-[20px]">
          <div className="font-normal text-stone-500">Minimum Experience</div>
          <div className="font-light">{jobDetails?.minExp || "0"} years</div>
        </div>
        {/* Apply */}
        <div className="w-full mt-[20px]">
          <a href={jobDetails?.jdLink} target="_blank">
            <button
              className="w-full h-[50px] border rounded-lg"
              style={{ backgroundColor: "rgb(85, 239, 196)" }}
            >
              Easy Apply
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
