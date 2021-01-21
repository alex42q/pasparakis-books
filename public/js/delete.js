let deleteButton = document.getElementsByClassName("deleteButton")
let deleteB = document.getElementById("deleteButton")

for(buttons of deleteButton){
    buttons.addEventListener("click", function(){
        fetch('/books/delete', {
            method: 'POST',
          })
    })
}