import { IconCaretLeft, IconCaretRight } from '@tabler/icons-react';
import React from 'react';
import { ButtonProps } from './ui/button';

interface ImageSliderProps {
    containerProps?: React.HTMLAttributes<HTMLDivElement>;
    imgSrc: string[];
}

export default function ImageSlider({
    containerProps,
    imgSrc,
}: ImageSliderProps) {
    const imgLength = imgSrc.length;
    return (
        <div
            {...containerProps}
            className={`w-full aspect-[2/1] overflow-clip flex relative ${containerProps?.className}`}
        >
            {imgSrc.map((img) => (
                <img
                    key={img}
                    src={img}
                    className="size-full object-cover flex-grow-0 flex-shrink-0"
                />
            ))}
            <NavigationButtons
                leftButtonProps={{ onClick: () => null }}
                rightButtonProps={{ onClick: () => null }}
            />
        </div>
    );
}

function NavigationButtons({
    leftButtonProps,
    rightButtonProps,
}: {
    leftButtonProps: ButtonProps;
    rightButtonProps: ButtonProps;
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
        </>
    );
}
