import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  JobsData: {
    count: null,
    data: [],
    totalFilteredData: [],
  },
};
const LandingPageSlice = createSlice({
  name: "JobsData",
  initialState,
  reducers: {
    setJobsData(state, action) {
      state.JobsData.data = action.payload;
    },
    setJobsCount(state, action) {
      state.JobsData.count = action.payload;
    },
    setTotalFilteredData(state, action) {
      state.JobsData.totalFilteredData = action.payload;
    },
  },
});

export const LandingPageActions = LandingPageSlice.actions;
export default LandingPageSlice.reducer;
