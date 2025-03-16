import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Metric {
    name: string;
    value: number;
    timestamp?: string;
  }
  
interface DashboardState {
  metrics: Metric[]; 
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  metrics: [],
  loading: false,
  error: null,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    fetchMetricsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMetricsSuccess: (state, action: PayloadAction<Metric[]>) => {
      state.metrics = action.payload;
      state.loading = false;
    },
    fetchMetricsError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchMetricsStart, fetchMetricsSuccess, fetchMetricsError } = dashboardSlice.actions;
export default dashboardSlice.reducer;

