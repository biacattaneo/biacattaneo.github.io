import sqlite3


class Main(object):
    def __init__(self):
        self.conn = sqlite3.connect('database.db')
        self.cursor = self.conn.cursor()
        #self.cursor.execute("DROP TABLE noticia;")
        #self.conn.commit()

    def inserir_noticia(self,titulo,descricao,imagem,assunto,autor,data):
        """
        titulo: Título da noticia
        descricao: Descrição da notícia
        imagem: Imagem da notícia
        assunto: Assunto da notícia{Politica,Educaçao,Saude}
        autor: Autor da notícia
        data: Data da notícia (MES-DIA-ANO)->(MM-DD-YYYY) 
        """
        
        self.cursor.execute(f"""
            INSERT INTO noticia(titulo,descricao,imagem,assunto,autor,data) 
                VALUES(
                    '{titulo}',
                    '{descricao}',
                    '{imagem}',
                    '{assunto}',
                    '{autor}',
                    '{data}'
                );
         """)
        self.conn.commit()

    def recuperar_informacoes(self, select, where, table):
        """
        Para fins de segurança contra MYSQL INJECTION, essa função não aceita os seguintes caracteres: / < > ;


        select: Código em SQL sobre o que deve ser retornado
        where: Condição em SQL que deve ser aplicada
        table: Tabela a qual os parâmetros anteriores devem ser aplicados
        """
        trigger = ["/","<",">",";"] # Caracteres especiais que serão barrados da requisição.
        
        #Verificando se existe algum caracter perigoso
        # Potencialmente utilizado para mysql injection
        # ou alguma eventual brecha de segurança.
        for i in trigger: 
            if((i in select) or (i in where) or (i in table)):
                return ["Segurança violada. Abortando.."]
                
        lista = []
        self.cursor.execute(f"""
            SELECT {select} FROM {table} WHERE {where};
        """)
        
        for i in self.cursor.fetchall():
            lista.append(i)
        return lista
        
    def inserir_usuario(self,nome,email,senha):
        
        self.cursor.execute(f"""
            INSERT INTO usuario(nome,email,senha) VALUES (
                '{nome}',
                '{email}',
                '{senha}'  
            );
        """)
        self.conn.commit()

    def criar_tabela_usuario(self):
        self.cursor.execute("""
            CREATE TABLE usuario(
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                nome VARCHAR(50) NOT NULL,
                email VARCHAR(50) UNIQUE NOT NULL,
                senha VARCHAR(255) NOT NULL,
                data TEXT
            );
        """)
    def criar_tabela_noticia(self):
        self.cursor.execute(""" 
            CREATE TABLE noticia(
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                titulo VARCHAR(255),
                descricao VARCHAR(255),
                imagem VARCHAR(255),
                assunto VARCHAR(255),
                autor VARCHAR(255),
                data TEXT);
        """)
    def criar_tabela_relacao_curtidas(self):
        self.cursor.execute(""" 
            CREATE TABLE relacao_curtidas(
                id_usuario INTEGER NOT NULL,
                id_noticia INTEGER NOT NULL,
                FOREIGN KEY(id_usuario) REFERENCES usuario(id),
                FOREIGN KEY(id_noticia) REFERENCES noticia(id)
            );
        """)
    def encerrar_conexao(self):
        """
        Não esqueça de chamar essa função uma vez que encerrar toda a comunicação com o banco de dados.
        """
        self.conn.close()
    
    def logar(self, email, senha):
        usuarioExiste = self.recuperar_informacoes("nome",f"email = '{email}' AND senha = '{senha}'", "usuario")
        if usuarioExiste:
            return True
        else:
            return False
    def curtir_noticia(self, id_usuario, id_noticia):
        
        try:
            tempList = self.recuperar_informacoes("*",f"id_usuario = '{id_usuario}' AND id_noticia = '{id_noticia}'","relacao_curtidas")
            if not tempList:
                pass
            else:
                return "Este usuário já curtiu essa notícia."
        except Exception as e:
            return f"Não foi possível curtir a notícia devido ao erro: {str(e)}"
        
        try:
            self.cursor.execute(f""" 
                INSERT INTO relacao_curtidas(id_usuario,id_noticia) VALUES(
                    '{id_usuario}',
                    '{id_noticia}'
                );
            """)
            self.conn.commit()
            return "Ok"
        except Exception as e:
            self.conn.rollback()
            return f"Não foi possível realizar essa operação, devido ao erro: {str(e)} " 
    
    def descurtir_noticia(self, id_usuario, id_noticia):
        # BRECHA DE SEGURANÇA. POSSIBILIDADE DE UM USUARIO
        #  PODER CURTIR PELO OUTRO
        try:
            self.cursor.execute(f""" 
                DELETE FROM relacao_curtidas WHERE id_usuario = '{id_usuario}' AND id_noticia = '{id_noticia}';
            """)    
            self.conn.commit()
            return "Ok"
        except Exception as e:
            self.conn.rollback()
            return f"Não foi possível descurtir a notícia, devido ao erro: {str(e)} "

#Main().criar_tabela_usuario()
#Main().inserir_usuario('Beatriz Cattaneo','beatriz.bc@gmail.com','thisisapassword')
#print(Main().logar("Dora.vlm@gmail.com","thisisnotapassword"))
#print(Main().recuperar_informacoes("*","1=1","noticia"))
#Main().criar_tabela_noticia()
#Main().criar_tabela_relacao_curtidas();

#Main().inserir_noticia("Mulher descobre estar grávida mesmo menstruada.","Uma mulher do estado de São Paulo, estudante do IFSP, descubriu estar grávida, mesmo após ter menstruado duas vezes e feito o teste de gravidez. Especialistas estão chocados.","/static/Noticias/Batman.jpg","saude","Victor Lucas Mazzotti","07-06-2021")



#print(Main().curtir_noticia(1,1))
Main().encerrar_conexao()