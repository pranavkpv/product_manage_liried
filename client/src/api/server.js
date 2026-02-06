import api from "./axios";

export const loginApi = async (username, password) => {
   const result = await api.post('/auth/login', { username, password }
   )
   return result.data
}
export const getProductsApi = async () => await api.get('/products')
export const addProductApi = async (data) => await api.post('/products', data)
export const updateProductApi = async (id, data) => await api.put(`/products/${ id }`, data)
export const deleteProductApi = async (productId) => await api.delete(`/products/${ productId }`)
