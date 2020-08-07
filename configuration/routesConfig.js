import dotenv from 'dotenv'
dotenv.config()

export const LOGIN_PATH         = process.env.LOGIN_PATH
export const REGISTER_PATH      = process.env.REGISTER_PATH
export const AUTHENTICATED_PATH = process.env.AUTHENTICATED_PATH
export const LOGOUT_PATH        = process.env.LOGOUT_PATH
export const STATIC_ROUTE       = process.env.STATIC_ROUTE
export const STATIC_FILE        = process.env.STATIC_FILE
export const PRODUCT_PATH       = process.env.PRODUCT_PATH
export const DELETE_CART        = process.env.DELETE_CART