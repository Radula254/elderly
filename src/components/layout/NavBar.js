"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar({ isAdmin }) {
  const path = usePathname();

  return (
    <div className="flex gap-2 tabs justify-center">
      {!isAdmin && (
        <>
          <Link
            className={path === "/profile" ? "active" : ""}
            href={"/profile"}
          >
            Profile
          </Link>
          <Link className={path === "/groups" ? "active" : ""} href={"/groups"}>
            Groups
          </Link>
          <Link className={path === "/groups" ? "active" : ""} href={"/groups/requested"}>
            Requested Members
          </Link>
          <Link
            className={path.includes("/caregiver") || path.includes("/editCaregiver") ? "active" : ""}
            href="/caregiver"
          >
            Caregiver
          </Link>
        </>
      )}
      {isAdmin && (
        <>
          <Link
            className={path === "/profile" ? "active" : ""}
            href={"/profile"}
          >
            Profile
          </Link>
          <Link
            className={path === "/categories" ? "active" : ""}
            href={"/categories"}
          >
            Categories
          </Link>
          <Link
            className={path.includes("/admin/groups") ? "active" : ""}
            href={"/admin/groups/all"}
          >
            Groups
          </Link>
          <Link
            className={path.includes("/caregiver") || path.includes("/editCaregiver") ? "active" : ""}
            href="/admin/caregivers/all"
          >
            Caregivers
          </Link>
          {/* <Link
            className={path.includes("/users") ? "active" : ""}
            href={"/users"}
          >
            Users
          </Link> */}
        </>
      )}
    </div>
  );
}
