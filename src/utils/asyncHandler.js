const asyncHandler = (resquestHandler) => {
    (req,res,next) =>{
        Promise.resolve(resquestHandler(req,res,next)).
        catch((err)=>next(err))
    }
}

export {asyncHandler}

// const asyncHandler = (fun) => async (req,res,next) => {
//     try{
//         await fn(req,res,next)
//     } catch(error){
//         res.status((err.code || 500).json({
//             sucess: false,
//             messafe: err.message
//         }))
//     }
// }