export const extractImpData = (rawData = []) => {
  return rawData.map(obj => ({
    id: obj.id,
    hdImgHeight: obj.imageHeight,
    hdImgWidth: obj.imageWidth,
    hdImgSize: obj.imageSize,
    hdImgUrl: obj.largeImageURL,
    imgHeight: obj.webformatHeight,
    imgWidth: obj.webformatWidth,
    imgUrl: obj.webformatURL
  }));
};
