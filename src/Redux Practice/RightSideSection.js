import Box from '@mui/material/Box'
import SubscribersList from './SubscribersList'
import CommentsList from './CommentsList'

const RightSideSection = () => {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <SubscribersList  />
      <CommentsList  />
    </Box>
  )
}

export default RightSideSection
