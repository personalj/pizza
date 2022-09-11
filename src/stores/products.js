import { defineStore } from "pinia";
import { http } from "../services/http";

export const useProductsStore = defineStore({
  id: "products",
  state: () => ({
    products: [],
  }),
  getters: {
    productsList: (state) => state.products,
  },
  actions: {
    async getProducts() {
      try {
        const { data } = await http.get('products.json');
        if (data) {
          this.products = data.products;
        }
      } catch(e) {
        console.log(e);
      }
    }
  },
});
