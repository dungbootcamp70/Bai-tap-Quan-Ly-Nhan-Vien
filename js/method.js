export class NhanVien {
  tknv = "";
  name = "";
  email = "";
  password = "";
  datepicker = "";
  luongCB = "";
  chucVu = "";
  gioLam = "";

}
export function stringToSlug(title) {
  //Đổi chữ hoa thành chữ thường
  let slug = title.toLowerCase();
  //Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
  slug = slug.replace(/đ/gi, "d");
  //Xóa các ký tự đặt biệt
  slug = slug.replace(
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
    ""
  );
  //Đổi khoảng trắng thành ký tự gạch ngang
  slug = slug.replace(/ /gi, "-");
  //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
  slug = slug.replace(/\-\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-/gi, "-");
  slug = slug.replace(/\-\-/gi, "-");
  //Xóa các ký tự gạch ngang ở đầu và cuối
  slug = "@" + slug + "@";
  slug = slug.replace(/\@\-|\-\@|\@/gi, "");
  return slug;
}

export function xepLoai(gio) {
  let loai = "";
  if (gio >= 192) {
    loai = "xuất sắc";
  } else if (gio >= 176) {
    loai = "giỏi";
  } else if (gio >= 160) {
    loai = "khá";
  } else {
    loai = "trung bình";
  }
  return loai;
}

export function luong(luongCb, chucVu) {
  let heSo = 1;
  switch (chucVu) {
    case "Giám đốc":
      {
        heSo = 3;
      }
      break;
    case "Trưởng phòng":
      {
        heSo = 2;
      }
      break;
  }
  return luongCb * heSo;
}

export function layDuLieu() {
  let NV = {}
  let arrInput = document.querySelectorAll("form .form-control");
  for (let input of arrInput) {
    let id = input.id;
    let value = input.value;
    NV[id] = value;
  }
//   NV.tongLuong = luong(NV.luongCB, NV.chucVu);
//   NV.xepLoai = xepLoai(NV.gioLam);
  return NV;
}

export function xuat(ds) {
  let htmlStr = "";
  for (let nv of ds) {
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
 </tr>`;
  }
  document.querySelector("tbody").innerHTML = htmlStr;
}

export function reset() {
  let arrInput = document.querySelectorAll("form .form-control");
  for (let input of arrInput) {
    input.value = "";
  }
}

export function kiemTraRong(value, selectorError) {
  let tb = document.getElementById(`tb-${selectorError}`);
  let nd = document.getElementById(`${selectorError}`);
  if (value.trim() === "") {
    tb.style.display = "block";
    tb.innerHTML = `${nd.getAttribute("placeholder")} không được bỏ trống !`;
    return false;
  }
  tb.style.display = "none";
  return true;
}

export function kiemTraDoDai(value, selectorError) {
  let length = value.length;
  let tb = document.getElementById(`tb-${selectorError}`);
  let nd = document.getElementById(`${selectorError}`);
  if (length > 6 || length < 4) {
    tb.style.display = "block";
    tb.innerHTML = `${nd.getAttribute("placeholder")} từ 4-6 ký số !`;
    return false;
  }
  tb.style.display = "none";
  return true;
}

export function kiemTraTen(value,selectorError) {
    let regexName = /^([A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơỲỴÝỳỵỷỹĂăẠ-ỹ]+(\s[A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơỲỴÝỳỵỷỹĂăẠ-ỹ]+)*)$/ig;
    let tb = document.getElementById(`tb-${selectorError}`);
    let nd = document.getElementById(`${selectorError}`);
    if(regexName.test(value)){
        tb.style.display = "none";
        return true;
    }
    tb.style.display = "block";
    tb.innerHTML = `${nd.getAttribute("placeholder")} phải là chữ !`;
    return false;
}

export function kiemTraEmail(value,selectorError) {
    let regexEmail = /^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$/;
    let tb = document.getElementById(`tb-${selectorError}`);
    let nd = document.getElementById(`${selectorError}`);
    if(regexEmail.test(value)){
        tb.style.display = "none";
        return true;
    }
    tb.style.display = "block";
    tb.innerHTML = `${nd.getAttribute("placeholder")} không đúng định dạng !`;  
    return false;
}

export function kiemTraMatKhau(value,selectorError) {
    let length = value.length;
    let regexMatKhau = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,10}$/;
    let tb = document.getElementById(`tb-${selectorError}`);
    let nd = document.getElementById(`${selectorError}`);
    if((regexMatKhau.test(value))&&(length <= 10 && length >=6)){
        tb.style.display = "none";
        return true;
    }
    tb.style.display = "block";
    tb.innerHTML = `${nd.getAttribute("placeholder")} từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt) !`;
    return false;
}

export function kiemTraNgayLam(value,selectorError) {
    let regexNgayLam = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/;
    let tb = document.getElementById(`tb-${selectorError}`);
    let nd = document.getElementById(`${selectorError}`);
    if(regexNgayLam.test(value)){
        tb.style.display = "none";
        return true;
    }
    tb.style.display = "block";
    tb.innerHTML = `${nd.getAttribute("placeholder")} phải là định dạng dd/mm/yyyy !`;
    return false;
}

export function kiemTraLuong(value,selectorError) {
    let tb = document.getElementById(`tb-${selectorError}`);
    let nd = document.getElementById(`${selectorError}`);
    if(value > 20000000 || value < 1000000) {
    tb.style.display = "block";
    tb.innerHTML = `${nd.getAttribute("placeholder")} phải có giá trị nhập từ 1.000.000 - 20.000.000 !`;
        return false;
    }
    tb.style.display = "none";;
    return true;

}

export function kiemTraGioLam(value,selectorError) {
    let tb = document.getElementById(`tb-${selectorError}`);
    let nd = document.getElementById(`${selectorError}`);
    if(value > 200 || value < 80) {
    tb.style.display = "block";
    tb.innerHTML = `${nd.getAttribute("placeholder")} phải có giá trị nhập từ 80 - 200 !`;
        return false;
    }
    tb.style.display = "none";;
    return true;

}
