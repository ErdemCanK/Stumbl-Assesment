/**
 * Seeds the local Postgres with the canonical Stumbl assessment fixtures:
 * 12 signals, 8 referral contacts, and their authors.
 *
 * Run with `npm run db:seed`.
 */
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

type SeedAuthor = {
  id: string
  displayName: string
  role:
    | 'SERVICE_USER'
    | 'PRACTITIONER'
    | 'STUDENT'
    | 'SUPPORTER'
  verified: boolean
  organisation?: string
  avatarUrl?: string
}

type SeedSignal = {
  id: string
  title: string
  description: string
  type: 'SUPPORT_NEEDED' | 'SUPPORT_OFFERED' | 'GENERAL'
  category:
    | 'Awareness'
    | 'Support'
    | 'Opportunity'
    | 'Alert'
    | 'Question'
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  visibility: 'PUBLIC' | 'PRIVATE' | 'ORGANISATION_ONLY'
  location: string
  interests: string[]
  createdAt: string
  authorId: string
}

const authors: SeedAuthor[] = [
  { id: 'auth_francis',  displayName: 'Francis Molloy',    role: 'PRACTITIONER', verified: true,  organisation: 'Stumbl HQ' },
  { id: 'auth_priya',    displayName: 'Priya Sharma',      role: 'PRACTITIONER', verified: true,  organisation: 'Employment Futures' },
  { id: 'auth_james',    displayName: 'James W.',          role: 'SERVICE_USER', verified: false },
  { id: 'auth_alex',     displayName: 'Alex Thompson',     role: 'STUDENT',      verified: false, organisation: 'University of Leeds' },
  { id: 'auth_hannah',   displayName: 'Hannah Roberts',    role: 'PRACTITIONER', verified: true,  organisation: 'Employment Futures' },
  { id: 'auth_liam',     displayName: 'Liam O’Brien',      role: 'SUPPORTER',    verified: true,  organisation: 'Reintegration Partners' },
  { id: 'auth_sarah',    displayName: 'Dr. Sarah Khan',    role: 'PRACTITIONER', verified: true,  organisation: 'North West Housing Trust' },
  { id: 'auth_marcus',   displayName: 'Marcus Reid',       role: 'SERVICE_USER', verified: false },
  { id: 'auth_emma',     displayName: 'Emma Clarke',       role: 'PRACTITIONER', verified: true,  organisation: 'Mindful Recovery' },
  { id: 'auth_daniel',   displayName: 'Daniel Okafor',     role: 'SUPPORTER',    verified: false, organisation: 'Hope Network' },
  { id: 'auth_rosie',    displayName: 'Rosie Patel',       role: 'STUDENT',      verified: false, organisation: 'King’s College London' },
  { id: 'auth_tom',      displayName: 'Tom Harrington',    role: 'PRACTITIONER', verified: true,  organisation: 'Bridge Probation Services' },
  { id: 'auth_naomi',    displayName: 'Naomi Fielding',    role: 'PRACTITIONER', verified: true,  organisation: 'Birmingham Skills Trust' },
  { id: 'auth_reece',    displayName: 'Reece Walker',      role: 'SERVICE_USER', verified: false },
]

