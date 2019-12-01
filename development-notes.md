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

- create `.gitignore`, took a guess using Vega-Lite `.gitignore` as a template

- at command-line: `yarn` to initialize `yarn.lock` file. Like Vega-Lite, we'll use yarn to manage dependencies.





