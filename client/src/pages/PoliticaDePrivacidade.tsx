import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function PoliticaDePrivacidade() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Link href="/alem-da-tendencia" className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-white transition-colors mb-10 text-sm uppercase tracking-wider">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao site
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider mb-2">
          Política de Privacidade
        </h1>
        <p className="text-sm text-gray-500 mb-12">Última atualização: 23 de fevereiro de 2026</p>

        <div className="space-y-10 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Introdução</h2>
            <p>A Inovando na Sua Obra valoriza a privacidade de seus usuários e está comprometida com a proteção de dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018). Esta Política descreve como coletamos, utilizamos, armazenamos e protegemos suas informações.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Dados Coletados</h2>
            <p className="mb-3">Podemos coletar os seguintes dados pessoais:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li><strong className="text-gray-300">Dados de identificação:</strong> nome completo, e-mail, telefone</li>
              <li><strong className="text-gray-300">Dados profissionais:</strong> área de atuação, nome do escritório</li>
              <li><strong className="text-gray-300">Dados de navegação:</strong> endereço IP, cookies, páginas acessadas, tempo de permanência</li>
              <li><strong className="text-gray-300">Dados de transação:</strong> informações de compra processadas pelas plataformas de pagamento (Sympla, Hotmart)</li>
              <li><strong className="text-gray-300">Dados de marketing:</strong> parâmetros UTM, origem de tráfego, interações com campanhas</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Finalidade do Tratamento</h2>
            <p className="mb-3">Os dados coletados são utilizados para:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>Processar inscrições em eventos e produtos</li>
              <li>Enviar comunicações sobre eventos, conteúdos e novidades</li>
              <li>Personalizar a experiência do usuário</li>
              <li>Melhorar nossos serviços e produtos</li>
              <li>Cumprir obrigações legais e regulatórias</li>
              <li>Análise de desempenho de campanhas de marketing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Base Legal</h2>
            <p>O tratamento dos dados pessoais é realizado com base no consentimento do titular, na execução de contrato, no legítimo interesse e/ou no cumprimento de obrigação legal, conforme aplicável a cada situação específica.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Compartilhamento de Dados</h2>
            <p className="mb-3">Seus dados podem ser compartilhados com:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li><strong className="text-gray-300">Plataformas de pagamento:</strong> Sympla, Hotmart, para processamento de transações</li>
              <li><strong className="text-gray-300">Ferramentas de marketing:</strong> RD Station, para gestão de leads e comunicações</li>
              <li><strong className="text-gray-300">Ferramentas de análise:</strong> Google Analytics, para análise de tráfego</li>
              <li><strong className="text-gray-300">Parceiros de eventos:</strong> quando necessário para a realização do evento</li>
            </ul>
            <p className="mt-3">Não vendemos, alugamos ou comercializamos seus dados pessoais a terceiros.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Armazenamento e Segurança</h2>
            <p>Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, perda, destruição ou alteração. Os dados são armazenados em servidores seguros com criptografia e controle de acesso restrito. O período de armazenamento varia conforme a finalidade e obrigações legais aplicáveis.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Cookies</h2>
            <p>Utilizamos cookies e tecnologias similares para melhorar a experiência de navegação, analisar o tráfego do site e personalizar conteúdos. Você pode gerenciar as preferências de cookies através das configurações do seu navegador. A desativação de cookies pode afetar a funcionalidade do site.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Direitos do Titular</h2>
            <p className="mb-3">Conforme a LGPD, você tem direito a:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>Confirmar a existência de tratamento de seus dados</li>
              <li>Acessar seus dados pessoais</li>
              <li>Solicitar a correção de dados incompletos ou desatualizados</li>
              <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários</li>
              <li>Solicitar a portabilidade dos dados</li>
              <li>Revogar o consentimento a qualquer momento</li>
              <li>Obter informações sobre o compartilhamento de dados</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Retenção de Dados</h2>
            <p>Os dados pessoais serão retidos pelo período necessário para cumprir as finalidades descritas nesta Política, incluindo obrigações legais, contratuais, de prestação de contas ou requisição de autoridades competentes.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">10. Alterações nesta Política</h2>
            <p>Esta Política de Privacidade pode ser atualizada periodicamente. Quaisquer alterações serão publicadas nesta página com a data de atualização revisada. Recomendamos a revisão periódica deste documento.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">11. Contato e Encarregado de Dados (DPO)</h2>
            <p>Para exercer seus direitos, esclarecer dúvidas ou fazer solicitações relacionadas à proteção de dados, entre em contato conosco:</p>
            <div className="mt-3 bg-white/5 p-4 rounded-lg border border-white/10">
              <p className="text-white font-medium">Inovando na Sua Obra</p>
              <p>E-mail: <a href="mailto:contato@inovandonasuaobra.com.br" className="text-[#C9A84C] hover:underline">contato@inovandonasuaobra.com.br</a></p>
              <p>Telefone: (11) 5571-7229</p>
            </div>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-xs text-gray-500">
          <p>© 2025 Inovando na Sua Obra. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}
