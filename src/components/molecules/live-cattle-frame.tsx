import { useEffect, useState } from "react";

const LiveCattlePrice = () => {
  const [priceData, setPriceData] = useState<{
    price: string | null;
    date: string | null;
  }>({
    price: null,
    date: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://www.cepea.esalq.usp.br/br/widgetproduto.js.php?id_indicador[]=2"
        );
        const data = await response.text();

        const dateMatch = data.match(/<td>(\d{2}\/\d{2}\/\d{4})<\/td>/);
        const priceMatch = data.match(
          /R\$ <span class="maior">(\d+,\d+)<\/span>/
        );

        if (dateMatch && priceMatch) {
          setPriceData({
            date: dateMatch[1],
            price: priceMatch[1],
          });
        } else {
          setError("Dados não encontrados no formato esperado");
        }
      } catch (error) {
        setError("Erro ao buscar dados do CEPEA");
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 rounded-2xl bg-[#ddece5] shadow-gray-300 shadow-md">
      {loading ? (
        <div className="animate-pulse flex space-x-4">
          <div className="h-6 w-full bg-gray-200 rounded"></div>
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="flex flex-col gap-1">
          <div>
            <div className="flex flex-row gap-1">
              <p className="text-sm text-black">
                Mercado do Dia: Arroba do Gado Gordo a
              </p>
              <div className="flex">
                <p className="text-sm font-semibold text-[#1C804E]">
                  R$ {priceData.price}
                </p>
                <p className="text-sm text-black">.</p>
              </div>
            </div>
            <p className="text-sm text-black">
              Fique no controle da sua gestão.
            </p>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <p className="text-xs text-gray-500">
              Fonte: <strong>CEPEA</strong>
            </p>
            <p className="text-xs text-gray-500">-</p>
            <p className="text-xs text-gray-500">
              (Atualizado em: {priceData.date})
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveCattlePrice;
