export interface IProductList {
    id: string
    image: string
    name: string
    price: string
    sku: number
    stock: number
    isActive: boolean
}

export interface IAttribute {
    id: string | number
    description?: string
    attributeId: number
    status: boolean
}