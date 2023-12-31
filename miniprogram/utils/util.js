const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
function arrayBufferToHex(buffer) {
  console.log("start convert")
  console.log("length_buffer",buffer.length)
  console.log("buffer type",typeof(buffer))
  var uint8Buffer = new Uint8Array(buffer,1,4);
  console.log("length_uint8",uint8Buffer.length)
  let hexString = '';

  for (let i = 0; i < uint8Buffer.length; i++) {
    const hex = uint8Buffer[i].toString(16);
    console.log(hex)
    hexString += hex.length === 2 ? hex : '0' + hex; // 确保每个字节转换后都是两位
  }

  return hexString;
}


module.exports = {
  arrayBufferToHex: arrayBufferToHex
}



