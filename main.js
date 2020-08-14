/* Event: Validate person input fields */
document.querySelector("body").addEventListener("input", (e) => {
  e.preventDefault();
  let input, current_case;

  // Get form input id name
  if (
    e.target.parentElement.parentElement.parentElement.parentElement.tagName ===
    `FORM`
  ) {
    input = document.querySelector(`#${e.target.id}`);
    current_case = input.id;
  }

  // Get table input class name
  else if (
    e.target.parentElement.parentElement.parentElement.parentElement.tagName ===
    "TABLE"
  ) {
    input = document.querySelector(`.${e.target.classList[1]}`);
    current_case = input.classList[1];
  }

  // Red input color indicates an invalid input
  input.style.color = `red`;
  let message = ``;

  // Switch case
  // Validate input fields using regex
  // If the user input is invalid an alert message will pop

  if (input.value != "") {
    switch (current_case) {
      case `id`: {
        display_message = Exceptions.isValidNumber(input.value);
        if (!display_message) message = `Person id must be a valid number!`;
        break;
      }

      case `firstName`: {
        display_message = Exceptions.isValidName(input.value);
        if (!display_message)
          message = `Person name must contains at least characters!`;
        break;
      }

      case `lastName`: {
        display_message = Exceptions.isValidName(input.value);
        if (!display_message)
          message = `Person name contains at least characters!`;
        break;
      }

      case `age`: {
        display_message = Exceptions.isValidAge(input.value);
        if (!display_message)
          message = `person age must be a valid number and above the age of 18!`;
        break;
      }

      case `ftd`: {
        display_message = Exceptions.isValidFtd(input.value);
        if (!display_message)
          message = `Person ftd must be a valid number & in the range of (5000$-120000$)`;
        break;
      }
    }
  }
  // Display the user an informative message about his invalid input
  if (!display_message && message != "")
    UI.showAlert(message, `danger`, `exception`);
  else {
    // Black text indicates a valid input
    input.style.color = `black`;

    if (document.querySelector(".alert") != null)
      document.querySelector(".alert").remove();
  }
});

/* Event: Add a person */
document.querySelector("#person-form").addEventListener("click", (e) => {
  // Prevent submit
  e.preventDefault();

  // User has pressed the form button
  if (e.target.tagName === "BUTTON") {
    const inputs = document.querySelectorAll(`input`);

    // Loop over input fields
    for (let i = 0; i < inputs.length; i++) {
      // If an input field
      // remains to be red
      // Display User alert
      // Break current loop
      if (inputs[i].style.color === `red`) {
        UI.showAlert(`Input fields are not valid!`, `danger`, `info-message`);
        break;
      }

      // No invalid input was found
      else if (i === inputs.length - 1) {
        const id = document.querySelector("#id").value;
        const first_name = document.querySelector("#firstName").value;
        const last_name = document.querySelector("#lastName").value;
        const age = document.querySelector("#age").value;
        const ftd = document.querySelector("#ftd").value;

        // Input fields are not allowed to remain empty
        if (
          id != "" &&
          firstName != "" &&
          lastName != "" &&
          age != "" &&
          ftd != ""
        ) {
          // Instantiate person
          const person = new Person(id, first_name, last_name, age, ftd);

          // User action confirmation
          UI.showAlert(
            `Are you sure you would like to add ${person.getFullName()}, (id: ${
              person.id
            }) ?`,
            `info`,
            `add`
          );

          // User confirmation is positive
          Util.getAnswerState((result) => {
            if (result === "yes") {
              // Verify person is not already exists in database
              function checkIfPersonExists(res) {
                if (res) {
                  // Add person to local store
                  Store.addPerson(person);

                  // Update current data list
                  Util.getUpdatedDataList();

                  // Display user alert in case of success
                  UI.showAlert(
                    `Person id: ${
                      person.id
                    }, ${person.getFullName()} has been successfully added!`,
                    `success`,
                    `info-message`
                  );
                } else {
                  UI.showAlert(
                    "Person id is already taken please use another id",
                    `danger`,
                    `info-message`
                  );
                }
              }

              Store.callbackTester(checkIfPersonExists, true, person.id);
            }
            // User confirmation is negative
            else if (result === "no") {
              // Display user alert in case of success
              UI.showAlert(`No person has been added`, `info`, `info-message`);
            }

            // Clear form fields
            UI.clearFormInputFields();
            // Update UI
            UI.displayPerson();
          });
        } else {
          // Display user alert in case of error or an empty input
          UI.showAlert(
            "Form fields cannot remain empty",
            "danger",
            "info-message"
          );
        }
      }
    }
  }
});

