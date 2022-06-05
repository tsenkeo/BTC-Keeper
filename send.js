//обработка кнопки send btc
var button = document.getElementById("btn_send");
button.onclick = async function send_click_send() {
    //удаление кнопок
    var delete_button = document.getElementById("btn_generate");
    delete_button.remove();
    var delete_button = document.getElementById("btn_send");
    delete_button.remove();
    //кнопка back 
    let back = document.createElement('button');
    back.setAttribute('id', "btn_back");
    back.setAttribute('onClick', "location.reload();");
    document.body.appendChild(back);
    document.getElementById('btn_back').innerHTML = 'Back';
    //ввод адреса 
    let input_key = document.createElement('input');
    input_key.setAttribute('type', "password");
    input_key.setAttribute('id', "input_key");
    input_key.setAttribute('placeholder', "Input key");
    document.body.appendChild(input_key);
    //кнопка запросить баланс
    let show_balance = document.createElement('button');
    show_balance.setAttribute('id', "show_balance");
    show_balance.setAttribute('onClick', "get_balance();");
    //вызвать фукцию которая выведет баланс в бтс если баланс нулевой, то не давать 
    document.body.appendChild(show_balance);
    document.getElementById('show_balance').innerHTML = 'Show balance';
    //в эти дивы выводится баланс
    div_btc_balance = document.createElement('div');
    div_btc_balance.setAttribute('id', "div_btc_balance");
    document.body.appendChild(div_btc_balance);
    //
    div_usd_balance = document.createElement('div');
    div_usd_balance.setAttribute('id', "div_usd_balance");
    document.body.appendChild(div_usd_balance);
    //
    div_rub_balance = document.createElement('div');
    div_rub_balance.setAttribute('id', "div_rub_balance");
    document.body.appendChild(div_rub_balance);
}


async function get_balance() {
    //удаление кнопки show_balance полсе нажатия
    document.getElementById('show_balance').remove();
    //запрос баланса 
    let balance = await eel.balance(document.getElementById('input_key').value)();
    //тут элемент "пожалуйста, подождите"
    //вывод баланса
    let json = JSON.parse(balance); //распарс результатов
    if (json['btc_balance'] == '0') {
        //тут писать что извините, у вас нет неизрасходованных средств
    } else if (json['btc_balance'] == 'error') {

    } else {
        //
        document.getElementById('div_btc_balance').innerHTML = '₿' + json['btc_balance'];
        document.getElementById('div_usd_balance').innerHTML = '$' + json['usd_balance'];
        document.getElementById('div_rub_balance').innerHTML = '₽' + json['rub_balance'];
    }


     


}


//модальне окно надо изучить вставить 
async function modal_window(){
    var modal = $modal({
        title: 'Текст заголовка',
        content: '<p>Содержимое модального окна...</p>',
        footerButtons: [
          { class: 'btn btn__cancel', text: 'Отмена', handler: 'modalHandlerCancel' },
          { class: 'btn btn__ok', text: 'ОК', handler: 'modalHandlerOk' }
        ]
      });
    modal.show()
}
