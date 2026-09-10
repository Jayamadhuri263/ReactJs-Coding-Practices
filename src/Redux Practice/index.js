import { Provider } from 'react-redux';
import Box from '@mui/material/Box';
import store from './store/store';
import NavBar from './NavBar';
import LeftContentSection from './LeftContentSection';
import RightSideSection from './RightSideSection';
import Typography from '@mui/material/Typography';
import DisplayObjectsList from './displayObjectsList';
import PostNewObject from './postNewObject';

const ReduxPractice = () => {
    
    return (
        <Provider store={store}>
            <Box sx={{ width: '100%', maxWidth: '100%', overflowX: 'hidden', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
                <NavBar />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: "space-between",
                        gap: 2,
                        p: { xs: 2, md: 3 },
                    }}
                >
                    <Box sx={{ width: { xs: '100%', md: '55%' } }}>
                        <LeftContentSection/>
                    </Box>
                    <Box sx={{ width: { xs: '100%', md: '40%' } }}>
                        <RightSideSection />
                    </Box>
                </Box>
            </Box>
            <Box sx={{ mb: 10}}>
                <Typography variant='h5'sx={{ mb: 1.5, ml:3, pt:3, fontWeight: 700 }} >Async with Redux</Typography>
                <Typography variant='h6'sx={{ mb: 1.5, ml:3, pt:1, fontWeight: 700 }} >List of Models</Typography>
                <DisplayObjectsList />
                <PostNewObject />
            </Box>
        </Provider>
    )
}
export default ReduxPractice;