const signals: SeedSignal[] = [
  {
    id: 'sig_001',
    title: 'Update to Admins — HMP Sudbury rollout',
    description:
      "We're rolling out at HMP Sudbury in June, prisoners will start posting signals around release (housing, employment, training, the lot). Organisation admins: time to get your invites sent out and practitioners signed up. Invites take only a minute to send out via your dashboards. Message me if you hit any issues.",
    type: 'GENERAL',
    category: 'Awareness',
    priority: 'HIGH',
    visibility: 'PUBLIC',
    location: 'Nationwide',
    interests: ['General Support'],
    createdAt: '2026-04-23T09:00:00.000Z',
    authorId: 'auth_francis',
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
    location: 'Birmingham, UK',
    interests: ['employment', 'cv', 'mentoring'],
    createdAt: '2026-04-20T14:30:00.000Z',
    authorId: 'auth_priya',
  },
  {
    id: 'sig_003',
    title: 'Looking for help with housing paperwork',
    description:
      'Recently released and struggling to complete the housing application forms. Any practitioner who could walk me through it would be a huge help.',
    type: 'SUPPORT_NEEDED',
    category: 'Support',
    priority: 'HIGH',
    visibility: 'PUBLIC',
    location: 'Manchester, UK',
    interests: ['housing', 'paperwork', 'reintegration'],
    createdAt: '2026-04-18T10:00:00.000Z',
    authorId: 'auth_james',
  },
  {
    id: 'sig_004',
    title: 'Research: anonymous stories on rehabilitation',
    description:
      'Final-year criminology student collecting anonymous stories for my dissertation. All quotes fully anonymised before publication.',
    type: 'GENERAL',
    category: 'Question',
    priority: 'LOW',
    visibility: 'PUBLIC',
    location: 'Leeds, UK',
    interests: ['research', 'rehabilitation', 'academic'],
    createdAt: '2026-04-15T09:15:00.000Z',
    authorId: 'auth_alex',
  },
  {
    id: 'sig_005',
    title: 'Urgent: temporary accommodation needed tonight',
    description:
      'Client released this afternoon with nowhere to sleep. If any supporter or practitioner has a lead on short-term housing in the Leeds area, please drop me a line immediately.',
    type: 'SUPPORT_NEEDED',
    category: 'Alert',
    priority: 'HIGH',
    visibility: 'PUBLIC',
    location: 'Leeds, UK',
    interests: ['housing', 'emergency', 'accommodation'],
    createdAt: '2026-04-24T17:45:00.000Z',
    authorId: 'auth_hannah',
  },
  {
    id: 'sig_006',
    title: 'New peer-support circle starting May',
    description:
      'Kicking off a weekly peer-support circle for men post-release. Free, confidential, in person. Message to reserve a spot — limited to 8 attendees.',
    type: 'SUPPORT_OFFERED',
    category: 'Opportunity',
    priority: 'MEDIUM',
    visibility: 'PUBLIC',
    location: 'Liverpool, UK',
    interests: ['peer-support', 'mental-health', 'community'],
    createdAt: '2026-04-19T11:20:00.000Z',
    authorId: 'auth_liam',
  },
  {
    id: 'sig_007',
    title: 'Free legal clinic for housing disputes',
    description:
      'Our charity runs a pro-bono legal clinic every other Tuesday. Bring your paperwork, we’ll bring the solicitor.',
    type: 'SUPPORT_OFFERED',
    category: 'Opportunity',
    priority: 'LOW',
    visibility: 'PUBLIC',
    location: 'London, UK',
    interests: ['legal', 'housing', 'rights'],
    createdAt: '2026-04-12T13:00:00.000Z',
    authorId: 'auth_sarah',
  },
  {
    id: 'sig_008',
    title: 'Can anyone help with travel costs for an interview?',
    description:
      'Got an interview in Sheffield next Thursday but can’t afford the train fare. Has anyone got a spare travel pass or budget line?',
    type: 'SUPPORT_NEEDED',
    category: 'Support',
    priority: 'MEDIUM',
    visibility: 'PUBLIC',
    location: 'Sheffield, UK',
    interests: ['travel', 'employment', 'finance'],
    createdAt: '2026-04-21T08:10:00.000Z',
    authorId: 'auth_marcus',
  },
  {
    id: 'sig_009',
    title: 'Mindfulness sessions (free) for practitioners',
    description:
      'Burnout is real. I’m running guided mindfulness sessions for practitioners and caseworkers every Friday at 12:00. Free — just bring headphones.',
    type: 'SUPPORT_OFFERED',
    category: 'Opportunity',
    priority: 'LOW',
    visibility: 'PUBLIC',
    location: 'Online',
    interests: ['wellbeing', 'mental-health', 'practitioner-support'],
    createdAt: '2026-04-17T10:00:00.000Z',
    authorId: 'auth_emma',
  },
  {
    id: 'sig_010',
    title: 'Volunteer mentors needed for youth programme',
    description:
      'We’re looking for lived-experience mentors to support 16–24 year olds leaving custody. 2 hours a week, full training provided.',
    type: 'GENERAL',
    category: 'Awareness',
    priority: 'MEDIUM',
    visibility: 'PUBLIC',
    location: 'Bristol, UK',
    interests: ['mentoring', 'youth', 'volunteering'],
    createdAt: '2026-04-10T15:30:00.000Z',
    authorId: 'auth_daniel',
  },
  {
    id: 'sig_011',
    title: 'Looking to interview practitioners for my thesis',
    description:
      '30-minute ethics-approved interviews for MSc thesis on rehabilitation outcomes. Any practitioner with 2+ years experience very welcome.',
    type: 'GENERAL',
    category: 'Question',
    priority: 'LOW',
    visibility: 'PUBLIC',
    location: 'London, UK',
    interests: ['research', 'thesis', 'interviews'],
    createdAt: '2026-04-08T12:00:00.000Z',
    authorId: 'auth_rosie',
  },
  {
    id: 'sig_012',
    title: 'Caseload capacity just opened — Greater Manchester',
    description:
      'Had two clients transition out this week, so I have capacity for 2 new referrals. Drug & alcohol support specialism.',
    type: 'SUPPORT_OFFERED',
    category: 'Opportunity',
    priority: 'MEDIUM',
    visibility: 'PUBLIC',
    location: 'Manchester, UK',
    interests: ['substance-misuse', 'casework', 'capacity'],
    createdAt: '2026-04-22T16:00:00.000Z',
    authorId: 'auth_tom',
  },
  {
    id: 'sig_013',
    title: 'Skills fair — Birmingham, 8th May',
    description:
      '20+ employers, all open to recruiting people with convictions. Free to attend, no registration needed. Spread the word.',
    type: 'GENERAL',
    category: 'Awareness',
    priority: 'MEDIUM',
    visibility: 'PUBLIC',
    location: 'Birmingham, UK',
    interests: ['employment', 'event', 'skills'],
    createdAt: '2026-04-14T09:00:00.000Z',
    authorId: 'auth_naomi',
  },
  {
    id: 'sig_014',
    title: 'Anyone know a landlord that takes ex-offenders?',
    description:
      'Struggling to find any private landlord in Newcastle willing to rent to someone with a record. Any leads appreciated.',
    type: 'SUPPORT_NEEDED',
    category: 'Question',
    priority: 'MEDIUM',
    visibility: 'PUBLIC',
    location: 'Newcastle, UK',
    interests: ['housing', 'private-rental'],
    createdAt: '2026-04-16T18:30:00.000Z',
    authorId: 'auth_reece',
  },
]

