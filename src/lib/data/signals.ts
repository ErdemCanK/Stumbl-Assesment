import type { Signal, ReferralContact } from '@/types/signal'

// Seed data — 3 example signals to show the expected shape.
// TODO (candidate): extend this list to at least 12 varied signals
// across all three `SignalType` values, multiple locations, a mix of
// author roles, priorities, and categories. See Docs/ASSESSMENT.md.
export const signals: Signal[] = [
  {
    id: 'sig_001',
    title: 'Update to Admins — HMP Sudbury rollout',
    description:
      "We're rolling out at HMP Sudbury in June, prisoners will start posting signals around release (housing, employment, training, the lot). Organisation admins: time to get your invites sent out and practitioners signed up. Invites take only a minute to send out via your dashboards. Message me if you hit any issues.",
    type: 'GENERAL',
    category: 'Awareness',
    priority: 'HIGH',
    visibility: 'PUBLIC',
    author: {
      id: 'usr_001',
      displayName: 'Francis Molloy',
      role: 'PRACTITIONER',
      verified: true,
    },
    location: 'Nationwide',
    interests: ['General Support'],
    createdAt: '2026-04-23T09:00:00.000Z',
  },
  {
    id: 'sig_002',
    title: 'Offering free CV review sessions this month',
    description:
      'I run employment workshops for ex-offenders in the Midlands. Happy to do 30-minute CV reviews over video call — no cost, just drop me a message.',
    type: 'SUPPORT_OFFERED',
    category: 'Opportunity',
    priority: 'MEDIUM',
    visibility: 'PUBLIC',
    author: {
      id: 'usr_002',
      displayName: 'Priya Sharma',
      role: 'PRACTITIONER',
      verified: true,
    },
    location: 'Birmingham, UK',
    interests: ['employment', 'cv', 'mentoring'],
    createdAt: '2026-04-20T14:30:00.000Z',
  },
  {
    id: 'sig_003',
    title: 'Looking for help with housing paperwork',
    description:
      'Recently released and struggling to complete the housing application forms. Any practitioner who could walk me through it would be a huge help.',
    type: 'SUPPORT_NEEDED',
    category: 'Support',
    priority: 'LOW',
    visibility: 'PUBLIC',
    author: {
      id: 'usr_003',
      displayName: 'James W.',
      role: 'SERVICE_USER',
      verified: false,
    },
    location: 'Manchester, UK',
    interests: ['housing', 'paperwork', 'reintegration'],
    createdAt: '2026-04-18T10:00:00.000Z',
  },
]

// Contacts the user could refer a signal to via the Network/Refer modal.
// TODO (candidate): extend to at least 8 mixed contacts.
export const referralContacts: ReferralContact[] = [
  {
    id: 'con_001',
    displayName: 'Dr. Sarah Khan',
    role: 'PRACTITIONER',
    organisation: 'North West Housing Trust',
  },
  {
    id: 'con_002',
    displayName: 'Liam O’Brien',
    role: 'SUPPORTER',
    organisation: 'Reintegration Partners',
  },
  {
    id: 'con_003',
    displayName: 'Hannah Roberts',
    role: 'PRACTITIONER',
    organisation: 'Employment Futures',
  },
]
