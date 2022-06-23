import data
import eel
import generated

eel.init('')


@eel.expose
def generate_wallet():
    gen = generated.wallet()
    return gen


@eel.expose
def transaction(key, address, sum, fee):
    t = generated.transaction(str(key), str(address), str(sum), str(fee))
    return t


@eel.expose
def balance(key: str):
    t = generated.get_balance(key)
    return t


@eel.expose
def request_wallet():
    return data.request_wallet()


eel.start('index.html', mode="chrome", size=(550, 660))
