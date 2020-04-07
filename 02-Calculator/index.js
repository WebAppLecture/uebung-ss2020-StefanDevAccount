import { MyMath } from "../01-MyMath/MyMath.js";
import { Calculator } from "./Calculator.js";

window.MyMath = MyMath; // Fügt die Klasse MyMath zum globalen Namespace hinzu, damit ihr sie in der Browserkonsole hernehmen könnt.
window.Calculator = Calculator;

window.calc = new Calculator(document.querySelector(".numpad"), document.querySelector("#calculation"), document.querySelector("#solution"));



console.log("Fertig mit index.js");