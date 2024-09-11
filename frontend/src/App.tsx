import ClientsTable from "./components/ClientsTable";
import { Button } from "./components/ui/button";
import logo from "@/assets/logo.svg";

function App() {
  return (
    <main className=" h-screen w-full flex flex-col items-center space-y-10">
      <header className="container flex justify-between bg-black h-fit p-3 rounded-b-lg">
        <img src={logo} alt="Logo" width={150} height={30} />
      </header>
      <section className="container flex justify-between h-fit">
        <h1 className="text-3xl font-bold mb-4 text-emerald-500">Client Manager</h1>
        <Button> Add Client</Button>
      </section>
      <section className="container">
        <ClientsTable />
      </section>
    </main>
  );
}

export default App;
