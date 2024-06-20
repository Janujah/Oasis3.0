import Image from "next/image";
import '../../css/oasis.css'
import Navbar from "@/Components/navbar";
// import Landing from '@/Components/home'
// import About from '@/Components/ourService'
import ContactUs from '@/Components/profile'

export default function Home() {
  return (
    <main>
        <Navbar/>
        {/* <Landing/> */}
        {/* <About/> */}
        <ContactUs/>
    </main>
  );
}
