const form = document.getElementById('formulario')
// EVENTOS
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    let transactionFormData = new FormData(form)
    let transactionObj=convertFormDataToTransactionObj(transactionFormData)
    saveTransactionObj(transactionObj)
    insertRow(transactionObj)
})
document.addEventListener('DOMContentLoaded',(e)=>{
    let transactionObjArray= JSON.parse(localStorage.getItem('transactionData'))
    transactionObjArray.forEach(transactionObj =>{
        insertRow(transactionObj)
    })
})

// 

// FUNCIONES
function convertFormDataToTransactionObj(transactionFormData){
    let transactionName=transactionFormData.get("transactionName")
    let transactionDescription=transactionFormData.get("transactionDescription")
    return {
        "transactionName":transactionName,
        "transactionDescription":transactionDescription
    }
}

function saveTransactionObj(transactionObj){
    let myTransactionArray=JSON.parse(localStorage.getItem('transactionData')) || [];
    myTransactionArray.push(transactionObj)
    let transactionArrayJSON= JSON.stringify(myTransactionArray)
    localStorage.setItem('transactionData',transactionArrayJSON)
}
function insertRow(transactionObj){
    let transactionTableRef =document.getElementById('transactionTable')
    
    let newTransactionRowRef=transactionTableRef.insertRow(-1)
    
    let newTypeCellRef=newTransactionRowRef.insertCell(0)
    newTypeCellRef.textContent=transactionObj['transactionName']

    newTypeCellRef=newTransactionRowRef.insertCell(1)
    newTypeCellRef.textContent=transactionObj['transactionDescription']
}
