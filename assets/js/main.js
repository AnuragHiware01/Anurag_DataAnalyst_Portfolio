/*
	Massively Theme - Customized for Anurag Hiware Portfolio
	Optimized and Updated Version
*/

(function ($) {
  const $window = $(window),
    $body = $("body"),
    $wrapper = $("#wrapper"),
    $header = $("#header"),
    $nav = $("#nav"),
    $main = $("#main");

  let $navPanelToggle, $navPanel, $navPanelInner;

  // Define breakpoints
  breakpoints({
    default: ["1681px", null],
    xlarge: ["1281px", "1680px"],
    large: ["981px", "1280px"],
    medium: ["737px", "980px"],
    small: ["481px", "736px"],
    xsmall: ["361px", "480px"],
    xxsmall: [null, "360px"],
  });

  /**
   * Parallax scrolling background
   */
  $.fn._parallax = function (intensity = 0.25) {
    const $this = $(this);
    if (this.length === 0 || intensity === 0) return $this;

    if (this.length > 1) {
      for (let i = 0; i < this.length; i++) $(this[i])._parallax(intensity);
      return $this;
    }

    const $bg = $('<div class="bg"></div>').appendTo($this);
    const $win = $(window);

    const on = () => {
      $bg.removeClass("fixed").css("transform", "matrix(1,0,0,1,0,0)");
      $win.on("scroll._parallax", () => {
        const pos = parseInt($win.scrollTop()) - parseInt($this.position().top);
        $bg.css("transform", `matrix(1,0,0,1,0,${pos * intensity})`);
      });
    };

    const off = () => {
      $bg.addClass("fixed").css("transform", "none");
      $win.off("scroll._parallax");
    };

    // Disable on IE, Edge, Retina, or mobile
    if (
      browser.name === "ie" ||
      browser.name === "edge" ||
      window.devicePixelRatio > 1 ||
      browser.mobile
    ) {
      off();
    } else {
      breakpoints.on(">large", on);
      breakpoints.on("<=large", off);
    }

    $win
      .off("load._parallax resize._parallax")
      .on("load._parallax resize._parallax", () => {
        $win.trigger("scroll");
      });

    return $this;
  };

  // Remove preload animation class on page load
  $window.on("load", () => {
    setTimeout(() => $body.removeClass("is-preload"), 100);
  });

  // Scrolly animation
  $(".scrolly").scrolly();

  // Background parallax
  $wrapper._parallax(0.925);

  // ----- Navigation Panel -----
  $navPanelToggle = $('<a href="#navPanel" id="navPanelToggle">Menu</a>').appendTo($wrapper);

  // Change toggle style on scroll past header
  $header.scrollex({
    bottom: "5vh",
    enter: () => $navPanelToggle.removeClass("alt"),
    leave: () => $navPanelToggle.addClass("alt"),
  });

  // Create nav panel
  $navPanel = $(
    '<div id="navPanel"><nav></nav><a href="#navPanel" class="close"></a></div>'
  )
    .appendTo($body)
    .panel({
      delay: 400,
      hideOnClick: true,
      hideOnSwipe: true,
      resetScroll: true,
      resetForms: true,
      side: "right",
      target: $body,
      visibleClass: "is-navPanel-visible",
    });

  // Insert nav items
  $navPanelInner = $navPanel.children("nav");
  const $navContent = $nav.children();

  breakpoints.on(">medium", () => {
    $navContent.appendTo($nav);
    $nav.find(".icons, .icon").removeClass("alt");
  });

  breakpoints.on("<=medium", () => {
    $navContent.appendTo($navPanelInner);
    $navPanelInner.find(".icons, .icon").addClass("alt");
  });

  // Disable transitions on older Windows Phones
  if (browser.os === "wp" && browser.osVersion < 10)
    $navPanel.css("transition", "none");

  // ----- Intro Section Animation -----
  const $intro = $("#intro");
  if ($intro.length > 0) {
    if (browser.name === "ie") {
      $window
        .on("resize.ie-intro-fix", () => {
          const h = $intro.height();
          if (h > $window.height()) $intro.css("height", "auto");
          else $intro.css("height", h);
        })
        .trigger("resize.ie-intro-fix");
    }

    // Scroll hide logic
    breakpoints.on(">small", () => {
      $main.unscrollex();
      $main.scrollex({
        mode: "bottom",
        top: "25vh",
        bottom: "-50vh",
        enter: () => $intro.addClass("hidden"),
        leave: () => $intro.removeClass("hidden"),
      });
    });

    breakpoints.on("<=small", () => {
      $main.unscrollex();
      $main.scrollex({
        mode: "middle",
        top: "15vh",
        bottom: "-15vh",
        enter: () => $intro.addClass("hidden"),
        leave: () => $intro.removeClass("hidden"),
      });
    });
  }

  // REMOVED ALL CONTACT FORM JAVASCRIPT - Using EmailJS instead

})(jQuery);