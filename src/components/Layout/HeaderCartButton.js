import { useState,useContext, useEffect } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) =>{
    const cartCtx = useContext(CartContext);
    const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
        return currentNumber + item.amount;
    }, 0);
    const {items} = cartCtx;
    const [buttonBump, setButtonBump] = useState(false)
    const btnClasses = `${classes.button} ${buttonBump?classes.bump: ''}`;
    useEffect(()=>{
        if(items.length === 0) {return;} 
        setButtonBump(true);
        const timer = setTimeout(()=>{setButtonBump(false)}, 300)
        return () =>{
            clearTimeout(timer);
        }
    },[items]);
    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>
                Your Cart
            </span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    );
}

export default HeaderCartButton;