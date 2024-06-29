import {
  layDuLieu,
  xuat,
  reset,
  stringToSlug,
  kiemTraRong,
  kiemTraDoDai,luong,xepLoai,kiemTraTen,kiemTraEmail,kiemTraMatKhau,kiemTraNgayLam,kiemTraLuong,kiemTraGioLam
} from "./method.js";
let list = [];
document.querySelector("#btnThem").onclick = function (e) {
  document.querySelector("#btnThemNV").style.display = "inline-block";
  document.querySelector("#btnCapNhat").style.display = "none";
  reset();
};

document.getElementById("tknv").addEventListener("input", function (e) {
  let tknv = document.querySelector("#tknv").value;
  let kq = list.filter((sv) => sv.tknv === tknv);
  if (kq.length > 0) {
    alert("Tài khoản đã tồn tại");
  }
});

document.querySelector("#btnThemNV").onclick = function (e) {
  let nv = layDuLieu();
  console.log(nv.tknv, "tknv");
  // let {tknv,name,email,password,datepicker,luongCB,chucVu,gioLam} = tam;
  let valid = true;
  for (let tt in nv) {
    valid &= kiemTraRong(nv[tt], tt);
  }
  valid &= kiemTraDoDai(nv.tknv,'tknv') 
  & kiemTraTen(nv.name,'name') 
  & kiemTraEmail(nv.email,'email')
  & kiemTraMatKhau(nv.password,'password')
  & kiemTraNgayLam(nv.datepicker,'datepicker')
  & kiemTraLuong(nv.luongCB,'luongCB')
  & kiemTraGioLam(nv.gioLam,'gioLam')
  if(!valid){
    return;
}
  nv.tongLuong = luong(nv.luongCB, nv.chucVu);
  nv.xepLoai = xepLoai(nv.gioLam);
  list.push(nv);
  reset();
  xuat(list);
};

document.querySelector("#btnCapNhat").onclick = function (e) {
  $("#myModal").modal("hide");
  document.querySelector("#tknv").disabled = false;
  let tam = layDuLieu();
  for (let i in list) {
    if (list[i].tknv === tam.tknv) {
      list[i] = tam;
    }
  }
  tam.tongLuong = luong(tam.luongCB, tam.chucVu);
  tam.xepLoai = xepLoai(tam.gioLam);
  xuat(list);
};

document.querySelector("#btnDong").onclick = function (e) {
  document.querySelector("#tknv").disabled = false;
  xuat(list);
};

document.querySelector("#btnTimNV").onclick = function (e) {
  let tam = document.querySelector("#searchName").value;
  tam = stringToSlug(tam);
  let kq = list.filter((sv) => stringToSlug(sv.xepLoai).search(tam) !== -1);
  if (kq) {
    xuat(kq);
  }
};

searchName.addEventListener("input", function () {
  if (searchName.value == "") {
    xuat(list);
  }
});

xuat(list);

window.del = function (ma) {
  let indexDel = list.findIndex((sv) => sv.tknv === ma);
  if (indexDel !== -1) list.splice(indexDel, 1);
  xuat(list);
};

window.edit = function (ma) {
  $("#myModal").modal("show");
  document.querySelector("#btnThemNV").style.display = "none";
  document.querySelector("#btnCapNhat").style.display = "inline-block";
  document.querySelector("#tknv").disabled = true;
  let svUpdate = list.find((sv) => sv.tknv === ma);
  if (svUpdate) {
    for (let key in svUpdate) {
      document.querySelector(`#${key}`).value = svUpdate[key];
    }
  }
};
// let xy= 'tknv'
// document.getElementById(`tb${xy}`).innerHTML = 'không có ji'
