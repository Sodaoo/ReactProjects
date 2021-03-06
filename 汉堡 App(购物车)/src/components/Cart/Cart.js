import React, {useContext, useEffect, useState} from 'react';
import classes from './Cart.module.css';
import iconImg from '../../asset/bag.png';
import CartContext from "../../store/cart-context";
import CartDetails from "./CartDetails/CartDetails";

//购物车的组件
const Cart = () => {

    const ctx = useContext(CartContext);

    // 添加一个state来设置详情是否显示
    const [showDetails, setShowDetails] = useState(false);

    /* 在组件每次重新渲染的时候，检查一下商品的总数量，如果数量为0，则修改showDetails为false
     * 组件每次重新渲染，组件的函数体就会执行，
     *   默认情况下，useEffect()中的函数，会在组件渲染完成后调用，
     *       并且是每次渲染完成后都会调用
    */
    useEffect(()=>{
        if(ctx.totalAmount === 0){
            // 购物车已经被清空
            setShowDetails(false);
        }
    },[ctx]);


    // 添加一个显示详情页的函数
    const toggleDetailsHandler = () => {
        if(ctx.totalAmount === 0) {
            setShowDetails(false);
            return;
        };
        setShowDetails(prevState => !prevState);
    };


    //console.log('组件重新渲染了！');

    return (
        <div className={classes.Cart} onClick={toggleDetailsHandler}>

            {/*引入购物车的详情*/}
            {showDetails && <CartDetails/>}


            <div className={classes.Icon}>
                <img src={iconImg}/>
                {ctx.totalAmount === 0 ? null : <span className={classes.TotalAmount}>{ctx.totalAmount}</span>}
            </div>

            {ctx.totalAmount === 0 ? <p className={classes.NoMeal}>未选购商品</p> :
                <p className={classes.Price}>{ctx.totalPrice}</p>}

            <button
                className={`${classes.Button} ${ctx.totalAmount === 0 ? classes.Disabled : ''}`}>去结算</button>
        </div>
    );
};

export default Cart;
