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
            <p className="my-2 text-sm/6">Add Image to Swiper.</p>
            <form name="addData" onSubmit={addImageHandler}>
                <div className="grid  lg:grid-cols-2 gap-2">
                    <div>                        
                        <input
                            value={formData?.name ?? ""}
                            onChange={(e) => setFormData((pre) => ({ ...pre, name: e.target.value }))}
                            type="text"
                            placeholder="Image name / alt text"
                            required={true}
                            aria-required="true"
                            className="form-input" />
                    </div>
                    <div>                        
                        <input
                            value={formData?.url ?? ""}
                            onChange={(e) => setFormData((pre) => ({ ...pre, url: e.target.value }))}
                            type="text"
                            placeholder="Image name extension (e.g., .jpg, .png ...)"
                            required={true}
                            aria-required="true"
                            className="form-input"  />
                    </div>
                    <div>                        
                        <button type='submit' className="btn rounded-sm my-2">{flag ? "Save" : "Add Data"} </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddData
