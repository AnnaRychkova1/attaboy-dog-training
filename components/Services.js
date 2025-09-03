"use client";

import { useState, useEffect } from "react";

export default function Services() {
  const [expanded, setExpanded] = useState([]);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const services = [
    {
      id: 1,
      title: "Puppy Training",
      image: "/images/services1.jpg",
      imageWebp: "/images/services1.webp",
      content: (
        <>
          <p className="services-text">
            Three&ndash;week basic obedience course for puppies under six
            months...
          </p>
          <p className="services-text services-text-br">
            The course will cover:
          </p>
          <ul className="service-sublist list-disc ml-6 mb-3">
            <li>Focus & Attention</li>
            <li>Toilet training</li>
            <li>Crate training</li>
            <li>Go to &ldquo;Bed&rdquo;</li>
            <li>Sit &ndash; Down &ndash; Stay</li>
            <li>Recall</li>
            <li>Leave it</li>
            <li>Leash manners</li>
          </ul>
        </>
      ),
    },
    {
      id: 2,
      title: "Basic Obedience Training",
      image: "/images/services2.jpg",
      imageWebp: "/images/services2.webp",
      content: (
        <>
          <p className="services-text">
            Suitable for dogs of all ages, this programme covers essential
            commands...
          </p>
          <p className="services-text services-text-br">
            The course will cover:
          </p>
          <ul className="service-sublist list-disc ml-6 mb-3">
            <li>Teaching proper leash manners</li>
            <li>Reliable recall techniques</li>
            <li>Sit, stay, down, leave&ndash;it</li>
            <li>Nuisance behaviours like jumping, barking</li>
          </ul>
          <p className="services-text">Tailored to fit your lifestyle...</p>
        </>
      ),
    },
    {
      id: 3,
      title: "Behaviour Modification",
      image: "/images/services3.jpg",
      imageWebp: "/images/services3.webp",
      content: (
        <>
          <p className="services-text">
            Overcome reactivity, anxiety, or problem behaviours...
          </p>
          <p className="services-text services-text-br">
            The course will cover:
          </p>
          <ul className="service-sublist list-disc ml-6 mb-3">
            <li>In-depth assessments</li>
            <li>Training strategies to reduce reactivity</li>
            <li>Desensitisation techniques</li>
            <li>Step&ndash;by&ndash;step support</li>
            <li>Ongoing guidance</li>
          </ul>
        </>
      ),
    },
  ];

  const toggleExpand = (id) => {
    if (!isDesktop) {
      setExpanded((prev) => (prev.includes(id) ? prev : [...prev, id]));
    }
  };

  return (
    <>
      <section id="services">
        <div className="container services-container">
          <h2 className="services-title">Services</h2>
          <a href="#contacts" className="anhor-link h-10">
            <button className="anhor-btn">Book Now</button>
          </a>
        </div>
      </section>
      <section>
        <div className="container services-info">
          <ul className="service-list">
            {services.map((service) => {
              const isExpanded = isDesktop || expanded.includes(service.id);
              return (
                <li key={service.id} className="service-item">
                  <div
                    className="cursor-pointer md:cursor-default"
                    onClick={() => toggleExpand(service.id)}
                  >
                    <figure className="services-figure">
                      <picture>
                        <source srcSet={service.imageWebp} type="image/webp" />
                        <img
                          src={service.image}
                          alt={`${service.title} in Dublin, Ireland`}
                          className="services-img"
                          loading="lazy"
                        />
                      </picture>
                    </figure>
                    <h3 className="services-subtitle text-[var(--accent-color)] m-4 text-center">
                      {isExpanded ? (
                        <a
                          href="#contacts"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpanded([]);
                          }}
                          className="underline md:no-underline md:hover:underline  hover:drop-shadow-[0_2px_4px_rgba(246,92,115,0.3)] active:underline active:drop-shadow-[0_2px_4px_rgba(246,92,115,0.3)] transition-all duration-300"
                        >
                          {service.title}
                        </a>
                      ) : (
                        <>{service.title}</>
                      )}
                    </h3>
                  </div>
                  {/* Desktop view: always show; Mobile view: toggle */}
                  <div
                    className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${
                      isExpanded ? "max-h-[1000px] pb-6 pt-0" : "max-h-0"
                    } md:block`}
                  >
                    {service.content}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
