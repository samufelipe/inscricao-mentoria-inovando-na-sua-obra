import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function TermosDeUso() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Link href="/alem-da-tendencia" className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-white transition-colors mb-10 text-sm uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao site
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider mb-2">
          Termos de Uso
        </h1>
        <p className="text-sm text-gray-500 mb-12">Última atualização: 23 de fevereiro de 2026</p>

        <div className="space-y-10 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Aceitação dos Termos</h2>
            <p>Ao acessar e utilizar o site da Inovando na Sua Obra e seus eventos, incluindo o "Além da Tendência", você concorda integralmente com os presentes Termos de Uso. Caso não concorde com qualquer disposição, recomendamos que não utilize nossos serviços.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Descrição dos Serviços</h2>
            <p>A Inovando na Sua Obra oferece conteúdos educacionais, eventos presenciais e digitais voltados para profissionais de arquitetura, design de interiores e construção civil, incluindo mentorias, cursos e eventos como o "Além da Tendência".</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Cadastro e Informações do Usuário</h2>
            <p>Para acessar determinados serviços, pode ser necessário fornecer informações pessoais como nome, e-mail e telefone. O usuário se compromete a fornecer dados verdadeiros, atualizados e completos, sendo responsável por mantê-los atualizados.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Inscrições e Pagamentos</h2>
            <p>As inscrições em eventos são processadas por plataformas terceiras (como Sympla e Hotmart). Ao realizar uma inscrição, o usuário concorda também com os termos e políticas da plataforma de pagamento utilizada. Os valores, condições de pagamento e políticas de reembolso serão informados na página de cada evento ou produto.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Política de Cancelamento e Reembolso</h2>
            <p>Cancelamentos podem ser solicitados em até 7 (sete) dias após a compra, desde que a solicitação seja realizada com no mínimo 48 horas de antecedência do início do evento, conforme o Código de Defesa do Consumidor e as políticas da plataforma de venda utilizada.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Propriedade Intelectual</h2>
            <p>Todo o conteúdo disponibilizado no site e nos eventos — incluindo textos, imagens, vídeos, apresentações, logotipos e materiais de apoio — é de propriedade exclusiva da Inovando na Sua Obra ou de seus parceiros e palestrantes, protegido pelas leis de direitos autorais. É proibida a reprodução, distribuição ou comercialização sem autorização prévia por escrito.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Uso de Imagem</h2>
            <p>Ao participar de eventos presenciais ou online promovidos pela Inovando na Sua Obra, o participante autoriza o uso de sua imagem e voz em fotos, vídeos e materiais de divulgação relacionados ao evento, sem fins comerciais diretos e sem direito a remuneração.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Conduta do Usuário</h2>
            <p>O usuário se compromete a utilizar os serviços de forma ética e respeitosa, sendo proibido: (a) utilizar o conteúdo para fins ilícitos; (b) compartilhar credenciais de acesso com terceiros; (c) reproduzir ou distribuir conteúdos sem autorização; (d) praticar qualquer forma de assédio ou discriminação durante eventos.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Limitação de Responsabilidade</h2>
            <p>A Inovando na Sua Obra não se responsabiliza por: (a) eventuais indisponibilidades temporárias do site; (b) resultados individuais obtidos a partir da aplicação dos conteúdos; (c) danos decorrentes de uso indevido das informações por parte do usuário; (d) problemas técnicos de plataformas de terceiros.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">10. Alterações nos Termos</h2>
            <p>A Inovando na Sua Obra reserva-se o direito de alterar estes Termos de Uso a qualquer momento, sendo a versão atualizada publicada nesta página. Recomendamos a revisão periódica deste documento.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">11. Foro e Legislação Aplicável</h2>
            <p>Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da Comarca de São Paulo — SP para dirimir quaisquer questões oriundas deste documento.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">12. Contato</h2>
            <p>Para dúvidas, sugestões ou solicitações relacionadas a estes Termos de Uso, entre em contato pelo e-mail: <a href="mailto:contato@inovandonasuaobra.com.br" className="text-[#C9A84C] hover:underline">contato@inovandonasuaobra.com.br</a></p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-xs text-gray-500">
          <p>© 2025 Inovando na Sua Obra. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}
