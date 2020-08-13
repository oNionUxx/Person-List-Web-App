// Store Class: Handles Storage
class Store {
  // Get persons
  static getPersons() {
    let persons;

    if (localStorage.getItem("personList") === null) persons = [];
    else persons = JSON.parse(localStorage.getItem("personList"));

    return persons;
  }

  static callbackTester(callback) {
    let flag = 0;

    for (let p in Store.getPersons()) {
      if (Store.getPersons()[p].id === arguments[2]) {
        flag = 1;
        callback(false);
        break;
      }
    }

    if (flag === 0) callback(true);
  }

  // Add person
  static addPerson(person) {
    let persons = Store.getPersons();
    persons.push(person);
    localStorage.setItem("personList", JSON.stringify(persons));
  }

  // Remove a person
  static removePerson(id) {
    let persons = Store.getPersons();

    persons.forEach((person, index) => {
      if (person.id === id) persons.splice(index, 1);
    });
    localStorage.setItem("personList", JSON.stringify(persons));
  }

  // Update person
  static updatePerson(p) {
    let persons = Store.getPersons();
    let j = 1;

    persons.forEach((element) => {
      for (let i = 0; i < Object.keys(element).length; i++) {
        if (element[`id`] === p.id) {
          element[Object.keys(element)[j++]] = p.first_name;
          element[Object.keys(element)[j++]] = p.last_name;
          element[Object.keys(element)[j++]] = p.age;
          element[Object.keys(element)[j++]] = p.ftd;
          break;
        }
      }
    });
    console.log();
    localStorage.setItem("personList", JSON.stringify(persons));
  }
}
