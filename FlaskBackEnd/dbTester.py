import sqlite3
conn = sqlite3.connect('database.db')
cursor = conn.cursor()
for i in cursor.execute("SELECT * FROM usuario"):
    print(i)
# conn.commit()
# for i in cursor.execute("SELECT * FROM NOTICIA"):
#     print(i)