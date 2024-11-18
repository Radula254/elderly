import { useEffect, useState } from "react";
import UploadImage from "./UploadImage";
import { useSession } from "next-auth/react";

export default function GroupContentForm({ onSubmit, group }) {
  const { data: session } = useSession();
  const [user, setUser] = useState("");
  const [image, setImage] = useState(group?.image || "");
  const [name, setName] = useState(group?.name || "");
  const [venue, setVenue] = useState(group?.venue || "");
  const [announcements, setAnnouncements] = useState(group?.announcements || "");
  const [objectives, setObjectives] = useState(group?.objectives || "");

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
      onSubmit={(ev) => {
        ev.preventDefault();
        onSubmit(ev, {
          image,
          name,
          venue,
          announcements,
          objectives,
        });
      }}
    >
      <div
        className="grid items-start gap-4"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div>
          <UploadImage link={image} setLink={setImage} />
        </div>
        <div>
          <label>Item name</label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <label>Venue</label>
          <textarea
            type="text"
            value={venue}
            onChange={(ev) => setVenue(ev.target.value)}
          />
          <label>Announcements</label>
          <textarea
            type="text"
            value={announcements}
            onChange={(ev) => setAnnouncements(ev.target.value)}
          />
          <label>Objectives</label>
          <textarea
            type="text"
            value={objectives}
            onChange={(ev) => setObjectives(ev.target.value)}
          />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
