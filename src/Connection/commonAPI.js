import axios from 'axios'

export const commonAPI=async(httpMethod,url,reqBody)=>{
    const reqConfig=({
        method:httpMethod,
        url,
        header:{
            "Content-Type":"application/json"
        },
        data:reqBody
    })

   return await axios(reqConfig).then((res)=>{
    return res
   }).catch((err)=>{
    throw err
   })
}