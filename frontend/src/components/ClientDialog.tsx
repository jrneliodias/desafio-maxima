import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Client, clientSchema } from "@/schemas/ClientSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Description } from "@radix-ui/react-dialog";
import { formatCPF, removeCPFFormatting } from "@/lib/utils";
import { useAddClient } from "@/hooks/use-add-client/use-add-client";
import { toast } from "sonner";
import { useUpdateClient } from "@/hooks/use-add-client/use-update-client";

interface ClientDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  client?: Client | undefined;
}
const ClientDialog = ({ isDialogOpen, setIsDialogOpen, client }: ClientDialogProps) => {
  const { mutate: addClient } = useAddClient();
  const { mutate: updateClient } = useUpdateClient();
  const form = useForm<Client>({
    resolver: zodResolver(clientSchema),
    defaultValues: client
      ? client
      : {
          id: undefined,
          name: "",
          age: 0,
          cpf: "",
        },
  });

  const onSubmit = (data: Client) => {
    const formattedValues = { ...data, cpf: removeCPFFormatting(data.cpf) };

    if (client?.id) {
      updateClient(formattedValues, {
        onSuccess: () => {
          setIsDialogOpen(false);
          form.reset();
        },
      });
      return;
    }
    addClient(formattedValues, {
      onSuccess: () => {
        setIsDialogOpen(false);
        form.reset();
        toast.success("Cliente adicionado com sucesso!");
      },
      onError: (error) => {
        toast.error(`Erro ao adicionar Cliente: ${error.message}`);
      },
    });
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{client ? "Update" : "Add"} Client</DialogTitle>
        </DialogHeader>
        <Description></Description>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="30" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input placeholder="000.000.000-00" {...field} value={formatCPF(field.value)} maxLength={14} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">{client ? "Update" : "Add"} </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ClientDialog;
