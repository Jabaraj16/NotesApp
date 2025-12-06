import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addNoteAPI, deleteNoteAPI, getNoteAPI } from '../Connection/allAPI'

//fetch data
export const fetchPost = createAsyncThunk("notes/fetchPost", async () => {
    const data = await getNoteAPI()
    return data.data

})
//post data
export const addPost = createAsyncThunk("notes/addPost", async (noteData) => {
    const result = await addNoteAPI(noteData)
    return result.data
})

//delete data
export const deletePost = createAsyncThunk("notes/deletePost", async (id) => {
    await deleteNoteAPI(id)
    return id
})

const sliceNote = createSlice({
    name: "notes",
    initialState: {
        note: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPost.pending, (state) => {
            state.loading = true,
                state.error = null
        })
        builder.addCase(fetchPost.fulfilled, (state, action) => {
            state.loading = false
            state.note = action.payload
        })
        builder.addCase(fetchPost.rejected, (state) => {
            state.loading = false;
            state.error = "Failed to fetch posts";
        })
        builder.addCase(addPost.fulfilled, (state, action) => {
            state.note.push(action.payload)
        })
        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.note = state.note.filter(p => p.id !== action.payload)
        })
    }
})
export default sliceNote.reducer