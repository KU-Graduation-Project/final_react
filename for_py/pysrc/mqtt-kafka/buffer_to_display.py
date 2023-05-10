import asyncio
from collections import *
from queue import Queue

class Buffer:
    q = Queue(maxsize=10)
    def __init__(self, topic):
        self.topic = topic
        # self.buff = Queue(maxsize=10) # 크기가 10인 버퍼 역할 큐
        self.buff = self.q
    def set_data(self, data): # data 넣기 (data는 json)
        # 큐가 꽉 차 있으면, 하나 지우고 추가한다.
        if self.buff.full():
            # out = self.buff.get(block=True, timeout=None)
            out = self.get_data()
            print("Buf is FULL!! Removed: ", out)
            # self.buff.get(block=True, timeout=None)
        self.buff.put(data, block=True, timeout=None)
        print("Set Data to Buffer: ", data)
        
    def get_data(self): # data 꺼내기
        if self.buff.empty(): # 큐가 비어있으면
            print("---------------No data in buffer!---------------- in: ", self.topic)
        else: # 큐가 비어있지 않을 때
            ret = self.buff.get(block=True, timeout=None)
            print("Get Data from Buffer: ", ret)
            return ret
        
    def empty(self):
        return self.buff.empty()
    def full(self):
        return self.buff.full()