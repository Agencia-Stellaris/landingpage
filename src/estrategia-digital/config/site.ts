import logoUrl from '@/estrategia-digital/assets/stellaris_Isologo.png'

/**
 * Configuración central. Esta landing vive en un PATH del sitio principal:
 * https://www.stellaris.com.co/estrategia-digital
 * Servicios, política de privacidad y redes viven en el sitio principal;
 * desde aquí solo enlazamos hacia allá.
 */

const ENDPOINT =
  'https://script.google.com/macros/s/AKfycbzrHfxczSEx0hS0feM-_QrOaMNaCxLxOl2IJv78QM006Wo76S8Je39SGIkUt1RdKKeaBA/exec'

const MAIN_SITE = 'https://www.stellaris.com.co'
const LANDING_PATH = '/estrategia-digital'

export const siteConfig = {
  name: 'Stellaris',
  mainSite: MAIN_SITE,
  path: LANDING_PATH,
  canonicalUrl: `${MAIN_SITE}${LANDING_PATH}`,
  locale: 'es_CO',
  email: 'hola@stellaris.com.co',
  logo: logoUrl,
  // Integrada en el sitio principal: los assets se sirven desde la raíz del dominio.
  ogImage: `${MAIN_SITE}/og-default.png`,
  privacyUrl: `${MAIN_SITE}/politica-de-privacidad`,
  services: {
    redes: `${MAIN_SITE}/servicios/redes-sociales`,
    web: `${MAIN_SITE}/servicios/desarrollo-web`,
    whatsapp: `${MAIN_SITE}/servicios/whatsapp-marketing`,
    email: `${MAIN_SITE}/servicios/email-marketing`,
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/agenciastellaris/',
    instagram: 'https://www.instagram.com/agenciastellaris',
    facebook: 'https://www.facebook.com/agenciastellaris',
  },
} as const

/**
 * Endpoint del backend (Google Apps Script). Si está vacío, la landing
 * opera en MODO DEMO: valida y muestra el éxito sin enviar datos.
 */
export const leadConfig = {
  endpoint: ENDPOINT,
  demoMode: !ENDPOINT,
  privacyUrl: siteConfig.privacyUrl,
} as const
