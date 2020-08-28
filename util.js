// Util Class
class Util {
  static handleFilter(className_1, className_2, state) {
    console.log(className_1);
    console.log(className_2);
    console.log(state);

    // Element to contains the last 'active-filter' class
    // in case of sorting category has been changed.
    const icon = document.querySelector("i.active-filter");

    // If not null remove 'active-filter' class
    if (icon != null) icon.classList.remove("active-filter");

    // Activate the selected sorting button (sort up or sort down)
    document.querySelector(className_1).classList.add("active-filter");

    // Contains sorting state
    sorting_state = state;

    // Finds and removes the active-filter if sorting state has been changed.
    if (
      document.querySelector(className_2).classList.contains("active-filter")
    ) {
      document.querySelector(className_2).classList.remove("active-filter");
    }

    // Calling sorting function
    Sort.mainSort();

    // Update UI
    UI.displayPerson();
  }

  static getUpdatedDataList() {
    // Update UI according to the current sorting state
    if (sorting_state === "up" || sorting_state === "down")
      Sort.mainSort(filter);
    // Update UI as usual
    else database = Store.getPersons();
  }

  /**/

  static getKey(element) {
    let filter_name = element;
    let str = "";

    for (let i = 0; i < filter_name.length; i++) {
      if (filter_name[i] === " ") str += "_";
      else str += filter_name[i];
    }
    return str.toLocaleLowerCase();
  }

  /* Function to find and returns the current row index */
  static findRowByIndex(row_index) {
    let rows = document.getElementById("person-list").rows;

    for (let i = 0; i < rows.length; i++) {
      if (i == row_index - 1) {
        tr = rows[i];
        break;
      }
    }
  }

  static timerFunction = () => {
    let count = 0;
    // Update the count down every 1 second
    let x = setInterval(function () {
      // Find the distance between now and the count down date
      let distance = 9000 - count;

      // Time calculations for seconds
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      count += 1000;

      if (document.querySelector("#timer") != null) {
        document.querySelector(
          "#timer"
        ).innerHTML = `Your action will be expired in ${seconds}s`;
        // If the count down is over
        if (distance < 0) {
          clearInterval(x);
          document.querySelector("#timer").innerHTML = "";
          document.querySelector(".alert").remove();
        }
      }
    }, 900);
    return x;
  };

  // Call back function
  static getAnswerState = (callback) => {
    document.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.classList.contains("yes-btn")) callback("yes");
      else if (e.target.classList.contains("no-btn")) callback("no");
    });
  };

  static backToUsual() {
    for (let i = 0; i < list.children.length; i++) {
      let rowToBeRestored = list.children[i];

      if (!rowToBeRestored.classList.contains(".active-row")) {
        Util.restoreRow(rowToBeRestored);
      }
    }
  }

  static restoreRow(row) {
    console.log(row);
    if (row.children[1].firstElementChild != null) {
      // Get table inputs after editing inputs
      const id = row.children[0].innerText;
      const first_name = document.querySelector(".firstName").value;
      const last_name = document.querySelector(".lastName").value;
      const age = document.querySelector(".age").value;
      const ftd = document.querySelector(".ftd").value;

      // Input fields are not allowed to remain empty
      if (
        id != "" &&
        firstName != "" &&
        lastName != "" &&
        age != "" &&
        ftd != ""
      ) {
        let person = new Person(id, first_name, last_name, age, ftd);
        if (flag == 0) person = previousCurrentPersonDetails;

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
      } else {
        // Display user alert in case of error or an empty input
        UI.showAlert(
          "Input fields cannot remain empty",
          "danger",
          "info-message"
        );
        UI.displayPerson();
      }
    }
  }
}
