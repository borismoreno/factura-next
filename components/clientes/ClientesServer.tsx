import { cookies } from "next/headers";
import { getClientes } from '@/lib/cliente';
import ClientesTable from "./ClientesTable";

export default async function ClientesServer() {
    const cookieStore = cookies();
    const allCookies = (await cookieStore).toString();
    const clientes = await getClientes(allCookies);

    return <ClientesTable clientes={clientes || []} />;
}