Page({
  data: {
    photoSrc: ''
  },
  onLoad: function() {
    const that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          cameraHeight: res.windowHeight * 0.6 + 'px' // 设置为屏幕高度的60%
        });
      }
    });
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          photoSrc: res.tempImagePath
        })
        this.savePhoto(res.tempImagePath);
      }
    })
  },
  savePhoto(tempImagePath) {
    wx.saveImageToPhotosAlbum({
      filePath: tempImagePath,
      success(res) {
        wx.showToast({
          title: '照片已保存',
          icon: 'success',
          duration: 2000
        });
        wx.setStorageSync('cache_image_path',tempImagePath)
      },
      fail(err) {
        console.log(err)
      }
    })
  }
})
