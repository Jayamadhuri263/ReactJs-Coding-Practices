import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded'
import { useSelector } from 'react-redux'

const NavBar = () => {

  const subscriberList = useSelector(state => state.subscribers.subscriberList);
  const commentList = useSelector(state => state.comments.commentList);
  const likeCount = useSelector(state => state.likes.count);

  return (
    <AppBar
      position="static"
      elevation={2}
      sx={{
        maxWidth: '100%',
        backgroundColor: '#1f2937',
        px: { xs: 1, sm: 2 },
      }}
    >
      <Toolbar
        sx={{
          minHeight: '64px',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          gap: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AutorenewRoundedIcon sx={{ color: '#a78bfa' }} />
          <Typography variant="h6" component="h1" sx={{ fontWeight: 700 }}>
            Redux
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: { xs: '65%', sm: '45%', md: '35%' },
            mr: { xs: 1, sm: 2, md: 3, lg: 12 },
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Subscribers: {subscriberList.length}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Comments: {commentList.length}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Likes: {likeCount}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar