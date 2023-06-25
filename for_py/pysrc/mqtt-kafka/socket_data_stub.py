import time
import websocket


# 리액트 소켓주소
Host = '127.0.0.1'
Port = 8080

#리액트와 소켓연결
client_socket = websocket.WebSocket()
client_socket.connect('ws://localhost:8080')

while True :
    data = "2315,2,52,82,65,48,49,-2,02,two"
    client_socket.send(data)
    print('socket send data:', data)
    time.sleep(1)

client_socket.close()
 