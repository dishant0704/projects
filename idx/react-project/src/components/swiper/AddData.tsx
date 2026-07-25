import React, { useEffect, useState } from 'react'

import type { SwiperData, SwiperItem, EditObject } from '../../types/swiper'

interface addDataProps {
    editObj: EditObject,
    setEditObj: React.Dispatch<React.SetStateAction<EditObject>>
    mainData: SwiperData;
    setData: React.Dispatch<React.SetStateAction<SwiperData>>;
}

const AddData = ({ ...pros }: addDataProps): React.JSX.Element => {
    const { mainData: { data }, setData, editObj, setEditObj } = pros
    const defaultFormData = {
        id: 0,
        name: "",
        url: ""
    }
    const [formData, setFormData] = useState<SwiperItem>(defaultFormData);
    const { inx, flag } = editObj

    useEffect(() => {
        if (inx !== null && data[inx]) {
            setFormData(data[inx]);
        } else {
            setFormData(defaultFormData);
        }
    }, [inx, data]);

    const addImageHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inx !== null && flag) {
            const updated = [...data]
            updated[inx] = formData;
            setData((pre) => ({
                ...pre,
                data: updated
            }));
            setEditObj({ inx: null, flag: false });
        } else {

            const newItem: SwiperItem = {
                ...formData,
                id: Date.now(),
            }
            setData((pre) => ({
                ...pre,
                data: [...pre.data, newItem]
            }))
        }
        // reset form: 
        setFormData(defaultFormData)
    }

    return (
        <div>
            <p className="mt-1 text-sm/6 text-gray-600">Add Image to Swiper.</p>
            <form name="addData" onSubmit={addImageHandler}>
                <div className="flex gap-2">
                    <div>
                        <label className="block text-sm/6 font-medium text-gray-900">Name(alt):</label>
                        <input
                            value={formData?.name ?? ""}
                            onChange={(e) => setFormData((pre) => ({ ...pre, name: e.target.value }))}
                            type="text"
                            required={true}
                            aria-required="true"
                            className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-400 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-back-300 sm:text-sm/6" />
                    </div>
                    <div>
                        <label className="block text-sm/6 font-medium text-gray-900">Image name extension( like .jpg, .png ... )</label>
                        <input
                            value={formData?.url ?? ""}
                            onChange={(e) => setFormData((pre) => ({ ...pre, url: e.target.value }))}
                            type="text"
                            required={true}
                            aria-required="true"
                            className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-400 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-back-300 sm:text-sm/6" />
                    </div>
                    <div>
                        <button type='submit' className="bg-sky-500 px-3 py-1.5 text-base mt-8 block w-full rounded-md text-white cursor-pointer">{flag ? "Save" : "Add Data"} </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddData
