import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-xl mx-auto text-center p-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Inovando na Sua Obra
        </h1>
        <p className="text-gray-600 text-lg">
          Em breve, o conteúdo original estará de volta aqui.
        </p>
        
        <div className="space-y-4">
          <a
            href="/alem-da-tendencia"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors"
          >
            Evento Além da Tendência
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <p className="text-sm text-gray-400">
          © 2026 Inovando na Sua Obra. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
