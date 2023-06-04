function deleteFileInPath(fileAddress){
    if(fileAddress){
     const pathFile = path.join(__dirname, "..", "..", "Public", fileAddress);
     if(fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
    }
 }
 function listOfImagesFromRequest(files, fileUploadPath){
     if(files?.length > 0){
         return (files.map(file => path.join(fileUploadPath, file.filename)).map(item => item.replace(/\\/g, "/")));
     } else {
         return []
     }
 }

 module.exports = {
    deleteFileInPath,
    listOfImagesFromRequest
 }