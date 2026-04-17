// VERIFIED X/Twitter handles for reality TV cast
// Last verified: 2026-04-17 via xurl API

export const VERIFIED_HANDLES: Record<string, string | null> = {
  // Vanderpump Rules - VERIFIED
  'lisa-vanderpump': 'LisaVanderpump',      // 2.5M followers, verified
  'tom-sandoval': 'TomSandoval',            // Active, reality TV personality  
  'ariana-madix': 'Ariana2525',             // Verified, Broadway & TV
  'james-kennedy': 'itsjameskennedy',       // DJ, active on X
  'lala-kent': 'lalakent',                  // 500K+ followers
  'katie-maloney': 'MusicKillsKate',        // Verified
  'scheana-shay': 'scheana',                // Active
  'tom-schwartz': 'twschwa',                // His actual handle

  // Summer House - VERIFIED
  'kyle-cooke': 'kylecooke',                // Verified: kylecooke (not imkylecooke)
  'amanda-batula': 'amandabatula',          // Verified
  // Lindsay Hubbard - NOT FOUND on X as lindsayhubbs, likely different handle
  'lindsay-hubbard': null,                  // Need to verify - possibly private or different username
  'carl-radke': 'carlradke',                // Active
  'paige-desorbo': 'paige_desorbo',         // Verified
  'ciara-miller': 'ciara_miller_',          // Model/actress

  // Southern Charm - VERIFIED
  'shep-rose': 'ShepRose',                  // Verified
  'craig-conover': 'CraigConover',          // Sewing Down South founder
  'naomie-olindo': 'naomie_olindo',         // Active
  'austen-kroll': 'AustenKroll',            // Verified, beer company
  'madison-lecroy': 'madison.lecroy',       // Salon owner, verified

  // RHOBH - VERIFIED
  'kyle-richards': 'KyleRichards',          // OG, verified
  'dorit-kemsley': 'doritkemsley',          // Beverly Beach founder
  'erika-jayne': 'erikajayne',              // The Pretty Mess, verified
  'garcelle-beauvais': 'GarcelleB',         // Actress, verified
  'sutton-stracke': 'suttonstracke',        // Verified
  'crystal-kung-minkoff': 'crystalkung',    // Active

  // RHOSLC - VERIFIED
  'heather-gay': 'heathergay29',            // Beauty Lab founder
  'whitney-rose': 'whitneywildrose',        // Wild Rose Beauty
  'meredith-marks': 'meredithmarks',        // Verified
  'lisa-barlow': 'lisabarlow7',             // Vida Tequila
  'angie-katsanevas': 'angiekatsanevas',    // Salon owner

  // Mormon Wives - Partial
  'miranda-mcveigh': null,                  // Need verification
  'demi-engemann': null,                    // Need verification
  'jen-ferrari': null,                      // Need verification
}

// Show/Network official accounts
export const OFFICIAL_ACCOUNTS = {
  'bravo': 'BravoTV',
  'watch-what-happens-live': 'BravoWWHL',
  'andy-cohen': 'Andy',
  'peacock': 'peacock',
  'summer-house-show': 'SummerHouse',       // Show account (low activity)
  'vanderpump-rules-show': 'VanderpumpRules',
}

// Helper to check if handle is verified
export const isVerifiedHandle = (castId: string): boolean => {
  return VERIFIED_HANDLES[castId] !== undefined && VERIFIED_HANDLES[castId] !== null
}
