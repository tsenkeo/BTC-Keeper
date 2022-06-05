import sqlite3, json

def create_base(db):
    cursor = db.cursor()
    cursor.execute(f'''CREATE TABLE WALLETS (KEY TEXT NOT NULL, ADDRESS TEXT NOT NULL);''')
    db.commit()
with sqlite3.connect(':memory:', check_same_thread=False) as db:
    db = db

create_base(db)

def cur():
    cursor = db.cursor()
    return cursor

def add_wallet_in_db(key:str, address:str):
        cur().executescript(f'''UPDATE WALLETS set "KEY" = "{key}";
                                UPDATE WALLETS set "ADDRESS" = "{address}" WHERE "KEY" = "{key}";''')
        db.commit()
        if True:
            print('Success!')


def request_wallet():
    cursor = cur()
    cursor.executescript(f'''SELECT KEY FROM WALLETS;
                             SELECT ADDRESS FROM WALLETS;''')
    data = cursor.fetchone()
    key = data[0]
    address = data[1]
    Result = json.dumps({'key': key, 'address': address})
    return Result


