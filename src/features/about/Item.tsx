import React from "react";

export const Item = () => {
    return (
        <section className="w-full flex flex-col gap-[0.5rem]">
            <h2 className="font-medium font-gilroy text-[1rem] leading-[1.5] font-medium">
                09 февраля 2026
            </h2>
            <a
                className="text-white group w-full flex transition-colors duration-300"
                href="https://example.com/match/123"
                target="_blank"
                rel="noreferrer">
                <div className="overflow-hidden w-full p-4 flex justify-between gap-[1.17rem] transition-colors duration-200 group-hover:bg-[#171717] bg-[#000000] rounded-[0.66rem]">
                    <div className="min-w-0 w-full flex flex-col gap-[0.35rem]">
                        <div className="w-full flex flex-col gap-[0.5rem]">
                            <div className="w-full flex items-center justify-between gap-[0.5rem]">
                                <div className="min-w-0 w-full text-nowrap flex items-center gap-[0.5rem]">
                                    <div className="relative min-w-[1.4rem] min-h-[1.4rem] max-w-[1.4rem] max-h-[1.4rem] overflow-hidden flex justify-center items-center">
                                        <img
                                            src="https://via.placeholder.com/24"
                                            alt="teamLogo"
                                            className="h-full w-full object-cover"
                                            draggable="false"
                                        />
                                    </div>
                                    <p className="overflow-hidden inline-block font-bold whitespace-nowrap text-ellipsis leading-[1.33rem]">
                                        Team Home
                                    </p>
                                </div>
                                <div className="w-[3rem] flex justify-center items-center gap-[1rem]">
                                    <h2 className="basis-1/2 font-bold text-center leading-[1.33rem] font-gilroy text-[1rem]">
                                        2
                                    </h2>
                                    <h2 className="basis-1/2 font-bold text-[#FF8B00CC] text-center leading-[1.33rem] font-gilroy text-[1rem]">
                                        16
                                    </h2>
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-between gap-[0.5rem]">
                                <div className="min-w-0 w-full text-nowrap flex items-center gap-[0.5rem]">
                                    <div className="relative min-w-[1.4rem] min-h-[1.4rem] max-w-[1.4rem] max-h-[1.4rem] overflow-hidden flex justify-center items-center">
                                        <img
                                            src="https://via.placeholder.com/24"
                                            alt="teamLogo"
                                            className="h-full w-full object-cover"
                                            draggable="false"
                                        />
                                    </div>
                                    <p className="overflow-hidden inline-block font-bold whitespace-nowrap text-ellipsis leading-[1.33rem]">
                                        Team Away
                                    </p>
                                </div>
                                <div className="w-[3rem] flex justify-center items-center gap-[1rem]">
                                    <h2 className="basis-1/2 font-bold text-center leading-[1.33rem] font-gilroy text-[1rem]">
                                        1
                                    </h2>
                                    <h2 className="basis-1/2 font-bold text-[#FF8B00CC] text-center leading-[1.33rem] font-gilroy text-[1rem]">
                                        14
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center text-[0.8rem]">
                            <div className="pl-[0.5rem] flex items-center gap-[1rem]">
                                <div className="w-[0.35rem] h-[0.35rem] rounded-full bg-[#FF0025]"></div>
                                <span className="text-[#A1A1AA]">LIVE</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-[0.3rem]">
                        <div className="bg-[#27272A] rounded-[0.66rem] relative h-[5rem] aspect-square overflow-hidden group-hover:bg-[#3F3F46] transition-colors duration-300">
                            <div className="relative z-10 w-full min-h-full flex flex-col justify-center items-center gap-[0.5rem]">
                                <span className="font-gilroy text-[#A1A1AA] leading-[1.33rem]">
                                    П1
                                </span>
                                <h2 className="font-gilroy text-[1.17rem] leading-[1rem] font-bold leading-[1.67rem]">
                                    2.45
                                </h2>
                            </div>
                            <div className="absolute z-0 bottom-0 w-full h-0.75 rounded-t-[0.3rem] transition-[colors,box-shadow] bg-[#F8E800]"></div>
                        </div>

                        <div className="bg-[#27272A] rounded-[0.66rem] relative h-[5rem] aspect-square overflow-hidden group-hover:bg-[#3F3F46] transition-colors duration-300">
                            <div className="relative z-10 w-full min-h-full flex flex-col justify-center items-center gap-[0.5rem]">
                                <span className="font-gilroy text-[#A1A1AA] leading-[1.33rem]">
                                    П2
                                </span>
                                <h2 className="font-gilroy text-[1.17rem] leading-[1rem] font-bold leading-[1.67rem]">
                                    2.45
                                </h2>
                            </div>
                            <div className="absolute z-0 bottom-0 w-full h-0.75 rounded-t-[0.3rem] transition-[colors,box-shadow] bg-[#F8E800]"></div>
                        </div>
                    </div>
                </div>
            </a>
        </section>
    );
};
