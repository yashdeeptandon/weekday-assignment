const Card = () => {
  return (
    <div className="w-[350px] h-[600px] mt-[50px]">
      <div className="w-full h-full flex flex-col justify-between items-start border rounded-2xl p-4">
        <div>Job Title</div>
        <div>Company Name</div>
        <div>Location</div>
        <div>Job Description</div>
        <div>Experience Required</div>
        <div>Apply Button</div>
      </div>
    </div>
  );
};

export default Card;
