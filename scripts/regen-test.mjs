import { read, runDirs, settings, write } from '../lib/testsuite.mjs';
import { RpgleFree } from '../src/RpgleFree.mjs';

function regen(dir) {
  const input = read(dir);
  const output = new RpgleFree(input, settings).parse();
  write(dir, output);
}

// TODO: parallelize when necessary
runDirs.forEach(t => regen(t));
