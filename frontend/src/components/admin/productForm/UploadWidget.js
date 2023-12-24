import React, { useState } from 'react'
import Card from '../../card/Card'
import{AiOutlineCloudUpload} from "react-icons/ai"
import { BsTrash } from "react-icons/bs";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../../firebase';
import { toast } from 'react-toastify';

const UploadWidget = ({ files, setFiles, product }) => {

    const [selectedImages, setSelectedImages] = useState([]);
    const [images, setImages] = useState([]);
    const [progress, setProgress] = useState([]);
    const [uploading, setUploading] = useState(false);
    
    const addImages = (e) => {
        const selectedFiles = [...e.target.files];
        // const selectedFilesArray=Array.from(selectedFiles)
        // console.log(selectedFiles);

        const imagesArray = selectedFiles.map(img => {
            return URL.createObjectURL(img)
        })

        setImages(prev => prev.concat(selectedFiles));
        setSelectedImages(prev => prev.concat(imagesArray));
        
        e.target.value = "";
    }

    const removeImg = (img) => {
        const imgIndex = selectedImages.indexOf(img);
        setSelectedImages(selectedImages.filter((image) => image !== img));

        setImages(images.filter((image, index) => index !== imgIndex))
        URL.revokeObjectURL(img);
    }

    const uploadImgs = () => {
        setUploading(true);
        const promises = [];
        for (let i = 0; i < images.length; i++) {
            promises.push(storeImage(images[i], updateProgress))
        }
        Promise.all(promises)
            .then((urls) => {
                setProgress(files.length)
                toast.success("image upload completed")
                setFiles((prev) => prev.concat(urls));
            })
            .catch(err => {
                toast.error(err.message);
                setUploading(false);
            })
            .finally(() => {
                setImages([]);
                setSelectedImages([]);
                setProgress(0)
                setUploading(false);
                // console.log("files array: ", files);
            })
            
    };

    const storeImage = async (file, progressCallback) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, `product_images/${fileName}__${product.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    // console.log(`Upload is ${progress}% `);
                    progressCallback(progress);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                    });
                }
            )
        })
    };

    const updateProgress = (progress) => {
    // const totalProgress = Math.floor(Math.ceil((progress / images.length) * 100)/1000);
    setProgress(Math.floor(progress));
};



  return (
      <div>
          <Card cardClass={"formcard group"}>
              <label className='uploadWidget'>
              <AiOutlineCloudUpload size={35} />
              <br />
              <span>click to upload up to 5 images</span>
              <input
                  type="file"
                  name='image'
                  onChange={addImages}
                  multiple
                  accept='image/png,image/jpeg, image/jpg, image/webp'
                  />
              </label>
              <br />
              {selectedImages.length > 0 && (selectedImages.length > 5 ? (
                  <p className='error'>more than 5 images not allowed <br />
                  <span>please remove al least <b>{selectedImages.length-5 }</b> of them</span></p>
              ) : (
                      <div className='--center-all'>
                          <button
                              className='--btn --btn-danger --btn-large'
                              disabled={uploading}
                              onClick={uploadImgs}>
                              {uploading ? `Uploading ${progress}% of ${images.length} images` : `Upload ${images.length} Image(s)`}
                          </button>
                      </div>
                      
              ))
              
              }
              {/* <button onClick={()=>console.log(files)}>check status of files</button> */}

              <div className={selectedImages.length > 0 ? "images" : ""}>
                  {selectedImages.length !== 0 && 
                      selectedImages.map((img, index) => {
                          return (
                              <div key={index} className='image'>
                                  <img src={img} alt="productImage" width={200} />
                                  <button onClick={()=>removeImg(img)} className='--btn'><BsTrash /></button>
                                  <p>{index + 1}</p>
                              </div>
                          )
                      }
                  )}
              </div>

          </Card>
    </div>
  )
}

export default UploadWidget