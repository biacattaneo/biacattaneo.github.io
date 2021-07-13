import sqlite3
conn = sqlite3.connect('database.db')
cursor = conn.cursor()
# cursor.execute("DELETE FROM relacao_curtidas WHERE 1=1")
# conn.commit()



# for i in cursor.execute("SELECT titulo FROM noticia INNER JOIN relacao_curtidas ON relacao_curtidas.id_noticia = noticia.id WHERE relacao_curtidas.id_usuario = '3'"):
#     print(i)