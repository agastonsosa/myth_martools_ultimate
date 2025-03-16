import { configureStore } from "@reduxjs/toolkit";
import campaignsReducer from "./slices/campaignsSlice";
import dashboardReducer from "./slices/dashboardSlice";
import trackingLogsReducer from "./slices/trackingLogsSlice";
import snowplowReducer from "./slices/snowplowSlice";

export const store = configureStore({
  reducer: {
    campaigns: campaignsReducer,
    dashboard: dashboardReducer,
    trackingLogs: trackingLogsReducer,
    snowplow: snowplowReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


