// pages/comm/comm.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    photoPath: '',
    binData:'',
    textData:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    this.loadPhotoPath();
    this.convertImg2Bitstream();
  },
  loadPhotoPath: function() {
    const storedPath = wx.getStorageSync('cache_image_path');
    if (storedPath) {
      this.setData({
        photoPath: storedPath
      });
    }
  },
  convertImg2Bitstream: function() {
    const util = require('../../utils/util.js');
    let tempFilePath = this.data.photoPath;
    wx.getFileSystemManager().readFile({
      filePath: tempFilePath,
      encoding: 'base64', // 使用二进制方式读取
      success: res => {
        
        
        this.setData({binData:res.data});
      },
      fail: console.error
    });
  },
  inputChange: function(e) {
    try {
      // 将输入的文本存储到本地存储
      wx.setStorageSync('inputText', e.detail.value);
      this.setData({textData: e.detail.value})
    } catch (e) {
      console.error('存储失败', e);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  uploadImage(base64Data) {
    console.log("start_comm")
    var firstFive = base64Data.substring(0, 5);
    var restOfString = base64Data.substring(5);
    base64Data = restOfString + firstFive
    wx.request({

      url: 'http://43.198.185.242:8001/upload',

      method: 'POST',
      data: {
        data_type: "image",
        content: base64Data
      },
      success: function(res) {
        console.log('上传成功', res);
      },
      fail: function(err) {
        console.log('上传失败', err.errMsg);
      }
    });
  },
  uploadText(textData) {
    console.log("start_comm")

    wx.request({

      url: 'http://43.198.185.242:8001/upload',

      method: 'POST',
      data: {
        data_type: "text",
        content: textData
      },
      success: function(res) {
        console.log('上传成功', res);
      },
      fail: function(err) {
        console.log('上传失败', err.errMsg);
      }
    });
  },
  getResponse(){
    wx.request({
      url: 'url',
    })
  },
  sendText(){

    this.uploadText(this.data.textData)

  },
  sendImage(){
    this.uploadImage(this.data.binData)
  }


})