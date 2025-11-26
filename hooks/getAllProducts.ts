export default async function getAllProducts(
  page: number = 1,
  limit: number = 5
) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_PRODUCTS_URL}?page=${page}&limit=${limit}`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    return { products: [], total: 0 };
  }
}
