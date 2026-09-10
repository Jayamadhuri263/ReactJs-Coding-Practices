import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useDispatch } from 'react-redux'
import { addNewSubscriber } from './store/subscriberSlice'
import { addNewComment } from './store/commentSlice'
import { countLike } from './store/likeSlice'

const ActionButtons = () => {
  const [activeForm, setActiveForm] = useState('')
  const [username, setUsername] = useState('')
  const [comment, setComment] = useState('')

  const dispatch = useDispatch();

  const onSubmitSubscriber = event => {
    event.preventDefault();
    dispatch(addNewSubscriber({id:new Date().toISOString() ,username}))
    setUsername('')
  }

  const onSubmitComment = event => {
    event.preventDefault();
    dispatch(addNewComment({id: new Date().toISOString(), comment}))
    setComment('')
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
        <Button variant="contained" onClick={() => setActiveForm('subscribe')}>
          Subscribe
        </Button>
        <Button variant="contained" color='warning' onClick={() => setActiveForm('comment')}>
          Comment
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => dispatch(countLike())}
        >
          Like
        </Button>
      </Box>

      {activeForm === 'subscribe' && (
        <Box component="form" onSubmit={onSubmitSubscriber} sx={{ mt: 2.5 }}>
          <Typography sx={{ mb: 1, fontWeight: 600 }}>Username:</Typography>
          <TextField
            value={username}
            onChange={event => setUsername(event.target.value)}
            placeholder="Enter username"
            size="small"
            fullWidth
          />
          <Button type="submit" variant="contained" sx={{ mt: 1.5 }}>
            Submit
          </Button>
        </Box>
      )}

      {activeForm === 'comment' && (
        <Box component="form" onSubmit={onSubmitComment} sx={{ mt: 2.5 }}>
          <Typography sx={{ mb: 1, fontWeight: 600 }}>Comment:</Typography>
          <TextField
            value={comment}
            onChange={event => setComment(event.target.value)}
            placeholder="Write comment"
            fullWidth
            multiline
            minRows={3}
          />
          <Button type="submit" variant="contained" sx={{ mt: 1.5 }}>
            Submit
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default ActionButtons
