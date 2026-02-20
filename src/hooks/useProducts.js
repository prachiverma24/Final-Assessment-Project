import { useQuery } from '@tanstack/react-query'

const API = 'https://backendapi-cwp7.onrender.com/api/products/'

async function fetchProducts(){
  const res = await fetch(API)
  if(!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export default function useProducts(){
  const q = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,  // 5 minutes
    gcTime: 1000 * 60 * 10,    // 10 minutes
    retry: 2
  })

  return {
    data: q.data,
    isLoading: q.isLoading,
    error: q.error
  }
}
