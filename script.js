// Tạo liện kết từ doom đến HTML
var input = document.querySelector('input')
var ul = document.querySelector(".listTodo")
var buttonAdd = document.querySelector(".buttonAdd")

// Viết hàm add để tạo list các note
function addTodo() {
    // Tạo các mảng để chứa giá trị
    var arrTodolist = [...ul.children]
    var textTodo =[]    
    var li= document.createElement('li')
    
    // Thêm input value vào thẻ p
    li.innerHTML = `<p>${input.value}</p>`
    // Chỗ này do thêm nhiều dòng (xuống dòng bằng enter) nên phải dùng dấu `
    // Do add thêm thông tin HTML nên dùng +=
    li.innerHTML += `<div class="icon">
                    <i class="fa-solid fa-check"></i>
                    <i class="fa-solid fa-pen"></i>
                    <i class="fa-solid fa-trash"></i>
                    </div>`
    // Kiểm tra dữ liệu trống
    if (input.value.trim() == ""){
        alert("Bạn chưa nhập dữ liệu")
        input.focus()
    }

    // Kiểm tra xem có trùng dữ liệu
    else {
        // Thêm các note vào 1 mảng mới
        for(var i=0; i<arrTodolist.length; i++){
            // console.log(arrTodolist[i])
            textTodo.push(arrTodolist[i].innerText.replace("\n","").trim())
        }
        // Tạo cờ
        var check = true
        for (text of textTodo){
            if(text == input.value.trim()){
                check = false
                break
            }
        }        
        if(!check){
            alert("Dữ liệu đã tồn tại")
            input.value = ""
            input.focus()
        }
        else{
            ul.appendChild(li)
            input.value = ""
            input.focus()
        }
    }

    // Thiết kế nút edit
    // Dùng toggle để chuyển đổi qua lại của class checkDone hoặc không
    // Chọn tất cả các class .fa-check --> chuyển thành array --> chuyển qua lại class checkDone
    // Tạo hàm checkToDo để rút gọn
    function checkToDo() {
        var checkButton = document.querySelectorAll(".fa-check")
        var arrCheckButton = [...checkButton]
        while(i<arrCheckButton.length){
            arrCheckButton[i].addEventListener("click", function(e) {
                // console.log(e.target.parentNode.parentNode.firstChild.innerHTML)
                e.target.parentNode.parentNode.firstChild.classList.toggle("checkDone")
                e.target.classList.toggle("fa-check")
                e.target.classList.toggle("fa-arrows-rotate")
            })
            break
        }
    }
    checkToDo()

    // Thiết kết nút edit
    // sử dụng toggle và hàm if để chọn chức năng cho từng nút save/ edit
    // Kiểm tra tìm cách nâng cấp để tránh để ô trống
    function editToDo(params) {
        var editButton = document.querySelectorAll(".fa-pen")
        var arrEditButton = [...editButton]
        while(i<arrEditButton.length){
            arrEditButton[i].addEventListener("click", function(e) {
                // console.log(e.target.classList)
                // console.log(e.target.classList.value)
                if(e.target.classList.value == "fa-solid fa-pen"){
                    // console.log("Đây là nút check")
                    // e.target.parentNode.parentNode.replaceChild("input","p")
                    var newInput = document.createElement("input")
                    newInput.value = e.target.parentNode.parentNode.firstChild.innerHTML
                    // console.log(newInput.value)
                    e.target.parentNode.parentNode.replaceChild(newInput, e.target.parentNode.parentNode.firstChild)
                    newInput.focus()
                    // tạo style cho input box
                    newInput.style.border = "solid 0px"
                    newInput.style.outline = "solid 0px"
                    newInput.style.borderBottom = "solid 1px";
                    // toggle để chuyển thành nút save
                    e.target.classList.toggle("fa-pen")
                    e.target.classList.toggle("fa-floppy-disk")
                    // lưu lại giá trị cũ
                    oldContent = e.target.parentNode.parentNode.firstChild.value
                }
                else if(e.target.classList.value == "fa-solid fa-floppy-disk"){
                    // console.log("Đây là nút save")
                    var newContent = document.createElement("p")
                    newContent.innerText = e.target.parentNode.parentNode.firstChild.value
                    // console.log("new content: " + newContent.innerText)
                    if (newContent.innerText.trim()==""){
                        alert("Bạn chưa nhập dữ liệu")
                        e.target.parentNode.parentNode.firstChild.value = oldContent
                        e.target.parentNode.parentNode.firstChild.focus()
                    }
                    else{
                        e.target.parentNode.parentNode.replaceChild(newContent, e.target.parentNode.parentNode.firstChild)
                        e.target.classList.toggle("fa-floppy-disk")
                        e.target.classList.toggle("fa-pen")
                    }
                }
            })
            break
        }
    }
    editToDo()

    // Thiêt kế nút del. sẽ remove hết tất cả
    function delTodo() {
        var delButton = document.querySelectorAll(".fa-trash")
        var arrDelButton = [...delButton]
        while(i<arrDelButton.length){
            arrDelButton[i].addEventListener("click", function(e) {
                // console.log("nút del đã được nhấn")
                e.target.parentNode.parentNode.remove()
            })
            break
        }
    }
    delTodo()
}

// Thêm sự kiện cho nút buttonAdd
buttonAdd.addEventListener("click", addTodo)

// Dùng keyup và e.key =="Enter" để khi nhấn enter vẫn thực thi lệnh
input.addEventListener("keyup", function (e) {
    if (e.key == "Enter"){
        // console.log("Đã nhấn Enter")
        addTodo()
    }
})