
// src/utils/asyncHandle.js
const asyncHandler = (requestHandle) => {
    return (req, res, next) => {
        Promise.resolve(requestHandle(req, res, next))
            .catch((err) => next(err));
    };
};

export { asyncHandler };




// const asyncHandle = (fn)=>{()=>{}}--> higher order function
// const asyncHandle = (fn)=> async (req, res, next){
//     try{
//         await fn(rew, res, next)
//     }catch(error){
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }