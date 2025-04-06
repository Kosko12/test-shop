import { useSelector } from 'react-redux';
import { ProductType } from '../types/Product';
import styles from './CartCard.module.css';
import { selectProduct, updateQuantity } from '../features/products/productsSlice';
import { RootState } from '../store';
import { useDispatch } from 'react-redux';
import { setQuantity } from '../features/cart/cartSlice';
type Props = {
    id: number,
    instance: ProductType,
    quantity: number,
    onRemoveProduct: (id: number, quantity: number) => void
}
const CartProduct: React.FC<Props>  = (props: Props) => {
    const product = useSelector((state: RootState) => selectProduct(state, props.id));
    const dispatch = useDispatch();
    const onQtyChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        if(product){
        dispatch(updateQuantity({
            id: props.id,
            quantity: product?.instance.stock - Number(ev.currentTarget.value),
            mode: 'replace'}));
        }
        dispatch(setQuantity({id: props.id, quantity: Number(ev.currentTarget.value)}));
    }

    return <>
        <li className={styles.product}>
            <div className={styles.productInfo}>
                <div className={styles.productName}>{props.instance.name}</div>
                <div className={styles.productPrice}>{props.instance.price.toFixed(2)} zł</div>
                <button onClick={() => props.onRemoveProduct(props.id, props.quantity)} className={styles.removeProductBtn}>x</button>
            </div>
            <div className={styles.productActions}>
                <input onChange={(e) => onQtyChange(e)} className={styles.quantity} max={product?.instance.stock} type="number" defaultValue={props.quantity} />
            </div>
        </li>
    </>
}

export default CartProduct;