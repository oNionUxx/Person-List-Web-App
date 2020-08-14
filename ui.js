/* UI Class: Handle UI tasks */
class UI {
  /* Function to display a person */
  static displayPerson() {
    if (database.length > 0) {
      // Display data in table according to required page and number of rows
      Pagination.displayList(database, list, rows, current_page);
      Pagination.setUpPagination(database, pagination, rows);
    } else {
      // If no data was found clears out pagination
      let pagination_wrapper = document.querySelector("footer nav div");
      pagination_wrapper.innerHTML = "";
    }
  }

  /* Function to add a new person */
  static addPerson(person) {
    let row = document.createElement("tr");
    row.classList.add("row");

    row.innerHTML = ` 
        <td class="col-2" align="center">${person.id}</td>
        <td class="col-2" align="center">${person.first_name}</td>
        <td class="col-2" align="center">${person.last_name}</td>
        <td class="col-2" align="center">${person.age}</td>
        <td class="col-2" align="center">${person.ftd}</td>
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

    return row;
  }

  /* Function to remove a person */
  static removePerson(el) {
    return tr;
  }

  /* Function to display user message alert */
  static showAlert(message, className, action) {
    // Remove previous alert message
    if (document.querySelector(".alert") != null) {
      document.querySelector(".alert").remove();
      clearInterval(timerState);
    }

    // Div creation
    const div = document.createElement("div");

    // Add alert class name
    div.className = `alert alert-${className}`;

    // Add informative message to display
    div.appendChild(document.createTextNode(message));

    // If user planing on actions likes delete or add
    // Add options buttons and set up timer
    if (action === `delete` || action === `add`) {
      // Add 'Yes' , 'No' Buttons
      const button_div = document.createElement("div");
      button_div.className = "options-yes-no";
      button_div.innerHTML = `<span id="timer"></span>
             <button class="btn btn-primary yes-btn">Yes</button>
             <button class="btn btn-primary no-btn">No</button>`;

      timerState = Util.timerFunction();
      div.appendChild(button_div);
    }

    const container = document.querySelector(".container");
    const form = document.querySelector("#person-form");

    container.insertBefore(div, form);

    if (action === `info-message`) {
      setTimeout(() => document.querySelector(".alert").remove(), 2000); // Vanish in 2 second
    }
  }

  /* Function to clear the input fields of the form */
  static clearFormInputFields() {
    document.querySelector("#id").value = "";
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#age").value = "";
    document.querySelector("#ftd").value = "";
  }
}
