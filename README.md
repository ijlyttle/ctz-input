# ctz-input

The purpose of this repository is to provide notebook-style inputs, in the style of [Observable inputs](https://observablehq.com/@jashkenas/inputs).

This idea started out life as written as an R HTMLWidget, which works, but I fear that I am missing out on some of the advantages of developing this as a TypeScript package (to be then imported into an HTMLWidget):

- all the TypeScript strict type-checking goodness.
- native TS testing on travis or GitHub actions
- native JS testing on an HTML page to ensure the right things happen when you click this or move that.
- as a side-effect, get closer to being able to contribute to Vega-Lite, etc.
- more immediately, being able to extend the lessons learned here to other widgets that might be imagined.

The big drawback at this point:

- I am just learning how to work in a TypeScript project.

Stay tuned...