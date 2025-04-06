import ProductUI from "./Product.component";
import style from "./Listing.module.css";
import initProducts from '../data.json';
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { addMultipleProducts, ProductInstance, selectProductsForPage } from '../features/products/productsSlice';


const Listing : React.FC = () => {
    
    const dispatch = useDispatch<AppDispatch>();
    const [prodPerPage, setProdPerPage] = useState<number>(5);
    const productsCount = useSelector((state: RootState) => state.products.items.length);
    const pages = Math.ceil(productsCount / prodPerPage);
    const [activePage, setActivePage] = useState<number>(1);
    const products = useSelector((state: RootState) => selectProductsForPage(state, activePage - 1, prodPerPage));


    const onPageChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setActivePage(Number(ev.currentTarget.value));
    }

    const onProdsPerPageChange = (ev: ChangeEvent<HTMLSelectElement>) => {
        setProdPerPage(Number(ev.currentTarget.value));
        setActivePage(prev => 1);
    }

    useEffect(() => {
        if(products.length === 0){
            const items: ProductInstance[] = initProducts.map((prod, index) => ({id: index, instance: Object.assign({}, {...prod, stock: prod.quantity})}));
            dispatch(addMultipleProducts({items: items}));
        }
    }, []);

    return <>
        <ul className={style.wrapper}>
        {products.map((product) => {
            return <ProductUI key={product.id} productInstance={product.instance} id={product.id} />
        })}        
        </ul>
        <div className={style.pagination}>
            Strona <input className={style.paginationInput} onChange={onPageChange} type="number" min={1} max={pages} value={activePage}/>
        </div>
        <div>
            Ilość produktów: <select onInput={onProdsPerPageChange}>
                <option value={5} defaultChecked>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
            </select>
        </div>
    </>;
}

export default Listing;