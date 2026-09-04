export const APP_NAME = 'Smart Finance Analyzer';

export const ROUTES = {
  HOME: '/',
  INGESTA: '/ingesta',
  INGESTA_OCR: '/ingesta/ocr',
  INGESTA_MANUAL: '/ingesta/manual',
  INGESTA_PLANTILLAS: '/ingesta/plantillas',
  ANALISIS: '/analisis',
  ANALISIS_COMPARATIVO: '/analisis/comparativo',
  ANALISIS_RATIOS: '/analisis/ratios',
  REPORTES: '/reportes',
  REPORTES_PDF: '/reportes/pdf',
  REPORTES_EXCEL: '/reportes/excel'
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

export const NAVIGATION: ReadonlyArray<{
  section: string;
  label: string;
  route: AppRoute;
}> = [
  {
    section: 'Ingesta de datos',
    label: 'Carga e ingesta (OCR + IA)',
    route: ROUTES.INGESTA
  },
  {
    section: 'Análisis',
    label: 'Análisis financiero comparativo',
    route: ROUTES.ANALISIS
  },
  {
    section: 'Reportes',
    label: 'Generación de reportes',
    route: ROUTES.REPORTES
  }
];
