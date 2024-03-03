let myLeads = []
let titles =[]
const inputEl = document.getElementById("input-el")
const inputEl2=document.getElementById("input2-el")
const inputnbr=document.getElementById("inputnbr-el")
const surpbtn=document.getElementById("supel-btn")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const leadsFromLocalStorage2=JSON.parse( localStorage.getItem("titles") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    if (leadsFromLocalStorage2){
        titles=leadsFromLocalStorage2
    }
    render(myLeads,titles)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        titles.push(inputEl2.value)
        inputEl2.value=""
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        localStorage.setItem("titles",JSON.stringify(titles))
        render(myLeads,titles)
    })
})

function render(leads,l) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <p><samp>${i+1 }</samp>-&nbsp;${l[i]}&nbsp;:</p>
                <a target='_blank' href='${leads[i]}'>
                &#128073; ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("click", function() {
    localStorage.clear()
    myLeads = []
    titles=[]
    render(myLeads,titles)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    titles.push(inputEl2.value)
    inputEl.value = ""
    inputEl2.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    localStorage.setItem("titles", JSON.stringify(titles) )
    render(myLeads,titles)
})
function displayErrorMessage(message) {
    var errorMessageElement = document.getElementById('erreurMessage')
    errorMessageElement.innerHTML = message
    errorMessageElement.style.display = 'block'
}

function hideErrorMessage() {
    var errorMessageElement = document.getElementById('erreurMessage')
    errorMessageElement.innerHTML = ''
    errorMessageElement.style.display = 'none'
}
inputnbr.addEventListener('input', hideErrorMessage)
surpbtn.addEventListener("click", function() {
    let i=inputnbr.value -1
    inputnbr.value=""
    if(i < myLeads.length && i>=0){
        myLeads.splice(i, 1)
        titles.splice(i, 1)
    }
    else if(i >= myLeads.length ||i==-1 ) {
        displayErrorMessage('Le numero que vous avez saisi ne figure pas dans votre liste !')
        return false
    }
    hideErrorMessage();
    render(myLeads,titles)
})
