import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "./ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Client } from "@/schemas/ClientSchema";
import { Dispatch, SetStateAction } from "react";

const clients: Client[] = [
  {
    id: 1,
    name: "John Doe",
    age: 30,
    cpf: "123.456.789-00",
  },
  {
    id: 2,
    name: "Jane Doe",
    age: 25,
    cpf: "123.456.789-00",
  },
];
const ClientsTable = ({ setIsDialogOpen }: { setIsDialogOpen: Dispatch<SetStateAction<boolean>> }) => {
  const editClient = (client: Client) => {
    setIsDialogOpen(true);
    console.log(client);
  };

  const deleteClient = (id: number) => {
    console.log(id);
  };
  return (
    <Table className="text-white">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>CPF</TableHead>
          <TableHead className="w-32">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.id}>
            <TableCell>{client.name}</TableCell>
            <TableCell>{client.age}</TableCell>
            <TableCell>{client.cpf}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant={"ghost"} size="icon" onClick={() => editClient(client)}>
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button variant={"ghost"} size="icon" onClick={() => deleteClient(client.id!)}>
                  <Trash2 className="h-4 w-4 text-rose-600" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ClientsTable;
