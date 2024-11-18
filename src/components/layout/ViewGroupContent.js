import { useEffect, useState } from "react";
import UploadImage from "./UploadImage";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function ViewContentForm({ group }) {
  const { data: session } = useSession();
  const [user, setUser] = useState("");
  const [image, setImage] = useState(group?.image || "");
  const [name, setName] = useState(group?.name || "N/A");
  const [venue, setVenue] = useState(group?.venue || "N/A");
  const [announcements, setAnnouncements] = useState(group?.announcements || "N/A");
  const [objectives, setObjectives] = useState(group?.objectives || "N/A");

  console.log(group)

  useEffect(() => {
    fetch("/api/profile").then((response) => {
      response.json().then((data) => {
        setUser(data);
      });
    });
  }, [session]);

  return (
    <form
      className="mt-8 max-w-2xl mx-auto"
    >
      <div
        className="grid items-start gap-4"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
       <div>
          <Image
            className="rounded-xl w-full h-full mt-3"
            src={image}
            width={100}
            height={100}
            layout="responsive"
            alt={"avatar"}
          />
        </div>
        <div>
          <label>Item name</label>
          <input
            type="text"
            value={name}
            readOnly 
          />
          <label>Venue</label>
          <textarea
            type="text"
            value={venue}
            readOnly
          />
          <label>Announcements</label>
          <textarea
            type="text"
            value={announcements}
            readOnly
          />
          <label>Objectives</label>
          <textarea
            type="text"
            value={objectives}
            readOnly
          />
        </div>
      </div>
    </form>
  );
}
