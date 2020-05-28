/* Global Vars */ 
const list = document.querySelector('#person-list');
const pagination = document.querySelector('footer nav div');
let data_base, flag, rows, sorting_state, current_page, helper,
    tr, filter, timerState, previousCurrentPersonDetails, display_message;

/* Initialize */ 
function initialize() {
    display_message = true;
    flag = 0;
    sorting_state = helper = tr = filter = '';
    rows = 5; current_page = 1; timerState = null;
    database = Store.getPersons();
    UI.displayPerson();
}

/* Event: Initializing main script */
document.addEventListener('DOMContentLoaded', initialize());