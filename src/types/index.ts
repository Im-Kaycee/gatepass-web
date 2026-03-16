export interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  paystack_subaccount_code: string
  bank_name: string
  account_number: string
}

export interface TicketType {
  id: number
  name: string
  price: number
  quantity: number
  available: number
  sold_count: number
}

export interface Event {
  id: number
  title: string
  description: string
  image_url: string
  venue: string
  online_link: string
  event_type: 'ONLINE' | 'OFFLINE'
  event_date: string
  duration_hours: number
  platform_fee_percent: number
  created_by: string
  ticket_types: TicketType[]
  is_sold_out: boolean
  lowest_price: number | null
}

export interface Ticket {
  id: string
  event: number
  event_name: string
  event_type: 'ONLINE' | 'OFFLINE'
  online_link: string | null
  ticket_type: number
  ticket_type_name: string
  ticket_type_price: number
  owner: number
  owner_email: string
  status: 'VALID' | 'CHECKED_IN' | 'LISTED_FOR_SALE' | 'CANCELLED'
  qr_signature: string
  created_at: string
}

export interface Order {
  id: string
  buyer: number
  event: number
  ticket_type: number
  quantity: number
  total_price: number
  status: 'PENDING' | 'COMPLETED' | 'FAILED'
  created_at: string
  items: OrderItem[]
}

export interface OrderItem {
  ticket: Ticket
  price: number
}

export interface MarketplaceListing {
  id: number
  ticket_id: string
  event_name: string
  event_date: string
  seller_name: string
  original_price: number
  price: number
  status: 'ACTIVE' | 'SOLD' | 'CANCELLED'
  created_at: string
}

export interface AuthTokens {
  access: string
  refresh: string
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}