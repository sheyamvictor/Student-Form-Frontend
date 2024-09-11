const form = document.getElementById("userForm")
const table = document.getElementById("tableData").getElementsByTagName("tbody")[0]
const submitBtn = document.getElementById("submitBtn") 

let editIndex = null

// Load existing data from localStorage when the page is loaded
window.onload = () => {
    const storedData = JSON.parse(localStorage.getItem('tableData')) || []
    storedData.forEach((row) => addNewRow(row.name, row.gender, row.dob, row.department, row.regnum))
}

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const name = document.getElementById("name").value
    const gender = document.getElementById("gender").value
    const dob = document.getElementById("dob").value
    const department = document.getElementById("department").value
    const regnum = document.getElementById("regnum").value

    if (editIndex === null) { 
        addNewRow(name, gender, dob, department, regnum)
        saveToLocalStorage(name, gender, dob, department, regnum) // Save new row to localStorage
    } else {
        updateRow(editIndex, name, gender, dob, department, regnum)
        submitBtn.textContent = "Save" // Change button text back to "Save" after editing
        updateLocalStorage(editIndex, name, gender, dob, department, regnum) // Update localStorage after editing
    }

    form.reset()
})

const addNewRow = (name, gender, dob, department, regnum) => {
    const newRow = table.insertRow()

    newRow.insertCell(0).textContent = name
    newRow.insertCell(1).textContent = dob
    newRow.insertCell(2).textContent = gender
    newRow.insertCell(3).textContent = department
    newRow.insertCell(4).textContent = regnum

    const actionCell = newRow.insertCell(5)

    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Delete"
    deleteBtn.onclick = () => {
        deleteRow(newRow.rowIndex - 1)
        deleteFromLocalStorage(newRow.rowIndex - 1) // Delete row from localStorage
    }

    const editBtn = document.createElement("button")
    editBtn.textContent = "Edit"
    editBtn.style.marginLeft = "10px"
    editBtn.onclick = () => editRow(newRow.rowIndex - 1)

    actionCell.appendChild(deleteBtn)
    actionCell.appendChild(editBtn)
}

const deleteRow = (clickIndex) => {
    table.deleteRow(clickIndex)
}

// Edit Function
const editRow = (clickIndex) => {
    const row = table.rows[clickIndex]

    const name = row.cells[0].textContent
    const dob = row.cells[1].textContent
    const gender = row.cells[2].textContent
    const department = row.cells[3].textContent
    const regnum = row.cells[4].textContent

    document.getElementById("name").value = name
    document.getElementById("gender").value = gender
    document.getElementById("dob").value = dob
    document.getElementById("department").value = department
    document.getElementById("regnum").value = regnum

    editIndex = clickIndex
    submitBtn.textContent = "Edit" // Change button text to "Edit" during editing
}

// Update Row in the Table
const updateRow = (index, name, gender, dob, department, regnum) => {
    const row = table.rows[index]

    row.cells[0].textContent = name
    row.cells[1].textContent = dob
    row.cells[2].textContent = gender
    row.cells[3].textContent = department
    row.cells[4].textContent = regnum

    editIndex = null
}

// Save New Row Data to localStorage
const saveToLocalStorage = (name, gender, dob, department, regnum) => {
    const storedData = JSON.parse(localStorage.getItem('tableData')) || []
    storedData.push({ name, gender, dob, department, regnum })
    localStorage.setItem('tableData', JSON.stringify(storedData))
}

// Update Row Data in localStorage
const updateLocalStorage = (index, name, gender, dob, department, regnum) => {
    const storedData = JSON.parse(localStorage.getItem('tableData')) || []
    storedData[index] = { name, gender, dob, department, regnum }
    localStorage.setItem('tableData', JSON.stringify(storedData))
}

// Delete Row Data from localStorage
const deleteFromLocalStorage = (index) => {
    const storedData = JSON.parse(localStorage.getItem('tableData')) || []
    storedData.splice(index, 1)
    localStorage.setItem('tableData', JSON.stringify(storedData))
}
