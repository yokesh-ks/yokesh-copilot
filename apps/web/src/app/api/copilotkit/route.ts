import {
  CopilotRuntime,
  GoogleGenerativeAIAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import { LangGraphAgent } from "@copilotkit/runtime/langgraph";
import { NextRequest } from "next/server";

// 1. Initialize the Google Generative AI adapter
const serviceAdapter = new GoogleGenerativeAIAdapter({ model: "gemini-2.5-flash", apiVersion: "v1" });

// 2. Create the CopilotRuntime instance and utilize the LangGraph AG-UI
//    integration to setup the connection.
const runtime = new CopilotRuntime({
  agents: {
    starterAgent: new LangGraphAgent({
      deploymentUrl:
        process.env.LANGGRAPH_DEPLOYMENT_URL || "http://localhost:8123",
      graphId: "starterAgent",
      langsmithApiKey: process.env.LANGSMITH_API_KEY || "",
    }),
  },
});

// 3. Build a Next.js API route that handles the CopilotKit runtime requests.
export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: "/api/copilotkit",
  });

  return handleRequest(req);
};
