export default async function getCategorySummary() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_PRODUCTS_CATEGORIES_SUMMARY_URL}`
  );

  const data = await res.json();

  return data || [];
}
