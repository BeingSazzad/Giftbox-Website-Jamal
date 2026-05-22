export interface FaqItem {
  q: string
  a: string
}

export interface TermsSection {
  id: string
  number: string
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

export interface PrivacySection {
  id: string
  number: string
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

// ── DEFAULT DATA ──────────────────────────────────────────────

const defaultFaqs: FaqItem[] = [
  {
    q: 'How do I participate in a draw?',
    a: 'Select a draw, complete the payment, upload payment proof, and wait for approval.',
  },
  {
    q: 'How long does verification take?',
    a: 'Payment verification usually takes 24-48 hours. You will be notified by app and email once complete.',
  },
  {
    q: 'How are winners selected?',
    a: 'Winners are chosen through a certified random draw on the scheduled date. Each ticket has an equal chance.',
  },
  {
    q: 'Can I get a refund?',
    a: 'Tickets are non-refundable, even in case of error or non-winning. Please double-check your details before submitting.',
  },
  {
    q: 'How do I claim my prize?',
    a: 'If you win, our team will reach out via WhatsApp or phone call within 24 hours to arrange delivery.',
  },
  {
    q: 'Is there a limit to how many tickets I can purchase?',
    a: 'No, you can purchase as many tickets as you like to increase your chances of winning the featured prize.',
  },
  {
    q: 'What payment methods are supported?',
    a: 'We support secure payments via popular mobile payment methods (M-Pesa, Orange Money, Wave) and bank transfers.',
  },
  {
    q: 'How can I verify the draw is genuine?',
    a: 'Every single draw is conducted live using a certified random draw system. We publish full draw recordings and verified winner lists.',
  },
  {
    q: 'Are my personal details secure?',
    a: 'Absolutely. We only use your registration details for delivery and identification. We never store financial credentials.',
  },
  {
    q: 'What if I upload the wrong payment proof?',
    a: 'Our support team will decline the proof and add a note explaining why. You will be able to upload the correct transaction proof immediately.',
  }
]

const defaultTerms: TermsSection[] = [
  {
    id: 'intro',
    number: '1',
    title: 'Introduction',
    paragraphs: [
      'The Gift Box application allows users to participate in prize draws for a chance to win prizes.',
      'Each entry requires the purchase of a ticket costing 2,500 CDF or more, depending on the prize.',
    ],
  },
  {
    id: 'reg',
    number: '2',
    title: 'Registration',
    paragraphs: [
      'To use the application, users must be 18 years of age or older, provide accurate information during registration, and reside in one of the eligible cities.',
    ],
  },
  {
    id: 'areas',
    number: '3',
    title: 'Eligible Areas',
    paragraphs: [
      'The draws are valid only in the following cities: Kinshasa, Matadi, Goma, Moanda, Kimpese, Kikwit, and Mbanza-Ngungu.',
      'Users residing outside these cities are not eligible to receive a prize.',
    ],
  },
  {
    id: 'participation',
    number: '4',
    title: 'Participation in Draws',
    paragraphs: [
      'Each user may purchase only one ticket per draw, participate in a draw after payment confirmation, and use a ticket valid for only one draw. Tickets are non-refundable, even in case of error or non-winning.',
    ],
  },
  {
    id: 'payment',
    number: '5',
    title: 'Payment',
    paragraphs: [
      'Payments are made manually to the numbers displayed in the application. Proof of payment must be uploaded to validate participation.',
    ],
  },
  {
    id: 'winner',
    number: '6',
    title: 'Winner Selection',
    bullets: [
      'Winners are selected randomly.',
      'The number of winners depends on the prize offered.',
      'There will always be at least one winner per draw.',
      'Winners will be contacted via WhatsApp or by phone call using their registered number.',
    ],
  },
  {
    id: 'delivery',
    number: '7',
    title: 'Prize Delivery',
    bullets: [
      'Prizes are delivered in person or free of charge to the winner.',
      'The delivery period is a maximum of 5 days.',
      'No claims will be accepted after the prize has been delivered.',
      'If a winner does not respond within 3 days, the prize will be awarded to another randomly selected participant.',
    ],
  },
  {
    id: 'fraud',
    number: '8',
    title: 'Prohibition of Fraud',
    bullets: [
      'Any attempts at fraud will result in the permanent suspension of the account and the immediate cancellation of participation.',
      'This includes, in particular, sending false proof of payment, sharing images, and using false information.',
      'A suspected user can contact customer service to request a verification.',
    ],
  },
  {
    id: 'rewards',
    number: '9',
    title: 'Nature of Rewards',
    paragraphs: [
      'Rewards are only physical items; no cash prizes, vouchers, trips, or other financial value will be offered.',
    ],
  },
  {
    id: 'liability',
    number: '10',
    title: 'Limitation of Liability',
    paragraphs: [
      'Gift Box will not be held liable for payment errors made by the user, issues related to misuse of the application, or incorrect information provided by the user.',
    ],
  },
  {
    id: 'suspension',
    number: '11',
    title: 'Account Suspension or Deletion',
    paragraphs: [
      'Gift Box reserves the right to suspend or delete an account and refuse participation in the event of non-compliance with these terms and conditions.',
    ],
  },
  {
    id: 'contact',
    number: '12',
    title: 'Contact',
    paragraphs: [
      'For any questions or assistance, please contact us at our email address: support@coffretcadeau.cd or message us on WhatsApp: +243 xxx xxx xxx',
      'Gift Box reserves the right to modify these terms and conditions at any time.',
    ],
  },
]

const defaultPrivacy: PrivacySection[] = [
  {
    id: 'collection',
    number: '1',
    title: 'Information We Collect',
    paragraphs: [
      'We collect personal data you provide during registration, including your full name, email, phone number, and city of residence.',
      'For payment validation, we require screenshots of your transaction proofs. No payment card data is collected or processed.',
    ],
  },
  {
    id: 'use',
    number: '2',
    title: 'How We Use Your Information',
    bullets: [
      'To verify and approve ticket purchases for draw participation.',
      'To contact winner candidates and coordinate secure physical prize distribution.',
      'To prevent draw manipulation and maintain structural platform integrity.',
    ],
  },
  {
    id: 'protection',
    number: '3',
    title: 'Data Protection & Security',
    paragraphs: [
      'All uploaded transaction screenshots and user settings profiles are saved on encrypted secure cloud databases.',
      'Personal identifiers are access-controlled and strictly hidden from third parties.',
    ],
  },
  {
    id: 'sharing',
    number: '4',
    title: 'Information Sharing & Disclosure',
    paragraphs: [
      'We do not sell, rent, or trade your personal information. Data is shared with delivery services solely to facilitate prize drop-offs.',
    ],
  },
  {
    id: 'cookies',
    number: '5',
    title: 'Cookies & Browser Storage',
    paragraphs: [
      'We utilize local cache storage parameters to persist active sessions and secure authentication tokens.',
    ],
  },
  {
    id: 'retention',
    number: '6',
    title: 'Data Retention Policy',
    paragraphs: [
      'Inactive accounts or deleted logs are cleared from our active directories within 90 days, excluding legal transaction data required by audits.',
    ],
  },
  {
    id: 'rights',
    number: '7',
    title: 'Your Privacy Rights',
    paragraphs: [
      'You hold complete rights to review, modify, or permanently request deletion of your profiles at any time by contacting our support desks.',
    ],
  },
  {
    id: 'changes',
    number: '8',
    title: 'Changes to This Policy',
    paragraphs: [
      'We may periodically update our privacy protocols. Continued utilization of the app represents agreement to terms.',
    ],
  },
  {
    id: 'contact',
    number: '9',
    title: 'Contact',
    paragraphs: [
      'If you have any questions or concerns about this Privacy Policy or how your data is handled, please contact us at: support@coffretcadeau.cd or via WhatsApp: +243 xxx xxx xxx',
    ],
  },
]

// ── GETTER / SETTER API ───────────────────────────────────────

export function getDynamicFaqs(): FaqItem[] {
  if (typeof window === 'undefined') return defaultFaqs
  try {
    const saved = localStorage.getItem('gb_faqs')
    return saved ? JSON.parse(saved) : defaultFaqs
  } catch {
    return defaultFaqs
  }
}

export function setDynamicFaqs(items: FaqItem[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem('gb_faqs', JSON.stringify(items))
}

export function getDynamicTerms(): TermsSection[] {
  if (typeof window === 'undefined') return defaultTerms
  try {
    const saved = localStorage.getItem('gb_terms')
    return saved ? JSON.parse(saved) : defaultTerms
  } catch {
    return defaultTerms
  }
}

export function setDynamicTerms(items: TermsSection[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem('gb_terms', JSON.stringify(items))
}

export function getDynamicPrivacy(): PrivacySection[] {
  if (typeof window === 'undefined') return defaultPrivacy
  try {
    const saved = localStorage.getItem('gb_privacy')
    return saved ? JSON.parse(saved) : defaultPrivacy
  } catch {
    return defaultPrivacy
  }
}

export function setDynamicPrivacy(items: PrivacySection[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem('gb_privacy', JSON.stringify(items))
}

export function resetDynamicContent() {
  if (typeof window === 'undefined') return
  localStorage.removeItem('gb_faqs')
  localStorage.removeItem('gb_terms')
  localStorage.removeItem('gb_privacy')
}
