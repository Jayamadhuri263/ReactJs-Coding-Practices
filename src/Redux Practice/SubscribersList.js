import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'

const SubscribersList = () => {
  const subscibersList = useSelector(state => state.subscribers.subscriberList)

  return (
    <Box sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2, backgroundColor: '#ffffff' }}>
      <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 700 }}>
        Subscribers
      </Typography>
      {subscibersList.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No subscribers yet.
        </Typography>
      ) : (
        subscibersList.map((each, index) => (
          <Typography
            variant="body1"
            key={`${each.username}-${index}`}
            sx={{ mb: 0.75, textTransform: 'capitalize' }}
          >
            {each.username}
          </Typography>
        ))
      )}
    </Box>
  )
}

export default SubscribersList
