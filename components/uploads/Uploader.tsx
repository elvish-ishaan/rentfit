'use client';
import { CldUploadButton } from 'next-cloudinary';

const CloudinaryUploader = () => {
  return (
    <div>
      <CldUploadButton
      
       uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string || ''}
      className="bg-green-400 py-2 px-3 rounded border mt-4 text-white
        hover:bg-green-500 transition ease-in-out delay-200"
       
      >
        <span>Upload Image</span>
      </CldUploadButton>
    </div>
  );
};

export default CloudinaryUploader;