/* Event: Remove a person */
document.querySelector("#person-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    // Remove person from UI
    let rowToBeDeleted = UI.removePerson(e.target);

    // Get current item person id
    let idValue = rowToBeDeleted.children[0].innerText;

    // Get person full name
    let fullName =
      rowToBeDeleted.children[1].innerText +
      " " +
      rowToBeDeleted.children[2].innerText;

    // User action confirmation
    UI.showAlert(
      `Are you sure you want to delete ${fullName}, (id: ${idValue})`,
      `info`,
      `delete`
    );

    // confirmation is positive
    Util.getAnswerState((result) => {
      if (result === `yes`) {
        // Delete from local store
        Store.removePerson(idValue);

        UI.showAlert(
          `Person id: ${idValue} (${fullName}) has been successfully removed`,
          `success`,
          `info-message`
        );
      } else if (result === `no`) {
        UI.showAlert(
          `Person id: ${idValue} (${fullName}) has not been removed`,
          `info`,
          `info-message`
        );
      }

      // Update current data list
      Util.getUpdatedDataList();

      // If no items to display decrement current page number
      list.children.length - 1 === 0 ? --current_page : current_page;

      // If database list is empty clear UI
      if (database.length === 0) list.innerHTML = "";

      // Update UI
      UI.displayPerson();
    });
  }
});

/* Event: edit person */
document.querySelector("#person-list").addEventListener("click", (e) => {
  // Prevent submit
  e.preventDefault();

  // Initialize local variables
  let i = 0;
  let id, firstName, lastName, age, ftd;

  if (e.target.classList.contains("edit-btn")) {
    // Restore previous input fields if needed
    Util.backToUsual();

    // Chosen row
    let row =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement;

    if (row != null) {
      // Loop over row cells
      while (i < row.children.length - 1) {
        // Save value of each cell
        id = row.children[i++].innerText;
        firstName = row.children[i++].innerText;
        lastName = row.children[i++].innerText;
        age = row.children[i++].innerText;
        ftd = row.children[i++].innerText;

        // Save previous person details
        previousCurrentPersonDetails = new Person(
          id,
          firstName,
          lastName,
          age,
          ftd
        );
      }

      row.innerHTML = ` 
            <td class="col-2" align="center">${id}</td>
    
            <td class="col-2" align="center">
                <input type="text" class="form-control firstName">
            </td>
    
            <td class="col-2" align="center">
                <input type="text" class="form-control lastName">
            </td>
    
            <td class="col-2" align="center">
                <input type="text" class="form-control age">
            </td>
    
            <td class="col-2" align="center">
                <input type="text" class="form-control ftd">
            </td>
            <td class="col-2 icons" align="left"> 
              <div class="options-wrapper">

                <div>
                  <a href="#"><i class="fas fa-save fa-2x save-btn"></i></i></a>
               </div>

                <div>
                  <a href="#"><i class="fas fa-edit fa-2x edit-btn"></i></a>
                </div>

                <div>
                  <a href="#"><i class="btn btn-danger btn-sm delete">X</i></a>
                </div>

              </div>
            </td>`;

      // Get all the row inputs
      const personInputs = document.querySelectorAll("tr td > input");

      // Loop over all the inputs
      for (let k = 0; k < personInputs.length; k++) {
        // If we reach the end of the loop
        // No undefined or null inputs were found
        if (k === personInputs.length - 1) {
          document.querySelector(".firstName").value = firstName;
          document.querySelector(".lastName").value = lastName;
          document.querySelector(".age").value = age;
          document.querySelector(".ftd").value = ftd;
        }
      }
    }
  }
});

