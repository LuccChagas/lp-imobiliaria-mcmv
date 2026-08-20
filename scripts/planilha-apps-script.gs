/**
 * ============================================================================
 * RECEPTOR DE LEADS -> PLANILHA DO GOOGLE DRIVE
 * ============================================================================
 *
 * COMO INSTALAR (leva uns 3 minutos, nao precisa saber programar):
 *
 *  1. Crie uma planilha no Google Drive. Pode ser em branco.
 *  2. Nessa planilha, va em  Extensoes > Apps Script.
 *  3. Apague o que estiver escrito e cole ESTE arquivo inteiro.
 *  4. Na linha do TOKEN abaixo, troque "troque-este-token" por uma senha
 *     qualquer que voce invente (letras e numeros, sem espaco).
 *  5. Clique em  Implantar > Nova implantacao.
 *       - Tipo:              App da Web
 *       - Executar como:     Eu
 *       - Quem pode acessar: Qualquer pessoa
 *  6. Autorize quando o Google pedir. Ele vai avisar que o app nao e
 *     verificado — clique em "Avancado" e depois em "Acessar (nome do projeto)".
 *     Voce esta autorizando o seu proprio script.
 *  7. Copie a URL que aparece (termina em /exec).
 *  8. Na Vercel, em Settings > Environment Variables, cadastre:
 *       LEAD_WEBHOOK_URL   = a URL /exec que voce copiou
 *       LEAD_WEBHOOK_TOKEN = a mesma senha que voce escreveu no passo 4
 *  9. Faca um novo deploy na Vercel para as variaveis valerem.
 *
 * IMPORTANTE: toda vez que voce editar este script, precisa ir de novo em
 * Implantar > Gerenciar implantacoes > editar (lapis) > Versao: Nova > Implantar.
 * Sem isso a alteracao nao entra no ar.
 * ============================================================================
 */

var TOKEN = "troque-este-token";
var ABA = "Leads";

var COLUNAS = [
  "Recebido em",
  "Nome",
  "WhatsApp",
  "Dormitorios",
  "Renda familiar",
  "Tem FGTS",
  "Origem",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "Pagina",
];

function doPost(evento) {
  try {
    var dados = JSON.parse(evento.postData.contents);

    if (TOKEN && dados.token !== TOKEN) {
      return responder({ ok: false, erro: "token_invalido" });
    }

    var aba = pegarAba();

    aba.appendRow([
      formatarData(dados.recebidoEm),
      dados.nome || "",
      dados.whatsapp || "",
      dados.dormitorios || "",
      dados.renda || "",
      dados.fgts || "",
      dados.origem || "",
      dados.utm_source || "",
      dados.utm_medium || "",
      dados.utm_campaign || "",
      dados.utm_content || "",
      dados.utm_term || "",
      dados.pagina || "",
    ]);

    return responder({ ok: true });
  } catch (erro) {
    return responder({ ok: false, erro: String(erro) });
  }
}

/** Serve so para voce testar no navegador se a implantacao esta de pe. */
function doGet() {
  return responder({ ok: true, mensagem: "Receptor de leads no ar." });
}

function pegarAba() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var aba = planilha.getSheetByName(ABA);

  if (!aba) {
    aba = planilha.insertSheet(ABA);
  }

  if (aba.getLastRow() === 0) {
    aba.appendRow(COLUNAS);
    var cabecalho = aba.getRange(1, 1, 1, COLUNAS.length);
    cabecalho.setFontWeight("bold");
    cabecalho.setBackground("#0a2647");
    cabecalho.setFontColor("#ffffff");
    aba.setFrozenRows(1);
    aba.setColumnWidth(1, 150);
    aba.setColumnWidth(2, 180);
    aba.setColumnWidth(3, 140);
  }

  return aba;
}

/** ISO -> horario de Sao Paulo, no formato que a planilha entende. */
function formatarData(iso) {
  try {
    var data = iso ? new Date(iso) : new Date();
    return Utilities.formatDate(data, "America/Sao_Paulo", "dd/MM/yyyy HH:mm:ss");
  } catch (erro) {
    return new Date().toString();
  }
}

function responder(objeto) {
  return ContentService.createTextOutput(JSON.stringify(objeto)).setMimeType(
    ContentService.MimeType.JSON
  );
}
