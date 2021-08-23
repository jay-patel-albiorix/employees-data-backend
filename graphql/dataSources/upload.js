const cloudinary = require("../../utilities/cloudinary")

class UploadDataSource {
    upload = async (
        fileStream,
    ) => {
        try {
            // console.log("fileStream", fileStream)
    
            const { secure_url } = await new Promise((resolve, reject) => {
                fileStream.pipe(
                    cloudinary.uploader.upload_stream((error, result) => {
                        if(error) reject(error)
    
                        resolve(result)
                    })
                )
            })
            console.log("secure_url", secure_url)
    
            return {
                url: secure_url
            }
        } catch(err) {
            console.log(err)
            throw new Error(err.message || "Uploading file failed")
        }
    } 
}


module.exports = UploadDataSource