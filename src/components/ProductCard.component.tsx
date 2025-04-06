import { useRef, useState } from "react";
import {ProductType} from "../types/Product";
import style from './Product.module.css';
import { ProductProp } from "./Product.component";
import addToCartIcon from '../asseets/add-to-cart.svg';

type Props = {
    item: ProductProp;
    onConfirm: (id: number, instance: ProductType, quantity: number) => void;
  };
  
  export const ProductCard: React.FC<Props> = ({ item, onConfirm }) => {

    const [quantity, setQuantity] = useState<number>(1);
    const [maxQuantity, setMaxQuantity] = useState<number>(item.productInstance.quantity);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuantity(Number(e.target.value));
    };    
    const quantityInput = useRef<HTMLInputElement>(null);

    return (
      <div key={item.productInstance.name} className={style.wrapper}>
        <img className={style.image} src={item.productInstance.imageUrl} alt="Product Image"/>
        <div className={style.infoWrapper}>
            <div className={style.name}>
                {item.productInstance.name}
            </div>
            <div className={style.price}>{item.productInstance.price.toFixed(2)} zł</div>
            <div className={style.purchaseWrapper}>
                <input ref={quantityInput} 
                className={style.quantity} name="quantity" type="number" 
                max={maxQuantity}
                min={1}
                onChange={handleChange}
                value={quantity}
                defaultValue={1}/>
                <button disabled={item.productInstance.quantity === 0} className={style.addToCart} onClick={() => {
                  setMaxQuantity(prev => prev - quantity);
                  setQuantity(() => 1);
                  onConfirm(item.id, item.productInstance, quantity)
                }}>Dodaj <img className={style.addToCartIcon} src={addToCartIcon}/>
                </button>
            </div>
        </div>
      </div>
    );
  };
  