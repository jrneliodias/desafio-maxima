import { useState } from "react";
import ClientsTable from "./components/ClientsTable";
import { Button } from "./components/ui/button";
import logo from "./assets/logo.svg";
import ClientDialog from "./components/ClientDialog";

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <main className=" h-screen w-full flex flex-col items-center space-y-10 ">
      <header className="container flex justify-between bg-black h-fit p-3 rounded-b-lg shadow-sm">
        <img src={logo} alt="Logo" width={150} height={30} />
      </header>
      <section className="container flex justify-between h-fit p-2">
        <h1 className="text-3xl font-bold mb-4 text-emerald-500">Client Manager</h1>
        <Button variant={"outline"} onClick={() => setIsDialogOpen(true)}>
          Add Client
        </Button>
      </section>
      <section className="container p-2  border rounded-lg bg-white shadow-sm">
        <ClientsTable />
      </section>

      <ClientDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
    </main>
  );
}

export default App;
