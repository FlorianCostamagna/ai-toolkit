# Figma MCP — VS Code extension

This small extension adds the official **Figma MCP server** to VS Code. Once installed, VS Code's AI assistant (Copilot in agent mode) can use Figma tools — for example, to read your Figma designs. You do not need to install anything else, and the extension itself contains no login code: VS Code handles the sign-in for you.

> How it works (one line): the extension declares a `mcpServerDefinitionProviders` entry in its manifest and registers it with the `vscode.lm.registerMcpServerDefinitionProvider` API, available since VS Code **1.101** (June 2025) — the same mechanism Microsoft's PostgreSQL extension uses.

## What you need

- **VS Code version 1.101 or newer.** To check: open VS Code, click **Code** in the menu at the top of the screen (on Windows: **Help**), then click **About** — the version number is shown at the top. If it is older, update VS Code first.
- The `figma-mcp-1.0.0.vsix` file that came with this README. A `.vsix` file is simply a packaged VS Code extension.

## Install (step by step)

1. Open **VS Code**.
2. Click the **Extensions** icon in the bar on the left side of the window (it looks like four small squares; one square is detached). If you don't see the bar, press **Cmd+Shift+X** (Mac) or **Ctrl+Shift+X** (Windows/Linux).
3. In the top of the Extensions panel, click the **•••** (three dots) icon, then choose **Install from VSIX...**
4. In the file picker, select the `figma-mcp-1.0.0.vsix` file, then click **Install**.
5. When VS Code says the extension is installed, click **Reload** if a button appears (this restarts VS Code's window; your files are not affected). If no button appears, restart VS Code: quit (**Cmd+Q** / **Alt+F4**) and reopen it.

## Check that it worked

1. Press **Cmd+Shift+P** (Mac) or **Ctrl+Shift+P** (Windows/Linux). A search box appears at the top of the window.
2. Type `MCP: List Servers` and press **Enter**.
3. You should see a server named **Figma** in the list. That's it — the extension is working.

## Sign in to Figma (one time)

The first time the AI assistant uses a Figma tool:

1. VS Code shows a message asking to **sign in** — click **Allow** (or **Sign in**).
2. Your web browser opens on Figma's login page. Log in to your Figma account and click **Allow/Authorize** when Figma asks for permission.
3. The browser sends you back to VS Code. You are signed in; this is remembered, so you won't need to do it again.

That's all. From now on, just ask the AI assistant things like "look at this Figma file" while working, and it will use Figma's tools automatically.

## Uninstall

1. Open the **Extensions** panel (step 2 above).
2. Find **Figma MCP** in the installed list, click the **gear** icon next to it, and choose **Uninstall**.
