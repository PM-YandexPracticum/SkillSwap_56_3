import { ExchangeNotification } from "@/shared/types"

export interface ExchangeState {
  new: ExchangeNotification[]
  viewed: ExchangeNotification[]
}