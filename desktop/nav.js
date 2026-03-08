// BeBlue Desktop Navigation - Auto-wires all nav links
(function() {
  const iconMap = {
    'dashboard': '02-dashboard.html',
    'group': '03-patient-list.html',
    'calendar_today': '06-scheduling.html',
    'calendar_month': '06-scheduling.html',
    'stethoscope': '14-program-library.html',
    'medical_services': '15-equipment-management.html',
    'bar_chart': '07-analytics.html',
    'chat': '02-dashboard.html',
    'chat_bubble': '02-dashboard.html',
    'settings': '15-equipment-management.html',
    'library_books': '14-program-library.html',
    'build': '15-equipment-management.html',
    'health_and_safety': '02-dashboard.html',
    'person_add': '10-registration-step1.html',
  };

  const textMap = {
    'dashboard': '02-dashboard.html',
    'dashboard overview': '02-dashboard.html',
    'inicio': '02-dashboard.html',
    'pacientes': '03-patient-list.html',
    'agenda': '06-scheduling.html',
    'calendario': '06-scheduling.html',
    'terapias': '14-program-library.html',
    'tratamientos': '14-program-library.html',
    'programas': '14-program-library.html',
    'analíticas': '07-analytics.html',
    'analiticas': '07-analytics.html',
    'analítica': '07-analytics.html',
    'reportes': '07-analytics.html',
    'configuración': '15-equipment-management.html',
    'configuracion': '15-equipment-management.html',
    'ajustes': '15-equipment-management.html',
    'settings': '15-equipment-management.html',
    'mensajes': '02-dashboard.html',
    'equipos': '15-equipment-management.html',
    'biblioteca': '14-program-library.html',
  };

  // Wire sidebar nav links
  document.querySelectorAll('aside a[href="#"], nav a[href="#"]').forEach(el => {
    const icon = el.querySelector('.material-symbols-outlined');
    const iconName = icon ? icon.textContent.trim() : '';

    const spans = el.querySelectorAll('span, p');
    let label = '';
    spans.forEach(s => {
      const txt = s.textContent.trim().toLowerCase();
      if (txt && txt !== iconName && txt.length < 30) label = txt;
    });

    let target = textMap[label] || iconMap[iconName];

    if (target && target !== '#') {
      const currentFile = location.pathname.split('/').pop();
      if (target !== currentFile) {
        el.href = target;
        el.style.cursor = 'pointer';
      }
    }
  });

  // Wire back buttons
  document.querySelectorAll('a[href="#"], button, span').forEach(el => {
    const icon = el.querySelector('.material-symbols-outlined') || (el.classList && el.classList.contains('material-symbols-outlined') ? el : null);
    const iconName = icon ? icon.textContent.trim() : '';

    if (iconName === 'arrow_back' || iconName === 'arrow_back_ios' || iconName === 'arrow_back_ios_new') {
      el.style.cursor = 'pointer';
      el.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (history.length > 1) history.back();
        else location.href = '02-dashboard.html';
      });
    }
  });

  // Login screen -> Dashboard
  if (location.pathname.includes('01-login')) {
    document.querySelectorAll('button, a').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      if (text.includes('iniciar') || text.includes('entrar') || text.includes('acceder') || text.includes('sign in') || text.includes('login') || text.includes('ingresar')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', e => { e.preventDefault(); location.href = '02-dashboard.html'; });
      }
    });
  }

  // Wire text-based buttons across ALL pages
  document.querySelectorAll('button, a').forEach(el => {
    const text = el.textContent.trim().toLowerCase();

    // "Nuevo Paciente" -> Registration
    if (text.includes('nuevo paciente') || text.includes('alta paciente') || text.includes('añadir paciente') || text.includes('registrar paciente')) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', e => { e.preventDefault(); location.href = '10-registration-step1.html'; });
    }
    // "Ver Detalle" / "Ver Paciente" / "Ver Ficha" -> Patient Record
    if (text === 'ver detalle' || text === 'ver paciente' || text === 'ver ficha') {
      el.style.cursor = 'pointer';
      el.addEventListener('click', e => { e.preventDefault(); location.href = '04-patient-record.html'; });
    }
  });

  // Patient list: "Ver Detalle" buttons and patient rows -> patient record
  if (location.pathname.includes('03-patient-list')) {
    document.querySelectorAll('button').forEach(el => {
      if (el.textContent.trim() === 'Ver Detalle') {
        el.style.cursor = 'pointer';
        el.addEventListener('click', e => { e.preventDefault(); location.href = '04-patient-record.html'; });
      }
    });
    // Make table rows clickable
    document.querySelectorAll('tr').forEach(el => {
      if (el.querySelector('img') || el.textContent.includes('años')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => location.href = '04-patient-record.html');
      }
    });
  }

  // Dashboard: "Ver todos" links, cards
  if (location.pathname.includes('02-dashboard')) {
    document.querySelectorAll('a[href="#"], button').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      if (text.includes('ver todos') || text.includes('ver lista') || text.includes('ver más')) {
        el.href = '03-patient-list.html';
        el.style.cursor = 'pointer';
      }
    });
    // Patient cards on dashboard -> patient record
    document.querySelectorAll('[class*="card"], [class*="rounded-xl"]').forEach(el => {
      if (el.querySelector('img') && el.textContent.includes('años') && el.offsetHeight < 300) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => location.href = '04-patient-record.html');
      }
    });
  }

  // Patient Record: wire tab buttons and action buttons
  if (location.pathname.includes('04-patient-record')) {
    document.querySelectorAll('button').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      // "Nueva Consulta" -> Review v1
      if (text.includes('nueva consulta')) {
        el.addEventListener('click', e => { e.preventDefault(); location.href = '08-review-v1.html'; });
      }
      // "Protocolos" tab -> Program Editor
      if (text === 'protocolos') {
        el.addEventListener('click', e => { e.preventDefault(); location.href = '05-program-editor.html'; });
      }
      // "Analíticas" tab -> Analytics
      if (text === 'analíticas' || text === 'analiticas') {
        el.addEventListener('click', e => { e.preventDefault(); location.href = '07-analytics.html'; });
      }
      // "Historial" tab -> Review v2
      if (text === 'historial') {
        el.addEventListener('click', e => { e.preventDefault(); location.href = '09-review-v2.html'; });
      }
    });
    // "Revisiones" stat card -> Review v1
    document.querySelectorAll('div').forEach(el => {
      if (el.textContent.includes('Revisiones') && el.querySelector('.material-symbols-outlined') && el.offsetHeight < 150) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => location.href = '08-review-v1.html');
      }
    });
    // "Ver historial completo" -> Review v2
    document.querySelectorAll('p, a, span').forEach(el => {
      if (el.textContent.includes('Ver historial completo')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => location.href = '09-review-v2.html');
      }
    });
    // Breadcrumb "Pacientes" -> patient list
    document.querySelectorAll('a[href="#"]').forEach(el => {
      if (el.textContent.trim() === 'Pacientes') {
        el.href = '03-patient-list.html';
      }
    });
  }

  // Review v1 -> links to v2 and program editor
  if (location.pathname.includes('08-review')) {
    document.querySelectorAll('button, a').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      if (text.includes('ver programa') || text.includes('programa pautado') || text.includes('editar programa')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', e => { e.preventDefault(); location.href = '05-program-editor.html'; });
      }
      if (text.includes('guardar') || text.includes('finalizar') || text.includes('completar')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', e => { e.preventDefault(); location.href = '04-patient-record.html'; });
      }
    });
  }

  // Review v2: link to v1 and program editor
  if (location.pathname.includes('09-review')) {
    document.querySelectorAll('button, a').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      if (text.includes('nueva revisión') || text.includes('nueva revision') || text.includes('añadir revisión')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', e => { e.preventDefault(); location.href = '08-review-v1.html'; });
      }
      if (text.includes('ver programa') || text.includes('editar programa')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', e => { e.preventDefault(); location.href = '05-program-editor.html'; });
      }
    });
  }

  // Program Editor: save/finish -> patient record
  if (location.pathname.includes('05-program-editor')) {
    document.querySelectorAll('button').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      if (text.includes('guardar') || text.includes('aplicar') || text.includes('confirmar')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', e => { e.preventDefault(); location.href = '04-patient-record.html'; });
      }
    });
    // Breadcrumb "Pacientes" -> patient list
    document.querySelectorAll('a[href="#"]').forEach(el => {
      if (el.textContent.trim() === 'Pacientes') el.href = '03-patient-list.html';
    });
  }

  // Registration flow: next step buttons
  const stepFlow = {
    '10-registration-step1': '11-registration-step2.html',
    '11-registration-step2': '12-assessment-step3.html',
    '12-assessment-step3': '13-registration-step4.html',
    '13-registration-step4': '04-patient-record.html',
  };

  for (const [screen, nextPage] of Object.entries(stepFlow)) {
    if (location.pathname.includes(screen)) {
      document.querySelectorAll('button').forEach(el => {
        const text = el.textContent.trim().toLowerCase();
        if (text.includes('siguiente') || text.includes('continuar') || text.includes('next') || text.includes('guardar') || text.includes('finalizar') || text.includes('completar') || text.includes('confirmar')) {
          el.style.cursor = 'pointer';
          el.addEventListener('click', e => { e.preventDefault(); location.href = nextPage; });
        }
      });
    }
  }

  // Step indicators in registration screens
  const stepPages = {
    '1': '10-registration-step1.html',
    '2': '11-registration-step2.html',
    '3': '12-assessment-step3.html',
    '4': '13-registration-step4.html',
  };

  if (location.pathname.includes('registration') || location.pathname.includes('assessment')) {
    document.querySelectorAll('[class*="step"], [class*="Step"], a[href="#"]').forEach(el => {
      const text = el.textContent.trim();
      for (const [num, page] of Object.entries(stepPages)) {
        if (text.includes('Paso ' + num) || (text.match(new RegExp('^' + num + '\\.')) && text.length < 30)) {
          el.style.cursor = 'pointer';
          el.addEventListener('click', e => { e.preventDefault(); location.href = page; });
        }
      }
    });
  }

  // Analytics: breadcrumbs and links
  if (location.pathname.includes('07-analytics')) {
    document.querySelectorAll('a[href="#"]').forEach(el => {
      if (el.textContent.trim() === 'Pacientes') el.href = '03-patient-list.html';
    });
  }

  // Program Library: link to program editor
  if (location.pathname.includes('14-program-library')) {
    document.querySelectorAll('button, a').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      if (text.includes('editar') || text.includes('personalizar') || text.includes('usar plantilla') || text.includes('aplicar')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', e => { e.preventDefault(); location.href = '05-program-editor.html'; });
      }
    });
    // Program cards clickable -> program editor
    document.querySelectorAll('[class*="card"], [class*="rounded-xl"]').forEach(el => {
      if (el.textContent.includes('Programa') && el.offsetHeight > 50 && el.offsetHeight < 400) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => location.href = '05-program-editor.html');
      }
    });
  }

  // Equipment management: links to dashboard
  if (location.pathname.includes('15-equipment')) {
    document.querySelectorAll('a[href="#"]').forEach(el => {
      if (el.textContent.trim() === 'Dashboard') el.href = '02-dashboard.html';
    });
  }

  // Scheduling: event clicks -> patient record
  if (location.pathname.includes('06-scheduling')) {
    document.querySelectorAll('[class*="rounded"]').forEach(el => {
      if (el.textContent.includes('María') || el.textContent.includes('Carlos') || el.textContent.includes('paciente')) {
        if (el.offsetHeight < 200 && el.offsetHeight > 20) {
          el.style.cursor = 'pointer';
          el.addEventListener('click', () => location.href = '04-patient-record.html');
        }
      }
    });
  }
})();
