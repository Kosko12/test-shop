import { useModalContext } from "../features/context/ModalContext";
import {ProductType} from "../types/Product";
import { ProductCard } from "./ProductCard.component";
import style from "./Product.module.css";
import addToCartIcon from '../asseets/add-to-cart.svg';
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../features/cart/cartSlice";
import {  toast } from 'react-toastify';
import { updateQuantity } from "../features/products/productsSlice";
import { useCallback } from "react";

export type ProductProp = {
    id: number,
    productInstance: ProductType
}
const Product: React.FC<ProductProp> = props => {
    const dispatch = useDispatch<AppDispatch>();
    
    const { openModal } = useModalContext();
    const showModal = useCallback(() => {
        openModal({
          component: ProductCard,
          props: {
            item: {id: props.id, productInstance: props.productInstance},
            onConfirm: (id: number, instance: ProductType, quantity: number) => 
                {
                    dispatch(addProductToCart({id: id, instance: props.productInstance, quantity: quantity}));
                    dispatch(updateQuantity({id: props.id, quantity: props.productInstance.quantity - quantity, mode: 'replace'}))

                    toast.success('Dodano do koszyka!')
                }
            ,
          }
        });
      }, [props.productInstance]);
    return <>
        <li className={style.wrapper} onClick={() => showModal()}>
            <img className={style.image} src={props.productInstance.imageUrl} alt="Product Image"/>
            <div className={style.infoWrapper}>
                <div className={style.name}>
                    {props.productInstance.name}
                </div>
                <div className={style.price}>{props.productInstance.price.toFixed(2)} zł</div>
                <div className={style.purchaseWrapper}>
                    {/* <input className={style.quantity} name="quantity" type="number" max={props.productInstance.quantity} defaultValue={1}/> */}
                    <button className={style.addToCart} disabled={props.productInstance.quantity === 0} onClick={(e) => {
                        e.stopPropagation();

                        dispatch(addProductToCart({id: props.id, instance: props.productInstance, quantity: 1}))
                        dispatch(updateQuantity({id: props.id, quantity: props.productInstance.quantity - 1, mode: 'replace'}))
                        toast.success('Dodano do koszyka!');
                        }
                    }>
                        Dodaj 
                        <img className={style.addToCartIcon} src={addToCartIcon}/>
                    </button>
                </div>
            </div>
        </li>
    </>;
}

export default Product;