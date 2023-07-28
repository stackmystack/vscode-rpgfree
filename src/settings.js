import { EndOfLine, window, workspace } from 'vscode';

const editor = window.activeTextEditor;
const config = workspace.getConfiguration('vscode-rpgfree');
const id = x => x;
const eol = val => {
  let res;
  if (val === 'inherit') {
    res = editor.document.eol === EndOfLine.LF ? '\n' : '\r\n';
  } else if (val === 'CRLF') {
    res = '\r\n';
  } else if (val === 'LF') {
    res = '\n'
  }
  return res;
};
const settingsMapper = new Map([
  ['indent', id],
  ['eol', eol],
]);

export function vscodeSettings() {
  const res = {};
  settingsMapper.forEach((mapper, key) => {
    res[key] = mapper(config.get(key));
  });
  return res;
}
