import classes from './App.module.scss';
import { Link, Outlet } from 'react-router-dom';
import About from '../pages/about/About';

export const App = () => {
    return (
        <div>
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