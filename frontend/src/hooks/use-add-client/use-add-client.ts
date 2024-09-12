import { Client } from "@/schemas/ClientSchema"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useAddClient = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["addClient"],
    mutationFn: async (client: Client) => {
      const response = await fetch("http://localhost:8080/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(client),
      })
      return response.json()
    },
    onSuccess: (client) => {
      queryClient.setQueryData(["clients"], (oldClients: Client[] | undefined) => {
        return oldClients ? [...oldClients, client] : [client]
      })
    },
  })
}