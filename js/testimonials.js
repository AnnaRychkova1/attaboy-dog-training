// use data and creating list of testimonials
$(document).ready(function () {
  // Fetch achievements and testimonials data from the JSON file
  fetch("testimonials.json")
    .then((response) => response.json())
    .then((data) => {
      // Render achievements using the loaded data
      renderAchievements(data.achievements);

      // Render testimonials using the loaded data
      renderTestimonials(data.testimonials);
      // random picture for .testim-container
      new RandomImageGenerator(
        ["images/main/paw-paw-blue.png", "images/main/paw-paw-red.png"],
        ".testim-container"
      );
    })
    .catch((error) => console.error("Error fetching JSON:", error));
});

// Function for creating the list of achievements
function renderAchievements(achievements) {
  const achievementsList = $(".testim-achievm-list");
  achievements.forEach((achievement) => {
    // create <li> for each achievement
    const li = $("<li></li>").addClass("testim-achievm-item");
    li.html(`
      <figure class="testim-video-figure">
        <video class="testim-video" muted controls>
          <source src="${achievement.videoSrc}" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <figcaption class="testim-video-caption">${achievement.caption}</figcaption>
      </figure>
    `);

    // adding event listeners for playing and pausing the video on hover"
    const video = li.find("video")[0];
    $(video).on("mouseenter", function () {
      video.play();
    });
    $(video).on("mouseleave", function () {
      video.pause();
      video.currentTime = 0;
    });

    // add event listener to show video in full screen on click
    $(video).on("click", function () {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        // Firefox
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        // IE/Edge
        video.msRequestFullscreen();
      }
    });

    // detect when the video enters full-screen mode to unmute and play the video
    $(video).on(
      "fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange",
      function () {
        if (
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement
        ) {
          video.muted = false;
          video.play();
        }
      }
    );

    // adding element <li> to the list
    achievementsList.append(li);
  });
}

// Function for creating the list of testimonials
function renderTestimonials(testimonials) {
  const testimonialsList = $(".testim-custom-list");
  testimonials.forEach((testimonial) => {
    // create <li> for each testimonial
    const li = $("<li></li>").addClass("testim-custom-item");
    li.html(`
      <div class="testim-img-container">
        <img src="${testimonial.imageTestimonial}" alt="${testimonial.altTestimonial}" class="testim-img" data-id="${testimonial.id}" loading="lazy">
      </div>
      <div class="pet">
        <img src="${testimonial.imagePet}" alt="${testimonial.altPet}" class="testim-pet-img visually-hidden" data-id="${testimonial.id}" loading="lazy">
      </div>
    `);

    // Add hover effect to show/hide pet image
    li.find(".testim-img").on("mouseenter", function () {
      li.find(".testim-pet-img").removeClass("visually-hidden");
      li.find(".testim-img").addClass("visually-hidden");
    });

    li.find(".testim-pet-img").on("mouseleave", function () {
      li.find(".testim-pet-img").addClass("visually-hidden");
      li.find(".testim-img").removeClass("visually-hidden");
    });

    li.find(".testim-pet-img").on("click", function () {
      const imageId = $(this).data("id") - 1;
      console.log("img id is", imageId);
      openModal(imageId, testimonials);
    });

    // adding element <li> to the list
    testimonialsList.append(li);
  });
}

// Function for opening the modal window
function openModal(clickedIndex, testimonials) {
  const carouselItems = $("#carouselItems");
  carouselItems.empty();

  // adding all images to the carousel
  testimonials.forEach((testimonial, index) => {
    const activeClass = index === clickedIndex ? "active" : "";

    const carouselItem = `
        <div class="carousel-item ${activeClass}">
          <img src="${testimonial.imageTestimonial}" alt="${testimonial.altTestimonial}" class="d-block w-100" loading="lazy">
           <div class="testim-img-circle-container">
            <img src="${testimonial.imagePet}" alt="${testimonial.altPet}" class="testim-img-circle" loading="lazy">
          </div> 
        </div>       
      `;
    carouselItems.append(carouselItem);
  });

  // open modal window
  $("#imageModal").modal("show");

  // at the start of the animation - make the round image invisible
  $("#carouselTestimonials").on("slide.bs.carousel", function () {
    $(".testim-img-circle").addClass("invisible");
  });

  // when the animation is complete - make the round image visible
  $("#carouselTestimonials").on("slid.bs.carousel", function () {
    $(".carousel-item.active .testim-img-circle").removeClass("invisible");
  });
}
