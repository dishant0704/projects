import React from 'react'
import type { SwiperItem } from '../../types/swiper';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

interface Props {
    inx: number;
    item: SwiperItem;
    dragHandleProps?: SyntheticListenerMap;
    editBtn: (inx: number) => void;
    deleteBtn: (inx: number) => void;
}

const ListItem: React.FC<Props> = ({ inx, item, dragHandleProps, editBtn, deleteBtn }) => {
    const { id, name, url } = item
    return (
        <>

            <div key={item.id} className="flex py-2 gap-2 flex-1">
                <div className='cursor-move' {...dragHandleProps}>⠿</div>
                <div key={id} className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4 flex-1">
                    <div className='capitalize'>{name}</div>
                    <div>{url}</div>
                    <div>
                        <button
                            onClick={() => editBtn(inx)}
                            className="bg-orange-400 px-3 py-1 text-base block rounded-md text-white cursor-pointer">Edit</button></div>
                    <div>
                        <button
                            onClick={() => deleteBtn(id)}
                            className="bg-red-400 px-3 py-1 text-base block rounded-md text-white cursor-pointer">Delete</button></div>
                </div>
            </div>

        </>
    );
};

export default ListItem
