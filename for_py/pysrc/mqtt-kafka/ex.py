from buffer_to_display import Buffer as bf
import time
from queue import Queue

if __name__ == '__main__':
    buf = bf(topic=1)
    while buf.__dict__['buff']:
        # print("Check Sync", buf.topic, "'s data is :", buf.get_data())
        
        
        time.sleep(4)
        
        