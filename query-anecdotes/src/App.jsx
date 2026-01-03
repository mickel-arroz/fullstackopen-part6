import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, voteAnecdote } from './requests'
import { useNotification } from './notificationStore'

const App = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useNotification()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: false,
  })

  const createMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']) || []
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      setNotification(`A new anecdote '${newAnecdote.content}' created`, 5)
    },
    onError: (error) => {
      setNotification(`Error creating anecdote: ${error.message}`, 5)
    },
  })

  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      setNotification(`You voted '${variables.content}'`, 5)
    },
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote)
  }

  const handleCreate = (content) => {
    createMutation.mutate(content)
  }

  if (result.isLoading) return <div>Loading anecdotes...</div>
  if (result.isError)
    return <div>anecdotes service not available due to server error</div>

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm onCreate={handleCreate} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
