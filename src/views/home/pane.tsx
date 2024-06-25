import React from 'react';


const Pane: React.FC = () => {
    return (
        <div className="grid grid-rows-[1fr_2fr] z-1 w-full h-full">
            <div className="bg-red-500  grid grid-cols-[1fr_2fr]">
                <div className='bg-gray-700'>

                </div>
                <div className="bg-amber-200 grid grid-cols-2">
                    <div className="bg-green-100"></div>
                    <div className="bg-green-200"></div>
                </div>
            </div>
            <div className="bg-blue-400 grid grid-rows-[1fr_3fr]">
                <div className="bg-amber-700"></div>
                <div className="bg-green-200">

                </div>
            </div>
        </div>
    )
};

export default Pane;
