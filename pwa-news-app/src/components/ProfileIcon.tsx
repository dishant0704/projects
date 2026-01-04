import Image from "next/image";
import { ProfileProps } from "@/type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { oauthSignOut } from "@/actions/auth";

import { useEffect, useRef, useState } from "react";

const ProfileIcon = (props: ProfileProps) => {
  const [isOpen, setIsopen] = useState(false);
  const { name, email, image: imgURL } = props;
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsopen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  // onResize close dropDown
  useEffect(() => {
    const handleResize = () => setIsopen(false);
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const signOutUser = () => {
    oauthSignOut();
    setIsopen(!isOpen);
  };

  return (
    <div ref={dropdownRef} className="profileWrapper z-1 relative grid gap-2 justify-center p-4">
      <div        
        className="relative rounded-full w-10 h-10 bg-amber-300 mx-auto cursor-pointer"
        onClick={() => setIsopen(!isOpen)}
      >
        <Image
          className="rounded-full"
          src={`${imgURL}`}
          fill // Image will fill the parent
          style={{ objectFit: "cover" }} // CSS styling
          alt="ketanLogo"
          sizes="(max-width: 200px) 100vw, 50vw" //
        />
      </div>
      <h3 className="text-l">{name}</h3>
      {isOpen && (
        <div className="absolute mt-25 rounded-sm p-4 justify-cente space-y-4 bg-white dark:bg-dark-conBgColor dark:text-dark-fontColor">
          <div className="relative rounded-full w-16 h-16 bg-amber-300 mx-auto">
            <Image
              className="rounded-full"
              src={`${imgURL}`}
              fill // Image will fill the parent
              style={{ objectFit: "cover" }} // CSS styling
              alt="ketanLogo"
              sizes="(max-width: 200px) 100vw, 50vw" //
            />
          </div>
          <h3>{name}</h3>
          <div
            className="border-t-2  border-t-neutral-900 py-3 cursor-pointer"
            onClick={signOutUser}
          >
            <FontAwesomeIcon icon={faArrowRightToBracket} /> Sign out
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;
