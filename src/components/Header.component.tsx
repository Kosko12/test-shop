import { useSelector } from 'react-redux';
import styles from './Header.module.css';
import { selectIsActive } from '../features/cart/cartSlice';
import CartIcon from '../asseets/cart.svg';
import { useModalContext } from '../features/context/ModalContext';
import CartCard from './CartCard.component';

const Header : React.FunctionComponent = () => {
    const isActive = useSelector(selectIsActive);
    
    const { openModal } = useModalContext();

    const showModal = () => {
        openModal({
            component: CartCard
        });
    }
    return <>
        <div className={styles.wrapper}>
            <div>MyShop</div>
            <button disabled={isActive ? false : true} onClick={() => showModal()} className={`${styles.cart} ${isActive ? styles.active : styles.empty}`}>
                Cart <img className={styles.icon}src={CartIcon}/>
                </button>
        </div>
    </>;
}

export default Header;