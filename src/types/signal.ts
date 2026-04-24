export type SignalType = 'SUPPORT_NEEDED' | 'SUPPORT_OFFERED' | 'GENERAL'

export type Visibility = 'PUBLIC' | 'PRIVATE' | 'ORGANISATION_ONLY'

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
}

export interface Signal {
  id: string
  title: string
  description: string
  type: SignalType
  visibility: Visibility
  author: SignalAuthor
  location: string
  interests: string[]
  createdAt: string
}
