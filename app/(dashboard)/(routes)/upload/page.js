"use client"
import React, { useState, useEffect } from 'react';
import UploadForm from './_components/UploadForm';

import { useUser } from '@clerk/nextjs';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

import { generateRandomString } from './_components/GenerateRandomString';
import { useRouter } from 'next/navigation';
import  app from '../../../../firebaseConfig';


function Page() {
  const { user } = useUser();
  const router = useRouter();
  const storage = getStorage(app);
  const db = getFirestore(app);
  const [progress, setProgress] = useState();
  const [showSuccessUpload, setShowSuccessUpload] = useState(true);
  const [fileDocId, setFileDocId] = useState();

  const uploadFile = (file) => {
    const metadata = { contentType: file.type };
    const storageRef = ref(storage, 'file-upload/' + file?.name);
    const uploadTask = uploadBytesResumable(storageRef, file, file.type);
    
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      setProgress(progress);
      
      if (progress === 100) {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          saveInfo(file, downloadURL);
          setShowSuccessUpload(false);
        });
      }
    });
  };

  const saveInfo = async (file, fileUrl) => {
    const docId = generateRandomString().toString();
    await setDoc(doc(db, 'uploadedFile', docId), {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      fileUrl: fileUrl,
      userEmail: user?.primaryEmailAddress.emailAddress,
      userName: user?.fullName,
      password: '',
      id: generateRandomString(),
      shortUrl: process.env.NEXT_PUBLIC_BASE_URL + generateRandomString(),
    });
    setFileDocId(docId); // Set fileDocId after the document is saved
  };

  useEffect(() => {
    if (fileDocId) {
      router.push(`/file-preview/${fileDocId}`); // Navigate after fileDocId is set
    }
  }, [fileDocId, router]);

  return (
    <div className="p-5 px-8 md:px-28">
      {showSuccessUpload ? (
        <div>
          <h2 className="text-[20px] text-center m-5 text-black">
            Start <strong className="text-primary">Uploading</strong> File And{' '}
            <strong className="text-primary">Share</strong> It
          </h2>
          <UploadForm UploadButtonClick={(file) => uploadFile(file)} progress={progress} />
        </div>
      ) : (
        <div className="text-center w-full text-[30px]">
          <div role="alert" className="rounded-xl border border-gray-100 bg-white p-4">
            <div className="flex items-start gap-4">
              <span className="text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <div className="flex-1">
                <h2 className="block font-medium text-gray-900"> File Uploaded Successfully </h2>
                <strong className="mt-1 text-sm text-gray-700">Your file upload has been saved in the database.</strong>
              </div>
              <button className="text-gray-500 transition hover:text-gray-600">
                <span className="sr-only">Dismiss popup</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;