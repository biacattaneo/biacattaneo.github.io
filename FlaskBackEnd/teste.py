import bcrypt

password="victor".encode()
hashed = bcrypt.hashpw(password, bcrypt.gensalt(10))
print(hashed.decode())
print(bcrypt.checkpw("victor".encode(), hashed))