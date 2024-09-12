import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "./ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Client } from "@/schemas/ClientSchema";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import ClientDialog from "./ClientDialog";
import { useDeleteClient } from "@/hooks/use-add-client/use-delete-client";
import { formatCPF } from "@/lib/utils";

const ClientsTable = () => {
  const getClientQuery = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8080/clients");
      if (!response.ok) {
        return toast.error("Ocorreu um erro ao salvar a tarefa.");
      }
      const data = await response.json();
      return data;
    },
  });
  const { mutate: deleteClient } = useDeleteClient();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Table className="text-white">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>CPF</TableHead>
          <TableHead className="w-24">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {getClientQuery.data &&
          getClientQuery.data.map((client: Client) => (
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.age}</TableCell>
              <TableCell>{formatCPF(client.cpf)}</TableCell>
              <TableCell>
                <div className="flex">
                  <Button variant={"ghost"} size="icon" onClick={() => setIsDialogOpen(true)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant={"ghost"} size="icon" onClick={() => deleteClient(client.id!)}>
                    <Trash2 className="h-4 w-4 text-rose-600" />
                  </Button>
                </div>
              </TableCell>
              <ClientDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} client={client} />
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default ClientsTable;
