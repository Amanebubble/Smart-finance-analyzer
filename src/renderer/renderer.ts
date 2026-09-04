import { NAVIGATION, ROUTES } from '../shared/constants/navigation';

const nav = document.getElementById('nav') as HTMLDivElement;
const viewTitle = document.getElementById('view-title') as HTMLHeadingElement;
const viewDescription = document.getElementById('view-description') as HTMLParagraphElement;
const versionLabel = document.getElementById('version') as HTMLParagraphElement;

const VIEW_DESCRIPTIONS: Record<string, string> = {
  [ROUTES.HOME]: 'Bienvenido. Usa el menú para acceder a las fases del analizador.',
  [ROUTES.INGESTA]: 'Carga e ingesta de estados financieros mediante OCR + IA, carga manual o plantillas.',
  [ROUTES.ANALISIS]: 'Análisis financiero comparativo: variaciones MoM, YoY y ratios.',
  [ROUTES.REPORTES]: 'Generación de reportes en formato PDF y Excel.'
};

function renderNav(): void {
  for (const item of NAVIGATION) {
    const link = document.createElement('a');
    link.href = `#${item.route}`;
    link.textContent = item.label;
    link.dataset.route = item.route;
    nav.appendChild(link);
  }
}

function renderView(): void {
  const hash = window.location.hash.slice(1);
  const route = hash || ROUTES.HOME;
  const item = NAVIGATION.find((n) => n.route === route);
  const activeRoute = item ? item.route : ROUTES.HOME;

  viewTitle.textContent = item ? item.label : 'Inicio';
  viewDescription.textContent = VIEW_DESCRIPTIONS[activeRoute] ?? '';

  for (const link of nav.querySelectorAll('a')) {
    link.classList.toggle('active', link.dataset.route === activeRoute);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderView();
  window.addEventListener('hashchange', renderView);

  window.sfaApi.getAppVersion().then((version) => {
    versionLabel.textContent = `v${version}`;
  });
});
