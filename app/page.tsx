import Footer from "@/components/UI/Footer";
import Header from "@/components/UI/Header";
import AddItemForm from "@/components/forms/AddItemForm";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center p-24">
        <AddItemForm />

        {/* <div>
          <h1>Lista de entrada e saída será aqui</h1>
        </div> */}
      </main>
      <Footer />
    </>
  );
}
