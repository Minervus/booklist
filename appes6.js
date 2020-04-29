class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book){
        const list = document.getElementById('book-list'); 
        // Create table row tr element
        const row = document.createElement('tr');
        // Creates a row using row.innerHTML and columns using <td>    
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X<a></td>`; // note: use back ticks ` for string interpolation

        // appends the row as a child element  
        list.appendChild(row); 
    }

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove(); 
        }
    }

    showAlert(message, className){
        // Create the new div and the const variable
        const div = document.createElement('div'); 
        // Add classes 
        div.className = `alert ${className}`; 
        // Add text to alert - in order to create a text node, you must create an element to append it to
        div.appendChild(document.createTextNode(message)); 
        // Get parent element - identify the container to show where to insert the alert
        const container = document.querySelector('.container');
        // Get form - identify the form to show where to insert the alert
        const form = document.querySelector('#book-form');
        // Insert alert - 'insertBefore' method takes two parameters - (what to insert, where to insert before)
        container.insertBefore(div,form); 
    
        // Timeout the alert after x amount of time
        // setTimeout takes two inputs - setTimeout(do something, time in ms)
        // using 'querySelector' to identify the element, then remove() method to remove it
        const alert = document.querySelector('.alert');
        setTimeout(function(){
            alert.remove();
        }, 3000);   

    }

    clearFields(){
        // replaces these fields with a value of nothing ''
        document.getElementById('title').value = ''; 
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }


}

// Event Listeners

document.getElementById('book-form').addEventListener('submit',
    function(e){ // 'e' event object
    // get form values - identify the element, then getting the value with .value
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

    // Instantiate Book
    const book = new Book(title, author, isbn)

    // Instantiate UI object
    const ui = new UI(); 

    // Validate - error handling, if fields are blank, show error otherwise fire off series of 'add' functions
    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('Please fill in all fields', 'error'); 
    }else{

    // Add book to list - fire the addBookToList function defined above
    ui.addBookToList(book); 

    // Clear fields - fire the clearFields function from above
    ui.clearFields(); 

    // Show success - fire the showAlert function using the two parameters
    ui.showAlert('Book Added Successfully', 'success');

    }

    e.preventDefault(); //stop initial behaviour
    }
);

// Event listener for deleting book row
document.getElementById('book-list').addEventListener('click', function(e){

    // Instantiate UI object
     const ui = new UI(); 

     ui.deleteBook(e.target); 

     // Success message
     ui.showAlert('Book Removed', 'success');

    e.preventDefault(); 
});