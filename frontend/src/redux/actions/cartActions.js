import axios from "axios"

const cartActions = {
  addCartProduct: (obj) => {
    return (dispatch) => {
      dispatch({ type: "ADD_CART_PRODUCT", payload: obj })
    }
  },
  deleteACartProduct: (id) => {
    return (dispatch) => {
      dispatch({ type: "DELETE_ONE_CART_PRODUCT", payload: id })
    }
  },
  updateCartProduct: (obj) => {
    return (dispatch) => {
      dispatch({ type: "UPDATE_CART_PRODUCT", payload: obj })
      return { success: true }
    }
  },
  deleteAllCartProduct: () => {
    return (dispatch) => {
      dispatch({ type: "DELETE_CART" })
    }
  },
  addCartLS: (obj) => {
    return async (dispatch) => {
      dispatch({ type: "ADD_CART_LS", payload: obj })
    }
  },
  addNewOrder: (obj) => {
    return async (dispatch) => {
      try {
        console.log("entré al add new order al post")
        let response = await axios.post(
          "http://localhost:4000/api/order/new",
          {
            ...obj,
          },
          { withCredentials: true }
        )
        console.log(response)
        if (!response.data.success) throw new Error(response.data.response)
        return { success: true }
      } catch (error) {
        return { success: false, res: error }
      }
    }
  },
  addCard: (obj) => {
    return async (dispatch) => {
      try {
        let response = await axios.post(
          "http://localhost:4000/api/cards",
          {
            balances: obj,
          },
          { withCredentials: true }
        )
        if (!response.data.success) throw new Error(response.data.response)
        return { success: true }
      } catch (error) {
        return { success: false, res: error }
      }
    }
  },
  getCard: (code) => {
    return async (dispatch) => {
      try {
        let response = await axios.get(
          `http://localhost:4000/api/card/${code}`,
          { withCredentials: true }
        )
        if (!response.data.success) throw new Error()
        return { success: true, res: response.data.response }
      } catch (error) {
        return { success: false, res: error }
      }
    }
  },
  editCard: (obj) => {
    return async (dispatch) => {
      try {
        let response = await axios.put(
          `http://localhost:4000/api/card/${obj.code}`,
          { ...obj },
          { withCredentials: true }
        )
        if (!response.data.success) throw new Error()
        return { success: true, res: response.data.response }
      } catch (error) {
        return { success: false, res: error }
      }
    }
  },
  payWithCreditCard: () => {
    return async () => {
      try {
        let res = await axios.get(`http://localhost:4000/api/payment/`, {
          withCredentials: true,
        })
        if (!res.data.success) throw new Error()
        return { success: true }
      } catch (e) {
        return { success: false }
      }
    }
  },
}

export default cartActions
