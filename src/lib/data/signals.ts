import type { Signal } from '@/types/signal'

// Seed data — 3 example signals to show the expected shape.
// TODO (candidate): extend this list to at least 12 varied signals
// across all three `SignalType` values, multiple locations, and a mix
// of author roles. See Docs/ASSESSMENT.md for requirements.
export const signals: Signal[] = [
  {
    id: 'sig_001',
    title: 'Looking for help with housing paperwork',
    description:
      'Recently released and struggling to complete the housing application forms. Any practitioner who could walk me through it would be a huge help.',
    type: 'SUPPORT_NEEDED',
    visibility: 'PUBLIC',
    author: {
      id: 'usr_001',
      displayName: 'James W.',
      role: 'SERVICE_USER',
    },
    location: 'Manchester, UK',
    interests: ['housing', 'paperwork', 'reintegration'],
    createdAt: '2026-04-22T10:00:00.000Z',
  },
  {
    id: 'sig_002',
    title: 'Offering free CV review sessions this month',
    description:
      'I run employment workshops for ex-offenders in the Midlands. Happy to do 30-minute CV reviews over video call — no cost, just drop me a message.',
    type: 'SUPPORT_OFFERED',
    visibility: 'PUBLIC',
    author: {
      id: 'usr_002',
      displayName: 'Priya Sharma',
      role: 'PRACTITIONER',
    },
    location: 'Birmingham, UK',
    interests: ['employment', 'cv', 'mentoring'],
    createdAt: '2026-04-20T14:30:00.000Z',
  },
  {
    id: 'sig_003',
    title: 'Student research on rehabilitation outcomes',
    description:
      'Final-year criminology student collecting anonymous stories for my dissertation. All quotes fully anonymised before publication.',
    type: 'GENERAL',
    visibility: 'PUBLIC',
    author: {
      id: 'usr_003',
      displayName: 'Alex T.',
      role: 'STUDENT',
    },
    location: 'Leeds, UK',
    interests: ['research', 'rehabilitation', 'academic'],
    createdAt: '2026-04-18T09:15:00.000Z',
  },
]
