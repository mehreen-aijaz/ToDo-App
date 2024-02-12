//localStorage.setItem("name", "mehreen aijaz");
const addTask = document.getElementById("add");
const AddInput = document.getElementById("input");
const btnText = addTask.innerText;
const recordsDisplay = document.getElementById("records");
let edit_id = null;
let inputArray = [];

let objStr = localStorage.getItem("tasks");
if (objStr != null) {
  inputArray = JSON.parse(objStr);
}
displayInfo();
addTask.onclick = () => {
  console.log("error");
  const input = AddInput.value;
  if (edit_id != null) {
    //edit
    inputArray.splice(edit_id, 1, { ToDo: input });
    edit_id = null;
  } else {
    //insert
    inputArray.push({ ToDo: input });
  }
  saveInfo(inputArray);
  AddInput.value = "";
  addTask.innerText = btnText;
};

function saveInfo(inputArray) {
  let str = JSON.stringify(inputArray);
  localStorage.setItem("tasks", str);
  displayInfo();
}
function displayInfo() {
  let statement = "";
  inputArray.forEach((tasks, i) => {
    statement += `<tr>
    <th scope="row">${i + 1}</th>
    <td>${tasks.ToDo}</td>
    <td>
      <i class="fa-solid fa-pen-to-square mx-2" onclick='editInfo(${i})' ></i>
      <i class="fa-solid fa-trash" onclick='deleteInfo(${i})'></i>
    </td>
  </tr>`;
  });
  recordsDisplay.innerHTML = statement;
}
function editInfo(id) {
  //alert(id);
  edit_id = id;
  AddInput.value = inputArray[id].ToDo;
  addTask.innerText = "Save Changes";
}
function deleteInfo(id) {
  inputArray.splice(id, 1);
  saveInfo(inputArray);
}
