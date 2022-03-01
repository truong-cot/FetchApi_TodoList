var listWork = document.querySelector(".list");
var inputValue = document.querySelector("input[name=work]");
var btnAdd = document.querySelector("#btn-add");
var btnDelete = document.querySelector("#btn-delete");
var inputCheck = document.getElementsByName("check");
var workApi = 'http://localhost:3000/todoList';


// Lay value khi click btn them
btnAdd.onclick = function(){
    var data = {
        description: inputValue.value,
    }
    if (inputValue.value === '') {
        alert("Hay thêm vào việc làm của bạn!!!");
    }
    else{    
        // Goi ham them vao khi click
        addWork(data);
    
        // Click them thi remove o input
        inputValue.value = '';
    }
}

// Lay api roi hien thi ra giao dien
function getWorks() {
    fetch(workApi)
        .then(function(res){
            return res.json();
        })

        .then(function(data){
            var htmls = data.map(function(value, index){
                return `
                <li class="item">
                    <input type="checkbox" class="checkbox" name="check">
                    <p class="item-text">${index+1}. ${value.description}</p>
                    <button id="btn-delete" onclick = "deleteWork(${value.id})">
                        <i class="fa-solid fa-trash-can icon"></i>
                    </button>
                </li>
              `
            })
            // Them html vao DOM
            listWork.innerHTML = htmls.join('');
        })
}
getWorks();

// Them
function addWork(data) {
    var option = {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(data),
    }

    // Call API
    fetch(workApi, option)
        .then(function(){
            // Goi ham hien thi de render ra html khi them
            getWorks();
        })
        .catch(function(err){
            alert("Errol!");
        })
}

// Xoa
function deleteWork(id) {
    var option = {
        method : 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },    
    }

    fetch(workApi + '/' + id, option)
        .then(function(){
            // click nut xoa render lai du lieu
            getWorks();
        })

}