"use client"
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { collection, getDocs, getFirestore, query, where, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import app from './../../../../firebaseConfig';
import TotalFileCard from './_components/TotalFileCard';
import FileList from './_components/FileList';
import Link from 'next/link';

function Files() {
  const db = getFirestore(app);
  const storage = getStorage(app);
  const { user } = useUser();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (user) {
      getAllUserFiles();
    }
  }, [user]);

  const getAllUserFiles = async () => {
    const q = query(collection(db, 'uploadedFile'), where('userEmail', '==', user.primaryEmailAddress.emailAddress));
    const querySnapshot = await getDocs(q);
    const files = [];
    querySnapshot.forEach((doc) => {
      files.push({ ...doc.data(), id: doc.id });
    });
    setFileList(files);
  };

  const handleDelete = async (fileId, fileName) => {
    try {
      await deleteDoc(doc(db, 'uploadedFile', fileId));
      const storageRef = ref(storage, `file-upload/${fileName}`);
      await deleteObject(storageRef);
      setFileList(fileList.filter((file) => file.id !== fileId));
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-[20px]">My Files</h2>

      {fileList.length === 0 ? (
        <>
          <h2 className="mb-6"> You dont have any File</h2>
          <Link href="/upload" className="p-2 text-white bg-primary rounded-md mt-7">
            Upload Now
          </Link>
        </>
      ) : (
        <>
          <TotalFileCard totalFile={fileList.length} />
          <FileList fileList={fileList} onDelete={handleDelete} />
        </>
      )}
    </div>
  );
}

export default Files;