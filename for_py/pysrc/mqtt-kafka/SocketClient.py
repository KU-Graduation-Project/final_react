# python websocket client
import asyncio
import websockets
import time
import functools
# import socketio

# sio = socketio.AsyncClient() 

# @sio.event
# async def message(data):
#     print('I received a message!')
# class SocketClient :
#     def __init__(self, topic) -> None:
#         self.topic = topic
#         pass
#     async def send(self, json):
#         await sio.connect('http://localhost:8080')
#         await sio.send(json)
        # data = await sio.recv()
        # print(data)
        
# @sio.event
# def connect():
#     print("I'm connected!")

# @sio.event
# def connect_error(data):
#     print("The connection failed!")

# @sio.event
# def disconnect():
#     print("I'm disconnected!")

# Use This!!! 
class SocketClient: 
    def __init__(self, topic) -> None:
        self.topic = topic
        pass
    async def send(self, json):
        async with websockets.connect('ws://localhost:8080') as websocket:
            await websocket.send(json)
            data = await websocket.recv()
            print(data)
        
# asyncio.get_event_loop().run_until_complete(send())

# python websocket server - Dont' USE!!! This isn't working
# class SocketClient2:
#     def __init__(self, topic) -> None:
#         self.topic = topic
#         pass
#     async def echo(self, websocket, path, data):
#         # async for msg in websocket:
#         await websocket.send(data)
            
#     async def main(self, data):
#         print("Server running!")
#         async with websockets.serve(
#             # functools.partial(self.echo, data = data), "localhost", 3333
#         ):
#             await asyncio.Future() # run forever
    
        