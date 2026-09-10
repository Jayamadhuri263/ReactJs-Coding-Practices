import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'

const CommentsList = () => {
  const commentList = useSelector(state => state.comments.commentList);
  
  return (
    <Box sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2, backgroundColor: '#ffffff' }}>
      <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 700 }}>
        Comments
      </Typography>
      { commentList.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No comments yet.
        </Typography>
      ) : (
        commentList.map(each => (
          <Typography
            variant="body1"
            key={each.id}
            sx={{ mb: 0.75, textTransform: 'capitalize' }}
          >
            {each.comment}
          </Typography>
        ))
      )}
    </Box>
  )
}

export default CommentsList



