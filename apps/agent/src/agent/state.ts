import { Annotation } from "@langchain/langgraph";
import { CopilotKitStateAnnotation } from "@copilotkit/sdk-js/langgraph";

export const AgentStateAnnotation = Annotation.Root({
  ...CopilotKitStateAnnotation.spec,
  proverbs: Annotation<string[]>,
});

export type AgentState = typeof AgentStateAnnotation.State;
