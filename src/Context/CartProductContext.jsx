import { createContext , useState } from 'react';

export const CartProductContext = createContext();

export default function CartProductContextProvider({ children }) {
    let [products, setProducts] = useState(null);

    return (
        <CartProductContext.Provider value={{ products, setProducts }}>
            {children}
        </CartProductContext.Provider>
    );
}
