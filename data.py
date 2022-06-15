import sqlite3, json

def create_base(db):
    cursor = db.cursor()
    cursor.execute(f'''CREATE TABLE IF NOT EXISTS WALLETS(ID TEXT NOT NULL, KEY TEXT NOT NULL, ADDRESS TEXT NOT NULL);''')
    db.commit()

with sqlite3.connect('keys.db', check_same_thread=False) as db: #:memory:
    db = db
    create_base(db)

def cur():
    cursor = db.cursor()
    return cursor 

def add_wallet_in_db(key:str, address:str):  
    cursor = cur()
    cursor.execute(f'''SELECT * FROM "WALLETS" WHERE "ID" = "1";''')
    data = cursor.fetchone()
    if data is None:
            cursor.execute(f'INSERT INTO "WALLETS"("ID", "KEY", "ADDRESS") VALUES("1", "{key}", "{address}");')
            db.commit()
    elif data is not None:
            cursor.executescript(f'''DELETE FROM "WALLETS" WHERE "ID" = "1";
                                    INSERT INTO "WALLETS"("ID", "KEY", "ADDRESS") VALUES("1", "{key}", "{address}");''')
            db.commit()
    
    
def request_wallet():
    cursor = cur()
    cursor.execute(f'''SELECT * FROM "WALLETS" WHERE "ID" = "1";''')
    data = cursor.fetchone()
    key, address = data[1], data[2]
    return json.dumps({'key': key, 'address': address})