import Box from '@mui/material/Box'

const ImageContent = () => {
  return (
    <Box
      component="img"
      src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
      alt="coding workspace"
      sx={{
        width: '100%',
        maxWidth: '100%',
        height: { xs: 220, sm: 280, md: 320 },
        objectFit: 'cover',
        borderRadius: 2,
        border: '1px solid #d1d5db',
      }}
    />
  )
}

export default ImageContent
