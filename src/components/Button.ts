import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';

const CustomButton = styled(Button)({
    backgroundColor: '#b797ce',
    color: 'white',
    padding: '0.8rem 2rem',
    borderRadius: '1.5rem',
    fontFamily: 'Nunito',
    '&:hover': {
        backgroundColor: '#9B6FBB'
    },
})

export default CustomButton;