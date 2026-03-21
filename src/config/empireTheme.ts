/**
 * Bamboo Empire Theme Tokens
 * 
 * Light green / sage / brown palette for the Empire game.
 */

export const EMPIRE_THEME = {
  // Backgrounds
  bg: {
    primary: '#F6F8F3',      // warm off-white
    secondary: '#EEF2EA',    // sage tint
    card: '#FAFBF8',         // slightly brighter for cards
    cardHover: '#F2F5EF',    // subtle hover state
  },
  
  // Primary (sage)
  sage: {
    DEFAULT: '#7A9B7E',
    dark: '#4F6F57',
    light: '#9BB8A0',
    muted: '#A8C4AC',
  },
  
  // Accent (light green)
  accent: {
    DEFAULT: '#BFE6C1',
    hover: '#A7DDB0',
    light: '#D4F0D6',
  },
  
  // Brown (wood)
  brown: {
    DEFAULT: '#6B4E3D',
    secondary: '#A07C5B',
    light: '#C4A882',
    muted: '#8B6B54',
  },
  
  // Neutral text
  text: {
    primary: '#1F2A22',      // nearly-black green
    secondary: '#5C6B60',    // muted
    muted: '#7A8A7E',
    inverse: '#FAFBF8',
  },
  
  // Borders
  border: {
    DEFAULT: '#D6E2D6',
    subtle: '#E4EBE4',
    sage: '#B8CDB9',
  },
  
  // Status colors
  status: {
    danger: '#B84C4C',
    dangerMuted: '#C97070',
    warning: '#B8873A',
    warningMuted: '#D4A85C',
    success: '#5A9B5E',
    successMuted: '#7CB880',
  },
  
  // Gradients (as Tailwind classes)
  gradients: {
    card: 'from-[#FAFBF8] to-[#F2F5EF]',
    sage: 'from-[#7A9B7E] to-[#5A8B5E]',
    accent: 'from-[#BFE6C1] to-[#A7DDB0]',
    brown: 'from-[#6B4E3D] to-[#8B6B54]',
    danger: 'from-[#B84C4C] to-[#C97070]',
    warning: 'from-[#B8873A] to-[#D4A85C]',
  },
} as const;

// Tailwind-compatible class generators
export const empireClasses = {
  // Backgrounds
  bgPrimary: 'bg-[#F6F8F3]',
  bgSecondary: 'bg-[#EEF2EA]',
  bgCard: 'bg-[#FAFBF8]',
  
  // Text
  textPrimary: 'text-[#1F2A22]',
  textSecondary: 'text-[#5C6B60]',
  textMuted: 'text-[#7A8A7E]',
  textSage: 'text-[#7A9B7E]',
  textBrown: 'text-[#6B4E3D]',
  
  // Borders
  borderDefault: 'border-[#D6E2D6]',
  borderSubtle: 'border-[#E4EBE4]',
  borderSage: 'border-[#B8CDB9]',
  
  // Buttons
  btnSage: 'bg-[#7A9B7E] hover:bg-[#4F6F57] text-white',
  btnAccent: 'bg-[#BFE6C1] hover:bg-[#A7DDB0] text-[#1F2A22]',
  btnBrown: 'bg-[#6B4E3D] hover:bg-[#8B6B54] text-white',
  
  // Status badges
  badgeDanger: 'bg-[#B84C4C]/10 text-[#B84C4C] border-[#B84C4C]/20',
  badgeWarning: 'bg-[#B8873A]/10 text-[#B8873A] border-[#B8873A]/20',
  badgeSuccess: 'bg-[#5A9B5E]/10 text-[#5A9B5E] border-[#5A9B5E]/20',
  badgeSage: 'bg-[#7A9B7E]/10 text-[#7A9B7E] border-[#7A9B7E]/20',
  
  // Cards
  card: 'bg-gradient-to-br from-[#FAFBF8] to-[#F2F5EF] border border-[#D6E2D6] rounded-xl shadow-sm',
  cardHover: 'hover:shadow-md hover:border-[#B8CDB9] transition-all duration-150',
  
  // Economic Weather colors
  weatherNormal: 'bg-[#7A9B7E]/20 border-[#7A9B7E]/30 text-[#4F6F57]',
  weatherTense: 'bg-[#B8873A]/20 border-[#B8873A]/30 text-[#8B6520]',
  weatherCrisis: 'bg-[#B84C4C]/20 border-[#B84C4C]/30 text-[#8B3030]',
} as const;

// Event severity to weather mapping
export type EconomicWeather = 'normal' | 'tense' | 'crisis';

export function getEconomicWeather(activeModifierCount: number, hasDangerEvent: boolean): EconomicWeather {
  if (hasDangerEvent || activeModifierCount >= 3) return 'crisis';
  if (activeModifierCount >= 1) return 'tense';
  return 'normal';
}

export const WEATHER_LABELS: Record<EconomicWeather, string> = {
  normal: 'Calm Markets',
  tense: 'Market Volatility',
  crisis: 'Economic Crisis',
};

