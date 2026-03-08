// BeBlue Desktop Navigation - Injects standardized sidebar + wires all links
(function() {
  const currentFile = location.pathname.split('/').pop();
  if (currentFile === '01-login.html') {
    // Login: just wire the button
    document.querySelectorAll('button, a').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      if (text.includes('iniciar') || text.includes('entrar') || text.includes('acceder') || text.includes('sign in') || text.includes('login') || text.includes('ingresar')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', e => { e.preventDefault(); location.href = '02-dashboard.html'; });
      }
    });
    return;
  }

  // Sidebar menu items
  const menuItems = [
    { icon: 'dashboard', label: 'Dashboard', href: '02-dashboard.html' },
    { icon: 'group', label: 'Pacientes', href: '03-patient-list.html' },
    { icon: 'calendar_today', label: 'Agenda', href: '06-scheduling.html' },
    { icon: 'stethoscope', label: 'Terapias', href: '14-program-library.html' },
    { icon: 'bar_chart', label: 'Analiticas', href: '07-analytics.html' },
    { icon: 'settings', label: 'Configuracion', href: '15-equipment-management.html', separator: true },
  ];

  // Which menu item is active for each page
  const activeMap = {
    '02-dashboard.html': 'Dashboard',
    '03-patient-list.html': 'Pacientes',
    '04-patient-record.html': 'Pacientes',
    '05-program-editor.html': 'Pacientes',
    '06-scheduling.html': 'Agenda',
    '07-analytics.html': 'Analiticas',
    '08-review-v1.html': 'Pacientes',
    '09-review-v2.html': 'Pacientes',
    '10-registration-step1.html': 'Pacientes',
    '11-registration-step2.html': 'Pacientes',
    '12-assessment-step3.html': 'Pacientes',
    '13-registration-step4.html': 'Pacientes',
    '14-program-library.html': 'Terapias',
    '15-equipment-management.html': 'Configuracion',
  };

  const activeLabel = activeMap[currentFile] || 'Dashboard';

  // Build sidebar HTML
  function buildSidebarHTML() {
    let navHTML = '';
    menuItems.forEach(item => {
      const isActive = item.label === activeLabel;
      if (item.separator) {
        navHTML += '<div style="margin-top:16px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.06);"></div>';
      }
      const bg = isActive ? 'background:rgba(19,91,236,0.9);color:#fff;' : 'color:#94A3B8;';
      const fontW = isActive ? 'font-weight:600;' : 'font-weight:500;';
      const fill = isActive ? "font-variation-settings:'FILL' 1;" : '';
      const hover = isActive ? '' : 'onmouseenter="this.style.background=\'rgba(255,255,255,0.05)\';this.style.color=\'#E2E8F0\';" onmouseleave="this.style.background=\'transparent\';this.style.color=\'#94A3B8\';"';
      navHTML += `<a href="${item.href}" style="display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:8px;text-decoration:none;transition:all 0.2s;${bg}${fontW}" ${hover}><span class="material-symbols-outlined" style="font-size:20px;${fill}">${item.icon}</span><span style="font-size:14px;font-family:Manrope,sans-serif;">${item.label}</span></a>`;
    });
    return navHTML;
  }

  function buildSidebar() {
    return `<div style="padding:24px 20px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;gap:10px;">
      <div style="width:32px;height:32px;background:#135BEC;border-radius:8px;display:flex;align-items:center;justify-content:center;">
        <span class="material-symbols-outlined" style="color:#fff;font-size:18px;font-weight:bold;">blur_on</span>
      </div>
      <div>
        <div style="color:#fff;font-size:16px;font-weight:800;font-family:Manrope,sans-serif;letter-spacing:-0.5px;">BE BLUE</div>
        <div style="color:#64748B;font-size:9px;text-transform:uppercase;letter-spacing:2px;font-weight:700;font-family:Manrope,sans-serif;">Clinical Staff</div>
      </div>
    </div>
    <nav style="flex:1;padding:16px 12px;display:flex;flex-direction:column;gap:4px;">
      ${buildSidebarHTML()}
    </nav>
    <div style="padding:16px;border-top:1px solid rgba(255,255,255,0.06);">
      <div style="display:flex;align-items:center;gap:10px;padding:8px;border-radius:12px;background:rgba(255,255,255,0.03);">
        <div style="width:36px;height:36px;border-radius:50%;background:#1E293B;display:flex;align-items:center;justify-content:center;">
          <span class="material-symbols-outlined" style="color:#94A3B8;font-size:20px;">person</span>
        </div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:13px;font-weight:700;color:#fff;font-family:Manrope,sans-serif;">Dr. Martinez</div>
          <div style="font-size:11px;color:#64748B;font-family:Manrope,sans-serif;">Especialista</div>
        </div>
      </div>
    </div>`;
  }

  // Find existing aside and replace, or inject new one
  const existingAside = document.querySelector('aside');

  if (existingAside) {
    // Replace content of existing aside, keep its position in DOM
    existingAside.innerHTML = buildSidebar();
    // Normalize styling
    existingAside.style.cssText = 'width:256px;flex-shrink:0;display:flex;flex-direction:column;background:#0B1120;border-right:1px solid rgba(255,255,255,0.06);height:100vh;position:sticky;top:0;overflow-y:auto;';
    // Remove fixed positioning if any
    existingAside.className = '';
  } else {
    // No sidebar exists - inject one
    const aside = document.createElement('aside');
    aside.innerHTML = buildSidebar();
    aside.style.cssText = 'width:256px;min-width:256px;flex-shrink:0;display:flex;flex-direction:column;background:#0B1120;border-right:1px solid rgba(255,255,255,0.06);height:100vh;position:fixed;top:0;left:0;overflow-y:auto;z-index:100;';

    document.body.insertBefore(aside, document.body.firstChild);

    // Push main content to the right
    const mainContent = aside.nextElementSibling;
    if (mainContent) {
      mainContent.style.marginLeft = '256px';
    }
    // Also handle body-level flex layouts
    if (window.getComputedStyle(document.body).display !== 'flex') {
      document.body.style.paddingLeft = '256px';
      aside.style.position = 'fixed';
    }
  }

  // === WIRE UP NAVIGATION LINKS ===

  // Back buttons
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

  // Text-based buttons
  document.querySelectorAll('button, a').forEach(el => {
    const text = el.textContent.trim().toLowerCase();
    if (text.includes('nuevo paciente') || text.includes('alta paciente') || text.includes('añadir paciente')) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', e => { e.preventDefault(); location.href = '10-registration-step1.html'; });
    }
    if (text === 'ver detalle' || text === 'ver paciente' || text === 'ver ficha') {
      el.style.cursor = 'pointer';
      el.addEventListener('click', e => { e.preventDefault(); location.href = '04-patient-record.html'; });
    }
  });

  // Patient list: rows + Ver Detalle buttons
  if (currentFile === '03-patient-list.html') {
    document.querySelectorAll('button').forEach(el => {
      if (el.textContent.trim() === 'Ver Detalle') {
        el.style.cursor = 'pointer';
        el.addEventListener('click', e => { e.preventDefault(); location.href = '04-patient-record.html'; });
      }
    });
    document.querySelectorAll('tr').forEach(el => {
      if (el.querySelector('img') || el.textContent.includes('años')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => location.href = '04-patient-record.html');
      }
    });
  }

  // Dashboard: links
  if (currentFile === '02-dashboard.html') {
    document.querySelectorAll('a[href="#"], button').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      if (text.includes('ver todos') || text.includes('ver lista') || text.includes('ver más')) {
        if (el.tagName === 'A') el.href = '03-patient-list.html';
        else el.addEventListener('click', () => location.href = '03-patient-list.html');
        el.style.cursor = 'pointer';
      }
    });
  }

  // Patient Record: action buttons
  if (currentFile === '04-patient-record.html') {
    document.querySelectorAll('button').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      if (text.includes('nueva consulta')) el.addEventListener('click', e => { e.preventDefault(); location.href = '08-review-v1.html'; });
      if (text === 'protocolos') el.addEventListener('click', e => { e.preventDefault(); location.href = '05-program-editor.html'; });
      if (text === 'analíticas' || text === 'analiticas') el.addEventListener('click', e => { e.preventDefault(); location.href = '07-analytics.html'; });
      if (text === 'historial') el.addEventListener('click', e => { e.preventDefault(); location.href = '09-review-v2.html'; });
    });
    document.querySelectorAll('div').forEach(el => {
      if (el.textContent.includes('Revisiones') && el.querySelector('.material-symbols-outlined') && el.offsetHeight < 150) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => location.href = '08-review-v1.html');
      }
    });
    document.querySelectorAll('p, a, span').forEach(el => {
      if (el.textContent.includes('Ver historial completo')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => location.href = '09-review-v2.html');
      }
    });
    document.querySelectorAll('a[href="#"]').forEach(el => {
      if (el.textContent.trim() === 'Pacientes') el.href = '03-patient-list.html';
    });
  }

  // Reviews
  if (currentFile.includes('review')) {
    document.querySelectorAll('button, a').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      if (text.includes('ver programa') || text.includes('editar programa') || text.includes('programa pautado')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', e => { e.preventDefault(); location.href = '05-program-editor.html'; });
      }
      if (text.includes('guardar') || text.includes('finalizar') || text.includes('completar')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', e => { e.preventDefault(); location.href = '04-patient-record.html'; });
      }
      if (text.includes('nueva revisión') || text.includes('nueva revision')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', e => { e.preventDefault(); location.href = '08-review-v1.html'; });
      }
    });
  }

  // Program Editor
  if (currentFile === '05-program-editor.html') {
    document.querySelectorAll('button').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      if (text.includes('guardar') || text.includes('aplicar') || text.includes('confirmar')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', e => { e.preventDefault(); location.href = '04-patient-record.html'; });
      }
    });
    document.querySelectorAll('a[href="#"]').forEach(el => {
      if (el.textContent.trim() === 'Pacientes') el.href = '03-patient-list.html';
    });
  }

  // Registration flow
  const stepFlow = {
    '10-registration-step1.html': '11-registration-step2.html',
    '11-registration-step2.html': '12-assessment-step3.html',
    '12-assessment-step3.html': '13-registration-step4.html',
    '13-registration-step4.html': '04-patient-record.html',
  };
  if (stepFlow[currentFile]) {
    document.querySelectorAll('button').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      if (text.includes('siguiente') || text.includes('continuar') || text.includes('guardar') || text.includes('finalizar') || text.includes('completar') || text.includes('confirmar')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', e => { e.preventDefault(); location.href = stepFlow[currentFile]; });
      }
    });
  }

  // Program Library: cards -> editor
  if (currentFile === '14-program-library.html') {
    document.querySelectorAll('button, a').forEach(el => {
      const text = el.textContent.trim().toLowerCase();
      if (text.includes('editar') || text.includes('personalizar') || text.includes('usar') || text.includes('aplicar')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', e => { e.preventDefault(); location.href = '05-program-editor.html'; });
      }
    });
  }

  // Scheduling: events -> patient record
  if (currentFile === '06-scheduling.html') {
    document.querySelectorAll('[class*="rounded"]').forEach(el => {
      const text = el.textContent;
      if ((text.includes('María') || text.includes('Carlos') || text.includes('Ana')) && el.offsetHeight < 200 && el.offsetHeight > 20) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => location.href = '04-patient-record.html');
      }
    });
  }

  // Breadcrumbs: "Pacientes" link
  document.querySelectorAll('a[href="#"], span').forEach(el => {
    if (el.textContent.trim() === 'Pacientes' && el.tagName === 'A') {
      el.href = '03-patient-list.html';
    }
  });
})();
