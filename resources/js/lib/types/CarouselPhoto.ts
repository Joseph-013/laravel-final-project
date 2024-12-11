import { Timestamps } from './Timestamps';

export type CarouselPhoto = {
    carouselID: string;
    photoLink: string;
    title: string;
} & Timestamps;
