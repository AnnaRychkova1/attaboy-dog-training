export default function Services() {
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
            <li className="service-item">
              <figure className="services-figure">
                <picture>
                  <source srcSet="/images/services1.webp" type="image/webp" />
                  <img
                    src="/images/services1.jpg"
                    alt="Puppy Training"
                    className="services-img"
                    loading="lazy"
                  />
                </picture>
              </figure>
              <div className="p-6">
                <h3 className="services-subtitle text-[var(--accent-color)]">
                  Puppy Training
                </h3>
                <p className="services-text">
                  Three&ndash;week basic obedience course for puppies under six
                  months. This will take place in your home and surrounding area
                  once a week for three weeks. Each session will be 60-90mins.
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
              </div>
            </li>
            <li className="service-item">
              <figure className="services-figure">
                <picture>
                  <source srcSet="/images/services2.webp" type="image/webp" />
                  <img
                    src="/images/services2.jpg"
                    alt="Basic Obedience Training"
                    className="services-img"
                    loading="lazy"
                  />
                </picture>
              </figure>
              <div className="p-6">
                <h3 className="services-subtitle text-[var(--accent-color)]">
                  Basic Obedience Training
                </h3>
                <p className="services-text">
                  Suitable for dogs of all ages, this programme covers essential
                  commands and lays the groundwork for a well&ndash;behaved
                  family dog.
                </p>
                <p className="services-text services-text-br">
                  The course will cover:
                </p>
                <ul className="service-sublist list-disc ml-6 mb-3">
                  <li>Teaching proper leash manners and loose-lead walking.</li>
                  <li>
                    Reliable recall techniques for better off&ndash;lead
                    control.
                  </li>
                  <li>Sit, stay, down, and leave&ndash;it commands.</li>
                  <li>
                    Tackling nuisance behaviours like jumping, barking, and
                    chewing.
                  </li>
                </ul>
                <p className="services-text">
                  Tailored to fit your lifestyle, we work in your home and
                  around the area at a time that suits you.
                </p>
              </div>
            </li>
            <li className="service-item">
              <figure className="services-figure">
                <picture>
                  <source srcSet="/images/services3.webp" type="image/webp" />
                  <img
                    src="/images/services3.jpg"
                    alt="Behaviour Modification"
                    className="services-img"
                    loading="lazy"
                  />
                </picture>
              </figure>
              <div className="p-6">
                <h3 className="services-subtitle text-[var(--accent-color)]">
                  Behaviour Modification
                </h3>
                <p className="services-text">
                  Overcome reactivity, anxiety, or problem behaviours with
                  one&ndash;to&ndash;one personalised plans.
                </p>
                <p className="services-text services-text-br">
                  The course will cover:
                </p>
                <ul className="service-sublist list-disc ml-6 mb-3">
                  <li>
                    In&ndash;depth assessments to get to the root of the
                    problem.
                  </li>
                  <li>
                    Training strategies to reduce reactivity and build
                    confidence.
                  </li>
                  <li>
                    Desensitisation techniques for triggers like noises or other
                    dogs.
                  </li>
                  <li>
                    Step&ndash;by&ndash;step support to create lasting
                    behavioural change.
                  </li>
                  <li>
                    Ongoing guidance to track progress and adjust as needed.
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
