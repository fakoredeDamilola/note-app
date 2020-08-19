const addNote = document.querySelector(".addNote"),
  addInput = document.querySelector(".addInput"),
  notes = document.querySelector(".notes");
let data = [],
  current,
  value;
(function populateUI() {
  if (localStorage.getItem("data") !== null) {
    data = JSON.parse(localStorage.getItem("data"));
    data.forEach((datum) => {
      createNote(datum);
    });
  }
})();
function addZero(val) {
  return val > 9 ? val : `0${val}`;
}
function createElement(val) {
  return document.createElement(val);
}
function addNoteToData(value) {
  let d = new Date();
  let mins = addZero(d.getMinutes()),
    hour = addZero(d.getHours()),
    month = addZero(d.getMonth()),
    day = addZero(d.getDate()),
    year = addZero(d.getFullYear()),
    storageItem;
  let time = `${hour} : ${mins}`;
  let date = `${day}/${d.getMonth() + 1}/${year} |`;

  let newNote = {
    id: Math.ceil(Math.random() * 10000),
    date,
    time,
    content: value,
  };
  createNote(newNote);
  return newNote;
}
function addToStorage(datum = null) {
  if (localStorage.getItem("data") === null) {
    data = [];
    data.push(datum);
    localStorage.setItem("data", JSON.stringify(data));
  } else {
    data = JSON.parse(localStorage.getItem("data"));
    data.push(datum);
    localStorage.setItem("data", JSON.stringify(data));
  }
}
function createNote(value) {
  console.log(value);
  let div1 = createElement("section");
  let div2 = createElement("div");
  let div3 = createElement("div");
  let div4 = createElement("div");
  let div5 = createElement("div");
  let span1 = createElement("span");
  let span2 = createElement("span");
  let span3 = createElement("button");
  let span4 = createElement("button");
  let trash = createElement("i");
  let pencil = createElement("i");
  pencil.className = "fa fa-pencil";
  trash.className = "fas fa-trash";

  span3.className = "edit";
  span4.className = "delete";
  div5.id = value.id;
  div5.className = "note";
  div3.className = "time";
  div4.className = "content";
  span2.className = "tim";
  span1.appendChild(document.createTextNode(value.date));
  span2.appendChild(document.createTextNode(value.time));
  span3.appendChild(pencil);
  span4.appendChild(trash);
  // span3.appendChild(document.createTextNode("pencil"));
  // span4.appendChild(document.createTextNode("trash"));
  div1.appendChild(span1);
  div1.appendChild(span2);
  div2.appendChild(span3);
  div2.appendChild(span4);
  div3.appendChild(div1);
  div3.appendChild(div2);
  div4.appendChild(document.createTextNode(value.content));
  div5.appendChild(div3);
  div5.appendChild(div4);
  notes.appendChild(div5);
  //return newDiv
}
addNote.addEventListener("click", function (e) {
  e.preventDefault();
  if (addInput.value !== "") {
    if (addNote.value === "submit") {
      value = addInput.value;
      let datum = addNoteToData(value);
      //let newDiv=createNote(value)

      addToStorage(datum);
      addInput.value = "";
    } else if (addNote.value === "edit") {
      notes.removeChild(current);
      let datum = addNoteToData(addInput.value);
      data.push(datum);
      data = data.filter((datum) => datum.id != current.id);
      addInput.value = "";
      addNote.value = "submit";
      console.log(data.length);

      localStorage.setItem("data", JSON.stringify(data));
    }
  } else {
    alert("Please input something");
  }
});
notes.addEventListener("click", function (e) {
  console.log(e.target);
  if (e.target.className === "fas fa-trash") {
    deleteNote(
      e.target.parentElement.parentElement.parentElement.parentElement
    );
  } else if (e.target.className === "fa fa-pencil") editNote(e.target.parentElement.parentElement.parentElement.parentElement);
});
function deleteNote(child) {
  if (confirm("are you sure you want to delete this")) {
    notes.removeChild(child);
    data = data.filter((datum) => datum.id != child.id);
    console.log(data.length);
    let newdata = JSON.parse(localStorage.getItem("data"));
    newdata = newdata.filter((datum) => datum.id != child.id);
    localStorage.setItem("data", JSON.stringify(data));
  }
}
function editNote(child) {
  //console.log(child.id)
  current = child;
  let item = data.filter((datum) => child.id == datum.id)[0];
  addInput.value = item.content;
  addNote.value = "edit";
}

//search input
let searchInput = document.querySelector(".searchInput"),
  toLowerCase,
  info;
searchInput.addEventListener("keyup", function (e) {
  let note = notes.getElementsByClassName("note");
  toLowerCase = e.target.value.toLowerCase();
  Array.from(note).forEach(function (note) {
    // let noteName=note.
    let noteName = note.childNodes[1].textContent;
    if (noteName.toLowerCase().indexOf(toLowerCase) != -1) {
      note.style.display = "block";
    } else {
      note.style.display = "none";
    }
  });
});
