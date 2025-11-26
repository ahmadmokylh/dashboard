export default async function deleteProduct(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DELETE_PRODUCT_URL}/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    return true;
  } catch (error) {
    console.error('Failed to delete product:', error);
    throw error;
  }
}
