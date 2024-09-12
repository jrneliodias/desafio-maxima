import { Client } from "@/schemas/ClientSchema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useUpdateClient = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["updateClient"],
    mutationFn: async (client: Client) => {
      const response = await fetch(`http://localhost:8080/clients/${client.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(client),
      })
      return response.json()
    },
    onSuccess: (client) => {
      queryClient.setQueryData(["clients"], (oldClients: Client[] | undefined) => {
        return oldClients ? oldClients.map((c) => c.id === client.id ? client : c) : [client]
      })
      toast.success("Cliente atualizado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar o cliente");
    }
  })
}