import React from 'react';


const Pane: React.FC = () => {
    return (
        <div className="grid grid-rows-[1fr_2fr] z-1 w-full h-full">
            <div className="bg-red-500  grid grid-cols-[1fr_2fr]">
                <div className='bg-gray-700 min-w-[200px]'>
                    <div className={"flex items-center justify-around pt-[20px] pb-[5px] border-b-2 border-black"}>
                        <span>
                            <img src={"/"}
                                 className={"rounded-full object-cover object-center  w-[100px] h-[100px] bg-green-400"}
                                 alt={"error"}>
                            </img>
                        </span>
                        <span className={"flex flex-col items-left"}>
                            <span className={"flex gap-x-[20px]"}>
                                <span>
                                    姓名
                                </span>
                                <span>
                                    李安
                                </span>
                            </span>
                            <span className={"flex gap-x-[20px]"}>
                                <span>
                                    年龄
                                </span>
                                <span>
                                    20
                                </span>
                            </span>
                        </span>
                    </div>
                    <div className={"flex items-center justify-center"}>
                        <table className={"border-separate border-spacing-[20px]"}>
                            <tbody>
                            <tr>
                                <td>
                                    <span>
                                        学号
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        16608278954
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <span>
                                        手机号
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        16608278954
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>
                                        班级
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        计算机科学与技术212
                                    </span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
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
