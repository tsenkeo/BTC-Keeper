import bit, json
from bit import PrivateKeyTestnet as Key
import qrcode

def qr(data:str, filename:str):
    qrcode.make(data).save(filename) 

def wallet():
    key = Key()
    key_wif = key.to_wif()
    address = key.address
    qr(data=key_wif, filename='key.jpg')
    qr(data=address, filename='address.jpg')
    Result = json.dumps({'key': key_wif, 'address': address})  
    return Result

def get_address(key:str):
    key = Key(key)
    Result = key.address
    return Result

def get_balance(key:str):
    try:
        key = Key(key)
        btc_balance = key.get_balance('btc')
        usd_balance = key.get_balance('usd')
        rub_balance = key.get_balance('rub')
        Result = json.dumps({'btc_balance': btc_balance, 'usd_balance': usd_balance, 'rub_balance': rub_balance})
        return Result
    except Exception as e:
        Result = json.dumps({'btc_balance': 'error', 'usd_balance': 'error', 'rub_balance': 'error'})
        return Result


def transaction(key:str, address:str, summ:float, fee:float):
    try:
        transaction = key.create_transaction([(address, summ, 'btc')],
                fee=currency_to_satoshi(fee, 'btc'), absolute_fee=True)
        sign = key.sign_transaction(transaction)
        return sign
    except Exception as e:
        return 'error'
        