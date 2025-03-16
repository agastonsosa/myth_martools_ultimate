import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Metric {
  errorId: string;
  schemaKey: string;
  metrics: { window: string; count: number; lastSeen: string }[];
  classification: string;
}

interface SnowplowState {
  metrics: Metric[];
  loading: boolean;
  error: string | null;
}

// Estado inicial
const initialState: SnowplowState = {
  metrics: [],
  loading: false,
  error: null,
};

// ✅ Acción asíncrona para obtener datos de la API
export const fetchSnowplowMetrics = createAsyncThunk(
  "snowplow/fetchMetrics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/snowplow");
      if (!response.ok) throw new Error("Failed to fetch Snowplow metrics");

      const data = await response.json();
      return data.metrics;
    } catch (error) {
      return rejectWithValue("Error fetching Snowplow metrics");
    }
  }
);

const snowplowSlice = createSlice({
  name: "snowplow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSnowplowMetrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSnowplowMetrics.fulfilled, (state, action) => {
        state.metrics = action.payload;
        state.loading = false;
      })
      .addCase(fetchSnowplowMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default snowplowSlice.reducer;
