// import Image from "next/image";

// export default function Footer() {
//   return (
//     <footer>
//       <div className="container footer-container">
//         <div className="footer-left">
//           <a
//             href="https://www.instagram.com/attaboy_dogtraining/"
//             className="instagram-link"
//             target="_blank"
//             rel="nofollow"
//           >
//             <Image
//               src="/Instagram_icon.png"
//               alt="Link to Attaboy Dog Training Instagram page"
//               width={200}
//               height={200}
//               className="instagram-img"
//               loading="lazy"
//             />
//           </a>
//         </div>
//         <div className="footer-right">
//           <ul className="footer-list">
//             <li>
//               <a href="#testimonials" className="footer-link">
//                 Testimonials
//               </a>
//             </li>
//             <li>
//               <a href="#services" className="footer-link">
//                 Services
//               </a>
//             </li>
//             <li>
//               <a href="#contacts" className="footer-link">
//                 Contacts
//               </a>
//             </li>
//             <li>
//               <a href="#about" className="footer-link">
//                 About
//               </a>
//             </li>
//           </ul>
//           <div>
//             <span>&copy; 2024 Attaboy Dog Training. All rights reserved.</span>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="text-white py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between md:items-center gap-6 px-6">
        <a
          href="https://www.instagram.com/attaboy_dogtraining/"
          target="_blank"
          rel="nofollow"
          className="transition hover:shadow-[0_0_20px_rgba(185,197,233,0.5)] focus:shadow-[0_0_20px_rgba(185,197,233,0.5)] px-4"
        >
          <Image
            src="/Instagram_icon.png"
            alt="Link to Attaboy Dog Training Instagram page"
            width={64}
            height={64}
            className="w-[46px] sm:w-[64px]"
            loading="lazy"
          />
        </a>
        <div className="flex flex-col md:items-end gap-6 md:pr-20 px-4 md:px-0">
          <ul className="flex flex-col md:flex-row gap-6 text-xl font-medium list-none p-0 m-0">
            <li>
              <a
                href="#testimonials"
                className="transition text-white hover:text-pink-400 hover:drop-shadow-[2px_2px_4px_rgba(246,92,115,0.9)]"
              >
                Testimonials
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="transition text-white hover:text-pink-400 hover:drop-shadow-[2px_2px_4px_rgba(246,92,115,0.9)]"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#contacts"
                className="transition text-white hover:text-pink-400 hover:drop-shadow-[2px_2px_4px_rgba(246,92,115,0.9)]"
              >
                Contacts
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="transition text-white hover:text-pink-400 hover:drop-shadow-[2px_2px_4px_rgba(246,92,115,0.9)]"
              >
                About
              </a>
            </li>
          </ul>
          <span className="text-sm text-white/80 md:text-end">
            &copy; 2024 Attaboy Dog Training. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
