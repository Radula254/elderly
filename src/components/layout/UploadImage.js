import toast from "react-hot-toast";
import Image from "next/image";
import ImageIcon from "@/components/icons/ImageIcon";

export default function UploadImage({ link, setLink }) {
    
  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);
      const uploadPromise = new Promise(async (resolve, reject) => {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });
        if (response.ok) {
          const link = await response.json();
          setLink(link);
          resolve();
        } else {
          reject();
        }
      });

      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Pic Uploaded!",
        error: "Error Uploading",
      });
    }
  }

  return (
    <>
      {link && (
        <Image
          className="rounded-lg w-full h-full mb-1"
          src={link}
          width={100}
          height={100}
          layout="responsive"
          alt={"avatar"}
        />
      )}
      {!link && (
        <Image
        className="rounded-lg w-full h-full mb-1"
        src={'/imageHolder.png'}
        width={50}
        height={50}
        alt={"avatar"}
      />
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <div className="button flex items-center border text-base border-gray-300 rounded-lg text-center cursor-pointer">
        <ImageIcon className="w-5 h-5" />
        <span>
          Image
        </span>
        </div>
      </label>
    </>
  );
}
