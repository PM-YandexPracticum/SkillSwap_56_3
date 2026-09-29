import { proposeExchange } from '@/features/exchange/model/exchangeSlice'
import {
  selectNewExchanges,
  selectViewedExchanges,
} from '@/features/exchange/model/exchangeSelectors'
import { selectUsers } from '@/entities/user/model/usersSelectors'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { NotificationsMenu } from '@/shared/ui/notifications-menu'

const cardStyle = {
  padding: 20,
  background: '#fff',
  borderRadius: 16,
}

const buttonStyle = {
  minHeight: 40,
  padding: '8px 16px',
  border: 'none',
  borderRadius: 12,
  background: '#fff',
  boxShadow: 'inset 0 0 0 1px #abd27a',
  color: '#253017',
  fontFamily: 'Roboto, sans-serif',
  fontSize: 16,
  cursor: 'pointer',
}

export default function TestAndreyPage() {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectUsers)
  const newExchanges = useAppSelector(selectNewExchanges)
  const viewedExchanges = useAppSelector(selectViewedExchanges)

  const usedIds = [...newExchanges, ...viewedExchanges].map((item) => item.userId)
  const nextUser = users.find((user) => !usedIds.includes(user.id))

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        maxWidth: 640,
        padding: 24,
      }}
    >
      <h1 style={{ fontFamily: 'Jost, sans-serif', fontSize: 32, color: '#253017' }}>
        Меню уведомлений
      </h1>

      <div style={{ ...cardStyle, display: 'flex', justifyContent: 'flex-end' }}>
        <NotificationsMenu />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <button
          style={buttonStyle}
          type="button"
          disabled={!nextUser}
          onClick={() => nextUser && dispatch(proposeExchange(nextUser.id))}
        >
          Добавить уведомление{nextUser ? ` (${nextUser.name})` : ''}
        </button>
      </div>

      <pre
        style={{
          ...cardStyle,
          margin: 0,
          fontFamily: 'Roboto, monospace',
          fontSize: 14,
          color: '#253017',
          whiteSpace: 'pre-wrap',
        }}
      >
        {JSON.stringify({ new: newExchanges, viewed: viewedExchanges }, null, 2)}
      </pre>
    </main>
  )
}
