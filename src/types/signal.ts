export type SignalType = 'SUPPORT_NEEDED' | 'SUPPORT_OFFERED' | 'GENERAL'

export type Visibility = 'PUBLIC' | 'PRIVATE' | 'ORGANISATION_ONLY'

export type SignalCategory =
  | 'Awareness'
  | 'Support'
  | 'Opportunity'
  | 'Alert'
  | 'Question'

export type SignalPriority = 'HIGH' | 'MEDIUM' | 'LOW'

export type AuthorRole =
  | 'SERVICE_USER'
  | 'PRACTITIONER'
  | 'STUDENT'
  | 'SUPPORTER'

export interface SignalAuthor {
  id: string
  displayName: string
  avatarUrl?: string
  role: AuthorRole
  verified: boolean
}

export interface Signal {
  id: string
  title: string
  description: string
  type: SignalType
  category: SignalCategory
  priority: SignalPriority
  visibility: Visibility
  author: SignalAuthor
  location: string
  interests: string[]
  createdAt: string
}

export type SwipeAction = 'PASS' | 'MATCH' | 'NETWORK_REFER'

export interface SwipeDecision {
  signalId: string
  action: SwipeAction
  decidedAt: string
}

export interface ReferralContact {
  id: string
  displayName: string
  role: AuthorRole
  organisation?: string
  avatarUrl?: string
}

export interface ReferralDraft {
  signalId: string
  contactIds: string[]
  note: string
}
