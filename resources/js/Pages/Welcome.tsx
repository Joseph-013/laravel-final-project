import ImageSlider from '@/Components/ImageSlider';
import Line from '@/Components/Line';
import { Button } from '@/Components/ui/button';
import GuestLayout from '@/Layouts/GuestLayout';
import { MapPin } from 'lucide-react';
import { useState } from 'react';

type WelcomeProps = {
    carouselImages: string[];
};

export default function Welcome({ carouselImages }: WelcomeProps) {
    carouselImages = [
        '/storage/carousel/alskdj.png',
        '/storage/carousel/ashjkldkjh.jpg',
        '/storage/carousel/alkjsduhkajhf.jpg',
    ];

    const [currentMapUrl, setCurrentMapUrl] = useState(
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15448.025940675976!2d121.03924852293797!3d14.541621703914632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c8f3fa2994af%3A0x89c988af4760e40a!2sFort%20Bonifacio%2C%20Taguig%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1733589385238!5m2!1sen!2sph',
    );

    const mapUrls = {
        bgc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15448.025940675976!2d121.03924852293797!3d14.541621703914632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c8f3fa2994af%3A0x89c988af4760e40a!2sFort%20Bonifacio%2C%20Taguig%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1733589385238!5m2!1sen!2sph',
        tambo: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15448.025940675976!2d120.99074852293797!3d14.522621703914632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c8f3fa2994af%3A0x34c988af4760e40a!2sTambo%2C%20Paranaque%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1733589385239!5m2!1sen!2sph',
        signal: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15448.025940675976!2d121.03424852293797!3d14.534621703914632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c8f3fa2994af%3A0x79c988af4760e40a!2sSignal%2C%20Taguig%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1733589385240!5m2!1sen!2sph',
    };

    return (
        <GuestLayout>
            <ImageSlider
                containerProps={{ className: 'o' }}
                imgSrc={carouselImages}
                autoScroll
                startsFrom={1}
            />
            <section>
                {/* <h2 className="my-10 justify-center text-center text-4xl font-extrabold text-[#0047AB]">
                    Stickers!
                </h2> */}
                <div className="mx-auto mb-8 mt-32 flex w-full flex-row items-center space-x-8">
                    <div className="w-1/2">
                        <p className="text-center text-4xl font-extrabold text-primary">
                            We charge our sticker paper for every A sheet used.
                            We advise minimizing each sheet as much as possible.
                        </p>

                        <div className="mt-4 flex justify-center py-10">
                            <button className="rounded-2xl bg-[#FFD700] px-6 py-4 text-2xl font-extrabold text-primary shadow-md hover:bg-[#FFD700]/90">
                                Show me!
                            </button>
                        </div>
                    </div>

                    <div className="ml-auto w-1/2 overflow-hidden rounded-xl">
                        <img
                            src="/img/stickers.jpg"
                            alt="Stickers preview"
                            className="w-[100%]"
                        />
                    </div>
                </div>
                <div className="mx-auto mb-32 flex w-full flex-row items-center space-x-8">
                    <div className="ml-auto w-1/2 overflow-hidden rounded-xl">
                        <img
                            src="/img/cupsleeves.jpg"
                            alt="Stickers preview"
                            className="w-[100%]"
                        />
                    </div>
                    <div className="w-1/2">
                        <p className="text-center text-4xl font-extrabold text-primary">
                            Want to have your own customized cup sleeves?
                            message us to know more.
                        </p>

                        <div className="mt-4 flex justify-center py-10">
                            <button className="rounded-2xl bg-[#FFD700] px-6 py-4 text-2xl font-extrabold text-primary shadow-md hover:bg-[#FFD700]/90">
                                Show me!
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="mx-auto w-full rounded-lg bg-[#E6EEF9] p-8">
                    <div className="space-y-4">
                        <h2 className="mb-4 text-2xl font-extrabold text-primary">
                            Where are we located?
                        </h2>

                        <div className="flex flex-row space-x-4">
                            <div className="flex w-1/2 flex-col space-y-7">
                                <div
                                    className="group flex items-center rounded-full bg-[#FFD700] p-6 shadow-md duration-300 hover:cursor-pointer hover:p-8"
                                    onClick={() =>
                                        setCurrentMapUrl(mapUrls.bgc)
                                    }
                                >
                                    <MapPin className="mr-2 h-10 w-10 text-red-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    <span className="text-lg font-semibold text-primary">
                                        BGC, TAGUIG (UPTOWN AREA)
                                    </span>
                                </div>

                                <div
                                    className="group flex items-center rounded-full bg-[#FFD700] p-6 shadow-md duration-300 hover:cursor-pointer hover:p-8"
                                    onClick={() =>
                                        setCurrentMapUrl(mapUrls.tambo)
                                    }
                                >
                                    <MapPin className="mr-2 h-10 w-10 text-red-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    <span className="text-lg font-semibold text-primary">
                                        TAMBO, PARANAQUE
                                    </span>
                                </div>

                                <div
                                    className="group flex items-center rounded-full bg-[#FFD700] p-6 shadow-md duration-300 hover:cursor-pointer hover:p-8"
                                    onClick={() =>
                                        setCurrentMapUrl(mapUrls.signal)
                                    }
                                >
                                    <MapPin className="mr-2 h-10 w-10 text-red-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    <span className="text-lg font-semibold text-primary">
                                        CENTRAL SIGNAL, VILLAGE TAGUIG
                                    </span>
                                </div>
                            </div>

                            <div className="w-1/2 overflow-hidden rounded-lg">
                                <iframe
                                    src={currentMapUrl}
                                    width="100%"
                                    height="450"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>

                        <p className="mt-6 text-center font-medium text-primary">
                            WE DON&apos;T HAVE A PHYSICAL STORE. WE&apos;RE AN
                            ONLINE SHOP, PICKUP AND DELIVERY OF ITEMS WILL BE
                            COMING FROM THESE LOCATIONS
                        </p>
                    </div>
                </div>
            </section>
            <Line variant={'h'} className="my-2" />
            Custom components:
            <br />
            <br />
            <Button>Button</Button>
        </GuestLayout>
    );
}
