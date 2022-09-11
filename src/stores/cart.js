import { defineStore } from "pinia";

function save(cart) {
    const parsed = JSON.stringify(cart);

    localStorage.setItem('cart', parsed);
}

const cartLs = localStorage.getItem('cart');

export const useCartStore = defineStore({
    id: "cart",
    state: () => ({
        cart: cartLs && cartLs !== 'undefined' ? JSON.parse(localStorage.getItem('cart')) : [],
    }),
    getters: {
        cartList: (state) => state.cart,
        cartCountItems() {
            if (!this.cartList.length) return 0;
            return this.cart.reduce((ac, next) => {
                if (next.quantity) {
                    return ac + next.quantity
                }
                return 0
            },  0);
        },
        cartTotalCost() {
            let items = [];
            let result = 0;
            if (this.cart.length) {
                for (let item of this.cart) {
                    if (item.quantity) {
                        items.push((item.price + item.size.price) * item.quantity);
                    }
                }
                result = items.reduce(function (sum, el) {
                    return sum + el;
                }, 0);
            }
            return result;
        }
    },
    actions: {
        setToCart(product) {
            const itemfound = this.cart.find(el => el.id === product.id);
            itemfound && itemfound.quantity && product.quantity ? itemfound.quantity += product.quantity : this.cart.unshift(product);
            save(this.cart);
        },
        clearCart() {
            localStorage.removeItem('products');
            this.cart = [];
        },
        decrement(id) {
            const item = this.cart.find(item => item.id === id);
            if (item.quantity && item.quantity > 1) {
                item.quantity--
            }
            save(this.cart);
        },
        increment(id) {
            const item = this.cart.find(item => item.id === id);
            if (item.quantity) {
                item.quantity++
            }
            save(this.cart);
        },
        deleteFromCart(id) {
            this.cart = this.cart.filter(item => item.id !== id);
            save(this.cart);
        }

    },
});
