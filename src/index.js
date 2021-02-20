import _ from "lodash";

import "./styles/style.css";
import "./styles/style.scss";
import Icon from "./assets/images/icon.jpeg";
import printMe from "./print";
import anotherOne from "./another-one";

function component() {
  const element = document.createElement("div");
  const btn = document.createElement("button");
  const cssSpan = document.createElement("span");
  const scssSpan = document.createElement("span");
  const myIcon = new Image();

  cssSpan.innerHTML = _.join(["Hello", "webpack"], " ");
  cssSpan.classList.add("hello-webpack");
  scssSpan.innerHTML = _.join(["Hello", "sass"], " ");
  scssSpan.classList.add("hello-sass");

  myIcon.src = Icon;

  btn.innerHTML = "Click me and check the console!";
  btn.onclick = printMe;

  element.appendChild(btn);
  element.appendChild(cssSpan);
  element.appendChild(scssSpan);
  element.appendChild(myIcon);

  return element;
}

document.body.appendChild(component());
