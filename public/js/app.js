const shrinkForm = document.querySelector('form')
const longURL = document.querySelector('#longURL')
const id = document.querySelector('#shortURL') 
const snackbar = document.getElementById("snackbar");
const copyBtn = document.getElementById("copy");

copyBtn.style.display = 'none';

async function shortenURL() {
    const data = {longURL: longURL.value, id: id.value}
    await fetch('/shortURL', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return triggerErrorSuccess(data.error.code)
            } else {
                longURL.value = window.location.href + data.id
                id.value = ''
                copyBtn.style.display = '';
                return triggerErrorSuccess('SUCCESS')
            }
        })
    })
}


function triggerErrorSuccess(message) {
    switch (message) {
        case "EMPTY_URL": 
            snackbar.innerHTML = "Please enter a URL!"
            break;
        case "ER_DUP_ENTRY":
            snackbar.innerHTML = "Oops! The custom link is taken"
            break;
        case "FMT_ERR": 
            snackbar.innerHTML = "Please enter a valid URL!"
            break;
        case "SUCCESS": 
            snackbar.innerHTML = "SUCCESS!"   
            break;
        case "COPY": 
            snackbar.innerHTML = "Copied to clipboard!"   
            break;
    }
    snackbar.className = "show";
    setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
}

function goToGithub() {
    window.location.href = "https://github.com/geraldspacelim/sutdify"
}



function copyURL() {
    if (longURL.value !== "") {
        // longURL.select();
        document.execCommand("copy");
        triggerErrorSuccess("COPY")
    }
}

function outFunc() {
    tooltip.style.opacity = '0'
    tooltip.style.transition = 'opacity 0.5s'
  }