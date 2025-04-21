import Image from 'next/image';
// import Logo from './public/next.svg';
import Link from 'next/link';

export default function FullLogo() {
    // console.log('FullLogo', Logo);
    return (
        // <Link href="/">
        <Image src='/logo.svg' alt="Logo" width={200} height={50} className="h-10 w-auto" />
        // </Link>
    )
}