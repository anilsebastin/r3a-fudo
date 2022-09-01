import create from "zustand"

export const useStore = create(
    
    (set) => ({

        //CART
        cart: {
            pizzas: []
        },

        //ADDING PIZZA TO CART
        addPizza: (data) => set((state) => ({
            cart: {
                pizzas: [...state.cart.pizzas, data]
            }
        })),

        //REMOVE PIZZA FROM CART
        removePizza : (index) => set((state) => ({
            cart: {
                pizzas: state.cart.pizzas.filter((_, i) => i != index)
            }
        })),

        //RESET CART
        resetCart : () => set(() => ({
            cart: {
                pizzas: []
            }
        }))
    })
)