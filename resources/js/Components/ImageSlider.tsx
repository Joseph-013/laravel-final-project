import React from 'react';

interface ImageSliderProps {
    containerProps?: React.HTMLAttributes<HTMLDivElement>;
}

export default function ImageSlider({ containerProps }: ImageSliderProps) {
    return (
        <div
            {...containerProps}
            className={`h-[30rem] w-full ${containerProps?.className}`}
        >
            Slider
        </div>
    );
}
