export default function printMe() {
  console.log("I get loaded from print.js!");
}

export function treeShakeMe() {
  console.log("I don't get used, I get shoke");
}
