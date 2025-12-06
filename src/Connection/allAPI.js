import { commonAPI } from "./commonAPI"
import { serverURL } from "./serverURL"


export const addNoteAPI=async(note)=>{
    return await commonAPI(`POST`,`${serverURL}/notes`,note)
}

export const deleteNoteAPI=async(id)=>{
    return await commonAPI(`DELETE`,`${serverURL}/notes/${id}`,{})
}

export const getNoteAPI=async()=>{
    return await commonAPI(`GET`,`${serverURL}/notes`,"")
}