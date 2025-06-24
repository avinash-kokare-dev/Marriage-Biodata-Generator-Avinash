import { useRef } from "react";
import { FaCamera, FaTimes } from "react-icons/fa";
import styles from "./ProfilePictureUpload.module.css";

interface ProfilePictureUploadProps {
  imageUrl: string | null;
  onChange: (file: File | null) => void;
}

export default function ProfilePictureUpload({ imageUrl, onChange }: ProfilePictureUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => inputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={styles.profilePicFrame} onClick={handleClick} title="Click to upload photo">
      {imageUrl ? (
        <>
          <img src={imageUrl} alt="Profile" className={styles.profilePicImg} />
          <button className={styles.removeBtn} onClick={handleRemove} title="Remove photo">
            <FaTimes />
          </button>
        </>
      ) : (
        <span className={styles.uploadIcon}><FaCamera size={28} /></span>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
} 