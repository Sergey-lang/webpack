import classes from './App.module.scss';
export const App = () => {
    return (
        <div>
            <h1 className={classes.value}></h1>
            Hello
            <button className={classes.button}>click me</button>
        </div>
    )
}