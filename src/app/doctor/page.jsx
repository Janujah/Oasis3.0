import Image from "next/image";
// import '../css/oasis.css'
import Navbar from "@/Components/navbar";
import Doctor from '@/Components/doctorShow'
// import About from '@/Components/ourService'
// import ContactUs from '@/Components/contactUs'

export default function Home() {
  return (
    <main>
        <Navbar/>
        <Doctor/>
        {/* <About/> */}
        {/* <ContactUs/> */}
    </main>
  );
}
