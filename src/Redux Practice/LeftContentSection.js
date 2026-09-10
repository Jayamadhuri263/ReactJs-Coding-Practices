import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ImageContent from './ImageContent'
import ActionButtons from './ActionButtons'

const LeftContentSection = () => {
  return (
    <Box sx={{ width: '100%', p: { xs: 2, md: 3 }, backgroundColor: '#ffffff', borderRadius: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
        Community Feed
      </Typography>
      <ImageContent />
      <ActionButtons />
    </Box>
  )
}

export default LeftContentSection