/* Event: save person details */
document.querySelector("#person-list").addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("save-btn")) {
    // Get current row person id
    let currentRowId = tr.firstElementChild.innerText;

    let j = 0;

    for (let i = 0; i < list.children.length; i++) {
      // If any row contains some sort of inputs
      if (
        list.children[i].firstElementChild.nextElementSibling
          .firstElementChild != null
      ) {
        // Get all row inputs
        const personInputs = document.querySelectorAll("tr td > input");

        // Loop over input fields to
        // check wether or not
        // they all contains inputs values
        for (let k = 0; k < personInputs.length; k++) {
          // If an empty input was found
          // or invalid one Break current loop and
          // restore row to previous state
          if (
            personInputs[k].value === "" ||
            personInputs[k].style.color === `red`
          ) {
            flag = 0;
            UI.showAlert(
              `Input fields are not valid!`,
              `danger`,
              `info-message`
            );
            Util.restoreRow(list.children[i]);
            break;
          }

          // End of inputs array - no empty fields were found
          else if (k === personInputs.length - 1) {
            // Loop over the number of inputs
            while (j < personInputs.length) {
              // Instantiate person
              const id = list.children[i].firstElementChild.innerText;
              const first_name = personInputs[j++].value;
              const last_name = personInputs[j++].value;
              const age = personInputs[j++].value;
              const ftd = personInputs[j++].value;

              // Verify the save button is the right one according to person id
              if (
                currentRowId === list.children[i].firstElementChild.innerText
              ) {
                // Save person to local store
                Store.updatePerson(
                  new Person(id, first_name, last_name, age, ftd)
                );

                flag = 1;
              } else {
                flag = 0;
              }
              // Restore row before inputs were initially created
              Util.restoreRow(list.children[i]);
            }
          }
        }
      }
    }
  }
});

/* Event: display entries */
const show = document
  .querySelector(".show-selection")
  .addEventListener("change", (e) => {
    current_page = 1;
    rows = e.target.value;
    UI.displayPerson();
  });

/* Event: display filtering (sorting up or down depends on the category that has been selected) */
document.querySelector("table thead").addEventListener("click", (e) => {
  if (e.target.tagName === "I") {
    // Reset sorting state
    sorting_state = filter = "";

    // Get filter key word
    filter = Util.getKey(e.target.parentElement.parentElement.innerText);

    console.log();

    // If the user want to filter in an ascending way
    if (e.target.classList[3] === `filter-${filter}-up`) {
      Util.handleFilter(`.filter-${filter}-up`, `.filter-${filter}-down`, `up`);
    }

    // If the user want to filter in an descending way
    else if (e.target.classList[3] === `filter-${filter}-down`) {
      Util.handleFilter(
        `.filter-${filter}-down`,
        `.filter-${filter}-up`,
        `down`
      );
    }
  }
});

/* Event mouseover row */
document.querySelector("#person-list").addEventListener("mouseover", (e) => {
  // Handle nested elements that might cause triggering as well
  if (
    e.target.parentElement.tagName === "TR" ||
    e.target.parentElement.tagName === "A"
  ) {
    Util.findRowByIndex(e.target.parentElement.rowIndex);
    tr.classList.add("active-row");
  }
});

/* Event mouseout row */

document.querySelector("#person-list").addEventListener("mouseout", (e) => {
  if (e.target.parentElement.tagName === "TR") {
    tr.classList.remove("active-row");
  }
});
