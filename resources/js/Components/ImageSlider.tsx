import {
    IconCaretLeft,
    IconCaretRight,
    IconPointFilled,
} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { ButtonProps } from './ui/button';

interface ImageSliderProps {
    containerProps?: React.HTMLAttributes<HTMLDivElement>;
    imgSrc: string[];
    autoScroll?:
        | {
              duration?: number;
              reverse?: boolean;
          }
        | boolean;
    startsFrom?: number;
}

export default function ImageSlider({
    containerProps,
    imgSrc,
    autoScroll,
    startsFrom = 0,
}: ImageSliderProps) {
    // Normalize parameter/s
    if (autoScroll === true) {
        autoScroll = {
            duration: 7000,
            reverse: false,
        };
    }

    const imgLength = imgSrc.length;

    const [imageIndex, setImageIndex] = useState(startsFrom);

    const nextImage = () => {
        setImageIndex((prev) => {
            if (prev === imgLength - 1) return 0;
            return ++prev;
        });
    };

    const prevImage = () => {
        setImageIndex((prev) => {
            if (prev === 0) return imgLength - 1;
            return --prev;
        });
    };

    const goTo = (index: number) => {
        setImageIndex(index);
    };

    useEffect(() => {
        if (!autoScroll) return;

        const interval = setInterval(() => {
            nextImage();
        }, autoScroll.duration);

        return () => clearInterval(interval);
    });
    return (
        <div
            {...containerProps}
            className={`w-full aspect-[2/1] overflow-clip flex relative ${containerProps?.className}`}
        >
            {imgSrc.map((img) => (
                <img
                    key={img}
                    src={img}
                    className="size-full object-cover flex-grow-0 flex-shrink-0 img-slider-img"
                    style={{ translate: `${-100 * imageIndex}%` }}
                />
            ))}
            <NavigationControls
                leftButtonProps={{ onClick: prevImage }}
                rightButtonProps={{ onClick: nextImage }}
                length={imgLength}
                position={imageIndex}
                jump={goTo}
            />
        </div>
    );
}

function NavigationControls({
    leftButtonProps,
    rightButtonProps,
    length,
    position,
    jump,
}: {
    leftButtonProps: ButtonProps;
    rightButtonProps: ButtonProps;
    length: number;
    position: number;
    jump: (index: number) => void;
}) {
    const commonDivClassName = 'py-7 px-2 bg-black';
    const commonClassName =
        'absolute w-16 flex justify-center items-center opacity-30 hover:opacity-50 transition-all';
    const commonIconProps = { size: 24, fill: 'white', color: 'white' };

    return (
        <>
            <button
                className={`${commonClassName} top-0 bottom-0 left-0`}
                {...leftButtonProps}
            >
                <div className={commonDivClassName}>
                    <IconCaretLeft {...commonIconProps} />
                </div>
            </button>
            <button
                className={`${commonClassName} top-0 bottom-0 right-0`}
                {...rightButtonProps}
            >
                <div className={commonDivClassName}>
                    <IconCaretRight {...commonIconProps} />
                </div>
            </button>
            <div className="absolute bottom-2 hidden sm:flex inset-x-0 justify-center">
                {Array.from({ length }).map((_, index) => {
                    const active = index === position;
                    return (
                        <button
                            key={index}
                            onClick={() => jump(index)}
                            className="hover:bg-white/30 rounded-full hover:outline hover:outline-1 hover:outline-[#0C4EA3]/50"
                        >
                            <IconPointFilled
                                fill={active ? '#0C4EA3' : 'white'}
                                opacity={active ? undefined : '70%'}
                            />
                        </button>
                    );
                })}
            </div>
        </>
    );
}
