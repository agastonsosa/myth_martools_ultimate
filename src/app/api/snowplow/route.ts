import { NextResponse } from "next/server";

export async function GET() {
  try {
    const API_KEY_ID = process.env.NEXT_PUBLIC_SNOWPLOW_API_KEY_ID;
    const API_KEY = process.env.NEXT_PUBLIC_SNOWPLOW_API_KEY;
    const ORG_ID = process.env.NEXT_PUBLIC_SNOWPLOW_ORG_ID;
    const PIPELINE_ID = process.env.NEXT_PUBLIC_SNOWPLOW_PIPELINE_ID;

    if (!API_KEY_ID || !API_KEY || !ORG_ID || !PIPELINE_ID) {
      return NextResponse.json({ error: "Missing environment variables" }, { status: 500 });
    }

    // Fetch authentication token
    const tokenResponse = await fetch(
      `https://console.snowplowanalytics.com/api/msc/v1/organizations/${ORG_ID}/credentials/v3/token`,
      {
        method: "GET",
        headers: {
          "X-API-Key-ID": API_KEY_ID,
          "X-API-Key": API_KEY,
        },
      }
    );

    if (!tokenResponse.ok) {
      return NextResponse.json({ error: "Failed to retrieve access token" }, { status: 401 });
    }

    const tokenData = await tokenResponse.json();
    if (!tokenData.accessToken) {
      return NextResponse.json({ error: "Invalid token response" }, { status: 401 });
    }

    // Fetch metrics
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 7); // Last 7 days
    const toDate = new Date();

    const metricsResponse = await fetch(
      `https://console.snowplowanalytics.com/api/msc/v1/organizations/${ORG_ID}/metrics/v1/pipelines/${PIPELINE_ID}/failed-events?from=${fromDate.toISOString()}&to=${toDate.toISOString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenData.accessToken}`,
        },
      }
    );

    if (!metricsResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch metrics" }, { status: 500 });
    }

    const metrics = await metricsResponse.json();
    return NextResponse.json({ metrics }, { status: 200 });
  } catch (error) {
    console.error("Snowplow API error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
