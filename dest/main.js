// ===== Reuseable Function =====
function bodyScroll() {
  document.querySelector("body").classList.remove("--disable-scroll");
}

function bodyUnScroll() {
  document.querySelector("body").classList.add("--disable-scroll");
}

function bodyScrollToggle() {
  document.querySelector("body").classList.toggle("--disable-scroll");
}

// // ===== Languages Select =====
(function handleLanguages() {
  const langBtn = document.querySelector(".header__languages"),
    langCurr = document.querySelector(".header__languages .lang-current"),
    langOption = document.querySelectorAll(
      ".header__languages .select .option"
    );

  langBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    langBtn.classList.toggle("--active");
    document.querySelector("header").classList.toggle("--disable-scroll");
  });

  langOption.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      let langPrev = langCurr.textContent;
      langCurr.textContent = item.textContent;
      item.textContent = langPrev;
      langBtn.classList.remove("--active");
      document.querySelector("header").classList.remove("--disable-scroll");
    });
  });

  // Click Outside To Enable Header Scroll Hide & Hide Language Options
  window.addEventListener("click", () => {
    if (
      langBtn.classList.contains("--active") &&
      document.querySelector("header").classList.contains("--disable-scroll")
    ) {
      langBtn.classList.remove("--active");
      document.querySelector("header").classList.remove("--disable-scroll");
    }
  });
})();

// ===== Scroll Bar Percent =====
(function scrollBarPercent() {
  const percent = document.querySelector(".progress-bar .percent");

  function percentPage() {
    const scrollY = window.scrollY, // Get Top Of Window's Height When Scrolling
      bodyHeight = document.documentElement.scrollHeight, // Get Full Page's Height
      screenHeight = document.documentElement.clientHeight, // Get Screen's Height
      progressBar = `${(scrollY / (bodyHeight - screenHeight)) * 100}`; // Calculate Percent Page's Height When Scrolling

    // Style Percent Width
    percent.style.width = `${progressBar < 100 ? progressBar : 100}%`;
  }

  percentPage();
  window.addEventListener("scroll", percentPage);
})();

// ===== Loading Page =====
(function loadingPage() {
  const loading = document.querySelector(".loading");
  let loadingLine = document.querySelector(".loading .loading-line div"),
    loadingNumber = document.querySelector(".loading .loading-number"),
    loadingStart = 0;

  if (!loading.classList.contains("--done")) {
    bodyUnScroll();
  }

  let loadingPagePercent = setInterval(() => {
    if (loadingStart < 100) {
      loadingStart++;
      loadingLine.style.width = `${loadingStart}%`;
      loadingNumber.textContent = `${loadingStart}%`;
    } else {
      setTimeout(() => {
        loading.classList.add("--done");
        bodyScroll();
        clearInterval(loadingPagePercent);
      }, 1000);
    }
  }, 20);

  // function loadingDone() {
  //   loading.classList.add("--done");
  // }

  // window.addEventListener("load", loadingDone);
})();

// ===== Back To Top =====
(function ScrollToTop() {
  const backToTop = document.querySelector(".footer__btn");

  function toTop() {
    const scrollY = window.scrollY;
    window.scrollTo(0, scrollY == 0);
  }

  backToTop.addEventListener("click", toTop);
})();

// ===== Section Scroll To =====
(function ScrollToSection() {
  let navs = document.querySelectorAll(".header__menu li a"),
    header = document.querySelector("header"),
    headerHeight = document.querySelector("header").offsetHeight,
    sections = [];

  function removeNavActive() {
    navs.forEach((a) => {
      a.classList.remove("--active");
    });
  }

  // Handle Nav Click To Section
  navs.forEach((nav) => {
    let href = nav.getAttribute("href").replace("#", ""),
      section = document.querySelector(`section.${href}`);
    sections.push(section);
    nav.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
      removeNavActive();
      nav.classList.add("--active");
    });
  });

  // Hide Header When Scroll Down, Show When Scroll Up
  let prevScrollY = window.scrollY;

  function handleHeaderScroll() {
    let currScrollY = window.scrollY;
    if (currScrollY > prevScrollY) {
      header.classList.add("--scroll-hide");
    } else {
      header.classList.remove("--scroll-hide");
    }
    prevScrollY = currScrollY;
  }

  //  Handle Nav Scroll
  function scrollNavActive() {
    let scrollY = window.scrollY;
    sections.forEach((sec, i) => {
      if (
        scrollY > sec.offsetTop - headerHeight &&
        scrollY < sec.offsetTop + sec.offsetHeight
      ) {
        removeNavActive();
        navs[i].classList.add("--active");
      } else {
        navs[i].classList.remove("--active");
      }
      // Header Change Background
      if (scrollY >= sections[0].offsetHeight - headerHeight) {
        header.classList.add("--active");
      } else {
        header.classList.remove("--active");
      }
    });
  }
  scrollNavActive();
  window.addEventListener("scroll", () => {
    handleHeaderScroll();
    scrollNavActive();
  });
})();

// ===== Menu Mobile =====
(function handleNavMoblie() {
  const btnMenu = document.querySelector(".btnmenu"),
    navMenu = document.querySelectorAll(
      "header .container-fluid .header__menu a"
    ),
    header = document.querySelector("header");

  // Menu Button Event
  btnMenu.addEventListener("click", () => {
    if (
      header.classList.contains("--disable-scroll") &&
      document
        .querySelector(".header__languages")
        .classList.contains("--active")
    ) {
      header.classList.remove("--disable-scroll");
      document.querySelector(".header__languages").classList.remove("--active");
    }

    header.classList.toggle("--disable-scroll");

    bodyScrollToggle();
    document
      .querySelector("header .container-fluid")
      .classList.toggle("--active");

    // setTimeout(() => {
    //   header.classList.remove("--scroll-hide");
    // }, 100);
  });

  // Menu Navigation Event
  navMenu.forEach((a) => {
    a.addEventListener("click", () => {
      if (
        document
          .querySelector("header .container-fluid")
          .classList.contains("--active")
      ) {
        document
          .querySelector("header .container-fluid")
          .classList.remove("--active");
        header.classList.toggle("--disable-scroll");
        bodyScroll();
      }
    });
  });
})();

