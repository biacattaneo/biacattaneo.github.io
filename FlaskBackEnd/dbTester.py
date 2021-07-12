import sqlite3
conn = sqlite3.connect('database.db')
cursor = conn.cursor()
#cursor.execute("DELETE FROM noticia WHERE id='1'")
# conn.commit()
for i in cursor.execute("SELECT * FROM NOTICIA"):
    print(i)