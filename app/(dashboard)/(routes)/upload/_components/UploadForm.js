import React, { useState } from 'react';
import AlertMsg from './AlertMsg';
import FilePreview from './FilePreview';
import ProgressBar from './ProgressBar';

function UploadForm({ UploadButtonClick, progress }) {
    const [file, setFile] = useState();
    const [error, setErrorMsg] = useState();
    function onFileSelect(file) {
        console.log(file);
        if (file && file.size > 2000000) {
            console.log("File size is greater than 2MB");
            setErrorMsg("File size is greater than 2MB");
            return;
        }
        setErrorMsg(null);
        setFile(file);
    }

    function GetEventOfFile(event) {
        onFileSelect(event.target.files[0]);
    }
    return (
        <div className='text-center'>
            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 dark:hover:bg-bray-800 dark:bg-slate-200 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-slate-300">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-12 h-12 mb-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 16" fill="transparent">
                            <title>Upload icon</title>
                            <path strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>

                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or <strong className="text-blue-500">drag</strong> and <strong className="text-blue-500">drop</strong></p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (Max Size: 2MB)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={GetEventOfFile} />
                </label>
            </div>
            {error ? <AlertMsg msg={error} /> : null}
            {file ? <FilePreview file={file} removeFile={() => setFile(null)} /> : null}
            {progress>0 ? <ProgressBar progress={progress}/> : <button disabled={!file} className="p-2 bg-primary text-white w-[30%] rounded-full mt-5 disabled:bg-gray-500" onClick={() => { UploadButtonClick(file) }}>Upload</button>}
        </div>
    );
}

export default UploadForm;