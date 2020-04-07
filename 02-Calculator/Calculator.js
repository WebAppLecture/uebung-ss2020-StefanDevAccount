import {MyMath} from "../01-MyMath/MyMath.js";

export class Calculator {

    constructor(numpad, outputCalculation, outputSolution) {
        this.numpad = numpad;
        this.outputCalculation = outputCalculation;
        this.outputSolution = outputSolution;

        this.mymath = new MyMath(0);
        this.last_operation = (value => this.mymath.add(value));

        this.setupNumPad();
    }

    setupNumPad() { 
        //generiere Ziffernblock von 1 bis 9
        for(let row = 2; row + 1; row--)
        {
            let new_div = document.createElement("div");
            new_div.classList.add("flex-4");
            for(let i = 1; i <= 3; i++)
            {
                let new_button = document.createElement("button");
                let button_num = row*3 + i;
                new_button.innerText = "" + button_num;
                new_div.appendChild(new_button);
            }
            this.numpad.appendChild(new_div);
        }
        
        //füge vierte Buttonreihe hinzu
        let akt_div = document.createElement("div")
        akt_div.classList.add("flex-4");
        this.numpad.appendChild(akt_div);

         //erstelle restlichen Ziffernblock
        let divs_in_numpad = this.numpad.children;

        let operators = ["!", "0", "**"];
        for(let operator of operators)
        {
            let new_button = document.createElement("button");
            new_button.innerText = operator;
            divs_in_numpad[3].appendChild(new_button);
        }
       
        operators = ["/", "*", "-", "+"];
        for(let index in operators)
        {
            let new_button = document.createElement("button");
            new_button.innerText = operators[index];
            divs_in_numpad[index].appendChild(new_button);
        }

        //adde AC
        akt_div = document.createElement("div");
        akt_div.classList.add("flex-4");
        let new_button = document.createElement("button");
        new_button.innerText = "AC";
        akt_div.appendChild(new_button);
        this.numpad.appendChild(akt_div);
        

        //adde EventListener
        for(let div of divs_in_numpad)
        {
            for(let button of div.children)
            {
                button.addEventListener('click', event => this.onButtonClick(button.innerText));
            }
        }
    }

    onButtonClick(symbol) {
        console.log("Gedrückte Taste: " + symbol);

        if(isNaN(symbol * 1))
        {
            switch(symbol)
            {
                case "+":
                    this.last_operation = (value => this.mymath.add(value));
                    break;
                case "-":
                    this.last_operation = (value => this.mymath.subtract(value));
                    break;
                case "*":
                    this.last_operation = (value => this.mymath.multiply(value));
                    break;
                case "/":
                    this.last_operation = (value => this.mymath.divide(value));
                    break;
                case "!":
                    this.mymath.faculty();
                    break;
                case "**":
                    this.last_operation = (value => this.mymath.pow(value));
                    break;
            }

        }
        else{
            this.last_operation(symbol * 1);
        }

        this.printSolution(this.mymath.value);
        this.print(symbol);

        if(symbol === "AC")
        {
             this.clear();
             this.mymath.value = 0;
             this.last_operation = (value => this.mymath.add(value));
        }

    }

    print(string) {
        this.outputCalculation.value += string;
    }

    printSolution(string) {
        this.outputSolution.value = string;
    }

    clear() {
        this.outputCalculation.value = "";
        this.outputSolution.value = "";
    }

}
