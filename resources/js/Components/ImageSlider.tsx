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

    const imgLength = imgSrc?.length;

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

    if (!imgLength) return <></>;
    else
        return (
            <div
                {...containerProps}
                className={`relative flex aspect-[2/1] w-full overflow-clip ${containerProps?.className}`}
            >
                {imgSrc.map((img) => (
                    <img
                        key={img}
                        src={img}
                        className="img-slider-img size-full flex-shrink-0 flex-grow-0 object-cover"
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
                className={`${commonClassName} bottom-0 left-0 top-0`}
                {...leftButtonProps}
            >
                <div className={commonDivClassName}>
                    <IconCaretLeft {...commonIconProps} />
                </div>
            </button>
            <button
                className={`${commonClassName} bottom-0 right-0 top-0`}
                {...rightButtonProps}
            >
                <div className={commonDivClassName}>
                    <IconCaretRight {...commonIconProps} />
                </div>
            </button>
            <div className="absolute inset-x-0 bottom-2 hidden justify-center sm:flex">
                {Array.from({ length }).map((_, index) => {
                    const active = index === position;
                    return (
                        <button
                            key={index}
                            onClick={() => jump(index)}
                            className="rounded-full hover:bg-white/30 hover:outline hover:outline-1 hover:outline-[#0C4EA3]/50"
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
