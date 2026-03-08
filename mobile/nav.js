// BeBlue Mobile Navigation - Injects standardized bottom nav + wires all links
(function() {
  const currentFile = location.pathname.split('/').pop();


  // Pages that should NOT have bottom nav
  const noNav = ['01-welcome.html', '02-login.html', '03-onboarding.html'];
  const hasNav = !noNav.includes(currentFile);

  // Standard bottom nav items
  const navItems = [
    { icon: 'home', label: 'Home', href: '04-home-dashboard.html', pages: ['04-home-dashboard.html','09-exercise.html','10-therapies.html','12-nutrition.html','13-supplementation.html'] },
    { icon: 'calendar_today', label: 'Programa', href: '05-program-overview.html', pages: ['05-program-overview.html','06-calendar.html','11-booking.html'] },
    { icon: 'add', label: '', href: '14-daily-checkin.html', pages: ['14-daily-checkin.html'], isFab: true },
    { icon: 'monitoring', label: 'Progreso', href: '07-progress-avatar.html', pages: ['07-progress-avatar.html'] },
    { icon: 'person', label: 'Perfil', href: '08-profile.html', pages: ['08-profile.html','15-connected-devices.html'] },
  ];

  // Remove ALL existing bottom navs
  if (hasNav) {
    // Remove <nav> elements that are bottom navigation
    document.querySelectorAll('nav').forEach(nav => {
      const style = window.getComputedStyle(nav);
      const rect = nav.getBoundingClientRect();
      // Remove if it's near the bottom of the page or fixed/absolute at bottom
      if (style.position === 'fixed' || style.position === 'absolute' || rect.top > window.innerHeight * 0.7) {
        nav.remove();
      }
    });
    // Also remove fixed bottom divs that contain nav-like content (profile pattern)
    document.querySelectorAll('div.fixed, div[class*="fixed bottom"]').forEach(div => {
      if (div.className.includes('bottom') && div.querySelector('.material-symbols-outlined')) {
        div.remove();
      }
    });

    // Build standard nav
    const nav = document.createElement('nav');
    nav.id = 'beblue-nav';
    nav.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:9999;background:rgba(10,22,40,0.95);backdrop-filter:blur(16px);border-top:1px solid rgba(255,255,255,0.08);padding:8px 24px 28px;';

    const container = document.createElement('div');
    container.style.cssText = 'display:flex;justify-content:space-between;align-items:center;max-width:420px;margin:0 auto;';

    navItems.forEach(item => {
      const isActive = item.pages.includes(currentFile);
      const a = document.createElement('a');
      a.href = item.href;

      if (item.isFab) {
        a.style.cssText = 'display:flex;align-items:center;justify-content:center;margin-top:-28px;';
        a.innerHTML = '<div style="width:48px;height:48px;border-radius:50%;background:#135BEC;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(19,91,236,0.4);border:3px solid #0A1628;"><span class="material-symbols-outlined" style="color:#fff;font-size:24px;">add</span></div>';
      } else {
        const color = isActive ? '#135BEC' : '#64748B';
        const weight = isActive ? '700' : '500';
        const fill = isActive ? "font-variation-settings:'FILL' 1;" : '';
        a.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:2px;text-decoration:none;min-width:48px;';
        a.innerHTML = `<span class="material-symbols-outlined" style="font-size:24px;color:${color};${fill}">${item.icon}</span><span style="font-size:10px;font-weight:${weight};color:${color};font-family:Manrope,sans-serif;">${item.label}</span>`;
      }
      container.appendChild(a);
    });

    nav.appendChild(container);
    document.body.appendChild(nav);

    // Add bottom padding to body so content isn't hidden behind nav
    document.body.style.paddingBottom = '80px';
  }

  // === WIRE UP NAVIGATION LINKS ===

  // Back buttons
  document.querySelectorAll('a[href="#"], button, span, div').forEach(el => {
    const icon = el.querySelector('.material-symbols-outlined') || (el.classList && el.classList.contains('material-symbols-outlined') ? el : null);
    const iconName = icon ? icon.textContent.trim() : '';
    if (iconName === 'arrow_back' || iconName === 'arrow_back_ios' || iconName === 'arrow_back_ios_new' || iconName === 'close') {
      el.style.cursor = 'pointer';
      el.addEventListener('click', function(e) {
        e.preventDefault();
        if (history.length > 1) history.back();
        else location.href = '04-home-dashboard.html';
      });
    }
  });

  // Text-based button wiring (skip elements that already have a real href)
  document.querySelectorAll('button, a').forEach(el => {
    if (el.tagName === 'A' && el.href && !el.href.endsWith('#')) return;
    const text = el.textContent.trim().toLowerCase();
    if (text.includes('ver detalles') || text.includes('ver programa')) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => location.href = '05-program-overview.html');
    }
    if (text.includes('ver informe') || text.includes('ver todo') || text.includes('ver informe completo')) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => location.href = '07-progress-avatar.html');
    }
    if (text.includes('reservar') || text.includes('nueva cita') || text.includes('agendar') || text.includes('gestionar reservas')) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => location.href = '11-booking.html');
    }
    if (text.includes('cerrar sesión') || text.includes('cerrar sesion') || text.includes('logout') || text.includes('salir')) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', e => { e.preventDefault(); location.href = '01-welcome.html'; });
    }
  });

  // Welcome -> Login
  if (currentFile === '01-welcome.html') {
    document.querySelectorAll('button, a').forEach(el => {
      if (el.textContent.trim().length > 0) {
        el.addEventListener('click', () => location.href = '02-login.html');
      }
    });
  }

  // Login -> Dashboard / Onboarding
  if (currentFile === '02-login.html') {
    document.querySelectorAll('button, a').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      if (text.includes('iniciar') || text.includes('entrar') || text.includes('acceder') || text.includes('login')) {
        el.addEventListener('click', e => { e.preventDefault(); location.href = '04-home-dashboard.html'; });
      }
      if (text.includes('registr') || text.includes('crear') || text.includes('sign up')) {
        el.addEventListener('click', e => { e.preventDefault(); location.href = '03-onboarding.html'; });
      }
    });
  }

  // Onboarding -> Dashboard
  if (currentFile === '03-onboarding.html') {
    document.querySelectorAll('button').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      if (text.includes('siguiente') || text.includes('continuar') || text.includes('finalizar') || text.includes('completar')) {
        el.addEventListener('click', e => { e.preventDefault(); location.href = '04-home-dashboard.html'; });
      }
      if (text.includes('anterior') || text.includes('atrás') || text.includes('atras')) {
        el.addEventListener('click', e => { e.preventDefault(); location.href = '02-login.html'; });
      }
    });
  }

  // Login: forgot password link -> stay on login
  if (currentFile === '02-login.html') {
    document.querySelectorAll('a[href="#"]').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      if (text.includes('olvidaste') || text.includes('contraseña') || text.includes('contrasena')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', e => {
          e.preventDefault();
          alert('Se ha enviado un email de recuperación');
        });
      }
    });
  }

  // Dashboard: pillar cards + sessions
  if (currentFile === '04-home-dashboard.html') {
    const pillarMap = { 'ejercicio': '09-exercise.html', 'terapias': '10-therapies.html', 'nutrici': '12-nutrition.html', 'suplem': '13-supplementation.html' };
    document.querySelectorAll('div').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      for (const [key, href] of Object.entries(pillarMap)) {
        if (text.includes(key) && el.offsetHeight < 120 && el.offsetHeight > 30 && el.children.length > 0) {
          el.style.cursor = 'pointer';
          el.addEventListener('click', e => { e.stopPropagation(); location.href = href; });
          break;
        }
      }
    });
  }

  // Profile: devices section is handled via inline onclick in HTML

  // Booking: accept/change buttons
  if (currentFile === '11-booking.html') {
    document.querySelectorAll('button').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      if (text.includes('aceptar') || text.includes('confirmar')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', e => { e.preventDefault(); location.href = '06-calendar.html'; });
      }
      if (text.includes('cambiar horario') || text.includes('cambiar')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', e => { e.preventDefault(); location.href = '06-calendar.html'; });
      }
    });
  }

  // Therapies: manage bookings
  if (currentFile === '10-therapies.html') {
    document.querySelectorAll('button').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      if (text.includes('gestionar') || text.includes('reservas')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', e => { e.preventDefault(); location.href = '11-booking.html'; });
      }
    });
  }

  // Connected devices: connect buttons -> stay on page (visual feedback)
  if (currentFile === '15-connected-devices.html') {
    document.querySelectorAll('button').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      if (text === 'conectar') {
        el.style.cursor = 'pointer';
        el.addEventListener('click', e => {
          e.preventDefault();
          el.textContent = 'Conectado ✓';
          el.style.background = '#22c55e';
          el.style.color = '#fff';
          el.disabled = true;
        });
      }
    });
  }

  // Daily check-in: submit -> dashboard
  if (currentFile === '14-daily-checkin.html') {
    document.querySelectorAll('button').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      if (text.includes('enviar') || text.includes('guardar') || text.includes('completar') || text.includes('finalizar') || text.includes('registrar')) {
        el.addEventListener('click', e => { e.preventDefault(); location.href = '04-home-dashboard.html'; });
      }
    });
  }
  // === PHONE SIMULATOR FRAME (only on wide screens) ===
  if (window.innerWidth > 500) {
    const bg = document.createElement('div');
    bg.style.cssText = 'position:fixed;inset:0;background:#111;display:flex;align-items:center;justify-content:center;z-index:0;';

    const phone = document.createElement('div');
    phone.style.cssText = 'width:390px;height:844px;border-radius:50px;border:6px solid #2a2a2a;box-shadow:0 0 0 2px #1a1a1a, 0 40px 80px rgba(0,0,0,0.6), inset 0 0 0 2px #3a3a3a;overflow:hidden;position:relative;background:#000;';

    // Home indicator
    const homeIndicator = document.createElement('div');
    homeIndicator.style.cssText = 'position:absolute;bottom:8px;left:50%;transform:translateX(-50%);width:134px;height:5px;background:rgba(255,255,255,0.3);border-radius:3px;z-index:10001;';

    // Scroll container
    const scrollArea = document.createElement('div');
    scrollArea.id = 'phone-scroll';
    scrollArea.style.cssText = 'position:absolute;inset:0;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;';

    // Copy body background to scroll area before moving children
    const bodyStyles = window.getComputedStyle(document.body);
    scrollArea.style.background = bodyStyles.background || bodyStyles.backgroundColor || '#0A1628';

    // Move all body children into phone
    while (document.body.firstChild) {
      scrollArea.appendChild(document.body.firstChild);
    }

    phone.appendChild(scrollArea);
    phone.appendChild(homeIndicator);
    bg.appendChild(phone);
    document.body.appendChild(bg);

    document.body.style.cssText = 'margin:0;padding:0;overflow:hidden;background:#111;height:100vh;';
    document.documentElement.style.overflow = 'hidden';

    // Hide scrollbar
    const hideScrollStyle = document.createElement('style');
    hideScrollStyle.textContent = '#phone-scroll::-webkit-scrollbar{display:none} #phone-scroll{-ms-overflow-style:none;scrollbar-width:none;}';
    document.head.appendChild(hideScrollStyle);

    // Move bottom nav inside phone and make it sticky to bottom of phone frame
    const beblueNav = document.getElementById('beblue-nav');
    if (beblueNav) {
      beblueNav.style.cssText = 'position:sticky;bottom:0;left:0;right:0;z-index:9999;background:rgba(10,22,40,0.95);backdrop-filter:blur(16px);border-top:1px solid rgba(255,255,255,0.08);padding:8px 24px 28px;margin-top:auto;';
      // Wrap scroll content + nav in a flex column so nav sticks to bottom
      scrollArea.style.display = 'flex';
      scrollArea.style.flexDirection = 'column';
      // Wrap existing content in a div
      const contentWrap = document.createElement('div');
      contentWrap.style.cssText = 'flex:1;';
      while (scrollArea.firstChild !== beblueNav && scrollArea.firstChild) {
        contentWrap.appendChild(scrollArea.firstChild);
      }
      scrollArea.insertBefore(contentWrap, beblueNav);
    }
  }
})();
