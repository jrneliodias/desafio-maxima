import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Client, clientSchema } from "@/schemas/ClientSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Description } from "@radix-ui/react-dialog";
import { formatCPF, removeCPFFormatting } from "@/lib/utils";
const ClientDialog = ({ isDialogOpen, setIsDialogOpen, clientId }: { isDialogOpen: boolean; setIsDialogOpen: Dispatch<SetStateAction<boolean>>; clientId?: number }) => {
  const form = useForm<Client>({
    resolver: zodResolver(clientSchema),
    defaultValues: clientId
      ? {}
      : {
          name: "",
          age: undefined,
          cpf: "",
        },
  });
  const onSubmit = (data: Client) => {
    const formattedValues = { ...data, cpf: removeCPFFormatting(data.cpf) };
    console.log(formattedValues);
    form.reset();
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Client</DialogTitle>
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
            <Button type="submit"> Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ClientDialog;
