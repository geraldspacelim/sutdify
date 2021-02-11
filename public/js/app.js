const shrinkForm = document.querySelector('form')
const longURL = document.querySelector('#longURL')
const id = document.querySelector('#shortURL') 
const snackbar = document.getElementById("snackbar");
const tooltip = document.getElementById("myTooltip");
const copyBtn = document.getElementById("copy");


shrinkForm.addEventListener('submit', async (e) =>  {
    e.preventDefault()
    const data = {longURL: longURL.value, id: id.value}
    await fetch('/shortURL', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then((response) => {
        response.json().then((data) => {
            console.log(data)
            if (data.error) {
                return triggerErrorSuccess(data.error.code)
            } else {
                longURL.value = window.location.href + data.id
                id.value = ''
                return triggerErrorSuccess('SUCCESS')
            }
        })
    })
})


function triggerErrorSuccess(message) {
    switch (message) {
        case "EMPTY_URL": 
            snackbar.innerHTML = "Please enter a URL!"
            break;
        case "ER_DUP_ENTRY":
            snackbar.innerHTML = "Oops! The custom link is taken"
            break;
        case "SUCCESS": 
            snackbar.innerHTML = "SUCCESS!"   
            break;
    }
    snackbar.className = "show";
    setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
}

function github() {
    window.location.href = "https://github.com/geraldspacelim/sutdify"
}

function maingithub() {
    window.location.href = "https://github.com/geraldspacelim?tab=repositories"
}

function copyToClipBoard() {
    if (longURL.value !== "") {
        longURL.select();
        document.execCommand("copy");
        tooltip.style.opacity = '1'
        tooltip.style.transition = 'opacity 0.5s'
        tooltip.innerHTML = "Copied to clipboard";
    }
}

function outFunc() {
    tooltip.style.opacity = '0'
    tooltip.style.transition = 'opacity 0.5s'
  }