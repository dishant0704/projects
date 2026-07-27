import React, { useEffect, useRef, useState } from 'react'

import type { SwiperData } from "../../types/swiper";

interface BasePathProps {
    data: SwiperData;
    setData: React.Dispatch<React.SetStateAction<SwiperData>>;
}

const BasePath = ({ ...pros }: BasePathProps): React.JSX.Element => {
    const { data, setData } = pros
    const [pathFlag, setPathFlag] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!pathFlag) {
            inputRef.current?.focus()
        }
    }, [pathFlag]);

    return (
        <div className="mt-2 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3">
            <div className='g-col-6'>
                <label className="">Base Path</label>
                <input
                    value={data.path}
                    onChange={(e) => {
                        setData((pre) => ({
                            ...pre,
                            path: e.target.value
                        }))
                    }}
                    ref={inputRef}
                    type="text"
                    name="base-path"
                    required={false}
                    aria-required="true"
                    disabled={pathFlag}
                    className="" />
            </div>
            <div className='g-col-2'>
                <button type="button" onClick={() => setPathFlag((pre) => !pre)} className="btn rounded-sm my-6">{pathFlag ? "Edit Base URL" : "Close Edit Base URL"} </button>
            </div>
        </div>
    )
}

export default BasePath
