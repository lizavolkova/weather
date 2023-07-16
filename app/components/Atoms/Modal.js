import React, { useEffect } from "react";

const Modal = ({ children, header, showModal, setShowModal}) => {
    useEffect(() => {
        document.body.style.overflowY = showModal ? "hidden" : "scroll";
    });

    return (
        <>
            <div className={`${showModal ? "visible z-20" : "-z-10 hidden"} fixed inset-0 bottom-0  flex h-auto items-center justify-center`}>
                <div className="fixed inset-0">
                    <div
                        className="absolute inset-0 h-full w-full bg-gray-500 opacity-75"
                        onClick={() => setShowModal(false)}
                    ></div>
                </div>
                <div className={`fixed flex flex-col items-center bg-white px-4 py-0 transition-opacity absolute md:static top-0 md:top-auto md:pb-8 w-full md:w-[50%] z-10 ${showModal ? "opacity-100" : "opacity-0"}`}>
                    <div className="flex border-b-2 border-slate-300 w-full py-2 my-2 justify-between">
                        <div className="text-black font-bold">{header}</div>

                        <div className="cursor-pointer text-black" onClick={() => setShowModal(false)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-8 w-8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </div>
                    </div>


                    <div className="text-black">{children}</div>
                </div>
            </div>

        </>
    );
};
export default Modal;
