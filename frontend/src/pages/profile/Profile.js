import React, { useEffect, useRef } from 'react'
import PageMenu from '../../components/pageMenu/PageMenu'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import Card from '../../components/card/Card'
import "./Profile.scss"
import { getUser, updateUser, updatePhoto } from '../../redux/features/auth/authSlice'
import Loader from '../../components/loader/Loader';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
import { app } from '../../firebase'
import { toast } from 'react-toastify'


const Profile = () => {
    const { isLoading, user } = useSelector(state => state.auth);
    const inistialState = {
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        role: user?.role || '',
        photo:user?.photo || '',
        address: user?.address || {
            address: user?.address?.address || '',
            state: user?.address?.state || '',
            country: user?.address?.country || ''
        }
    };
    const [profile, setProfile] = useState(inistialState);
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const dispatch = useDispatch();
    const fileRef = useRef(null);

    let imageUrl;

    useEffect(() => {
        if (user === null) { dispatch(getUser()) };
        
    }, [dispatch, user])
    
    useEffect(() => {
        if (user) {
            setProfile({
                name: user?.name || '',
                email: user?.email || '',
                phone: user?.phone || '',
                role: user?.role || '',
                photo:user?.photo || '',
                address: user?.address || {
                        address: user?.address?.address || '',
                        state: user?.address?.state || '',
                        country: user?.address?.country || ''
                }
            })
         }
        
    },[dispatch, user])
    
    // useEffect(() => {
    //     if (profileImage) {
    //         savePhoto(profileImage)
    //     }
    // },[profileImage])

    const saveProfile = async(e) => {
        e.preventDefault();
        const userData = {
            name: profile.name,
            phone: profile.phone,
            address: {
                address: profile.address,
                state: profile.state,
                country: profile.country,
            }
        }
        await dispatch(updateUser(userData));
    }

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
    const handleInputChange = (e) => {
        setProfile({...profile, [e.target.name]:e.target.value})
    }

    const savePhoto = async(file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + "_" + profile.name;
        const storageRef = ref(storage, `profile_images/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                toast.info('upload is ' + progress + ' % done')
            },
            (error) => {
                toast.error(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then( async(downloadUrl) => {
                    // imageUrl = downloadUrl.toString();
                    console.log('this is from save foto', imageUrl);
                    await dispatch(updatePhoto({"photo":`${downloadUrl}`}))
                    
                })
            }
        ) 

        // const userData = {
        //     photo: imageUrl //profileImage ? imageUrl : profile.photo
        // };

        // await dispatch(updatePhoto(userData));
        // // setImagePreview(null);
    };

    
    

  return (
      <>
          {isLoading && <Loader/>}
          <section>
              <div className="container">
                  <PageMenu />
                  <h2>Profile</h2>
                  <div className='--flex-start profile'>
                      <Card cardClass={"card"}>
                          {!isLoading && (
                              <>
                                  <div className="profile-photo">
                                      <div>
                                          <img
                                              src={imagePreview === null ? user?.photo : imagePreview}
                                              alt="profile"
                                              onClick={() => fileRef.current.click()}
                                              style={{cursor:'pointer'}}
                                          />
                                          <h3>Role: {profile.role}</h3>
                                          {imagePreview !== null && (
                                              <div className='--center-all'>
                                                  <button className='--btn --btn-secondary' onClick={()=>savePhoto(profileImage)}>
                                                 <AiOutlineCloudUpload size={28}/> upload photo</button>
                                              </div>
                                              
                                          )}
                                      </div>
                                  </div>
                                  <form onSubmit={saveProfile}>
                                      <p>
                                          {/* <label >Change Photo:</label> */}
                                          <input
                                              ref={fileRef}
                                              type="file"
                                              accept='image/*'
                                              name='image'
                                              onChange={handleImageChange}
                                              style={{display:'none'}}
                                          />
                                      </p> 
                                      <p>
                                          <label >Name:</label>
                                          <input
                                              type="text"
                                              name='name'
                                              value={profile?.name}
                                              onChange={handleInputChange}
                                              required
                                          />
                                      </p> 
                                      <p>
                                          <label >Email:</label>
                                          <input
                                              type="email"
                                              name='email'
                                              value={profile?.email}
                                              onChange={handleInputChange}
                                              disabled
                                          />
                                      </p> 
                                      <p>
                                          <label >Phone:</label>
                                          <input
                                              type="text"
                                              name='phone'
                                              value={profile?.phone}
                                              onChange={handleInputChange}
                                              required
                                          />
                                      </p> 
                                      <p>
                                          <label >Address:</label>
                                          <input
                                              type="text"
                                              name='address'
                                              value={profile?.address?.address}
                                              onChange={handleInputChange}
                                              required
                                          />
                                      </p>
                                      <p>
                                          <label >State:</label>
                                          <input
                                              type="text"
                                              name='state'
                                              value={profile?.address?.state}
                                              onChange={handleInputChange}
                                              required
                                          />
                                          </p>
                                      <p>
                                          <label >Country:</label>
                                          <input
                                              type="text"
                                              name='country'
                                              value={profile?.address?.country}
                                              onChange={handleInputChange}
                                              required
                                          />
                                          </p>
                                        <button className='--btn --btn-primary --btn-block'>update profile</button>
                                  </form>
                              </>
                          )}
                        </Card>
                      
                  </div>
          </div>
          </section>
          
          
    </>
  )
}

export default Profile