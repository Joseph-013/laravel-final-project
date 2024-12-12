import ImageSlider from '@/Components/ImageSlider';
import UserLayout from '@/Layouts/UserLayout';
import { Head, Link } from '@inertiajs/react';
import { MapPin } from 'lucide-react';
import { useState } from 'react';

type WelcomeProps = {
    carouselImages: string[];
};

export default function Welcome({ carouselImages }: WelcomeProps) {
    // carouselImages = [
    //     '/storage/carousel/alskdj.png',
    //     '/storage/carousel/ashjkldkjh.jpg',
    //     '/storage/carousel/alkjsduhkajhf.jpg',
    // ];

    const [currentMapUrl, setCurrentMapUrl] = useState(
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15448.025940675976!2d121.03924852293797!3d14.541621703914632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c8f3fa2994af%3A0x89c988af4760e40a!2sFort%20Bonifacio%2C%20Taguig%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1733589385238!5m2!1sen!2sph',
    );

    const mapUrls = {
        bgc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15448.025940675976!2d121.03924852293797!3d14.541621703914632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c8f3fa2994af%3A0x89c988af4760e40a!2sFort%20Bonifacio%2C%20Taguig%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1733589385238!5m2!1sen!2sph',
        tambo: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15448.025940675976!2d120.99074852293797!3d14.522621703914632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c8f3fa2994af%3A0x34c988af4760e40a!2sTambo%2C%20Paranaque%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1733589385239!5m2!1sen!2sph',
        signal: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15448.025940675976!2d121.03424852293797!3d14.534621703914632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c8f3fa2994af%3A0x79c988af4760e40a!2sSignal%2C%20Taguig%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1733589385240!5m2!1sen!2sph',
    };

    return (
        <UserLayout>
            <Head title="Home" />
            <ImageSlider imgSrc={carouselImages} autoScroll startsFrom={1} />
            <section>
                <div className="mt-16 flex flex-col space-y-16 lg:my-32 lg:space-y-32">
                    <div className="flex flex-col items-center space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
                        <div className="w-full lg:w-1/2">
                            <h2 className="text-center text-2xl font-extrabold text-primary sm:text-3xl lg:text-4xl">
                                We charge our sticker paper for every A sheet
                                used. We advise minimizing each sheet as much as
                                possible.
                            </h2>
                            <div className="mt-8 flex justify-center">
                                <Link
                                    href={`${route('products')}#stickers`}
                                    className="rounded-2xl bg-[#FFD700] px-6 py-4 text-xl font-extrabold text-primary shadow-md hover:bg-[#FFD700]/90 sm:text-2xl"
                                >
                                    Show me!
                                </Link>
                            </div>
                        </div>
                        <div className="w-full overflow-hidden rounded-xl lg:w-1/2">
                            <img
                                src="/img/stickers.jpg"
                                alt="Stickers preview"
                                height={400}
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col-reverse items-center space-y-8 space-y-reverse lg:flex-row lg:space-x-8 lg:space-y-0">
                        <div className="w-full overflow-hidden rounded-xl lg:w-1/2">
                            <img
                                src="/img/cupsleeves.jpg"
                                alt="Cup sleeves preview"
                                height={400}
                                className="object-cover"
                            />
                        </div>
                        <div className="w-full lg:w-1/2">
                            <h2 className="text-center text-2xl font-extrabold text-primary sm:text-3xl lg:text-4xl">
                                Want to have your own customized cup sleeves?
                                Message us to know more.
                            </h2>
                            <div className="mt-8 flex justify-center">
                                <Link
                                    href={`${route('products')}#cup-sleeves`}
                                    className="rounded-2xl bg-[#FFD700] px-6 py-4 text-xl font-extrabold text-primary shadow-md hover:bg-[#FFD700]/90 sm:text-2xl"
                                >
                                    Show me!
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="rounded-lg bg-[#E6EEF9] p-4 sm:p-8">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-extrabold text-primary sm:text-3xl">
                            Where are we located?
                        </h2>

                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className="space-y-4">
                                {[
                                    {
                                        name: 'BGC, TAGUIG (UPTOWN AREA)',
                                        url: mapUrls.bgc,
                                    },
                                    {
                                        name: 'TAMBO, PARANAQUE',
                                        url: mapUrls.tambo,
                                    },
                                    {
                                        name: 'CENTRAL SIGNAL, VILLAGE TAGUIG',
                                        url: mapUrls.signal,
                                    },
                                ].map((location, index) => (
                                    <div
                                        key={index}
                                        className="group flex items-center rounded-full bg-[#FFD700] p-4 shadow-md transition-all duration-300 hover:cursor-pointer hover:p-5 sm:p-6 sm:hover:p-7"
                                        onClick={() =>
                                            setCurrentMapUrl(location.url)
                                        }
                                    >
                                        <MapPin className="mr-2 h-6 w-6 text-red-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:h-8 sm:w-8" />
                                        <span className="text-base font-semibold text-primary sm:text-lg">
                                            {location.name}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="h-[300px] overflow-hidden rounded-lg sm:h-[450px]">
                                <iframe
                                    src={currentMapUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>

                        <p className="text-center text-sm font-medium text-primary sm:text-base">
                            WE DON&apos;T HAVE A PHYSICAL STORE. WE&apos;RE AN
                            ONLINE SHOP, PICKUP AND DELIVERY OF ITEMS WILL BE
                            COMING FROM THESE LOCATIONS
                        </p>
                    </div>
                </div>
            </section>
        </UserLayout>
    );
}
