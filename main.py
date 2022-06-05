import eel
import generated
import data

eel.init('')                     

@eel.expose
def generate_wallet():
    gen = generated.wallet()
    return gen   
@eel.expose
def transaction(key:str, address:str, summ:int, fee:int):
    t = generated.transaction(key, address, summ, fee)
    return t
@eel.expose
def balance(key:str):
    data.add_wallet_in_db(key, generated.get_address(key))
    t = generated.get_balance(key)
    return t
@eel.expose
def request_wallet():
    return data.request_wallet()

eel.start('index.html', mode="chrome", size=(550, 660))





