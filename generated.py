import data
import json
import qrcode
# from bit import PrivateKey as Key
from bit import PrivateKeyTestnet as Key


def qr(data_for_coding: str, filename: str):
    qrcode.make(data_for_coding).save(filename)


def wallet():
    key = Key()
    key_wif = key.to_wif()
    address = key.address
    qr(data_for_coding=key_wif, filename='key.jpg')
    qr(data_for_coding=address, filename='address.jpg')
    return json.dumps({'key': key_wif, 'address': address})


def get_address(key: str):
    key = Key(key)
    return key.address


def get_balance(key: str):
    try:
        result = json.dumps({'btc_balance': Key(key).get_balance('btc'),
                             'usd_balance': Key(key).get_balance('usd'),
                             'rub_balance': Key(key).get_balance('rub')})
        data.add_wallet_in_db(key, get_address(key))
        return result
    except Exception as e:
        print(e)
        return json.dumps({'btc_balance': 'error', 'usd_balance': 'error', 'rub_balance': 'error'})


def transaction(key: str, address: str, sum, fee):
    try:

        key = Key(key)
        fe = int(float(fee) * 100000000.0)
        sum = float(sum)
        send_btc = key.send(
            [(address, sum, 'btc')],
            fee=fe, absolute_fee=True)
        if True:
            return json.dumps({'transaction': send_btc})
    except Exception as Error:
        print(Error)
        return json.dumps({'transaction': 'error'})
