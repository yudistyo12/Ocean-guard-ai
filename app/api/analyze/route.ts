import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      vesselName,
      speed,
      routeDeviation,
      nightActivity,
    } = body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are a maritime intelligence AI.

Analyze the vessel data below and return:

1. Risk Score (0-100)
2. Risk Level (LOW/MEDIUM/HIGH)
3. Threat Prediction
4. Recommendation

Data:

Vessel Name: ${vesselName}
Speed: ${speed} knots
Route Deviation: ${routeDeviation}%
Night Activity: ${nightActivity}

Respond in JSON format only.
`;

    const result = await model.generateContent(prompt);

    const response =
      result.response.text();

    return NextResponse.json({
      success: true,
      analysis: response,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "AI analysis failed",
      },
      {
        status: 500,
      }
    );
  }
}