const referralContactAuthorIds = [
  'auth_priya',
  'auth_hannah',
  'auth_liam',
  'auth_sarah',
  'auth_emma',
  'auth_daniel',
  'auth_tom',
  'auth_naomi',
]

async function main() {
  console.log('⟳ Resetting tables…')
  await db.referralRecipient.deleteMany()
  await db.referral.deleteMany()
  await db.decision.deleteMany()
  await db.referralContact.deleteMany()
  await db.signal.deleteMany()
  await db.author.deleteMany()

  console.log(`✎ Inserting ${authors.length} authors…`)
  for (const author of authors) {
    await db.author.create({
      data: {
        id: author.id,
        displayName: author.displayName,
        role: author.role,
        verified: author.verified,
        organisation: author.organisation,
        avatarUrl: author.avatarUrl,
      },
    })
  }

  console.log(`✎ Inserting ${signals.length} signals…`)
  for (const s of signals) {
    await db.signal.create({
      data: {
        id: s.id,
        title: s.title,
        description: s.description,
        type: s.type,
        category: s.category,
        priority: s.priority,
        visibility: s.visibility,
        location: s.location,
        interests: s.interests,
        createdAt: new Date(s.createdAt),
        authorId: s.authorId,
      },
    })
  }

  console.log(`✎ Inserting ${referralContactAuthorIds.length} referral contacts…`)
  for (const authorId of referralContactAuthorIds) {
    const author = authors.find((a) => a.id === authorId)
    if (!author) continue
    await db.referralContact.create({
      data: {
        authorId: author.id,
        displayName: author.displayName,
        role: author.role,
        organisation: author.organisation,
        avatarUrl: author.avatarUrl,
      },
    })
  }

  console.log('✓ Seed complete.')
}

main()
  .catch((err) => {
    console.error('✗ Seed failed:', err)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
