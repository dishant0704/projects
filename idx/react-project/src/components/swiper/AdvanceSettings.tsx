import React from 'react'
import type { SwiperAdvSettings, modulesItems } from '../../types/swiper'

interface AdvanceSettingsProps {
    advData: SwiperAdvSettings,
    setAdvData: React.Dispatch<React.SetStateAction<SwiperAdvSettings>>,
}

const AdvanceSettings = ({ ...props }: AdvanceSettingsProps): React.JSX.Element => {
    const { advData, setAdvData } = props
    const { modules } = advData
    return (
        <>
            <h5 className="mt-3 text-base/7 font-semibold text-gray-900">Advance Settings:</h5>
            <p className="mt-1 text-sm/6 text-gray-600">Swiper Main Settings</p>
            <form>
                <div className="flex gap-2">
                    <div>
                        <label className="block text-sm/6 font-medium text-gray-900">Space Between</label>
                        <input type="number"
                            value={advData.spaceBetween}
                            onChange={(e) => setAdvData((pre) => ({
                                ...pre,
                                spaceBetween: e.target.valueAsNumber
                            }))}
                            required={true}
                            aria-required="true"
                            className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-400 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-back-300 sm:text-sm/6" />
                    </div>
                    <div>
                        <label className="block text-sm/6 font-medium text-gray-900">Slides PerView</label>
                        <input type="number"
                            value={advData.slidesPerView}
                            onChange={(e) => setAdvData((pre) => ({
                                ...pre,
                                slidesPerView: e.target.valueAsNumber
                            }))}
                            required={true}
                            aria-required="true"
                            className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-400 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-back-300 sm:text-sm/6" />
                    </div>
                    <div>
                        <label htmlFor="pagination" className="block text-sm/6 font-medium text-gray-900">Pagination</label>
                        <input
                            type="checkbox"
                            id="pagination"
                            name="pagination"
                            required={false}
                            aria-required="true"
                            checked={advData.pagination}
                            onChange={(e) => setAdvData((pre) => ({
                                ...pre,
                                pagination: e.target.checked
                            }))}
                            className=" my-5 block w-full rounded-md bg-white " />
                    </div>
                    <div>
                        <label htmlFor="scrollbar" className="block text-sm/6 font-medium text-gray-900">Scrollbar</label>
                        <input
                            type="checkbox"
                            id="scrollbar"
                            name="scrollbar"
                            required={false}
                            aria-required="true"
                            checked={advData.scrollbar}
                            onChange={(e) => setAdvData((pre) => ({
                                ...pre,
                                scrollbar: e.target.checked
                            }))}
                            className=" my-5 block w-full rounded-md bg-white " />
                    </div>
                </div>
                <div>
                    <label className="block text-sm/6 font-medium text-gray-900">Modules:</label>
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
                                    <label htmlFor="navigation" className="block text-sm/6 font-medium text-gray-900">{name}</label>
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
