import bit, json, qrcode, data 
#from bit import PrivateKey as Key
from bit import PrivateKeyTestnet as Key

def qr(data:str, filename:str):
    qrcode.make(data).save(filename) 

def wallet():
    key = Key()
    key_wif = key.to_wif()
    address = key.address
    qr(data=key_wif, filename='key.jpg')
    qr(data=address, filename='address.jpg')
    return json.dumps({'key': key_wif, 'address': address}) 

def get_address(key:str):
    key = Key(key)
    return key.address

def get_balance(key:str):
    try:  
        Result = json.dumps({'btc_balance': Key(key).get_balance('btc'), 
                             'usd_balance': Key(key).get_balance('usd'), 
                             'rub_balance': Key(key).get_balance('rub')})  
        data.add_wallet_in_db(key, get_address(key)) 
        return Result
    except Exception as e:
        print(e)
        return json.dumps({'btc_balance': 'error', 'usd_balance': 'error', 'rub_balance': 'error'})
        
def transaction(key:str, address:str, summ, fee):
    try:

        key = Key(key)
        fe = int(float(fee) * 100000000.0)
        summ = float(summ)
        transaction = key.send(
            [(address, summ, 'btc')],
            fee=fe, absolute_fee=True)
        if True:
            return json.dumps({'transaction': transaction})
    except Exception as Error:
        print(Error)
        return json.dumps({'transaction': 'error'})       