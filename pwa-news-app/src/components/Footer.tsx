"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const Footer = ({ className }: { className: string }) => {
  const [year, setYear] = useState(2000);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <div className="container mx-auto my-5 text-sm">
      <div className={`w-50 ${className}`}>
      <div className="logoWrapper relative h-7 w-30 m-auto">
        <Image
          src="../images/ketanLogo_dark.svg"
          fill // Image will fill the parent
          style={{ objectFit: "cover" }} // CSS styling
          alt="ketanLogo"
          sizes="(max-width: 200px) 100vw, 50vw" //
        />
      </div>
      <div className="clear-both my-2">
        &copy; {year} All rights reserved.
      </div>
      </div>
    </div>
  );
};

export default Footer;
