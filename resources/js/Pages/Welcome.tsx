import ImageSlider from '@/Components/ImageSlider';
import Line from '@/Components/Line';
import { Button } from '@/Components/ui/button';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Welcome() {
    return (
        <GuestLayout>
            <ImageSlider containerProps={{ className: 'o' }} />
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae
            recusandae officia cumque eaque, rem quasi culpa natus odio dicta,
            ipsum qui? Provident totam sed enim blanditiis explicabo sit ipsam
            beatae.
            <br />
            <br />
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae
            recusandae officia cumque eaque, rem quasi culpa natus odio dicta,
            ipsum qui? Provident totam sed enim blanditiis explicabo sit ipsam
            beatae.
            <Line variant={'h'} className="my-2" />
            Custom components:
            <br />
            <br />
            <Button>Button</Button>
        </GuestLayout>
    );
}
