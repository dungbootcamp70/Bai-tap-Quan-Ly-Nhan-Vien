import {NhanVien,stringToSlug} from "./method.js"
let list = []
function xepLoai(gio){
    let loai = ''
    if(gio >= 192){ loai = 'xuất sắc'}
    else if(gio >= 176){ loai = 'giỏi'}
         else if(gio >= 160){ loai = 'khá'}
            else { loai = 'trung bình'}
   return loai
}

function luong(luongCb,chucVu){
    let heSo = 1
 switch (chucVu){
    case 'Giám đốc':{
        heSo = 3
    } break
    case 'Trưởng phòng':{
        heSo = 2
    } break
 }
 return luongCb * heSo
}

function layDuLieu(){
    let NV = new NhanVien()
    let arrInput = document.querySelectorAll('form .form-control')
    for(let input of arrInput){
        let id = input.id
        let value = input.value
        NV[id] = value
    }
    NV.tongLuong = luong(NV.luongCB,NV.chucVu)
    NV.xepLoai = xepLoai(NV.gioLam)
    return NV
}

function xuat(ds){
    let htmlStr = ''
    for(let nv of ds){
        htmlStr += `
  <tr>
    <th>${nv.tknv}</th>
    <th>${nv.name}</th>
    <th>${nv.email}</th>
    <th>${nv.datepicker}</th>
    <th>${nv.chucVu}</th>									
    <th>${nv.tongLuong}</th>
    <th>${nv.xepLoai}</th>
    <th><button type="button" class="btn btn-success" onclick="edit('${nv.tknv}')"  style="cursor:pointer">Edit</button>
    <button type="button" class="btn btn-success" style="cursor:pointer" onclick="del('${nv.tknv}')">Delete</button></th>
 </tr>`}
    document.querySelector('tbody').innerHTML = htmlStr
}

window.del = function (ma){
    let indexDel = list.findIndex(sv => sv.tknv === ma);
    if(indexDel !== -1)
   list.splice(indexDel,1)
    xuat(list)
}

window.edit = function (ma) {
    $('#myModal').modal('show')
    document.querySelector('#btnThemNV').style.display = 'none'
    document.querySelector('#btnCapNhat').style.display = 'inline-block'
    document.querySelector('#tknv').disabled = true
    let svUpdate = list.find(sv => sv.tknv === ma);
    if(svUpdate) {
        for (let key in svUpdate){
            document.querySelector(`#${key}`).value = svUpdate[key]
        }
    }
}

function reset(){
    let arrInput = document.querySelectorAll('form .form-control')
    for(let input of arrInput){
        input.value = ''
}}

document.querySelector('#btnThem').onclick = function(e){
    document.querySelector('#btnThemNV').style.display = 'inline-block'
    document.querySelector('#btnCapNhat').style.display = 'none'
    reset()
}

document.getElementById('tknv').addEventListener('input', function(e) {
    let tknv = document.querySelector('#tknv').value
    let kq = list.filter(sv => sv.tknv === tknv);
    if (kq.length > 0) {alert('Tài khoản đã tồn tại')} 
    })

document.querySelector('#btnThemNV').onclick = function(e){
    let tam = layDuLieu()
    list.push(tam)
    reset()
    xuat(list)
}

document.querySelector('#btnCapNhat').onclick = function(e){
    $('#myModal').modal('hide')
    document.querySelector('#tknv').disabled = false
    let tam = layDuLieu()
    for(let i in list){
        if(list[i].tknv === tam.tknv){
            list[i] = tam
        }
    }
    xuat(list)
    
}

document.querySelector('#btnDong').onclick = function(e){
    document.querySelector('#tknv').disabled = false
    xuat(list)
}

document.querySelector('#btnTimNV').onclick = function(e){
    let tam = document.querySelector('#searchName').value
    tam = stringToSlug(tam)
    let kq = list.filter(sv => stringToSlug(sv.xepLoai).search(tam) !== -1);
    if (kq){ xuat(kq)}
}

searchName.addEventListener('input', function() { 
    if(searchName.value == ''){
xuat(list)}
})

xuat(list)