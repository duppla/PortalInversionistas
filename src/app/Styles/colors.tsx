const colorsButton: Record<string, string> = {
  futuro: 'bg-futuro border-2 border-futuro hover:bg-futuro-500 text-white focus:outline-futuro/10',
  proyeccion: 'bg-proyeccion border-2 border-proyeccion hover:bg-proyeccion-600 text-white focus:outline-proyeccion/10',
  cimiento: 'bg-cimiento border-2 border-cimiento hover:bg-cimiento-800 text-white focus:outline-cimiento/10',
  ilusion: 'bg-ilusion border-2 border-ilusion hover:bg-ilusion-dark text-futuro-darker focus:outline-cimiento/10 shadow-md shadow-futuro-darker/20',
  sonador: 'bg-sonador-dark border-2 border-none hover:bg-sonador text-futuro-darker focus:outline-cimiento/10 shadow-md shadow-futuro-darker/20',
  light: 'bg-sonador-darker/50 border-2 border-sonador-darker/30 hover:bg-sonador-darker text-sonador shadow-inner shadow-sonador/20 focus:outline-futuro/10',
  transparent: 'bg-transparent border-2 border-none hover:bg-sonador-darker/30 text-white focus:outline-futuro/10',
  toggle_l: 'bg-transparent border-2 border-none hover:bg-gradient-to-r from-sonador-darker/30 text-white focus:outline-futuro/10',
  toggle_c: 'bg-transparent border-2 border-none hover:bg-gradient-to-r from-transparent via-sonador-darker/30 text-white focus:outline-futuro/10',
  toggle_r: 'bg-transparent border-2 border-none hover:bg-gradient-to-l from-sonador-darker/30 text-white focus:outline-futuro/10',
  disabled: 'cursor-not-allowed bg-neutral-500 border-2 border-neutral-500 text-neutral-800'
}

const colorsHighlights: Record<string, string> = {
  futuro: 'bg-futuro/50 text-black',
  proyeccion: 'bg-proyeccion/50 text-black',
  cimiento: 'bg-cimiento/50 text-ilusion',
  ilusion: 'bg-ilusion-dark/50 text-cimiento',
  warning: 'bg-warning/50 text-warning-dark',
  error: 'bg-error-light/50 text-error',
}

const colorsFormSelector: Record<string, string> = {
  futuro: 'bg-futuro-100 border-futuro-200 text-futuro hover:border-futuro',
  proyeccion: 'bg-proyeccion/20 border-proyeccion-200 text-proyeccion hover:border-proyeccion',
  cimiento: 'bg-ilusion-light border-ilusion-dark text-cimiento hover:border-cimiento',
  sonador: 'bg-sonador-darker/50 border-sonador/30 text-sonador shadow-inner shadow-sonador/20 backdrop-blur shadow-inner shadow-futuro-darker/30',
  warning: 'bg-warning-light border-warning text-warning-dark hover:border-warning-dark',
  error: 'bg-error-light/50 border-error-light text-error hover:border-error',
}

const colorsCard: Record<string, string> = {
  futuro: 'bg-futuro text-white',
  proyeccion: 'bg-proyeccion text-black',
  cimiento: 'bg-cimiento text-ilusion',
  ilusion: 'bg-gradient-to-r from-ilusion-dark to-ilusion text-futuro-darker border border-ilusion-dark/30 shadow-lg shadow-ilusion-dark/20',
  warning: 'bg-warning text-white',
  warningLight: 'bg-warning-light text-warning',
  highlight: 'bg-gradient-to-r from-futuro-darker/50 to-80% to-highlight/50 border border-l-0 border-sonador-darker/30 text-sonador shadow-2xl shadow-highlight/50',
  light: 'bg-sonador-darker/50 border border-sonador-darker/30 text-sonador shadow-inner shadow-sonador/20',
  transparent: 'bg-transparent text-black',
  sonador: 'bg-sonador/10 border border-sonador/30 text-sonador shadow-inner shadow-sonador/20',
  white: 'bg-white/10 border border-white/20 text-futuro-100 shadow-lg shadow-black/20',
  error: 'bg-error text-white',
  errorLight: 'bg-error-light text-error',
  gradientLight: 'bg-gradient-to-b from-[#6684F3] to-[#BBCAFF]'
}

export {
  colorsButton,
  colorsCard,
  colorsFormSelector,
  colorsHighlights
}