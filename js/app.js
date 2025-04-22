document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".mySwiper", {
    loop: true, // Enables wraparound behavior

    spaceBetween: 20, // Space between slides
    centeredSlides: true, // Center the active slide
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      stretch: -10,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  const splashScreen = document.getElementById("splash-screen");

  // Hide the splash screen after 2 seconds
  setTimeout(() => {
    splashScreen.style.display = "none";
  }, 2000);

  const splashScreen1 = document.getElementById("splash-screen");
  const splashScreen2 = document.getElementById("splash-screen-2");

  // Show the first splash screen for 2 seconds
  setTimeout(() => {
    splashScreen1.style.display = "none"; // Hide the first splash screen
    splashScreen2.style.display = "flex"; // Show the second splash screen

    // Show the second splash screen for 2 seconds
    setTimeout(() => {
      splashScreen2.style.display = "none"; // Hide the second splash screen
    }, 2000);
  }, 2000);
});

$(document).ready(function () {
  // Initialize the slider
  $(".slider").click({
    autoplay: true,
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: "linear",
  });

  let currentIndex = 0;
  const slides = $(".slide");
  const totalSlides = slides.length;

  function showSlide(index) {
    const offset = -index * 100;
    $(".slides").css("transform", `translateX(${offset}%)`);
  }

  $(".next").click(function () {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  });

  $(".prev").click(function () {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
  });

  // Function to get user's location
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      $("#location").text("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    $("#location").text(
      "Latitude: " +
        position.coords.latitude +
        ", Longitude: " +
        position.coords.longitude
    );
  }

  // Call the function to get location on page load
  getLocation();

  // Notification icon click event
  $("#notification-icon").on("click", function () {
    alert("You have new notifications!");
  });

  // Simulate location fetching
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const { latitude, longitude } = position.coords;
        $("#location-display").text(
          `Location: ${latitude.toFixed(2)}, ${longitude.toFixed(2)}`
        );
      },
      function (error) {
        // Handle errors
        switch (error.code) {
          case error.PERMISSION_DENIED:
            $("#location-display").text("Permission denied for location.");
            break;
          case error.POSITION_UNAVAILABLE:
            $("#location-display").text("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            $("#location-display").text(
              "The request to get location timed out."
            );
            break;
          default:
            $("#location-display").text("An unknown error occurred.");
        }
      }
    );
  } else {
    $("#location-display").text(
      "Geolocation is not supported by this browser."
    );
  }

  $(".nav-btn").on("click", function () {
    // Remove active class and reset icons for all buttons except the heart button
    $(".nav-btn")
      .not(".heart-btn")
      .each(function () {
        $(this).removeClass("active");
        const icon = $(this).find("i");
        const outlinedIcon = icon.attr("class").replace("-fill", ""); // Replace filled icon with outlined
        icon.attr("class", outlinedIcon);
      });

    // Add active class to the clicked button and replace its icon with the filled version
    $(this).addClass("active");
    const icon = $(this).find("i");
    const filledIcon = icon
      .attr("class")
      .replace("bi-", "bi-")
      .replace(/$/, "-fill"); // Add '-fill' to the icon class
    icon.attr("class", filledIcon);
  });
});

$(document).ready(function () {
  // Simulate location fetching
  if (navigator.geolocation) {
    console.log("Geolocation is supported");

    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log("Location fetched successfully", position);

        const { latitude, longitude } = position.coords;
        $("#location-display").text(
          ` ${latitude.toFixed(2)}, ${longitude.toFixed(2)}`
        );
        console.log(latitude, longitude);
      },
      function (error) {
        // Handle errors
        console.log(error);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            $("#location-display").text("Permission denied for location.");
            break;
          case error.POSITION_UNAVAILABLE:
            $("#location-display").text("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            $("#location-display").text(
              "The request to get location timed out."
            );
            break;
          default:
            $("#location-display").text("An unknown error occurred.");
        }
      }
    );
  } else {
    $("#location-display").text(
      "Geolocation is not supported by this browser."
    );
  }
});

function navigateToDesign(page) {
  if (page) {
    window.location.href = page; // Redirect to the selected design version
  }
}
