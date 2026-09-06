---
name: vscode-mcp-extension
description: 'Build a local VSCode extension that exposes a remote or local MCP server in VS Code native MCP support, and package it as an installable .vsix. Use when asked to create a vscode mcp extension, wrap an mcp server in an extension, register a remote mcp server in vscode, or ship mcp tools as a vsix. Triggers on: vscode mcp extension, wrap mcp server in extension, mcp vsix, register mcp server vscode, figma mcp vscode.'
argument-hint: 'MCP server URL (e.g. https://mcp.figma.com/mcp) and a display name, or a stdio command for a local server'
---

# VSCode MCP Extension

Wrap any MCP server into a minimal VSCode extension so it appears in VS Code's built-in MCP server list (Extensions view, `MCP: List Servers`). Auth is never implemented in the extension: VS Code runs the MCP OAuth flow in the browser on first use.

## When to Use
- Someone wants a remote MCP server (like Figma, Linear, Notion) available in VS Code without editing `mcp.json` by hand
- Someone wants to distribute a curated set of MCP servers as a double-click installable `.vsix`
- Reference implementation in this repo: `extensions/figma-mcp/` (server id `com.figma.mcp`, url `https://mcp.figma.com/mcp`)

## Procedure

### 1. Confirm the Mechanism (Never Guess APIs)
The confirmed mechanism (VS Code >= 1.101, June 2025) requires BOTH halves; there is no purely static manifest contribution for MCP servers:
- Manifest: `contributes.mcpServerDefinitionProviders: [{ "id": "{{SERVER_ID}}", "label": "{{LABEL}}" }]`
- Code: `vscode.lm.registerMcpServerDefinitionProvider('{{SERVER_ID}}', ...)` — VS Code throws at activation if the id is not declared in the manifest
- Source of truth: https://code.visualstudio.com/api/extension-guides/mcp and the official sample `microsoft/vscode-extension-samples` → `mcp-extension-sample`. Cross-check real-world usage by downloading a published extension `.vsix` from the Marketplace and reading its `package.json` (Microsoft's `ms-ossdata.vscode-pgsql` is the reference).

### 2. Scaffold
Create an extension folder with 4 files and zero runtime dependencies:
- `package.json`: `name`, `displayName`, `publisher`, `version`, `"engines": { "vscode": "^1.101.0" }`, `"main": "./extension.js"`, `"activationEvents": []` (vsce errors if `main` is set without this key; VS Code auto-activates the extension via the implicit `onMcpCollection:{{SERVER_ID}}` event generated from the contribution), and the `contributes.mcpServerDefinitionProviders` entry from step 1
- `extension.js`: register the provider in `activate()`. Remote server: `new vscode.McpHttpServerDefinition('{{LABEL}}', vscode.Uri.parse('{{SERVER_URL}}'))`. Local server: `new vscode.McpStdioServerDefinition('{{LABEL}}', command, args, env)`. Do NOT implement auth, headers with secrets, or a proxy
- `.vscodeignore`: exclude `.vscode/**`, `node_modules/**`, `src/**`, `**/*.ts`, `**/*.map`, lockfiles
- `README.md`: install guide (step 4)

### 3. Package
Run `npx @vscode/vsce package` in the extension folder (no install needed). It produces `{{EXTENSION_NAME}}-{{VERSION}}.vsix`. If it fails, read the full error and fix the root cause — never disable validation flags. Confirm with `npx @vscode/vsce ls` that only `package.json`, `extension.js`, `README.md` are packaged (no `node_modules`, no junk).

### 4. Write the Non-Technical README
Numbered steps, every UI element named, macOS + Windows key variants:
1. Requirement: VS Code >= 1.101 (how to check in About)
2. Install: Extensions view → `•••` → **Install from VSIX...** → pick the file → **Reload**
3. Verify: `Cmd/Ctrl+Shift+P` → `MCP: List Servers` → the `{{LABEL}}` server appears
4. First use: VS Code prompts to sign in → browser opens the provider's OAuth page → authorize → returns to VS Code

### 5. Validate
- `package.json` parses as JSON; provider id in `contributes` exactly equals the id passed to `registerMcpServerDefinitionProvider`
- `.vsix` exists and `vsce ls` output is clean
- README install steps walked end-to-end; skill/manifest values are generic placeholders, not hardcoded to one provider

## Pitfalls
- Do not invent a `contributes.mcpServers` static entry — it does not exist in VS Code
- The `label` (not the id) is what users see in `MCP: List Servers`; make it the product name
- `activationEvents: []` is deliberately empty; implicit activation covers the MCP provider
- vsce wants a README and a `repository` field (warning otherwise); a missing LICENSE file is a benign warning if `license` is declared
