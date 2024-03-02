import { Button, TextInput } from 'flowbite-react';
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from 'firebase/storage';
import { app } from '../firebase';

export default function DashProfile() {
    const { currentUser } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setimageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const filePickerRef = useRef();

    console.log(imageFileUploadProgress, imageFileUploadError);

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(e.target.files[0]);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);

    // const uploadImage = async () => {
    //     const storage = getStorage(app);
    //     const fileName = new Date().getTime() + imageFile.name;
    //     const storageRef = ref(storage, fileName);
    //     const uploadTask = uploadBytesResumable(storageRef, imageFile);

    //     uploadTask.on(
    //         'state_changed',
    //         (snapshot) => {
    //             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //             setimageFileUploadProgress(progress.toFixed(0));
    //         },
    //         (error) => {
    //             setImageFileUploadError('Could not upload image (file must be less than 2 MB)');
    //         },
    //         () => {
    //             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //                 setImageFileUrl(downloadURL);
    //             });
    //         }
    //     );
    // };

    const uploadImage = async () => {
        console.log('upload function is called !!')
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask =await uploadBytesResumable(storageRef, imageFile);
    
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setimageFileUploadProgress(progress.toFixed(0));
            },
            (error) => {
                setImageFileUploadError('Could not upload image (file must be less than 2 MB)');
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                });
            }
        );
    };
    

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-6 text-center font-semibold text-2xl'>Profile</h1>
            <form className='flex flex-col gap-4'>
                <input type='file' accept='image/*' onChange={handleChange} ref={filePickerRef} hidden />
                <div
                    className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
                    onClick={() => {
                        filePickerRef.current.click();
                    }}
                >
                    <img
                        src={imageFileUrl || currentUser.ProfilePicture}
                        alt='user'
                        className='rounded-full object-cover border-8 border-[lightgray]'
                    />
                </div>
                <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} />
                <TextInput type='email' id='email' placeholder='Email' defaultValue={currentUser.email} />
                <TextInput type='password' id='' placeholder='Password' />
                <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                    Update
                </Button>
            </form>
            <div className='text-red-500 flex justify-between mt-4'>
                <span className='cursor-pointer'>Delete Account</span>
                <span className='cursor-pointer'>Sign Out</span>
            </div>
        </div>
    );
}
