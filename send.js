//обработка кнопки send btc
var button = document.getElementById("btn_send");
button.onclick = async function send_click() {
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
}
//получение баланса перед тем как отправить на другой адрес
async function get_balance() {
    //загрузка 
    load_page();
    //запрос баланса 
    let balance = await eel.balance(document.getElementById('input_key').value)();
    //вывод баланса
    let json = JSON.parse(balance); //распарс результатов
    if (json['btc_balance'] == '0') {
        document.getElementById('preloader').remove();
        zero_balance = document.createElement('div');
        zero_balance.setAttribute('id', "zero_balance");
        document.body.appendChild(zero_balance);
        document.getElementById('zero_balance').innerHTML = 'Sorry, you do not have any unspent BTC.';
    } else if (json['btc_balance'] == 'error') {
        document.getElementById('preloader').remove();
        div_balance_error = document.createElement('div');
        div_balance_error.setAttribute('id', "div_balance_error");
        document.body.appendChild(div_balance_error);
        document.getElementById('div_balance_error').innerHTML = 'Error! You may have entered the key incorrectly. Please try again.';
    } else {
        document.getElementById('preloader').remove();
        var delete_div = document.getElementById('div_balance_error');
        if (!delete_div) {} else { delete_div.remove(); }
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
        //удаление кнопки show_balance и поля ввода
        document.getElementById('show_balance').remove();
        document.getElementById('input_key').remove();
        //вывод баланса
        document.getElementById('div_btc_balance').innerHTML = '₿' + json['btc_balance'];
        document.getElementById('div_usd_balance').innerHTML = '$' + json['usd_balance'];
        document.getElementById('div_rub_balance').innerHTML = '₽' + json['rub_balance'];
        //кнопка для отправки биткойнов
        let transaction = document.createElement('button');
        transaction.setAttribute('id', "btn_transaction");
        transaction.setAttribute('onClick', "transaction();");
        document.body.appendChild(transaction);
        document.getElementById('btn_transaction').innerHTML = 'Send BTC to another address';
    }
}

// функция, которая выводит поля для отправки транзакции 
function transaction(){
    document.getElementById('btn_transaction').remove();
    let input_address = document.createElement('input');
    input_address.setAttribute('id', "input_address");
    input_address.setAttribute('placeholder', "Input address");
    document.body.appendChild(input_address);
    let input_sum = document.createElement('input');
    input_sum.setAttribute('id', "input_sum");
    input_sum.setAttribute('placeholder', "Input sum in BTC"); 
    input_sum.setAttribute('value', "0.001");
    document.body.appendChild(input_sum);
    let input_fee = document.createElement('input');
    input_fee.setAttribute('id', "input_fee");
    input_fee.setAttribute('placeholder', "Input fee in BTC");
    input_fee.setAttribute('value', "0.00001");
    document.body.appendChild(input_fee);
    //кнопка отправить в сеть 
    let send_to_network = document.createElement('button');
    send_to_network.setAttribute('id', "btn_send_to_network");
    send_to_network.setAttribute('onClick', "send_to_network();");
    document.body.appendChild(send_to_network);
    document.getElementById('btn_send_to_network').innerHTML = 'Send to the network';
}

//функция, которая отправляет транзакцию в сеть 
async function send_to_network() {
    load_page();
    let wallet = await eel.request_wallet()(); 
    var json_wallet = JSON.parse(wallet);
    let send_to_network = await eel.transaction(json_wallet['key'], document.getElementById('input_address').value, document.getElementById('input_sum').value, document.getElementById('input_fee').value)();
    var result_json = JSON.parse(send_to_network);
    if (result_json['transaction'] == 'error'){
        document.getElementById('preloader').remove();  
        let result_transaction = document.getElementById('result_transaction');
            if (!result_transaction) {
                let result_transaction = document.createElement('div');
                result_transaction.setAttribute('id', "result_transaction");
                document.body.appendChild(result_transaction);
                document.getElementById('result_transaction').innerHTML = 'Sorry, there was a mistake. Try to check your internet connection or the transfer amount, as well as increase the commission amount.';
            } else {
                document.getElementById('result_transaction').innerHTML = 'Sorry, there was a mistake. Try to check your internet connection or the transfer amount, as well as increase the commission amount.';
            }
    } else {
        document.getElementById('preloader').remove();
        let result_transaction = document.getElementById('result_transaction');
            if (!result_transaction) {
                let result_transaction = document.createElement('div');
                result_transaction.setAttribute('id', "result_transaction");
                document.body.appendChild(result_transaction);
                document.getElementById('result_transaction').innerHTML = 'Success! Use the explorer to track the transaction.';
            } else {
                document.getElementById('result_transaction').innerHTML = 'Success! Use the explorer to track the transaction.';
            }
    }
}

//загрузка 
function load_page() {
    lo = document.createElement('div');
    lo.setAttribute('class', "preloader");
    lo.setAttribute('id', "preloader");
    document.body.appendChild(lo);
    document.getElementById('preloader').innerHTML = '<div class="preloader__row"><div class="preloader__item"></div><div class="preloader__item"></div>';
    window.onload = function () {
        document.body.classList.add('loaded_hiding');
        window.setTimeout(function () {
          document.body.classList.add('loaded');
          document.body.classList.remove('loaded_hiding');}, 500);
    }
}
