/* Person class - Represents a person */
class Person {
  constructor(id, first_name, last_name, age, ftd) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.age = age;
    this.ftd = ftd;
  }

  getFullName() {
    return `${this.first_name} ${this.last_name}`;
  }
}
