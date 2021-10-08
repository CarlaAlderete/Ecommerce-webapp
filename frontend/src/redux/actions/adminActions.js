import axios from "axios"

const adminUsersActions = {
  getUsers: () => {
    return async (dispatch) => {
      try {
        let response = await axios.get("https://cozydeco.herokuapp.com/api/users", {withCredentials: true})
        if (response.data.success) {
          dispatch({ type: "GET_USERS", payload: response.data.response })
          return response.data
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  manageAdmin: (id, token, action) => {
    return async () => {
      try {
        let response = await axios.put("https://cozydeco.herokuapp.com/api/user/admin/manage", {userToChange: id, actionToDo: !action}, {
        headers: {
          Authorization: 'Bearer ' +  token
        },
        withCredentials: true
        })
        if (response.data.success) {
          return response.data
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}

export default adminUsersActions
