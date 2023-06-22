import json
import threading
import time
from datetime import datetime
import socket
import websocket

import serial
import struct


# open socket client
# send data to web
Host = 'localhost'
Port = 8080

#client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#client_socket.connect((Host, Port))
client_socket = websocket.WebSocket()
client_socket.connect('ws://localhost:8080')

num = 0
while True:
    num+=1
    raw_data = str(num)
    data = raw_data.encode('utf-8')
    print("send:",data)
    #client_socket.sendall(data)
    client_socket.send(data)
    time.sleep(1)

client_socket.close()