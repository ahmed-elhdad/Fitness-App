// function validateRegister(req, res, next) {
//   const { error } = registerSchema.validate(req.body, { abortEarly: false });

//   if (error) {
//     return res.status(400).json({
//       status: "error",
//       errors: error.details.map((err: Object) => console.log(err)),
//     });
//   }
//   next();
// }
// export default validateRegister;
