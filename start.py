# start.py
import uvicorn
import socket



def get_lan_ip():
    try:
        # 创建一个 socket 对象
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        # 不需要真的连接，目的是触发 OS 返回本机IP
        s.connect(("8.8.8.8", 80))
        # 获取本机IP
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception as e:
        print("无法获取局域网IP地址: ", e)
        return None
    
if __name__ == "__main__":
    ip = "0.0.0.0"
    port = 8000
    lan_ip = get_lan_ip()
    print(f"Starting server at http://{lan_ip}:{port}")
    uvicorn.run("main:app", host=ip, port=port, reload=False)