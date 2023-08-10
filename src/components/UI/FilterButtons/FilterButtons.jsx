import cl from './FilterButtons.module.css'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import WhatshotIcon from '@mui/icons-material/Whatshot';

export const FilterButtons = () => {
  return (
    <div className={cl.FilterButtons}>
      <button className={cl.FilterButtons__btn}><AccessTimeIcon sx={{ fontSize: '15px' }} />New</button>
      <button className={cl.FilterButtons__btn}><ArrowOutwardIcon sx={{ fontSize: '15px' }} />Top</button>
      <button className={cl.FilterButtons__btn}><WhatshotIcon sx={{ fontSize: '15px' }} />Hot</button>
    </div>
  )
}
