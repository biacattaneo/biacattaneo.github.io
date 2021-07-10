import bcrypt


class Main(object):
    def __init__(self):
        pass
    
    def generate_hash(self,mail,password):
        _temp = bcrypt.hashpw(f"{mail}{password}".encode(), bcrypt.gensalt(4))
        return _temp.decode()
    
    def verify_similarity(self,hash1,hashToCompare):
        hash1 = hash1.encode()
        hashToCompare = hashToCompare.encode()
        return bcrypt.checkpw(hash1,hashToCompare)


# print(Main().verify_similarity("$2b$04$UFGwppncTDPmyaL1qRReI.e5g9O2CF16y3ur6yntH89Sar4tdVxAm",passw))


# password="mazzotti.vlm@gmail.com2330".encode()
# hashed = bcrypt.hashpw(password, bcrypt.gensalt(10))
# #print(hashed.decode())
# #print(bcrypt.checkpw("mazzotti.vlm@gmail.com2330".encode(), hashed))