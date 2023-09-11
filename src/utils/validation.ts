import validator from "validator"

export const validatePhone = (phone: string) => phone.match(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)

export const validateEmail = (email: string) => validator.isEmail(email)

export const validateAdminVin = (vin: string) => vin.match(/^[A-Z0-9]{8}$/)

export const validateCustomerVin = (vin: string) => vin.match(/^[A-Z0-9]{9}$/)

export const validateVin = (vin: string) => vin.match(/^VIN[A-Z0-9]{17}$/)