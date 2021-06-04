const btn = document.querySelector('button')
const form = document.querySelector('form')
const input = document.querySelector('input')
const errorMsg = document.querySelector('.error-msg')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputValue = input.value;
    if (inputValue === '') {
        errorMsg.innerHTML = 'Please enter a valid email address'
        console.log('error')
    } else if (!isEmail(inputValue)) {
        errorMsg.innerHTML = 'Please enter a valid email address'
        console.log("error")
        form.classList.add('icon')
    }
    else {
        alert('Good News coming your way!')
        console.log(inputValue)
        errorMsg.innerHTML = ''
        input.value = ''
        form.classList.remove('icon')
    }
})

function isEmail(email) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}