import Image from "next/image";

export default function Footer() {
  return (
    <footer className="text-white py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between md:items-center gap-6 px-6">
        <a
          href="https://www.instagram.com/attaboy_dogtraining/"
          target="_blank"
          rel="nofollow"
          className="px-4"
        >
          <Image
            src="/Instagram_icon.png"
            alt="Link to Attaboy Dog Training Instagram page"
            width={64}
            height={64}
            className="w-[46px] md:w-[64px] transition hover:shadow-[0_0_20px_rgba(185,197,233,0.5)] focus:shadow-[0_0_20px_rgba(185,197,233,0.5)] "
            loading="lazy"
          />
        </a>
        <div className="flex flex-col md:items-end gap-4 md:gap-6  md:pr-20 px-4 md:px-0">
          <ul className="flex flex-col md:flex-row gap-4 md:gap-6 text-lg 2xl:text-2xl font-medium list-none p-0 m-0">
            <li>
              <a
                href="#testimonials"
                className="text-white hover:text-[var(--accent-color)] hover:drop-shadow-[0_2px_4px_rgba(246,92,115,0.7)] transition"
              >
                Testimonials
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="text-white hover:text-[var(--accent-color)] hover:drop-shadow-[0_2px_4px_rgba(246,92,115,0.7)] transition"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#contacts"
                className="text-white hover:text-[var(--accent-color)] hover:drop-shadow-[0_2px_4px_rgba(246,92,115,0.7)] transition"
              >
                Contacts
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="text-white hover:text-[var(--accent-color)] hover:drop-shadow-[0_2px_4px_rgba(246,92,115,0.7)] transition"
              >
                About
              </a>
            </li>
          </ul>
          <span className="text-sm 2xl:text-lg text-white/80 md:text-end">
            &copy; 2024 Attaboy Dog Training. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
