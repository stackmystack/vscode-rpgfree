import * as vscode from 'vscode';
import { RpgleFree } from './RpgleFree.mjs';
import { vscodeSettings } from './settings';

const editor = vscode.window.activeTextEditor;

function convert() {
  const settings = vscodeSettings();
  let curRange;
  let text;
  // Get text
  if (editor.selection.isEmpty) {
    curRange = new vscode.Range(
      editor.document.positionAt(0),
      editor.document.positionAt(editor.document.getText().length - 1)
    );
    text = '**FREE' + settings.eol + editor.document.getText();
  } else {
    curRange = new vscode.Range(editor.selection.start, editor.selection.end);
    text = editor.document.getText(editor.selection);
  }

  // Convert
  const lines = new RpgleFree(text, settings).parse();

  // Replace
  editor.edit(editBuilder => {
    editBuilder.replace(curRange, lines);
  })

  vscode.window.showInformationMessage('Selected text converted to free format');
  vscode.commands.executeCommand('editor.action.formatDocument');
}

export function activate(context) {
  console.log('vscode-rpgfree activated');
  // The commandId parameter must match the command field in package.json
  context.subscriptions.push(
    vscode.commands.registerCommand('vscode-rpgfree.rpgleFree', function () {
      convert();
    })
  );
}

export function deactivate() { }
