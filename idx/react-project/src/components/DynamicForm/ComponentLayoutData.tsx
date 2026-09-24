import React from "react";

import { getCarouselImageSrc } from "../../utils/imageUtils";
import type { ComponentListData } from "../../types/types";

interface ComponentLayoutDataProps {
  setCom: (data: string) => void;
  data:ComponentListData[];
  loading:boolean
}


const ComponentLayoutData: React.FC<ComponentLayoutDataProps> = ({
  setCom,
  data,
  loading
}) => {  

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <>
        <h3>Choose Component from List</h3>
        <ul>
          {data.map((item) => {
            const { id, layout, name, discription } = item;

            const src = getCarouselImageSrc({
              folder: "component-layout",
              image:layout,
            });

            return (
              <li
                key={id}
                className="py-2 grid grid-cols-[20px_150px_1fr] gap-4"
              >
                <div className="flex items-center">
                  <input
                    className="cursor-pointer"
                    type="radio"
                    name="componentSelected"
                    value={id}
                    onChange={()=>setCom(id)}
                  />
                </div>

                <div>
                  {src ? (
                    <img
                      src={src}
                      className="d-block w-100"
                      alt={name}
                    />
                  ) : (
                    <p className="error">
                      Image data is missing.
                    </p>
                  )}
                </div>

                <div>
                  <h2 className="capitalize">{name}</h2>
                  <p>{discription}</p>
                </div>
              </li>
            );
          })}
        </ul>
        </>
      )}
    </div>
  );
};

export default ComponentLayoutData;
