/**
 * 'export' ist nötig falls wir MyMath in einem anderen Modul importieren wollen.
 * 'class' legt fest dass es sich hierbei um eine Klasse handelt.
 * 'MyMath' ist der Name der Klasse.
 */
export class MyMath {

    /**
     * Der Konstruktor wird aufgerufen um neue Instanzen der Klasse zu generieren.
     * vgl. let myNumber = new MyMath(3);
     * 
     * @param value Unser Initialwert für den Wert von unserer MyMath Instanz.
     */
    constructor(value) {
        // 'this' referenziert den Kontext in dem die aktuelle Funktion aufgerufen wird. 
        // Hier referenziert es die Instanz der Klasse MyMath die wir gerade erstellen.
        // mit 'value * 1' erzwingen wir, dass value als number gelesen wird.
        this.value = value * 1 || 0; 
    }

    add(value) {
        this.value += value;
        return this;
    }

    subtract(value) {
        this.value -= value;
        return this;
    }

    multiply(value) {
        this.value *= value;
        return this;
    }

    divide(value) {
        //Division mit 0 wird verhindert
        this.value /= value || 1;
        return this;
    }

    pow(value) {
        //für negative Werte wird der Wert nicht verändert
        if(value < 0) return this;

        let p = 1;
        for(let i = 0; i < value; i++) p *= this.value;

        this.value = p;
        return this;
    }

    faculty() {
        //Value muss eine ganze Zahl sein, sonst wird abgebrochen
        if(this.value % 1 !== 0) return this;

        let fac = 1;
        for(let i = 2; i <= this.value; i++) fac *= i;

        this.value = fac;
        return this;
    }
}
