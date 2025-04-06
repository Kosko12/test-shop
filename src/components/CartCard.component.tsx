import { useSelector } from 'react-redux';
import styles from './CartCard.module.css';
import { finalizeCart, purgeCart, removeProduct, selectProductsFromCart, selectSummary } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { updateQuantity, updateStock } from '../features/products/productsSlice';
import { toast } from 'react-toastify';
import CartProduct from './CartProduct.component';


const Cart : React.FC = () => {

    const cartState = useSelector(selectProductsFromCart);
    const summary = useSelector(selectSummary);
    const dispatch = useDispatch();

    const onPurge = () => {
        cartState.forEach(el => {
            dispatch(updateQuantity({id: el.id, quantity: el.quantity, mode: 'add'}))
        })
        dispatch(purgeCart());
        toast.info('Usunięto produkty z koszyka!');
    }
    const onPurchase = () => {
        cartState.forEach(el => {
            dispatch(updateStock({id: el.id, quantity: el.quantity}))
        })
        dispatch(finalizeCart());
        toast.success("Dziękujemy za zakup :)!")
    }

    const onRemoveProduct = (id: number, quantity: number) => {
        dispatch(updateQuantity({id: id, quantity: quantity, mode: 'add'}));
        dispatch(removeProduct({id: id}));
        toast.info("Usunięto produkt z koszyka");
    }

    
    return <>
        <div className={styles.wrapper}>
            {cartState.length > 0 ? 
                <>
                    <ul className={styles.productList}>
                        {cartState.map(el => {
                            return <CartProduct key={el.id} id={el.id} instance={el.instance} quantity={el.quantity} onRemoveProduct={onRemoveProduct}/>;
                        })}
                    </ul>
                    <div className={styles.cartActions}>
                        <div className={styles.summary}>Podsumowanie: {summary.toFixed(2)}zł</div>
                        <button onClick={() => onPurge()} className={styles.purgeCartBtn}>Wyszyść koszyk</button>
                        <button onClick={() => onPurchase()} className={styles.purchaseBtn}>Zapłać i zamów</button>
                    </div>
                </>
                :
                <>Koszyk jest pusty :{"("}</>
            }
        </div>
    </>;
}

export default Cart;