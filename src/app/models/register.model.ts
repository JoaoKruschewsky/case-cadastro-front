import { Address } from "./address.model"

export interface RegisterUser {
    name: string
    email: string
    cpf: string
    dataNascimento: string
    cep: string
    endereco: Address
}