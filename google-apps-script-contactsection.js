
// === PLANILHA ===
const SPREADSHEET_ID = '1VpRiGKKZoM6sCHv8rHFPEiB0aOzy-Yv9GDowGqdsHsg';
const SHEET_NAME = 'Respostas';

// === NOTIFICAÇÃO ===
const EMAIL_TO = 'adm.bcosmetic@gmail.com';
const EMAIL_FROM_NAME = 'B-Cosmetic Sistema';

// === COLUNAS fixas (ordem na planilha) ===
const COLUMNS = [
  'Nome', 'Email', 'Telefone', 'Empresa', 'Assunto', 'Mensagem', 'Tipo',
  'Data/Hora', 'Status'
];

/**
 * Testa se o script está funcionando
 */
function doGet(e) {
  Logger.log('doGet chamado: ' + JSON.stringify(e));
  
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'ok', 
      message: 'Script B-Cosmetic ContactSection funcionando!',
      timestamp: new Date().toISOString() 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Processa o POST do formulário
 */
function doPost(e) {
  Logger.log('=== INÍCIO doPost ===');
  Logger.log('Evento recebido: ' + JSON.stringify(e));
  
  const lock = LockService.getScriptLock();
  
  try {
    // Verifica se há dados
    if (!e || !e.parameter) {
      Logger.log('ERRO: Nenhum dado recebido');
      return errorResponse('Requisição inválida - sem dados.');
    }

    // Extrai os dados do formulário
    const payload = e.parameter;
    Logger.log('Payload recebido: ' + JSON.stringify(payload));

    // Mapeia os dados
    const data = {
      name: safeString(payload.name),
      email: safeString(payload.email),
      phone: safeString(payload.phone),
      company: safeString(payload.company),
      subject: safeString(payload.subject),
      message: safeString(payload.message),
      type: safeString(payload.type || 'contato')
    };

    Logger.log('Dados processados: ' + JSON.stringify(data));

    // Validação mínima
    if (!data.name || !data.email || !data.phone) {
      Logger.log('ERRO: Campos obrigatórios faltando');
      return errorResponse('Campos obrigatórios faltando: name, email, phone.');
    }

    // Abre a planilha
    Logger.log('Abrindo planilha: ' + SPREADSHEET_ID);
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      Logger.log('ERRO: Aba não encontrada: ' + SHEET_NAME);
      return errorResponse(`Aba "${SHEET_NAME}" não encontrada.`);
    }

    // Garante cabeçalho
    ensureHeader(sheet, COLUMNS);

    // Aguarda lock
    lock.waitLock(20000);

    // Prepara a linha de dados
    const now = new Date();
    const row = [
      data.name,
      data.email,
      data.phone,
      data.company,
      data.subject,
      data.message,
      data.type,
      Utilities.formatDate(now, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss'),
      'Novo Contato'
    ];

    Logger.log('Inserindo linha: ' + JSON.stringify(row));
    sheet.appendRow(row);
    Logger.log('Linha inserida com sucesso!');

    // Envia notificação por email
    try {
      notify(data);
      Logger.log('Email de notificação enviado');
    } catch (emailError) {
      Logger.log('Erro ao enviar email: ' + emailError.message);
      // Não falha a operação se o email não for enviado
    }

    Logger.log('=== FIM doPost - SUCESSO ===');

    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'sucesso', 
        message: 'Contato recebido com sucesso!',
        timestamp: new Date().toISOString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log('ERRO FATAL: ' + err.message);
    Logger.log('Stack: ' + err.stack);
    return errorResponse('Erro ao processar: ' + err.message);
    
  } finally {
    try { 
      lock.releaseLock(); 
    } catch (_) {
      Logger.log('Erro ao liberar lock (ignorado)');
    }
  }
}

/**
 * Garante que o cabeçalho existe na planilha
 */
function ensureHeader(sheet, cols) {
  const lastRow = sheet.getLastRow();
  
  // Se a planilha está vazia, cria o cabeçalho
  if (lastRow === 0) {
    Logger.log('Planilha vazia - criando cabeçalho');
    sheet.getRange(1, 1, 1, cols.length).setValues([cols]);
    
    // Formata o cabeçalho
    const headerRange = sheet.getRange(1, 1, 1, cols.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#FFD24C');
    headerRange.setFontColor('#000000');
    
    return;
  }

  // Verifica se o cabeçalho existe
  const firstRow = sheet.getRange(1, 1, 1, Math.max(cols.length, sheet.getLastColumn() || cols.length)).getValues()[0];
  const isEmpty = firstRow.every(v => v === '');
  
  if (isEmpty) {
    Logger.log('Primeira linha vazia - criando cabeçalho');
    sheet.getRange(1, 1, 1, cols.length).setValues([cols]);
    
    // Formata o cabeçalho
    const headerRange = sheet.getRange(1, 1, 1, cols.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#FFD24C');
    headerRange.setFontColor('#000000');
  }
}

/**
 * Envia email de notificação
 */
function notify(data) {
  const lines = [
    '🔔 NOVO CONTATO RECEBIDO PELO SITE B-COSMETIC',
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
    '👤 DADOS DO CONTATO:',
    `Nome: ${data.name}`,
    `Email: ${data.email}`,
    `Telefone: ${data.phone}`,
  ];

  if (data.company) {
    lines.push(`Empresa: ${data.company}`);
  }

  if (data.subject) {
    lines.push(`Assunto: ${data.subject}`);
  }

  lines.push('');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('');

  if (data.message) {
    lines.push('💬 MENSAGEM:');
    lines.push(data.message);
    lines.push('');
    lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    lines.push('');
  }

  lines.push(`📋 Tipo: ${data.type}`);
  lines.push(`📅 Data: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`);
  lines.push('');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('');
  lines.push('Este é um email automático do sistema B-Cosmetic.');
  lines.push('Para responder ao cliente, utilize o email: ' + data.email);

  MailApp.sendEmail({
    to: EMAIL_TO,
    subject: `🔔 Novo Contato - ${data.name} - ${data.subject || 'Sem assunto'}`,
    body: lines.join('\n'),
    name: EMAIL_FROM_NAME,
    replyTo: data.email || ''
  });
}

/**
 * Retorna resposta de erro
 */
function errorResponse(msg) {
  Logger.log('ERRO: ' + msg);
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'erro', 
      message: msg,
      timestamp: new Date().toISOString() 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Helpers
 */
function safeString(v) { 
  return (v === null || v === undefined) ? '' : String(v).trim(); 
}

/**
 * Função de teste manual
 */
function testarScript() {
  Logger.log('=== TESTE MANUAL ===');
  
  const testData = {
    parameter: {
      name: 'Teste Manual',
      email: 'teste@exemplo.com',
      phone: '27999999999',
      company: 'Empresa Teste',
      subject: 'Teste',
      message: 'Esta é uma mensagem de teste',
      type: 'contato'
    }
  };
  
  const result = doPost(testData);
  Logger.log('Resultado: ' + result.getContent());
  Logger.log('=== FIM TESTE ===');
}

