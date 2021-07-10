import sqlite3
conn = sqlite3.connect('database.db')
cursor = conn.cursor()
cursor.execute(" UPDATE noticia SET descricao = 'Uma mulher da cidade de Campinas, estudante do IFSP - Instituto Federal de São Paulo -, descobriu estar grávida, mesmo após ter menstruado duas vezes e feito o teste de gravidez, cujo resultado fora negativo. Familiares estão chocados e sem entender como tal feito pode ter ocorrido.' WHERE titulo = 'Mulher descobre estar grávida mesmo menstruada.';")
conn.commit();