// my global variable for the .json URL for easy access
const url = 'http://localhost:3000/dogs/'

//loads my array of dog data once the DOM has loaded 
document.addEventListener('DOMContentLoaded', () => {
    getDogs()
})

// my FETCH request. for each dog in the array, it will run the displayDogs() in order to display them
function getDogs(){
    fetch(url).then(res => res.json())
    .then(dogs => {
        dogs.forEach(dog => {
            displayDogs(dog)
        });
    })
}

// my function to display a table with all the dog data
function displayDogs(dog){
    const tBody = document.getElementById('table-body')
    const tr = document.createElement('tr')
    const td = document.createElement('td')
    const btn = document.createElement('button')
    btn.innerText  = 'Edit Dog'

    tr.innerHTML = `
        <tr>
            <td>${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
        </tr>
        `
    td.appendChild(btn)
    tr.appendChild(td)
    tBody.appendChild(tr)

    btn.addEventListener('click', e => {
        e.stopImmediatePropagation()
        submitForm(dog)        
    })    
}

// my function to submit a new dog goes here
function submitForm(dog){
    const form = document.querySelector('form')
    let name = form.name;
    let breed = form.breed;
    let sex = form.sex;

    name.value = dog.name
    breed.value = dog.breed
    sex.value = dog.sex

    form.addEventListener('submit', e => {
        e.preventDefault()
        e.stopImmediatePropagation()

        name.value = form.name.value
        breed.value = form.breed.value
        sex.value = form.sex.value

        dog = {id: dog.id, "name": name.value, "breed": breed.value, "sex": sex.value}
        editDog(dog)
// this clears my form after clicking "submit"
        form.reset()
    })
}

// my function to add a new dog or update one goes here
function editDog(dog){
    fetch(url + dog.id, {
        method: "PATCH", 
        headers: {"Content-type": "Application/json",
        Accept: "Application/json"
    },
    body: JSON.stringify(dog)
    })
    .then(res => res.json())
    .then(dog => displayDogs(dog))
}