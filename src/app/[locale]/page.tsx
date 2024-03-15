import Products from "@/components/Products";
import { StorageKeys } from "@/constant/storage-keys";
import { getProducts } from "@/services/products";
import { unstable_setRequestLocale } from "next-intl/server";
import { cookies } from "next/headers";

type Props = {
  params: { locale: string };
};
type Item = {
  id: string;
  project_name: string;
  project_domain: string;
  last_accessed: string;
  license_use: string[];
};
type Products = {
  count: number;
  results: Item[];
};
const getData = async () => {
  const myHeaders = new Headers();
  const accessToken = cookies().get(StorageKeys.AccessToken)?.value;
  myHeaders.append("Authorization", `Bearer ${accessToken}` as any);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const req = await fetch(
    "https://frontend-exam.digitalfortress.dev/projects",
    requestOptions as any
  )
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.error(error));
  return req;
};

export default async function IndexPage({ params: { locale } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  const products: Products | any = await getData();

  return (
    <main>
      <div className="container py-10">
        <Products data={products?.results || []} />
      </div>
    </main>
  );
}
