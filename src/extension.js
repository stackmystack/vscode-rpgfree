// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

const RpgleFreeX = require(`./RpgleFree`);

/**
 * This procedure converts the highlighted text to free form
 */
function RpgleFree() {

  // Get the selected text from the editor and break into an array 
  const editor = vscode.window.activeTextEditor;
  let text = editor.document.getText(editor.selection);
  let lines = text.split(/\r\n/);

  // Start with the indent value being a constant
  // We'll add a configuration setting for this in the future
  const indent = 2;

  // Convert the array of lines to free format
  let conv = new RpgleFreeX(lines, indent);
  conv.parse();

  let curRange = new vscode.Range(editor.selection.start, editor.selection.end);
  editor.edit(editBuilder => {
    editBuilder.replace(curRange,lines.join(`\r\n`));
  });
  
  vscode.window.showInformationMessage(`Selected text converted to free format`);

}

export function activate(context) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-rpgfree" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(
		vscode.commands.registerCommand(`vscode-rpgfree.rpgleFree`, function () {
			RpgleFree();
		})
	);

}

// this method is called when your extension is deactivated
export function deactivate() {}
