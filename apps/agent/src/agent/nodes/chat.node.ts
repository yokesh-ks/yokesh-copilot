import { RunnableConfig } from "@langchain/core/runnables";
import { SystemMessage } from "@langchain/core/messages";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { convertActionsToDynamicStructuredTools } from "@copilotkit/sdk-js/langgraph";
import { AgentState } from "../state.js";
import { tools } from "../tools/weather.tool.js";

export async function chat_node(state: AgentState, config: RunnableConfig) {
  const model = new ChatGoogleGenerativeAI({ temperature: 0, model: "gemini-2.5-flash" });

  const modelWithTools = model.bindTools!([
    ...convertActionsToDynamicStructuredTools(state.copilotkit?.actions ?? []),
    ...tools,
  ]);

  const systemMessage = new SystemMessage({
    content: `You are a helpful assistant. The current proverbs are ${JSON.stringify(state.proverbs)}.`,
  });

  const response = await modelWithTools.invoke(
    [systemMessage, ...state.messages],
    config,
  );

  return { messages: response };
}
