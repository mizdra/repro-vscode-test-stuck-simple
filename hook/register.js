import { rmSync, writeFileSync } from 'node:fs';
import { register } from 'node:module';

rmSync('./log.txt', { force: true });

const { port1, port2 } = new MessageChannel();
/**
 * @param {MessageEvent<{id: string, url: string}>} e
 */
port1.onmessage = (e) => {
  console.log(`onmessage: ${JSON.stringify(e.data)}`);
  writeFileSync('./log.txt', `onmessage: ${JSON.stringify(e.data)}\n`, { flag: 'a+' });
  port1.postMessage({
    id: e.data.id,
    url: 'data:text/javascript,console.log("vscode module loaded");',
  });
};
register('./hook.js', {
  parentURL: import.meta.url,
  data: { port: port2 },
  transferList: [port2],
});

setTimeout(() => {
  port1.close();
  port2.close();
} , 1000);
