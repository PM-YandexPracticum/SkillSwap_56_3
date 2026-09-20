import { UsersResponse, UserCard } from "@/shared/types"

const BASE_URL = '/db'

export async function fetchUsers(): Promise<UsersResponse> {
  const response = await fetch(`${BASE_URL}/users.json`)
  if (!response.ok) throw new Error('Failed to fetch users')
  return response.json()
}

export async function fetchUserById(id: string): Promise<UserCard | undefined> {
  const { data } = await fetchUsers()
  return data.find((user) => user.id === id)
}
