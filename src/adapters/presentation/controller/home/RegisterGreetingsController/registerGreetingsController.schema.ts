import yup from '@external/yupValidation'

export const RegisterGreetingsControllerSchema = yup.object().shape({
    message: yup.string().min(2).max(255).required()
})
