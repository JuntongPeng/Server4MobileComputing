   
from fastapi import FastAPI, HTTPException,File, UploadFile
import base64

app = FastAPI()

@app.post("/upload_image")
async def upload_image(data: dict):
    image = data.get("content")
    last_five = image[-5:]
    other = image[:-5]
    image = last_five + other
    try:
        # 解码 base64 字符串
        image_data = base64.b64decode(image)
        # 保存图片到文件
        with open("uploaded_image.jpg", "wb") as file:
            file.write(image_data)
        return {"message": "Image uploaded successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/upload_txt")
async def upload_txt(data: dict):
    text = data.get("content")
    try:
        with open("uploaded_text.txt", "w") as file:
            file.write(text)
        return {"message": "txt uploaded successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))