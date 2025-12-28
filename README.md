## How to reproduce

```console
$ npm i
$ npm start
```

### Node.js 22.21.1

```
$ npm start
> module-register-test@1.0.0 start
> node --import ./hook/register.js src/main.cjs

^C
$ cat log.txt
resolve file:///Users/mizdra/src/localhost/gomi/repro-vscode-test-hang-simple/src/main.cjs from undefined
resolve vscode from file:///Users/mizdra/src/localhost/gomi/repro-vscode-test-hang-simple/src/extension.js
```

### Node.js 24.12.0

```
$ npm start
> module-register-test@1.0.0 start
> node --import ./hook/register.js src/main.cjs

^C
$ cat log.txt
resolve file:///Users/mizdra/src/localhost/gomi/repro-vscode-test-hang-simple/src/main.cjs from undefined
resolve vscode from file:///Users/mizdra/src/localhost/gomi/repro-vscode-test-hang-simple/src/extension.js
```

### Node.js 25.2.1

```
$ npm start
> module-register-test@1.0.0 start
> node --import ./hook/register.js src/main.cjs

^C
$ cat log.txt
resolve file:///Users/mizdra/src/localhost/gomi/repro-vscode-test-hang-simple/src/main.cjs from undefined
resolve vscode from file:///Users/mizdra/src/localhost/gomi/repro-vscode-test-hang-simple/src/extension.js
```
