from fastapi import FastAPI, HTTPException,File, UploadFile
import base64
import requests
app = FastAPI()

@app.post("/upload")
async def upload_image(data: dict):
    data_type = data.get("data_type")
    data = data.get("content")
    
    if data_type == "image":
        target_suffix = "/upload_image"
    
    elif data_type == "text":
        target_suffix = "/upload_txt"
    else:
        raise HTTPException(status_code=501, detail="data_type not supported")
        
    target_url = "http://43.198.185.242:8000" + target_suffix
    try:
        response = requests.post(target_url, json=data)  # 发送POST请求
        response.raise_for_status()  # 检查是否成功
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload data to storage server: {str(e)}")

    # 返回成功消息
    return {"message": f"Data of type '{data_type}' dumped successfully to server: {target_url}"}
    
    
    
    