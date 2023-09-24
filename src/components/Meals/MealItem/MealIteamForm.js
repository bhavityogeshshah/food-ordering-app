import { useRef, useState } from 'react';

import classes from './MealItemForm.module.css'
import Input from '../../UI/Input';

const MealItemForm = (props) => {

    const amountInputRef = useRef();
    const [amountValid, setAmountValid] = useState(true);
    const submitHandler = event => {
        event.preventDefault();

        const enterValue = amountInputRef.current.value;
        const enterValueNumber = + enterValue;

        if(enterValue.trim().length === 0 || 
        enterValueNumber < 1 || 
        enterValueNumber > 5){
            setAmountValid(false);
            return;
        }
        props.onAddToCart(enterValueNumber);
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                ref={amountInputRef}
                label='Amount'
                input={{
                    id: 'amount_' + props.id, // this changed!
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1',
                }}
            />
            <button>+ Add</button>
            {!amountValid && <p>The entered amount is invalid</p>}
        </form>
    );
}

export default MealItemForm