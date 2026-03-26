# OG-Copilot — CopilotKit + LangGraph Starter

A starter template for building AI agents using [LangGraph](https://www.langchain.com/langgraph) and [CopilotKit](https://copilotkit.ai). It provides a Next.js frontend with an integrated LangGraph agent powered by Google Generative AI.

This project is organized as a monorepo using [Turborepo](https://turbo.build) and [pnpm workspaces](https://pnpm.io/workspaces).

## Project Structure

```
.
├── apps/
│   ├── web/                      # Next.js frontend (port 3003)
│   │   └── src/app/
│   │       ├── page.tsx          # Main UI component
│   │       └── api/copilotkit/   # CopilotKit API route
│   └── agent/                    # LangGraph agent (port 8123)
│       ├── langgraph.json        # Graph registration config
│       └── src/agent/
│           ├── graph.ts          # Graph definition & compilation
│           ├── state.ts          # Agent state annotation
│           ├── nodes/            # Chat and tool nodes
│           ├── edges/            # Routing logic
│           └── tools/            # Agent tools
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

## Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io/installation) 9.15.0 or later
- Google API Key (for Gemini via Google Generative AI)
- LangSmith API Key (optional, for agent tracing)

## Getting Started

1. Install all dependencies:

```bash
pnpm install
```

2. Set up environment variables for the web app:

```bash
# apps/web/.env.local
GOOGLE_API_KEY=your-google-api-key-here
```

3. Set up environment variables for the agent:

```bash
# apps/agent/.env
GOOGLE_API_KEY=your-google-api-key-here
LANGSMITH_API_KEY=your-langsmith-api-key-here   # optional
```

4. Start both development servers:

```bash
pnpm dev
```

This starts the Next.js app on **port 3003** and the LangGraph agent on **port 8123**.

## Available Scripts

- `pnpm dev` — Start both the web app and agent in development mode
- `pnpm build` — Build all apps for production
- `pnpm lint` — Run linting across all apps

### Running Individual Apps

```bash
# Web app only
pnpm --filter web dev

# Agent only
pnpm --filter agent dev
```

## Customization

**Frontend** — Edit `apps/web/src/app/page.tsx` to:
- Modify the theme and styling
- Add frontend actions
- Utilize shared state with the agent

**Agent** — Edit files under `apps/agent/src/agent/`:
- `graph.ts` — Add nodes and edges to the graph
- `state.ts` — Extend the agent state
- `nodes/` — Add or modify chat/tool nodes
- `tools/` — Register new tools for the agent

## Documentation

- [CopilotKit Docs](https://docs.copilotkit.ai)
- [LangGraph Docs](https://langchain-ai.github.io/langgraph/)
- [Next.js Docs](https://nextjs.org/docs)
- [LangSmith Docs](https://docs.smith.langchain.com)

## Troubleshooting

### Agent not connecting

If the web app cannot reach the agent:

1. Confirm the LangGraph agent is running on **port 8123**
2. Check that `GOOGLE_API_KEY` is set in both `apps/agent/.env` and `apps/web/.env.local`
3. Verify both servers started without errors in the terminal

### Agent file not found

If you see `ENOENT: no such file or directory, stat '...src/agent.ts'`, check that `apps/agent/langgraph.json` points to the correct graph path:

```json
{
  "graphs": {
    "starterAgent": "./src/agent/graph.ts:graph"
  }
}
```

## License

MIT
