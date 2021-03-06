import React from "react";
import { ShopCart } from "../containers/ShopCart";
import { useLocalStorage } from "../hooks/Storage";

type CartItem = {
    id: number,
    quantity: number
};

type CartProps = {
    openCart: () => void,
    closeCart: () => void,
    getItemQuantity: (id: number) => number,
    increaseCartQty: (id: number) => void,
    decreaseCartQty: (id: number) => void,
    removeFromCart: (id: number) => void,
    cartQty: number,
    cartItems: CartItem[]
};

const CartContext = React.createContext({} as CartProps);
export function useCart(): CartProps {
    return React.useContext(CartContext);
};

type Props = {
    children: React.ReactNode
};

export function CartProvider({ children }: Props) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [cartItems, setCartItems] = 
        useLocalStorage<CartItem[]>("cart", []);

    function getItemQuantity(id: number) {
        return cartItems.find(
            (item) => item.id === id) ?.quantity || 0
    };

    function increaseCartQty(id: number) {
        setCartItems((curItems) => {
            if (curItems.find((item) => item.id === id) == null) {
                return [...curItems, { id, quantity: 1 }]
            } else {
                return curItems.map((item) => {
                    if (item.id === id) {
                        return {
                            ...item, 
                            quantity: item.quantity + 1
                        }
                    } else {
                        return item;
                    }
                })
            }
        });
    };

    function decreaseCartQty(id: number) {
        setCartItems((curItems) => {
            if (curItems.find((item) => item.id === id) 
            ?.quantity == 1) {
                return curItems.filter((item) => item.id !== 1);
            } else {
                return curItems.map((item) => {
                    if (item.id === id) {
                        return {
                            ...item, 
                            quantity: item.quantity - 1
                        }
                    } else {
                        return item;
                    }
                })
            }
        });
    };

    function removeFromCart(id: number) {
        setCartItems((curItems) => {
            return curItems.filter((item) => item.id !== id);
        })
    };

    const cartQty = cartItems.reduce(
        (quantity, item) => item.quantity + quantity, 0);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    return (
        <CartContext.Provider value={{
            getItemQuantity,
            increaseCartQty,
            decreaseCartQty,
            removeFromCart,
            openCart,
            closeCart,
            cartItems,
            cartQty,
        }}>
            { children }
            <ShopCart isOpen={isOpen} />
        </CartContext.Provider>
    );
};



