const addBox = document.querySelector('#addBtn'),
popBox = document.querySelector('.popupBox'),
closeIcon = popBox.querySelector('header i'),
addBtn = popBox.querySelector('#addNote'),
titelTag = popBox.querySelector('input'),
decsriptionTag = popBox.querySelector('textarea'),
aletDesc = document.querySelector('.titleDesc');
let Notes = [];


const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];





addBox.addEventListener('click',()=>{
    // console.log('hello');
    popBox.classList.add('show');
})

closeIcon.addEventListener('click',()=>{
    popBox.classList.remove('show');
})


addBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    let noteTitle = titelTag.value, noteDescription = decsriptionTag.value;
   
    if(noteTitle == ''){
        document.getElementById('alertTitle').style.display = 'block'
    }else if (noteDescription == ''){
        document.getElementById('alertDesc').style.display = 'block'
    }else{
        let dateObj = new Date(),
        month = months[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();
        titelTag.addEventListener('change',()=>{
            document.getElementById('alertTitle').style.display = 'none'
    
        })
        decsriptionTag.addEventListener('change',()=>{
            document.getElementById('alertDesc').style.display = 'none'
    
        })
       let noteInfo = {
        title: noteTitle,
        description: noteDescription,
        date:`${month} ${day}, ${year}`
       }
    //    console.log(noteInfo);
    sendReq('POST','addNote',noteInfo);
       clearForm();
    popBox.classList.remove('show');

    }
})

function clearForm(){
    titelTag.value = '';
    decsriptionTag.value = '';
}
getData();
function getData(){
    fetch('http://localhost:2500/getAllNotes')
  .then(response => response.json())
  .then(json => {
    Notes = json.result;
    showData()
    // console.log(Notes);
  })
}

// showData();
function showData(){
    let str = ``
    for(let i = 0; i < Notes.length; i++){
        str += `
        <li class="note">
            <div class="details">
                <p>${Notes[i].title}</p>
                <span>${Notes[i].description}</span>
            </div>
            <div class="bottom-content">
                <span>${Notes[i].date}</span>
                <div class="setting">
                    <i class="fa-solid fa-ellipsis"></i>
                    <ul class="menu">
                        <li onclick="updateNote(${i})">
                            <i class="fa-solid fa-pen-to-square"></i>Edit
                        </li>
                        <li onclick="deleteNote(${Notes[i].id})">
                            <i class="fa-solid fa-trash-can"></i>Delete
                        </li>
                    </ul>
                </div>
            </div>
        </li>
   
        `
    }
    document.getElementById('notes').innerHTML = str;

//     <div class="col-md-3">
//     <li class="note">
//         <div class="details">
//             <p>This is a Title</p>
//             <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, velit.</span>
//         </div>
//         <div class="bottom-content">
//             <span>April 3, 2022</span>
//             <div class="setting">
//                 <i class="fa-solid fa-ellipsis"></i>
//                 <ul class="menu">
//                     <li>
//                         <i class="fa-solid fa-pen-to-square"></i>Edit
//                     </li>
//                     <li>
//                         <i class="fa-solid fa-trash-can"></i>Delete
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     </li>
// </div>
}

function sendReq(method, endpoint, data){
fetch(`http://localhost:2500/${endpoint}`, {
	
	// Adding method type
	method: method,
	
	// Adding body or contents to send
	body: JSON.stringify(data),
	
	// Adding headers to the request
	headers: {
		"Content-type": "application/json; charset=UTF-8"
	}
})

// Converting to JSON
.then(response => response.json())
// Displaying results to console
.then(json => {
    getData();
});


}

function deleteNote(id){
    let data = {
        id
    }
    sendReq('DELETE','delete',data);
}

let id;
function updateNote(i){
    id = Notes[i].id;
    popBox.classList.add('show');
    titelTag.value = Notes[i].title;
    decsriptionTag.value = Notes[i].description;
    document.getElementById('update').style.display = 'block';
    document.getElementById('addNote').style.display = 'none';
    
}

function updateBTN(){
    let dateObj = new Date(),
    month = months[dateObj.getMonth()],
    day = dateObj.getDate(),
    year = dateObj.getFullYear();
    let noteInfo = {
        id: id,
        title: titelTag.value,
        description: decsriptionTag.value,
        date:`${month} ${day}, ${year}`
       }
    //    console.log(noteInfo);
    sendReq('PUT','update', noteInfo);
    clearForm();
    document.getElementById('update').style.display = 'none';
    document.getElementById('addNote').style.display = 'block';
    popBox.classList.remove('show');

}
   
function search(word){
    let str = ``
    for(let i = 0; i < Notes.length; i++){
       if(Notes[i].title.toLowerCase().includes(word.toLowerCase())){
        str += `
        <li class="note">
            <div class="details">
                <p>${Notes[i].title}</p>
                <span>${Notes[i].description}</span>
            </div>
            <div class="bottom-content">
                <span>${Notes[i].date}</span>
                <div class="setting">
                    <i class="fa-solid fa-ellipsis"></i>
                    <ul class="menu">
                        <li onclick="updateNote(${i})">
                            <i class="fa-solid fa-pen-to-square"></i>Edit
                        </li>
                        <li onclick="deleteNote(${Notes[i].id})">
                            <i class="fa-solid fa-trash-can"></i>Delete
                        </li>
                    </ul>
                </div>
            </div>
        </li>
   
        `
       }
    }
    document.getElementById('notes').innerHTML = str;

}


function deleteAll(){
    fetch('http://localhost:2500/deleteAll', { method: 'DELETE' })
    .then(() => {
        getData();

    });

}
// Wrap every letter in a span
var textWrapper = document.querySelector('.ml11 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
  .add({
    targets: '.ml11 .line',
    scaleY: [0,1],
    opacity: [0.5,1],
    easing: "easeOutExpo",
    duration: 700
  })
  .add({
    targets: '.ml11 .line',
    translateX: [0, document.querySelector('.ml11 .letters').getBoundingClientRect().width + 10],
    easing: "easeOutExpo",
    duration: 700,
    delay: 100
  }).add({
    targets: '.ml11 .letter',
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=775',
    delay: (el, i) => 34 * (i+1)
  }).add({
    targets: '.ml11',
    opacity: 1,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });
/**
 * add => done
 * delete => 
 * update
 * search
 */

