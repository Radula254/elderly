"use client";
import { useEffect, useState } from "react";
import ActivityProps from "./ActivityProps";
import UploadImage from "./UploadImage";
import { useSession } from "next-auth/react";

export default function GroupForm({ onSubmit, group }) {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(group?.image || "");
  const [name, setName] = useState(group?.name || "");
  const [description, setDescription] = useState(group?.description || "");
  const [category, setCategory] = useState(group?.category || "");
  const [activity, setActivity] = useState(group?.activity || []);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/category").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);

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
          description,
          activity,
          category,
          email: user.email,
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
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <label>Category</label>
          <select
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          >
            <option value="" disabled selected>
              Select a category
            </option>
            {categories?.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option> // Add key prop
              ))}
          </select>
          <label>More activities improve chance of acceptance</label>
          <ActivityProps
            name={"activity"}
            addLabel={"Add an activity"}
            props={activity}
            setProps={setActivity}
          />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
