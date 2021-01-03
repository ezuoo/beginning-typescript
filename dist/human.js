"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Human {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}
const chris = new Human("chris", 13, "male");
const sayHi = (person) => {
    return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender} !`;
};
console.log(sayHi(chris));
//# sourceMappingURL=human.js.map