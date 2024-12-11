import { Box } from '@mui/material';
import { RiContactsBook3Line } from 'react-icons/ri';
import css from './HomePage.module.css'

export default function HomePage() {
  return (
    <>
      <Box className={css.boxHomePage}>
        <RiContactsBook3Line className={ css.logoIcon} />
         <h1 className={css.title}>
          Welcome to Phone<span>book</span>!
        </h1> 

      </Box>
    </>
  );
}
