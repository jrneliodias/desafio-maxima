import { Client } from "@/schemas/ClientSchema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useDeleteClient = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["deleteClient"],
    mutationFn: async (clientId: number) => {
      await fetch(`http://localhost:8080/clients/${clientId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
      })
      return clientId
    },
    onSuccess: (clientId) => {
      queryClient.setQueryData(["clients"], (oldClients: Client[] | undefined) => {
        return oldClients ? oldClients.filter((c) => c.id !== clientId) : []
      })
      toast.success("Cliente removido com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao remover o cliente");
    }
  })
}