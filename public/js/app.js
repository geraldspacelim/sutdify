const shrinkForm = document.querySelector('form')
const longURL = document.querySelector('#longURL')
const id = document.querySelector('#id') 

shrinkForm.addEventListener('submit', async (e) =>  {
    e.preventDefault()
    if (isEmpty()) {
        return triggerErrorNotification("missingLong")
    }
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
                switch (data.error.code) {
                    case "ER_DUP_ENTRY": 
                    return triggerErrorNotification("dupEntry");
                }
            } else {
                longURL.value = window.location.href + data.id
                id.value = ' '
            }
        })
    })
})

function isEmpty() {
    if (longURL.value === '') {
        return true 
    } else {
        return false 
    }
}


function triggerErrorNotification(errorMessage) {
    $(".notify").addClass("active");
    $("#notifyType").addClass(errorMessage);
    
    setTimeout(function(){
    $(".notify").removeClass("active");
    $("#notifyType").removeClass(errorMessage);
    },2000);

}