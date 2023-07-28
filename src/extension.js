import * as vscode from 'vscode';
import { RpgleFree } from './RpgleFree.mjs';

function convert() {
  const editor = vscode.window.activeTextEditor;
  const eol = editor.document.eol === vscode.EndOfLine.LF ? '\n' : '\r\n';

  let curRange;
  let text;
  // Get text
  if (editor.selection.isEmpty) {
    curRange = new vscode.Range(
      editor.document.positionAt(0),
      editor.document.positionAt(editor.document.getText().length - 1)
    );
    text = '**FREE' + eol + editor.document.getText();
  } else {
    curRange = new vscode.Range(editor.selection.start, editor.selection.end);
    text = editor.document.getText(editor.selection);
  }

  // Convert
  let lines = text.split(eol);
  new RpgleFree(lines, 2).parse();

  // Replace
  editor.edit(editBuilder => {
    editBuilder.replace(curRange, lines.join(eol));
  })

  vscode.window.showInformationMessage('Selected text converted to free format');
  vscode.commands.executeCommand('editor.action.formatDocument');
}

export function activate(context) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "vscode-rpgfree" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  context.subscriptions.push(
    vscode.commands.registerCommand('vscode-rpgfree.rpgleFree', function () {
      convert();
    })
  );

}

// this method is called when your extension is deactivated
export function deactivate() { }
