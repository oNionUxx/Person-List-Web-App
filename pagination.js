// Pagination Class: Handles paginating
class Pagination {

    static displayList(items, wrapper, rows_per_page, page) {

        // Reset data list element
        wrapper.innerHTML = '';
        
        // Decrement page value by 1
        page --;

        // Setting up starting and ending page
        let start = page * rows_per_page;
        let end = Number(start) + Number(rows_per_page);  

        // Slicing the items list to be display the required page
        let paginatedItems = items.slice(start, end); 

        // Add person to our list 
        paginatedItems.forEach((person) => {
            wrapper.appendChild(UI.addPerson(person));
        });
    }

    static setUpPagination(items, pagination_wrapper, rows_per_page) {
        // Reset pagination element
        pagination_wrapper.innerHTML = ''; 
        
        // Setting up previous button
        let prev_button = document.createElement('button');
        prev_button.classList.add('prev-next');
        prev_button.innerText = 'Previous'
        pagination_wrapper.appendChild(prev_button);

        // Getting the right amount of pages according to our data list
        let page_count = Math.ceil(items.length / rows_per_page);

        for(let i = 1; i < page_count + 1; i ++) {
            let button = Pagination.paginationButton(i);
            pagination_wrapper.appendChild(button);
        }

        // Setting up next button
        let next_button = document.createElement('button');
        next_button.classList.add('prev-next');
        next_button.innerText = 'Next'
        pagination_wrapper.appendChild(next_button);

        // Previous button event listener
        prev_button.addEventListener('click', () => {
            if(current_page > 1) {
                -- current_page;
    
                let current_button = document.querySelector('.list-pagination button.active');
                current_button.classList.remove('active');
                
                let moveToPreviousButton = current_button.previousSibling;
                moveToPreviousButton.classList.add('active');

                Pagination.displayList(items, list, rows, current_page);
            }
        });

        // Next button event listener
        next_button.addEventListener('click', () => {         
            if(current_page < page_count) {  
                ++ current_page;
            
                let current_button = document.querySelector('.list-pagination button.active');
                current_button.classList.remove('active');

                let moveToNextButton = current_button.nextSibling;
                moveToNextButton.classList.add('active');
                Pagination.displayList(items, list, rows, current_page);
            }
        });
    }

    static paginationButton(page) {

        // Setting up button page
        let button = document.createElement('button');
        button.innerText = `${page}`;
        
        if(current_page === page) {
            button.classList.add('active');
        }
        
        // Current page event listener
        button.addEventListener('click', () => {

            // Update current page
            current_page = page;

            // Find active page
            let current_button = document.querySelector('.active');

            // Remove active page
            current_button.classList.remove('active');
            
            // Set up the new active page
            button.classList.add('active');

            // Update UI
            Pagination.displayList(database, list, rows, current_page);  
        });
        return button;
    } 
}