from fastapi import FastAPI, HTTPException,File, UploadFile
import base64

app = FastAPI()

@app.post("/upload")
async def upload_image(data: dict):
    image = data.get("image")
    print("image: ", image)
    try:
        # 解码 base64 字符串
        image_data = base64.b64decode(image)
        # 保存图片到文件
        with open("uploaded_image.jpg", "wb") as file:
            file.write(image_data)
        return {"message": "Image uploaded successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))