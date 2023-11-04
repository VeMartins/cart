import { createContext, useContext, useEffect, useReducer } from "react";
import {
  CLEAR_CART,
  INCREASE_ITEM,
  DECREASE_ITEM,
  REMOVE_ITEM,
  LOADING,
  DISPLAY_ITEMS,
} from "./actions";
import reducer from "./reducer";
import { getTotals } from "./utils";
const url = "https://www.course-api.com/react-useReducer-cart-project";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

const defaultState = {
  cart: new Map(),
  isLoading: false,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const { totalAmount, totalCost } = getTotals(state.cart);

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: { id } });
  };
  const increaseItem = (id) => {
    dispatch({ type: INCREASE_ITEM, payload: { id } });
  };
  const decreaseItem = (id) => {
    dispatch({ type: DECREASE_ITEM, payload: { id } });
  };
  const fetchData = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({ type: DISPLAY_ITEMS, payload: { cart } });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        increaseItem,
        removeItem,
        decreaseItem,
        totalAmount,
        totalCost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
