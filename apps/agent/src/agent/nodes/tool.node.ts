import { ToolNode } from "@langchain/langgraph/prebuilt";
import { tools } from "../tools/weather.tool.js";

export const toolNode = new ToolNode(tools);
