const vscode = require('vscode');

function activate(context) {
  context.subscriptions.push(
    vscode.lm.registerMcpServerDefinitionProvider('com.figma.mcp', {
      provideMcpServerDefinitions() {
        return [
          new vscode.McpHttpServerDefinition(
            'Figma',
            vscode.Uri.parse('https://mcp.figma.com/mcp')
          )
        ];
      }
    })
  );
}

module.exports = { activate };
