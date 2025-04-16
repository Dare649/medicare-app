import { useState } from "react";
import Resizer from "react-image-file-resizer";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdClose } from "react-icons/md";

const ImageUploader = ({ onChange, text, id, name }) => {
  const [preview, setPreview] = useState(null);

  const handleImageUpload = (file) => {
    Resizer.imageFileResizer(
      file,
      300, // Max width
      300, // Max height
      "JPEG",
      80, // Quality
      0, // Rotation
      (resizedImage) => {
        const base64String = resizedImage;
        onChange(name, base64String);
        setPreview(base64String);
      },
      "base64"
    );
  };

  const onFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onChange(name, "");
  };

  return (
    <div className="rounded-lg w-full bg-gray-100 text-gray-700 font-semibold p-3 flex flex-col items-center">
      {!preview ? (
        <>
          <input
            type="file"
            id={id}
            name={name}
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
          />
          <label htmlFor={id} className="cursor-pointer flex items-center gap-2 text-gray-600">
            <AiOutlineCloudUpload size={20} />
            {text}
          </label>
        </>
      ) : (
        <div className="relative">
          <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded" />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
          >
            <MdClose size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
