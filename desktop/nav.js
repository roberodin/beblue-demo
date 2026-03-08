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

    // Get text label
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

  // Wire back buttons and breadcrumbs
  document.querySelectorAll('a[href="#"], button, span').forEach(el => {
    const icon = el.querySelector('.material-symbols-outlined') || (el.classList.contains('material-symbols-outlined') ? el : null);
    const iconName = icon ? icon.textContent.trim() : '';

    if (iconName === 'arrow_back' || iconName === 'arrow_back_ios' || iconName === 'arrow_back_ios_new') {
      el.style.cursor = 'pointer';
      el.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (history.length > 1) {
          history.back();
        } else {
          location.href = '02-dashboard.html';
        }
      });
    }
  });

  // Login screen
  if (location.pathname.includes('01-login')) {
    document.querySelectorAll('button, a').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      if (text.includes('iniciar') || text.includes('entrar') || text.includes('acceder') || text.includes('sign in') || text.includes('login') || text.includes('ingresar')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', e => { e.preventDefault(); location.href = '02-dashboard.html'; });
      }
    });
  }

  // "Nuevo Paciente" / "Alta" buttons
  document.querySelectorAll('button, a').forEach(el => {
    const text = el.textContent.trim().toLowerCase();
    if (text.includes('nuevo paciente') || text.includes('alta paciente') || text.includes('añadir paciente') || text.includes('registrar paciente')) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', e => { e.preventDefault(); location.href = '10-registration-step1.html'; });
    }
    if (text.includes('ver paciente') || text.includes('ver ficha') || text.includes('ver detalle')) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', e => { e.preventDefault(); location.href = '04-patient-record.html'; });
    }
    if (text.includes('editar programa') || text.includes('ver programa') || text.includes('asignar programa')) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', e => { e.preventDefault(); location.href = '05-program-editor.html'; });
    }
    if (text.includes('nueva revisión') || text.includes('nueva revision') || text.includes('revisar') || text.includes('seguimiento')) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', e => { e.preventDefault(); location.href = '08-review-v1.html'; });
    }
  });

  // Patient list: make patient rows clickable
  if (location.pathname.includes('03-patient-list')) {
    document.querySelectorAll('tr, [class*="patient"], [class*="card"]').forEach(el => {
      if (el.querySelector('img') && el.textContent.includes('años')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => location.href = '04-patient-record.html');
      }
    });
  }

  // Registration flow: next step buttons
  if (location.pathname.includes('10-registration-step1')) {
    wireStepButton('11-registration-step2.html');
  }
  if (location.pathname.includes('11-registration-step2')) {
    wireStepButton('12-assessment-step3.html');
  }
  if (location.pathname.includes('12-assessment-step3')) {
    wireStepButton('13-registration-step4.html');
  }
  if (location.pathname.includes('13-registration-step4')) {
    wireStepButton('04-patient-record.html');
  }

  // Step indicator clicks
  document.querySelectorAll('[class*="step"], [class*="Step"]').forEach(el => {
    const text = el.textContent.trim();
    if (text.includes('1') && text.includes('Datos') || text.includes('Paso 1')) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => location.href = '10-registration-step1.html');
    }
    if (text.includes('2') && (text.includes('Médico') || text.includes('Historial')) || text.includes('Paso 2')) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => location.href = '11-registration-step2.html');
    }
    if (text.includes('3') && (text.includes('Evaluación') || text.includes('Assessment')) || text.includes('Paso 3')) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => location.href = '12-assessment-step3.html');
    }
    if (text.includes('4') && (text.includes('Programa') || text.includes('Confirm')) || text.includes('Paso 4')) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => location.href = '13-registration-step4.html');
    }
  });

  function wireStepButton(nextPage) {
    document.querySelectorAll('button').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      if (text.includes('siguiente') || text.includes('continuar') || text.includes('next') || text.includes('guardar') || text.includes('finalizar') || text.includes('completar') || text.includes('confirmar')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', e => { e.preventDefault(); location.href = nextPage; });
      }
    });
  }

  // Dashboard: make cards/widgets clickable where logical
  if (location.pathname.includes('02-dashboard')) {
    document.querySelectorAll('a[href="#"]').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      if (text.includes('ver todos') || text.includes('ver lista')) {
        el.href = '03-patient-list.html';
      }
    });
  }
})();
