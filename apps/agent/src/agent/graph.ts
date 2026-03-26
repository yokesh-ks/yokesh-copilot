import { MemorySaver, START, StateGraph } from "@langchain/langgraph";
import { AgentStateAnnotation } from "./state.js";
import { chat_node } from "./nodes/chat.node.js";
import { toolNode } from "./nodes/tool.node.js";
import { shouldContinue } from "./edges/routing.js";

const workflow = new StateGraph(AgentStateAnnotation)
  .addNode("chat_node", chat_node)
  .addNode("tool_node", toolNode)
  .addEdge(START, "chat_node")
  .addEdge("tool_node", "chat_node")
  .addConditionalEdges("chat_node", shouldContinue as any);

const memory = new MemorySaver();

export const graph = workflow.compile({
  checkpointer: memory,
});
