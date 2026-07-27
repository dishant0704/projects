import React from 'react'
import type { SwiperAdvSettings } from '../../types/swiper'

interface AdvanceSettingsProps {
    advData: SwiperAdvSettings,
    setAdvData: React.Dispatch<React.SetStateAction<SwiperAdvSettings>>,
}

const AdvanceSettings = ({ ...props }: AdvanceSettingsProps): React.JSX.Element => {
    const { advData, setAdvData } = props
    const { modules } = advData
    return (
        <>            
            <form>
                <div className="flex gap-2">
                    <div>
                        <label className="">Space Between</label>
                        <input type="number"
                            value={advData.spaceBetween}
                            onChange={(e) => setAdvData((pre) => ({
                                ...pre,
                                spaceBetween: e.target.valueAsNumber
                            }))}
                            required={true}
                            aria-required="true"
                            className="" />
                    </div>
                    <div>
                        <label className=" ">Slides PerView</label>
                        <input type="number"
                            value={advData.slidesPerView}
                            onChange={(e) => setAdvData((pre) => ({
                                ...pre,
                                slidesPerView: e.target.valueAsNumber
                            }))}
                            required={true}
                            aria-required="true"
                            className="" />
                    </div>
                </div>
                <div>
                    <h3 className='pt-4'>Modules:</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-6">
                        {modules && modules.map((item, inx) => {
                            const { name, flag } = item
                            return (
                                <div key={inx} className="flex gap-2">
                                    <input
                                        type="checkbox"
                                        name={name}
                                        checked={flag}
                                        onChange={(e) => {
                                            setAdvData((prev) => ({
                                                ...prev,
                                                modules: prev.modules.map((module, index) =>
                                                    index === inx
                                                        ? { ...module, flag: e.target.checked }
                                                        : module
                                                ),
                                            }));
                                        }}
                                        className=" my-2 block w-5 rounded-md bg-white " />
                                    <label htmlFor="navigation" className="">{name}</label>
                                </div>)
                        })}
                    </div>
                </div>
                {/* <div className="flex justify-end border-t-2 border-gray-100 my-5 py-5">
                    <div>
                        <button type="submit" className="bg-sky-500 px-3 py-1.5 text-base block w-full rounded-md text-white cursor-pointer"> Save</button>
                    </div>
                </div> */}
            </form>
        </>
    )
}

export default AdvanceSettings
