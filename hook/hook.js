import { writeFileSync } from 'node:fs';

/** @type {(url: string) => Promise<string>} */
let lookup;
/** @type {import('node:module').InitializeHook<{port: MessagePort}>} */
export const initialize = (context) => {
  let requestIds = 0;
  const { port } = context;
  lookup = async (url) => {
    const myId = requestIds++;
    const { promise, resolve } = Promise.withResolvers();
    port.addEventListener('message', (event) => {
      const { id, url } = event.data;
      if (id === myId) resolve(url);
    }, { once: true });
    port.postMessage({ id: myId, url });
    return promise;
  };
};

/** @type {import('node:module').ResolveHook} */
export const resolve = async (specifier, context, nextResolve) => {
  if (specifier !== 'vscode' || !context.parentURL) {
    return nextResolve(specifier, context);
  }

  console.log(`resolve: ${JSON.stringify({ specifier, parentURL: context.parentURL })}`);
  // !!!!!!!!!! NOTE !!!!!!!!!!
  // There is a bug where calling `console.log` from an asynchronous resolve function does not output to stdout.
  // Therefore, we write logs to a file here instead.
  writeFileSync('./log.txt', `resolve: ${JSON.stringify({ specifier, parentURL: context.parentURL })}\n`, { flag: 'a+' });

  const otherUrl = await lookup(context.parentURL);
  return {
    url: otherUrl,
    shortCircuit: true,
  };
};
