/*eslint-disable*/
const CDNmap = {
  "markable-samsonite-china.s3.cn-north-1.amazonaws.com.cn": "markable-samsonite-china.markableai.com",
  "s3.cn-north-1.amazonaws.com.cn/markable-magneto": "markable-magneto.markableai.com",
  "markable-magneto.s3.cn-north-1.amazonaws.com.cn": "markable-magneto.markableai.com",
  "image.markableai.com":"cn-image-platform-cdn.markableai.com"
};


const uritoCDN = (uri) => {
  if (!uri) {
    return false
  }
  let uriArray = uri.split('/');
  // no need to convert if the uri already is a CDN address
  if(Object.values(CDNmap).includes(uriArray[2])) {
      return uri
  }

  try {
      let prefix = uriArray[2]
      if(prefix === "s3.cn-north-1.amazonaws.com.cn") {
          prefix +=  "/" + uriArray[3]
          uriArray[3] = ""
      }
      if(!CDNmap.hasOwnProperty(prefix)) {
          return uri
      }
      uriArray[2] = CDNmap[prefix]
      let result = uriArray.filter(uri => uri !== "").join("/")
          .replace("https:/","https://")
          .replace("http:/","https://")
          .replace("/http:/","/https://")
      return result
  } catch (error) {
      console.log(error)
      return uri
  }

}

const CDNtoUri = (CDN) => {
  let CDNArray = CDN.split('/');

  // no need to convert if the CDN already is a uri address
  if(CDNArray[2] === "s3.cn-north-1.amazonaws.com.cn") {
      if(Object.keys(CDNmap).includes(CDNArray[2]+"/"+CDNArray[3])) {
          return CDN
      }
  }

  if(Object.keys(CDNmap).includes(CDNArray[2])) {
      return CDN
  }

  try {
      if (getKeyByValue(CDNmap, CDNArray[2]) === undefined) {
          return CDN
      }
      CDNArray[2] = getKeyByValue(CDNmap, CDNArray[2])
      let result = CDNArray.filter(uri => uri !== "").join("/")
          .replace("https:/","https://")
          .replace("http:/","https://")
          .replace("/http:/","/https://")

      return result
  } catch (error) {
      console.log(error)
      return CDN
  }

}

const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
}

export default {
  uritoCDN,
  CDNtoUri,
}
