# Development Notes

I have some experience developing R packages; I have very little experience developing JavaScript packages.

My goal here is to document the steps I take to get a TypeScript library up-and-running. The goal of this TS library is to provide the JS to "power" an R htmlwidget. One way to achieve this goal is to follow in the footsteps of Vega-Lite.

## Tools

- Editor: VS Code. Like [Vega-Lite](https://github.com/vega/vega-lite/blob/master/CONTRIBUTING.md#suggested-programming-environment), ESLint, Prettier, vscode-jest-runner

  - there does not seem to be a notion of a "project" in VS Code. Instead, you just point it at
  a directory, and off you go!

- Node: Following [Vega-Lite](https://github.com/vega/vega-lite/blob/master/CONTRIBUTING.md#repository-setup): use homebrew, then `brew install node`.

## Steps

- create repository

- create `README.md`, `development-notes.md`

- create `LICENSE`

- create `package.json` [ref](https://yarnpkg.com/lang/en/docs/package-json/), this seems to be analogous to the DESCRIPTION file in an R package. Initially populated with:
  - name
  - description
  - author
  - version
  - license

  It will also contain things like build scripts, etc.

- create `.gitignore`, took a guess using Vega-Lite `.gitignore` as a template

- at command-line: `yarn` to initialize `yarn.lock` file. Like Vega-Lite, we'll use yarn to manage dependencies. It acts a little bit like `usethis::use_package()`.

- create directories `src`, `src/css`; populate with `CtzInput.ts`, `CtzInput.css`

- use `yarn version` to increment the version. Getting the sense that yarn acts a bit like devtools does in R, but that we use `package.json` and `tsconfig.json` (which we haven't yet created) to customize the behavior.

- yarn:
  - `yarn add eslint --dev` to add ESLint
  - `yarn add typescript --dev`

- `tsc --init` to create `tsconfig.json` from template:
  - changed `target` to `"ES2015"`, `module` to `"es2015"`, following Vega-Lite

- *Goals*:
 - get this into a state where the ts compiles and the js/css is put into a build directory
 - include radio and slider
 - import the build into {ctlyzr} (this goal is external to this repository)
 - get some testing going, perhaps a combination of a visual-regression HMTL page and a set of tests to make sure it behaves as expected.
 - set up GH Actions for CI, etc.

- create `index.ts` file to serve as entry-point
  - in `CtzInput.ts`, `export` the class
  - in `index.ts`: `export {CtzInput} from './CtzInput';`

- in `package.json`, add element to `"scripts"`:
    `"build": "yarn build:only"`
    `"build:only": "tsc && rollup -c"`

- rollup:
  - some [notes on using rollup](https://hackernoon.com/building-and-publishing-a-module-with-typescript-and-rollup-js-faa778c85396)
  - basically, I replicated what Wenyu did with ggvega, but I also found [this guide](https://remarkablemark.org/blog/2019/07/12/rollup-commonjs-umd/):
    - added `"files": ["src/index.ts"]` to `tsconfig.json`
    - added `rollup.config.js`
    - added `rollup-plugin-commonjs`, `rollup-plugin-node-resolve`, as development dependencies

- at this point, after `yarn build`, I can put the contents of `ctz-input.js` in the browser; the name `ctzInput` is available,
implying `ctzInput.CtzInput`, etc. Also ported `ctzRadio`, `ctzSlider`.

- things that are not clear to me:
  - how to move css into place
  - how to test
  - how to install in an HTMLWidget (how to test an HTMLWidget)

- for now, next steps:
  - set up a webpack application, i.e. a test page that uses the scripts
  - write some tests on the page
  - start to think about publishing

- `webpack` 
  - add `webpack`, `webpack-cli`, and `webpack-dev-server` as dev depenencies
  - create a new folder, `dist`, create:
    - `index.html` page to be served
    - `app.js` script to be run
    - `webpack.config.js` config settings
  - need to think about how to write `app.js` in TypeScript
  - run `yarn webpack-dev-server` then go to `http://localhost:8080/dist/`