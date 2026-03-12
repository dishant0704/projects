import { createSlice, PayloadAction, } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = {
  user: {
    name: "",
    email: "",
    image: "",
    id: "",
  },
}

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers:{
        addUser:(state: any, action: PayloadAction<object>)=>{
            state.user = action.payload
        },
    }
})

export const {addUser} = userSlice.actions
export default userSlice.reducer