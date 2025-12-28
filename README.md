## How to reproduce

```console
$ npm i
$ node --import ./hook/register.js src/require-extension.cjs
# or
$ node --import ./hook/register.js src/import-extension.js
```

## Expected behavior

Both `require-extension.cjs` and `import-extension.js` successfully load the `vscode` module.

```console
$ node --import ./hook/register.js src/require-extension.cjs
resolve: {"specifier":"vscode","parentURL":"file:///Users/mizdra/src/github.com/mizdra/repro-vscode-test-hang-simple/src/extension.js"}
onmessage: {"id":0,"url":"file:///Users/mizdra/src/github.com/mizdra/repro-vscode-test-hang-simple/src/extension.js"}
vscode module loaded
$ cat log.txt
resolve: {"specifier":"vscode","parentURL":"file:///Users/mizdra/src/github.com/mizdra/repro-vscode-test-hang-simple/src/extension.js"}
onmessage: {"id":0,"url":"file:///Users/mizdra/src/github.com/mizdra/repro-vscode-test-hang-simple/src/extension.js"}
```

```console
$ node --import ./hook/register.js src/import-extension.js
resolve: {"specifier":"vscode","parentURL":"file:///Users/mizdra/src/github.com/mizdra/repro-vscode-test-hang-simple/src/extension.js"}
onmessage: {"id":0,"url":"file:///Users/mizdra/src/github.com/mizdra/repro-vscode-test-hang-simple/src/extension.js"}
vscode module loaded
$ cat log.txt
resolve: {"specifier":"vscode","parentURL":"file:///Users/mizdra/src/github.com/mizdra/repro-vscode-test-hang-simple/src/extension.js"}
onmessage: {"id":0,"url":"file:///Users/mizdra/src/github.com/mizdra/repro-vscode-test-hang-simple/src/extension.js"}
```

## Actual behavior

Environment: macOS 26.1, Apple M1 Pro

### Node.js 22.21.1

`require-extension.cjs` hangs during execution. Additionally, `resolve: {"specifier":"vscode","parentURL":"file:///Users/mizdra/src/github.com/mizdra/repro-vscode-test-hang-simple/src/extension.js"}` is not output to stdout.

`import-extension.js` works as expected.

```console
$ node --import ./hook/register.js src/require-extension.cjs
(hang here...)^C
$ cat log.txt
resolve: {"specifier":"vscode","parentURL":"file:///Users/mizdra/src/github.com/mizdra/repro-vscode-test-hang-simple/src/extension.js"}
```

```console
$ node --import ./hook/register.js src/import-extension.js
resolve: {"specifier":"vscode","parentURL":"file:///Users/mizdra/src/github.com/mizdra/repro-vscode-test-hang-simple/src/extension.js"}
onmessage: {"id":0,"url":"file:///Users/mizdra/src/github.com/mizdra/repro-vscode-test-hang-simple/src/extension.js"}
vscode module loaded
$ cat log.txt
resolve: {"specifier":"vscode","parentURL":"file:///Users/mizdra/src/github.com/mizdra/repro-vscode-test-hang-simple/src/extension.js"}
onmessage: {"id":0,"url":"file:///Users/mizdra/src/github.com/mizdra/repro-vscode-test-hang-simple/src/extension.js"}
```

### Node.js 25.2.1

`require-extension.cjs` hangs during execution. Additionally, `resolve: {"specifier":"vscode","parentURL":"file:///Users/mizdra/src/github.com/mizdra/repro-vscode-test-hang-simple/src/extension.js"}` is not output to stdout.

`import-extension.js` will behave the same way.

```console
$ node --import ./hook/register.js src/require-extension.cjs
(hang here...)^C
$ cat log.txt
resolve: {"specifier":"vscode","parentURL":"file:///Users/mizdra/src/github.com/mizdra/repro-vscode-test-hang-simple/src/extension.js"}
```

```console
$ node --import ./hook/register.js src/import-extension.js
(hang here...)^C
$ cat log.txt
resolve: {"specifier":"vscode","parentURL":"file:///Users/mizdra/src/github.com/mizdra/repro-vscode-test-hang-simple/src/extension.js"}
```
