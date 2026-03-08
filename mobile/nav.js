// BeBlue Mobile Navigation - Auto-wires all nav links
(function() {
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

  // Wire up all <a href="#"> and buttons with icons/labels
  document.querySelectorAll('a[href="#"], button').forEach(el => {
    const icon = el.querySelector('.material-symbols-outlined');
    const iconName = icon ? icon.textContent.trim() : '';

    const textEls = el.querySelectorAll('span, p');
    let label = '';
    textEls.forEach(t => {
      const txt = t.textContent.trim().toLowerCase();
      if (txt && txt !== iconName && txt.length < 30) label = txt;
    });

    let target = textMap[label] || iconMap[iconName];

    if (target && target !== '#') {
      const currentFile = location.pathname.split('/').pop();
      if (target !== currentFile) {
        if (el.tagName === 'A') el.href = target;
        else el.addEventListener('click', () => location.href = target);
        el.style.cursor = 'pointer';
      }
    }

    // Back buttons
    if (iconName === 'arrow_back' || iconName === 'arrow_back_ios' || iconName === 'arrow_back_ios_new' || iconName === 'close') {
      el.style.cursor = 'pointer';
      el.addEventListener('click', function(e) {
        e.preventDefault();
        if (history.length > 1) history.back();
        else location.href = '04-home-dashboard.html';
      });
    }
  });

  // Wire text-based buttons
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

  // Welcome -> Login
  if (location.pathname.includes('01-welcome')) {
    document.querySelectorAll('button, a').forEach(el => {
      if (el.textContent.trim().length > 0) {
        el.addEventListener('click', () => location.href = '02-login.html');
      }
    });
  }

  // Login -> Dashboard or Onboarding
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

  // Onboarding -> Dashboard
  if (location.pathname.includes('03-onboarding')) {
    document.querySelectorAll('button').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      if (text.includes('siguiente') || text.includes('continuar') || text.includes('finalizar') || text.includes('completar')) {
        el.addEventListener('click', e => { e.preventDefault(); location.href = '04-home-dashboard.html'; });
      }
    });
  }

  // Dashboard: pillar cards + sessions + add "+" button to daily check-in
  if (location.pathname.includes('04-home-dashboard')) {
    // Pillar cards - target the small stat cards in the grid
    document.querySelectorAll('.bg-slate-800\\/40, [class*="bg-slate-800"]').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      if (text.includes('ejercicio') && el.offsetHeight < 200) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => location.href = '09-exercise.html');
      } else if (text.includes('terapias') && el.offsetHeight < 200) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => location.href = '10-therapies.html');
      } else if ((text.includes('nutrici') || text.includes('🥗')) && el.offsetHeight < 200) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => location.href = '12-nutrition.html');
      } else if ((text.includes('suplem') || text.includes('💊')) && el.offsetHeight < 200) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => location.href = '13-supplementation.html');
      }
    });

    // "Próximas Sesiones" cards -> booking
    document.querySelectorAll('.bg-slate-800\\/30, [class*="bg-slate-800/30"]').forEach(el => {
      if (el.textContent.includes('Cámara') || el.textContent.includes('Sauna') || el.textContent.includes('Sesión')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => location.href = '11-booking.html');
      }
    });

    // The center "+" fab button -> daily check-in (the most natural daily action)
    document.querySelectorAll('nav a, nav div').forEach(el => {
      const icon = el.querySelector('.material-symbols-outlined');
      if (icon && icon.textContent.trim() === 'add') {
        el.style.cursor = 'pointer';
        if (el.tagName === 'A') el.href = '14-daily-checkin.html';
        else el.addEventListener('click', () => location.href = '14-daily-checkin.html');
      }
    });
  }

  // Profile: wire "Dispositivos Conectados" section -> connected devices
  if (location.pathname.includes('08-profile')) {
    // Make the whole devices section clickable
    document.querySelectorAll('h3').forEach(h3 => {
      if (h3.textContent.includes('Dispositivos')) {
        const section = h3.nextElementSibling;
        if (section) {
          section.style.cursor = 'pointer';
          section.addEventListener('click', () => location.href = '15-connected-devices.html');
        }
        // Also make the h3 title clickable
        h3.style.cursor = 'pointer';
        h3.addEventListener('click', () => location.href = '15-connected-devices.html');
      }
    });

    // "Conectar nuevo dispositivo" button -> connected devices
    document.querySelectorAll('button').forEach(el => {
      if (el.textContent.toLowerCase().includes('conectar nuevo')) {
        el.addEventListener('click', e => { e.preventDefault(); location.href = '15-connected-devices.html'; });
      }
    });

    // Add a link to daily check-in from profile's "Analíticas" button
    document.querySelectorAll('button').forEach(el => {
      if (el.textContent.toLowerCase().includes('analíticas') || el.textContent.toLowerCase().includes('analiticas')) {
        el.addEventListener('click', () => location.href = '07-progress-avatar.html');
      }
    });
  }

  // Connected Devices: back to profile
  if (location.pathname.includes('15-connected-devices')) {
    document.querySelectorAll('a[href="#"], button').forEach(el => {
      const icon = el.querySelector('.material-symbols-outlined');
      if (icon && (icon.textContent.trim() === 'arrow_back' || icon.textContent.trim() === 'close')) {
        el.addEventListener('click', e => { e.preventDefault(); location.href = '08-profile.html'; });
      }
    });
  }

  // Daily check-in: back to dashboard
  if (location.pathname.includes('14-daily-checkin')) {
    document.querySelectorAll('button').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      if (text.includes('enviar') || text.includes('guardar') || text.includes('completar') || text.includes('finalizar')) {
        el.addEventListener('click', e => { e.preventDefault(); location.href = '04-home-dashboard.html'; });
      }
    });
  }

  // Exercise/Therapies/Nutrition/Supplements: back to dashboard
  ['09-exercise', '10-therapies', '12-nutrition', '13-supplementation'].forEach(screen => {
    if (location.pathname.includes(screen)) {
      document.querySelectorAll('button').forEach(el => {
        const text = el.textContent.trim().toLowerCase();
        if (text.includes('reservar') || text.includes('agendar')) {
          el.addEventListener('click', e => { e.preventDefault(); location.href = '11-booking.html'; });
        }
      });
    }
  });
})();
