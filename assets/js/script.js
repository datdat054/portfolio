(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.PortfolioApp = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var TYPING_ROLES = [
    'Java Backend Developer',
    'Spring Boot Engineer',
    'Microservices Architect',
    'Software Engineering Student'
  ];

  function isValidEmail(email) {
    if (typeof email !== 'string') return false;
    var trimmed = email.trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
  }

  function validateContactPayload(payload) {
    var name = (payload && payload.name ? String(payload.name) : '').trim();
    var email = (payload && payload.email ? String(payload.email) : '').trim();
    var subject = (payload && payload.subject ? String(payload.subject) : '').trim();
    var message = (payload && payload.message ? String(payload.message) : '').trim();

    if (!name) {
      return { ok: false, field: 'name', error: 'Please input your name.' };
    }
    if (!email) {
      return { ok: false, field: 'email', error: 'Please input your email address.' };
    }
    if (!isValidEmail(email)) {
      return { ok: false, field: 'email', error: 'Please enter a valid email address.' };
    }
    if (!subject) {
      return { ok: false, field: 'subject', error: 'Please input a subject.' };
    }
    if (!message) {
      return { ok: false, field: 'message', error: 'Please input your message.' };
    }

    return {
      ok: true,
      data: { name: name, email: email, subject: subject, message: message }
    };
  }

  function buildMailtoUrl(recipient, data) {
    var subject = encodeURIComponent('[Portfolio] ' + data.subject + ' — from ' + data.name);
    var body = encodeURIComponent(
      'Hi Dat,\n\n' +
      data.message +
      '\n\n---\nFrom: ' + data.name + '\nEmail: ' + data.email
    );
    return 'mailto:' + recipient + '?subject=' + subject + '&body=' + body;
  }

  function initTypingEffect(doc, roles) {
    var el = doc.querySelector('.auto-input');
    if (!el) return null;

    var list = Array.isArray(roles) && roles.length ? roles : TYPING_ROLES;
    var roleIndex = 0;
    var charIndex = list[0].length;
    var deleting = true;
    var timerId = null;

    el.textContent = list[0];

    function step() {
      var current = list[roleIndex];
      if (!deleting) {
        charIndex += 1;
        el.textContent = current.slice(0, charIndex);
        if (charIndex >= current.length) {
          deleting = true;
          timerId = setTimeout(step, 1800);
          return;
        }
        timerId = setTimeout(step, 75);
      } else {
        charIndex -= 1;
        el.textContent = current.slice(0, Math.max(0, charIndex));
        if (charIndex <= 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % list.length;
          timerId = setTimeout(step, 350);
          return;
        }
        timerId = setTimeout(step, 40);
      }
    }

    timerId = setTimeout(step, 1800);
    return function stop() {
      if (timerId) clearTimeout(timerId);
    };
  }

  function revealVisibleElements(win, doc) {
    var reveals = doc.querySelectorAll('.reveal');
    var windowHeight = win.innerHeight || doc.documentElement.clientHeight || 800;

    for (var i = 0; i < reveals.length; i += 1) {
      var rect = reveals[i].getBoundingClientRect();
      if (rect.top < windowHeight - 20) {
        reveals[i].classList.add('active');
      }
    }
  }

  function filterProjectsDom(doc, group) {
    var grid = doc.getElementById('grid');
    if (!grid) return;

    var items = grid.querySelectorAll('[data-groups]');
    for (var i = 0; i < items.length; i += 1) {
      var item = items[i];
      var raw = item.getAttribute('data-groups') || '[]';
      var groups = [];
      try {
        groups = JSON.parse(raw);
      } catch (_err) {
        groups = [];
      }
      var match = group === 'all' || groups.indexOf(group) !== -1;
      item.style.display = match ? '' : 'none';
      item.setAttribute('data-filtered-visible', match ? 'true' : 'false');
    }
  }

  function initContactForm(doc, win) {
    var form = doc.getElementById('contact-form');
    if (!form) return;

    var statusEl = doc.getElementById('contact-status');
    var submitBtn = doc.getElementById('btnSendMessage');

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var payload = {
        name: (doc.getElementById('name') || {}).value || '',
        email: (doc.getElementById('email') || {}).value || '',
        subject: (doc.getElementById('subject') || {}).value || '',
        message: (doc.getElementById('message') || {}).value || ''
      };

      var result = validateContactPayload(payload);
      if (!result.ok) {
        if (statusEl) {
          statusEl.textContent = result.error;
          statusEl.className = 'contact-status contact-status--error';
        }
        var targetField = doc.getElementById(result.field);
        if (targetField && typeof targetField.focus === 'function') {
          targetField.focus();
        }
        return;
      }

      if (submitBtn) submitBtn.disabled = true;

      var mailtoUrl = buildMailtoUrl('tkqb0ducdat@gmail.com', result.data);
      if (statusEl) {
        statusEl.textContent = 'Opening your email client to send message to tkqb0ducdat@gmail.com...';
        statusEl.className = 'contact-status contact-status--success';
      }

      if (win && win.location) {
        try {
          win.location.href = mailtoUrl;
        } catch (_err) {
          // Safe fallback in test environments
        }
      }

      form.reset();
      if (submitBtn) submitBtn.disabled = false;
    });
  }

  function initJQueryWidgets($, win, doc) {
    if (!$) return;

    // Sticky navigation affix
    if ($.fn.affix && $('.site-navigation').length && $('.hero').length) {
      $('.site-navigation').affix({
        offset: {
          top: function () {
            return $('.hero').outerHeight() || 540;
          }
        }
      });
    }

    // Collapse mobile navbar after clicking a nav item (delegated once)
    $(doc).on('click.portfolioNavCollapse', '.site-navigation .nav a', function () {
      if ($(win).width() < 768 && $('.navbar-collapse').hasClass('in')) {
        $('.navbar-toggle').trigger('click');
      }
    });

    // Scrollspy
    if ($.fn.scrollspy) {
      $('body').scrollspy({
        target: '.site-header',
        offset: 70
      });
    }

    // Smooth scrolling
    $(doc).on('click.portfolioScroll', '.page-scroll a', function (event) {
      var href = $(this).attr('href');
      if (!href || href.charAt(0) !== '#') return;
      var $target = $(href);
      if (!$target.length) return;

      event.preventDefault();
      $('html, body').stop().animate(
        { scrollTop: Math.max(0, $target.offset().top - 58) },
        800,
        $.easing && $.easing.easeInOutExpo ? 'easeInOutExpo' : 'swing'
      );
    });

    // Counters (namespaced + check on load)
    function triggerCounters() {
      var $counters = $('.counter-start:not(.counting)');
      if (!$counters.length) return;
      var triggerBottom = $(win).scrollTop() + $(win).height();

      $counters.each(function () {
        var $item = $(this);
        var top = $item.offset().top;
        if (triggerBottom >= top - 40) {
          $item.addClass('counting');
          if ($.fn.countTo) {
            $item.countTo();
          } else {
            $item.text($item.attr('data-to') || '0');
          }
        }
      });
    }

    // Progress bars (namespaced + check on load + safe zero-width fallback)
    var $skillsSection = $('.section-skills');
    var barsLoaded = false;
    function triggerSkillBars() {
      if (barsLoaded || !$skillsSection.length) return;
      var scrollBottom = $(win).scrollTop() + $(win).height();
      if (scrollBottom >= $skillsSection.offset().top + 40) {
        barsLoaded = true;
        var hasLayoutWidth = $skillsSection.width() > 0;
        if ($.fn.progressbar && hasLayoutWidth) {
          $('.progress .progress-bar').progressbar({
            transition_delay: 250,
            display_text: 'center'
          });
        } else {
          $('.progress .progress-bar').each(function () {
            var $bar = $(this);
            var goal = $bar.attr('data-transitiongoal') || '0';
            $bar.css('width', goal + '%').attr('aria-valuenow', goal);
            if (!$bar.find('.progressbar-front-text').length) {
              $bar.append('<span class="progressbar-front-text">' + goal + '%</span>');
            }
          });
        }
        $(win).off('scroll.skillsProgress');
      }
    }

    $(win).on('scroll.counters', triggerCounters);
    $(win).on('scroll.skillsProgress', triggerSkillBars);
    triggerCounters();
    triggerSkillBars();

    // Services carousel + active tab synchronization
    var $servicesCarousel = $('#services-carousel');
    if ($servicesCarousel.length && $.fn.carousel) {
      $servicesCarousel.carousel({ interval: false });

      $servicesCarousel.find('.carousel-indicators a, .carousel-control').on('click', function (event) {
        event.preventDefault();
      });

      $servicesCarousel.on('slid.bs.carousel', function () {
        var activeIndex = $servicesCarousel.find('.carousel-inner .item.active').index();
        $servicesCarousel.find('.carousel-indicators a').removeClass('active');
        $servicesCarousel.find('.carousel-indicators a[data-slide-to="' + activeIndex + '"]').addClass('active');
      });

      if ($.fn.swipe && $('.carousel-inner').length) {
        $('.carousel-inner').swipe({
          swipeLeft: function () {
            $(this).parent().carousel('next');
          },
          swipeRight: function () {
            $(this).parent().carousel('prev');
          },
          threshold: 50
        });
      }
    }

    // Slick carousels
    if ($.fn.slick) {
      if ($('.review-carousel').length) {
        $('.review-carousel').slick({
          nextArrow: '<button type="button" class="slick rectangle slick-next" aria-label="Next highlight"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
          prevArrow: '<button type="button" class="slick rectangle slick-prev" aria-label="Previous highlight"><i class="fa fa-angle-left" aria-hidden="true"></i></button>'
        });
      }

      if ($('.clients-carousel').length) {
        $('.clients-carousel').slick({
          arrows: false,
          autoplay: true,
          autoplaySpeed: 2400,
          slidesToShow: 5,
          responsive: [
            { breakpoint: 992, settings: { slidesToShow: 3 } },
            { breakpoint: 480, settings: { slidesToShow: 2 } }
          ]
        });
      }
    }

    // Portfolio filter (Shuffle.js + clean fallback)
    var $grid = $('#grid');
    if ($grid.length) {
      var useShuffle = typeof $.fn.shuffle === 'function' && typeof win.Shuffle !== 'undefined';
      if (useShuffle) {
        $grid.shuffle({
          itemSelector: '[data-groups]',
          group: 'all'
        });
      }

      $('.portfolio-sorting a').on('click', function (event) {
        event.preventDefault();
        var $btn = $(this);
        var group = $btn.attr('data-group') || 'all';

        $('.portfolio-sorting a').removeClass('active').attr('aria-selected', 'false');
        $btn.addClass('active').attr('aria-selected', 'true');

        if (useShuffle) {
          $grid.shuffle('shuffle', group);
        } else {
          filterProjectsDom(doc, group);
        }
      });
    }
  }

  function bootstrap(win, doc, $) {
    initTypingEffect(doc, TYPING_ROLES);
    initContactForm(doc, win);
    revealVisibleElements(win, doc);

    if (typeof win.IntersectionObserver === 'function') {
      var observer = new win.IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i += 1) {
          if (entries[i].isIntersecting) {
            entries[i].target.classList.add('active');
            observer.unobserve(entries[i].target);
          }
        }
      }, { threshold: 0.05 });

      var revealNodes = doc.querySelectorAll('.reveal');
      for (var r = 0; r < revealNodes.length; r += 1) {
        observer.observe(revealNodes[r]);
      }
    }

    win.addEventListener('scroll', function () {
      revealVisibleElements(win, doc);
    });
    win.addEventListener('resize', function () {
      revealVisibleElements(win, doc);
    });

    if ($) {
      $(function () {
        initJQueryWidgets($, win, doc);
      });
    } else {
      // Pure DOM fallback for project filters if jQuery is absent
      var filterLinks = doc.querySelectorAll('.portfolio-sorting a');
      for (var i = 0; i < filterLinks.length; i += 1) {
        filterLinks[i].addEventListener('click', function (event) {
          event.preventDefault();
          var group = this.getAttribute('data-group') || 'all';
          for (var j = 0; j < filterLinks.length; j += 1) {
            filterLinks[j].classList.remove('active');
            filterLinks[j].setAttribute('aria-selected', 'false');
          }
          this.classList.add('active');
          this.setAttribute('aria-selected', 'true');
          filterProjectsDom(doc, group);
        });
      }
    }
  }

  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    bootstrap(window, document, window.jQuery);
  }

  return {
    TYPING_ROLES: TYPING_ROLES,
    isValidEmail: isValidEmail,
    validateContactPayload: validateContactPayload,
    buildMailtoUrl: buildMailtoUrl,
    initTypingEffect: initTypingEffect,
    revealVisibleElements: revealVisibleElements,
    filterProjectsDom: filterProjectsDom,
    initContactForm: initContactForm,
    bootstrap: bootstrap
  };
}));
