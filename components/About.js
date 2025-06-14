export default function About() {
  return (
    <section id="about" className="pt-16 pb-8">
      <div className="container about-container mx-auto">
        <div className="about-wrapper flex gap-12">
          <div className="about-left">
            <figure className="about-figure">
              <picture>
                <source srcSet="/images/about.webp" type="image/webp" />
                <img
                  src="/images/about.jpg"
                  alt="Mattias with his dog"
                  className="about-img"
                  loading="lazy"
                />
              </picture>
            </figure>
          </div>
          <div className="about-right">
            <h2 className="about-title text-3xl font-bold">
              Hi, I&rsquo;m Mattias
            </h2>
            <p className="about-text">
              My journey into dog training began when I rescued my dog, Naoise,
              from the Bronx in New York City. She came into my life with her
              fair share of challenges, but through patience, understanding, and
              proper training, we built a strong bond. This experience sparked
              my passion for helping dogs and their owners to find the same
              connection.
            </p>
            <p className="about-text">
              I graduated from Animal Behaviour College as a certified dog
              trainer where I gained a solid foundation in understanding and
              working with dogs. Over the years, I&rsquo;ve worked alongside
              some of the best dog trainers in New York and volunteered with
              animal shelters across the city, gaining valuable hands-on
              experience with dogs of all shapes, sizes, and temperaments.
            </p>
            <p className="about-text about-text-last">
              After years of education and experience abroad, I returned to
              Ireland to set up my own dog training venture. My goal is to offer
              personalised, compassionate, and effective training that helps
              both dogs and their families thrive. Whether you&rsquo;re looking
              to overcome behavioural challenges or simply build a stronger bond
              with your dog, I&rsquo;d love to help you get there.
            </p>
          </div>
        </div>
        <a href="#contacts" className="anhor-link h-10">
          <button className="anhor-btn">Contact</button>
        </a>
      </div>
    </section>
  );
}
