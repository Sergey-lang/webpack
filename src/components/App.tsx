import classes from './App.module.scss';
import { Link } from 'react-router-dom';
import About from '../pages/about/About';
import av1 from '@/assets/avatar_1.jpg';
import av2 from '@/assets/avatar_2.png';
import Avatar3 from '@/assets/avatar_3.svg';

export const App = () => {

    if (__PLATFORM__ === 'desktop') {
        return <div>desktop</div>
    }

    if (__PLATFORM__ === 'mobile') {
        return <div>mobile</div>
    }


    return (
        <div>
            <h1>Platform {__PLATFORM__}</h1>
            <div>
                <img src={av1} alt="1" width={100} height={100}/>
                <img src={av2} alt="1" width={100} height={100}/>
            </div>
            <div>
                <Avatar3  width={100} height={100} className={classes.icon}/>
            </div>
            <Link to={'/about'}>about</Link>
            <br/>
            <Link to={'/shop'}>shop</Link>
            <h1 className={classes.value}></h1>
            Hello
            <button className={classes.button}>click me</button>
            <About />
        </div>
    )
}