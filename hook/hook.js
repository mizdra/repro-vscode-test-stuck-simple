import { writeFileSync } from 'node:fs';

/** @type {(url: string) => Promise<string>} */
let lookup;
/** @type {import('node:module').InitializeHook<{port: MessagePort}>} */
export const initialize = (context) => {
  let requestIds = 0;
  const { port } = context;
  const pendingRequests = new Map();
  port.onmessage = (event) => {
    const { id, url } = event.data;
    pendingRequests.get(id)?.(url);
  };
  lookup = async (url) => {
    const myId = requestIds++;
    return new Promise((resolve) => {
      pendingRequests.set(myId, resolve);
      port.postMessage({ id: myId, url });
    });
  };
}

/** @type {import('node:module').ResolveHook} */
export const resolve = async (specifier, context, nextResolve) => {
  // !!!!!!!!!! NOTE !!!!!!!!!!
  // There is a bug where calling `console.log` from an asynchronous resolve function does not output to stdout.
  // Therefore, we write logs to a file here instead.
  writeFileSync('./log.txt', `resolve ${specifier} from ${context.parentURL}\n`, { flag: 'a+' });

  if (specifier !== 'vscode' || !context.parentURL) {
    return nextResolve(specifier, context);
  }
  const otherUrl = await lookup(context.parentURL);
  return {
    url: otherUrl,
    shortCircuit: true,
  };
};
