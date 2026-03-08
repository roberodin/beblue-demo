// BeBlue Mobile Navigation - Auto-wires all nav links
(function() {
  // Map icon names and text labels to screen files
  const iconMap = {
    'home': '04-home-dashboard.html',
    'calendar_today': '06-calendar.html',
    'calendar_month': '06-calendar.html',
    'fact_check': '05-program-overview.html',
    'monitoring': '07-progress-avatar.html',
    'analytics': '07-progress-avatar.html',
    'auto_awesome': '07-progress-avatar.html',
    'monitor_heart': '10-therapies.html',
    'bar_chart': '07-progress-avatar.html',
    'person': '08-profile.html',
    'fitness_center': '09-exercise.html',
    'spa': '10-therapies.html',
    'restaurant': '12-nutrition.html',
    'medication': '13-supplementation.html',
    'event_available': '11-booking.html',
    'favorite': '07-progress-avatar.html',
    'group': '08-profile.html',
    'check_circle': '14-daily-checkin.html',
    'watch': '15-connected-devices.html',
    'assignment': '05-program-overview.html',
    'notifications': '#',
    'add': '11-booking.html',
  };

  const textMap = {
    'home': '04-home-dashboard.html',
    'hoy': '04-home-dashboard.html',
    'inicio': '04-home-dashboard.html',
    'programa': '05-program-overview.html',
    'calendario': '06-calendar.html',
    'reservas': '11-booking.html',
    'progreso': '07-progress-avatar.html',
    'wellness': '07-progress-avatar.html',
    'vitalidad': '07-progress-avatar.html',
    'salud': '07-progress-avatar.html',
    'métricas': '07-progress-avatar.html',
    'metricas': '07-progress-avatar.html',
    'perfil': '08-profile.html',
    'terapias': '10-therapies.html',
    'social': '08-profile.html',
    'plan': '05-program-overview.html',
    'nueva': '11-booking.html',
    'comunidad': '08-profile.html',
    'dispositivos': '15-connected-devices.html',
  };

  // Wire up navigation links
  document.querySelectorAll('a[href="#"], button').forEach(el => {
    // Check for icon
    const icon = el.querySelector('.material-symbols-outlined');
    const iconName = icon ? icon.textContent.trim() : '';

    // Check for text label
    const textEls = el.querySelectorAll('span, p');
    let label = '';
    textEls.forEach(t => {
      const txt = t.textContent.trim().toLowerCase();
      if (txt && txt !== iconName && txt.length < 30) label = txt;
    });

    // Try to match by text first, then icon
    let target = textMap[label] || iconMap[iconName];

    if (target && target !== '#') {
      const currentFile = location.pathname.split('/').pop();
      if (target !== currentFile) {
        el.href = target;
        el.style.cursor = 'pointer';
      }
    }

    // Handle back buttons
    if (iconName === 'arrow_back' || iconName === 'arrow_back_ios' || iconName === 'arrow_back_ios_new' || iconName === 'close') {
      el.style.cursor = 'pointer';
      el.addEventListener('click', function(e) {
        e.preventDefault();
        if (history.length > 1) {
          history.back();
        } else {
          location.href = '04-home-dashboard.html';
        }
      });
    }
  });

  // Wire up "Ver detalles", "Ver todo", etc.
  document.querySelectorAll('button, a').forEach(el => {
    const text = el.textContent.trim().toLowerCase();
    if (text.includes('ver detalles') || text.includes('ver programa')) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => location.href = '05-program-overview.html');
    }
    if (text.includes('ver informe') || text.includes('ver todo')) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => location.href = '07-progress-avatar.html');
    }
    if (text.includes('reservar') || text.includes('nueva cita')) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => location.href = '11-booking.html');
    }
    if (text.includes('iniciar sesión') || text.includes('comenzar') || text.includes('empezar')) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => location.href = '02-login.html');
    }
    if (text.includes('crear cuenta') || text.includes('registr')) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => location.href = '03-onboarding.html');
    }
  });

  // Welcome screen: main CTA goes to login
  if (location.pathname.includes('01-welcome')) {
    document.querySelectorAll('button, a').forEach(el => {
      if (el.textContent.trim().length > 0) {
        el.addEventListener('click', () => location.href = '02-login.html');
      }
    });
  }

  // Login screen: submit goes to onboarding or dashboard
  if (location.pathname.includes('02-login')) {
    document.querySelectorAll('button[type="submit"], button').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      if (text.includes('iniciar') || text.includes('entrar') || text.includes('acceder') || text.includes('login')) {
        el.addEventListener('click', e => { e.preventDefault(); location.href = '04-home-dashboard.html'; });
      }
      if (text.includes('registr') || text.includes('crear') || text.includes('sign up')) {
        el.addEventListener('click', e => { e.preventDefault(); location.href = '03-onboarding.html'; });
      }
    });
  }

  // Onboarding: next/continue goes to dashboard
  if (location.pathname.includes('03-onboarding')) {
    document.querySelectorAll('button').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      if (text.includes('siguiente') || text.includes('continuar') || text.includes('finalizar') || text.includes('completar')) {
        el.addEventListener('click', e => { e.preventDefault(); location.href = '04-home-dashboard.html'; });
      }
    });
  }

  // Pillar cards on dashboard
  if (location.pathname.includes('04-home-dashboard')) {
    const pillarMap = { 'ejercicio': '09-exercise.html', 'terapias': '10-therapies.html', 'nutrici': '12-nutrition.html', 'suplement': '13-supplementation.html' };
    document.querySelectorAll('div, a, button').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      for (const [key, href] of Object.entries(pillarMap)) {
        if (text.includes(key) && el.closest && !el.querySelector('nav') && el.offsetHeight < 200) {
          el.style.cursor = 'pointer';
          el.addEventListener('click', e => {
            if (!e.defaultPrevented) location.href = href;
          }, { once: true });
          break;
        }
      }
    });
  }
})();