// ===== Article Active =====
(function handleArticle() {
  const newsBtn = document.querySelectorAll(".news__btns .news__btn"),
    articleList = document.querySelectorAll(".news__lists .news__list");

  function removeActiveNewsList() {
    document
      .querySelector(".news__btns .news__btn.--active")
      .classList.remove("--active");
    document
      .querySelector(".news__lists .news__list.--active")
      .classList.remove("--active");
  }

  newsBtn.forEach(function (element, index) {
    element.addEventListener("click", () => {
      removeActiveNewsList();
      element.classList.add("--active");
      articleList[index].classList.add("--active");
    });
  });
})();

// ===== Slider Hero Change =====
function handleSliderFlickity() {
  var slider = document.querySelector(".slider__item-wrap");
  var flktySlider = new Flickity(slider, {
    // options
    cellAlign: "left",
    contain: true,
    draggable: ">1",
    prevNextButtons: false,
    wrapAround: true,
    autoPlay: 3000,
    on: {
      ready: function () {
        console.log("Flickity is ready");
      },
      change: function (index) {
        handlePage(index);
        handleDots(index);
      },
    },
  });

  let btnNext = document.querySelector(".slider__bottom-control .btnctrl.next"),
    btnPrev = document.querySelector(".slider__bottom-control .btnctrl.prev"),
    dots = document.querySelectorAll(".slider__bottom-paging .dotted ol li");

  function handlePage(index) {
    let pageCurr = document.querySelector(
      ".slider__bottom-paging .slider__bottom-paging--current"
    );
    pageCurr.textContent = (index + 1).toString().padStart(2, "0");
  }
  function dotsRemoveActive() {
    dots.forEach((e) => {
      e.classList.remove("--active");
    });
  }

  dots.forEach((e, i) => {
    e.addEventListener("click", () => {
      flktySlider.select(i, true);
    });
  });

  function handleDots(index) {
    dotsRemoveActive();
    dots[index].classList.add("--active");
  }

  function handleSliderBtns() {
    btnNext.addEventListener("click", () => {
      flktySlider.next(true);
    });

    btnPrev.addEventListener("click", () => {
      flktySlider.previous(true);
    });
  }
  handleSliderBtns();
}

// ===== Popup Video =====
(function handleVideoPopup() {
  const videoOverlay = document.querySelector(".popup__video"),
    videoClose = document.querySelector(".popup__video .popup__video-close"),
    videoBtn = document.querySelectorAll(".video__item .video__item-play"),
    bannerVideoBtn = document.querySelector(".banner__btn");

  function hideVideo() {
    document.querySelector(".popup__video").classList.add("--hide");
    document
      .querySelector(".popup__video .popup__video-inner iframe")
      .setAttribute("src", "");
    bodyScroll();
    document.querySelector(".cursor").classList.remove("--hide");
  }

  videoOverlay.addEventListener("click", hideVideo);

  videoClose.addEventListener("click", hideVideo);

  // Section Video Video Popup
  videoBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      bodyUnScroll();
      document.querySelector(".cursor").classList.add("--hide");
      document.querySelector(".popup__video").classList.remove("--hide");
      document
        .querySelector(".popup__video .popup__video-inner iframe")
        .setAttribute(
          "src",
          `https://www.youtube.com/embed/${btn.getAttribute("data-ytb")}`
        );
    });
  });

  // Section Banner Video Popup
  bannerVideoBtn.addEventListener("click", () => {
    bodyUnScroll();
    document.querySelector(".cursor").classList.add("--hide");
    document.querySelector(".popup__video").classList.remove("--hide");
    document
      .querySelector(".popup__video .popup__video-inner iframe")
      .setAttribute("src", "https://www.youtube.com/embed/ukHK1GVyr0I");
  });
})();

// ===== Popup Gallery =====
function handleGalleryFancybox() {
  Fancybox.bind("[data-fancybox='images']", {
    // Your custom options
    infinite: true,
    keyboard: {
      Escape: "close",
      Delete: "close",
      Backspace: "close",
      PageUp: "next",
      PageDown: "prev",
      ArrowUp: "prev",
      ArrowDown: "next",
      ArrowRight: "next",
      ArrowLeft: "prev",
    },
  });
}

// ===== Cursor Follow Mouse =====
(function cursorMouseMove() {
  let cursor = document.querySelector(".cursor");
  document.addEventListener("mousemove", (e) => {
    let r = cursor.clientWidth / 2,
      y = e.clientY - r,
      x = e.clientX - r;
    cursor.style.transform = `translate(${x}px,${y}px)`;
  });
})();

// ===== Carousel Slider =====
function handleCarousel() {
  var elem = document.querySelector(".carousel__list");
  var flktyCarousel = new Flickity(elem, {
    // options
    cellAlign: "left",
    contain: true,
    freeScroll: true,
    draggable: ">1",
    prevNextButtons: false,
    pageDots: false,
    wrapAround: true,
    imagesLoaded: true,
  });
  var progressBar = document.querySelector(".carousel__progress div");

  flktyCarousel.on("scroll", function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + "%";
  });
}

window.addEventListener("load", () => {
  setTimeout(handleSliderFlickity, 3000);
  handleCarousel();
  handleGalleryFancybox();
});
