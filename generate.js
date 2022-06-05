// функция скопировать
async function copy(copy_area) {
    let copy = document.getElementById(copy_area).innerText;
    navigator.clipboard.writeText(copy);
    alert(copy + " copied!");
    }
//обработка кнопки generate wallet
var button = document.getElementById("btn_generate");
button.onclick = async function send_click() {
    let result_g = await eel.generate_wallet()();
    //кнопка распечатать
    let print = document.createElement('button');
    print.setAttribute('id',"btn_print");
    print.setAttribute('href',"#");
    print.setAttribute('onClick',"window.print()");
    document.body.appendChild(print);
    document.getElementById('btn_print').innerHTML = 'Print';
    //    
    let json = JSON.parse(result_g); //парсим строку в json  
    document.querySelector('#div');
    //key
    let key = document.createElement('div');
    key.setAttribute('id',"generated_key");
    document.body.appendChild(key);
    document.getElementById('generated_key').innerHTML = json['key'];
    //qr
    let key_jpg = document.createElement('img');
    key_jpg.setAttribute('id',"key_jpg");
    key_jpg.setAttribute('src',"/key.jpg");
    key_jpg.setAttribute('width',"100");
    key_jpg.setAttribute('height',"100");
    document.body.appendChild(key_jpg);
    // кнопка скопировать 
    let copy_key = document.createElement('button');
    copy_key.setAttribute('id',"btn_copy_key");
    copy_key.setAttribute('onClick','copy("generated_key")');
    document.body.appendChild(copy_key);
    document.getElementById('btn_copy_key').innerHTML = 'Copy key';
    //address 
    let address = document.createElement('div');
    address.setAttribute('id',"generated_address");
    document.body.appendChild(address);
    document.getElementById('generated_address').innerHTML = json['address'];
    //qr
    let address_jpg = document.createElement('img');
    address_jpg.setAttribute('id',"address_jpg");
    address_jpg.setAttribute('src',"/address.jpg"); 
    address_jpg.setAttribute('width',"100");
    address_jpg.setAttribute('height',"100");
    document.body.appendChild(address_jpg);
    // кнопка скопировать 
    let copy_address = document.createElement('button');
    copy_address.setAttribute('id',"btn_copy_address");
    copy_address.setAttribute('onClick','copy("generated_address")');
    document.body.appendChild(copy_address);
    document.getElementById('btn_copy_address').innerHTML = 'Copy address';
    //удаление кнопок
    var delete_button = document.getElementById("btn_generate");
    delete_button.remove();
    var delete_button = document.getElementById("btn_send");
    delete_button.remove();
    //кнопка back 
    let back = document.createElement('button');
    back.setAttribute('id',"btn_back");
    back.setAttribute('onClick',"location.reload();");
    document.body.appendChild(back);
    document.getElementById('btn_back').innerHTML = 'Back';
    }