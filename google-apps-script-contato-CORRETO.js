/****************************************************
 * B-COSMETIC – FORMULÁRIO DE CONTATO
 * Recebe mensagens de contato e envia confirmações
 ****************************************************/

// ==================== CONFIGURAÇÕES ====================
const CONFIG = {
  // ID da planilha (da URL que você enviou)
  SPREADSHEET_ID: '1FsXeKmjULS5OVOQ9KdJmSHSVJhQDecB3IR66hMm8xEA',
  
  // Nome da aba onde serão salvos os contatos
  SHEET_NAME: 'Contatos',
  
  // Emails que receberão notificação de novos contatos
  EMAIL_EQUIPE: 'contato.bcosmetic@gmail.com, adm.bcosmetic@gmail.com, ruanrdriguez@gmail.com, Leandrorepresentacoes@live.com.mx',
  
  // Nome da empresa (aparece nos emails)
  NOME_EMPRESA: 'B-Cosmetic',
  
  // Telefone para contato
  TELEFONE_EMPRESA: '(27) 99999-9999'
};

// ==================== TESTA SE O SCRIPT ESTÁ FUNCIONANDO ====================
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'ok', 
      message: 'Script de Contato B-Cosmetic funcionando!',
      timestamp: new Date().toISOString() 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ==================== RECEBE OS DADOS DO FORMULÁRIO ====================
function doPost(e) {
  const lock = LockService.getScriptLock();
  
  try {
    // Validação básica
    if (!e || !e.parameter) {
      return respostaErro('Nenhum dado recebido');
    }

    // Extrai os dados do formulário
    const dados = {
      name: limparTexto(e.parameter.name),
      email: limparTexto(e.parameter.email),
      phone: normalizarTelefone(e.parameter.phone),
      company: limparTexto(e.parameter.company),
      subject: limparTexto(e.parameter.subject),
      message: limparTexto(e.parameter.message),
      type: e.parameter.type || 'contato'
    };

    // Validações
    if (!dados.name || dados.name.length < 3) {
      return respostaErro('Nome inválido (mínimo 3 caracteres)');
    }
    
    if (!validarEmail(dados.email)) {
      return respostaErro('Email inválido');
    }
    
    if (!dados.phone || dados.phone.length < 10) {
      return respostaErro('Telefone inválido');
    }
    
    if (!dados.subject) {
      return respostaErro('Assunto é obrigatório');
    }
    
    if (!dados.message || dados.message.length < 10) {
      return respostaErro('Mensagem muito curta (mínimo 10 caracteres)');
    }

    // Aguarda lock para evitar conflitos
    lock.waitLock(20000);

    // 1. Salvar na planilha
    salvarNaPlanilha(dados);

    // 2. Enviar email de confirmação para o usuário
    enviarEmailConfirmacaoUsuario(dados);

    // 3. Enviar email de notificação para a equipe
    enviarEmailNotificacaoEquipe(dados);

    // Retorna sucesso
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'sucesso',
        message: 'Mensagem enviada com sucesso!',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (erro) {
    console.error('Erro ao processar contato:', erro);
    return respostaErro('Erro ao processar: ' + erro.message);
    
  } finally {
    try { 
      lock.releaseLock(); 
    } catch(e) {}
  }
}

// ==================== SALVAR NA PLANILHA ====================
function salvarNaPlanilha(dados) {
  try {
    const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    
    // Se a aba não existir, cria com cabeçalhos
    if (!sheet) {
      sheet = ss.insertSheet(CONFIG.SHEET_NAME);
      
      // Cabeçalhos
      const cabecalhos = [
        'Data/Hora',
        'Nome',
        'Email',
        'Telefone',
        'Empresa',
        'Assunto',
        'Mensagem',
        'Status'
      ];
      
      sheet.getRange(1, 1, 1, cabecalhos.length).setValues([cabecalhos]);
      
      // Formata cabeçalhos
      const headerRange = sheet.getRange(1, 1, 1, cabecalhos.length);
      headerRange.setBackground('#FFD24C');
      headerRange.setFontWeight('bold');
      headerRange.setFontColor('#000000');
      headerRange.setHorizontalAlignment('center');
      
      // Congela primeira linha
      sheet.setFrozenRows(1);
    }
    
    // Adiciona os dados
    const linha = [
      new Date(),
      dados.name,
      dados.email,
      dados.phone,
      dados.company || 'Não informado',
      obterTextoAssunto(dados.subject),
      dados.message,
      'Novo'
    ];
    
    sheet.appendRow(linha);
    
    console.log('✅ Dados salvos na planilha:', dados.email);
    
  } catch (erro) {
    console.error('❌ Erro ao salvar na planilha:', erro);
    throw new Error('Falha ao salvar dados');
  }
}

// ==================== EMAIL DE CONFIRMAÇÃO PARA O USUÁRIO ====================
function enviarEmailConfirmacaoUsuario(dados) {
  try {
    const assunto = `✅ Recebemos sua mensagem - ${CONFIG.NOME_EMPRESA}`;
    
    const corpoHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { 
            font-family: 'Segoe UI', Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0;
            padding: 0;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: #ffffff;
          }
          .header { 
            background: linear-gradient(135deg, #FFD24C 0%, #FFA500 100%); 
            color: #000; 
            padding: 40px 20px; 
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
          }
          .content { 
            padding: 40px 30px;
            background: #f9f9f9;
          }
          .info-box { 
            background: white; 
            padding: 25px; 
            border-left: 4px solid #FFD24C; 
            margin: 20px 0; 
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .info-box h3 {
            margin-top: 0;
            color: #FFD24C;
            font-size: 18px;
          }
          .info-box p {
            margin: 10px 0;
          }
          .info-box strong {
            color: #333;
          }
          .footer { 
            text-align: center; 
            padding: 30px 20px; 
            color: #666; 
            font-size: 14px;
            background: #f0f0f0;
          }
          .highlight { 
            color: #FFD24C; 
            font-weight: bold; 
          }
          .contact-info {
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Mensagem Recebida!</h1>
          </div>
          
          <div class="content">
            <p style="font-size: 18px;"><strong>Olá, ${dados.name}!</strong></p>
            
            <p>
              Obrigado por entrar em contato com a <span class="highlight">${CONFIG.NOME_EMPRESA}</span>!
            </p>
            
            <p>
              Recebemos sua mensagem com sucesso e nossa equipe já está analisando sua solicitação. 
              Em breve, entraremos em contato através do email <strong>${dados.email}</strong>.
            </p>
            
            <div class="info-box">
              <h3>📋 Resumo da sua mensagem:</h3>
              <p><strong>Nome:</strong> ${dados.name}</p>
              <p><strong>Email:</strong> ${dados.email}</p>
              <p><strong>Telefone:</strong> ${dados.phone}</p>
              ${dados.company ? `<p><strong>Empresa:</strong> ${dados.company}</p>` : ''}
              <p><strong>Assunto:</strong> ${obterTextoAssunto(dados.subject)}</p>
              <p><strong>Mensagem:</strong><br>${dados.message}</p>
            </div>
            
            <p style="text-align: center; font-size: 16px;">
              <strong>⏱️ Tempo médio de resposta: até 24 horas úteis</strong>
            </p>
            
            <div class="contact-info">
              <h3 style="margin-top: 0; color: #FFD24C;">📞 Precisa de ajuda imediata?</h3>
              <p><strong>Email:</strong> ${CONFIG.EMAIL_EQUIPE.split(',')[0].trim()}</p>
              <p><strong>Telefone/WhatsApp:</strong> ${CONFIG.TELEFONE_EMPRESA}</p>
              <p><strong>Horário de Atendimento:</strong><br>
              Segunda a Sexta: 8h - 18h | Sábado: 8h - 12h</p>
            </div>
            
            <p style="text-align: center; color: #666; font-size: 14px; margin-top: 30px;">
              Enquanto aguarda nosso retorno, fique à vontade para conhecer mais sobre nossos produtos e serviços.
            </p>
          </div>
          
          <div class="footer">
            <p><strong>${CONFIG.NOME_EMPRESA}</strong></p>
            <p>Espírito Santo, Brasil</p>
            <p style="font-size: 12px; color: #999; margin-top: 15px;">
              Este é um email automático. Por favor, não responda diretamente. 
              Para dúvidas, utilize nossos canais de atendimento.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const corpoTexto = `
      Olá, ${dados.name}!
      
      Obrigado por entrar em contato com a ${CONFIG.NOME_EMPRESA}!
      
      Recebemos sua mensagem e nossa equipe entrará em contato em breve através do email: ${dados.email}
      
      Resumo da sua mensagem:
      - Nome: ${dados.name}
      - Email: ${dados.email}
      - Telefone: ${dados.phone}
      ${dados.company ? `- Empresa: ${dados.company}` : ''}
      - Assunto: ${obterTextoAssunto(dados.subject)}
      - Mensagem: ${dados.message}
      
      Tempo médio de resposta: até 24 horas úteis
      
      Precisa de ajuda imediata?
      Email: ${CONFIG.EMAIL_EQUIPE.split(',')[0].trim()}
      Telefone: ${CONFIG.TELEFONE_EMPRESA}
      Horário: Segunda a Sexta: 8h - 18h | Sábado: 8h - 12h
      
      ${CONFIG.NOME_EMPRESA}
      Espírito Santo, Brasil
    `;
    
    MailApp.sendEmail({
      to: dados.email,
      subject: assunto,
      body: corpoTexto,
      htmlBody: corpoHTML,
      name: CONFIG.NOME_EMPRESA
    });
    
    console.log('✅ Email de confirmação enviado para:', dados.email);
    
  } catch (erro) {
    console.error('❌ Erro ao enviar email para usuário:', erro);
  }
}

// ==================== EMAIL DE NOTIFICAÇÃO PARA A EQUIPE ====================
function enviarEmailNotificacaoEquipe(dados) {
  try {
    const assunto = `🔔 Nova Mensagem de Contato - ${dados.name} [${obterTextoAssunto(dados.subject)}]`;
    
    const corpoHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { 
            font-family: 'Segoe UI', Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0;
            padding: 0;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: #ffffff;
          }
          .header { 
            background: linear-gradient(135deg, #9333EA 0%, #7E22CE 100%); 
            color: white; 
            padding: 30px 20px; 
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 26px;
            font-weight: bold;
          }
          .content { 
            padding: 30px;
            background: #f9f9f9;
          }
          .priority-badge {
            background: #FF6B6B;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            display: inline-block;
            margin: 10px 0;
          }
          .info-box { 
            background: white; 
            padding: 25px; 
            margin: 20px 0; 
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          .info-box h3 {
            margin-top: 0;
            color: #9333EA;
            border-bottom: 2px solid #9333EA;
            padding-bottom: 10px;
          }
          .info-box p {
            margin: 10px 0;
          }
          .label {
            font-weight: bold;
            color: #555;
            display: inline-block;
            min-width: 100px;
          }
          .message-box {
            background: #f5f5f5;
            padding: 15px;
            border-radius: 5px;
            margin: 10px 0;
            white-space: pre-wrap;
            border-left: 4px solid #9333EA;
          }
          .footer { 
            text-align: center; 
            padding: 20px; 
            color: #666; 
            font-size: 12px;
            background: #f0f0f0;
          }
          .action-button {
            background: #9333EA;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            display: inline-block;
            margin: 10px 5px;
            font-weight: bold;
          }
          .alert-box {
            background: #FFF9E6;
            border-left: 4px solid #FFD24C;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 Nova Mensagem de Contato</h1>
            <p style="margin: 5px 0 0 0; font-size: 14px;">
              ${formatarDataHora(new Date())}
            </p>
          </div>
          
          <div class="content">
            ${isPrioridade(dados.subject) ? '<div style="text-align: center;"><span class="priority-badge">⚠️ PRIORIDADE ALTA</span></div>' : ''}
            
            <div class="info-box">
              <h3>👤 Dados do Contato</h3>
              <p><span class="label">Nome:</span> <strong>${dados.name}</strong></p>
              <p><span class="label">Email:</span> <strong><a href="mailto:${dados.email}">${dados.email}</a></strong></p>
              <p><span class="label">Telefone:</span> <strong><a href="tel:${dados.phone}">${dados.phone}</a></strong></p>
              ${dados.company ? `<p><span class="label">Empresa:</span> <strong>${dados.company}</strong></p>` : ''}
              <p><span class="label">Assunto:</span> <strong>${obterTextoAssunto(dados.subject)}</strong></p>
            </div>
            
            <div class="info-box">
              <h3>💬 Mensagem</h3>
              <div class="message-box">${dados.message}</div>
            </div>
            
            <div class="alert-box">
              <h4 style="margin-top: 0; color: #B8860B;">⏰ Ações Recomendadas:</h4>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li><strong>Responder em até 24 horas</strong></li>
                <li>Verificar histórico de contatos anteriores</li>
                <li>Personalizar a resposta conforme o assunto</li>
                <li>Marcar como "Em andamento" na planilha</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${dados.email}" class="action-button">📧 Responder Email</a>
              <a href="https://wa.me/55${dados.phone.replace(/\D/g, '')}" class="action-button">💬 WhatsApp</a>
            </div>
            
            <p style="text-align: center; color: #666; font-size: 14px; margin-top: 30px;">
              <strong>⏰ Lembre-se:</strong> Retorne ao cliente em até 24 horas para maximizar conversão!
            </p>
          </div>
          
          <div class="footer">
            <p><strong>Sistema de Captura de Leads - ${CONFIG.NOME_EMPRESA}</strong></p>
            <p>Email automático gerado pelo Google Apps Script</p>
            <p style="margin-top: 10px;">
              📊 <a href="https://docs.google.com/spreadsheets/d/${CONFIG.SPREADSHEET_ID}">Acessar Planilha</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const corpoTexto = `
      🔔 NOVA MENSAGEM DE CONTATO - B-COSMETIC
      ${formatarDataHora(new Date())}
      
      ${isPrioridade(dados.subject) ? '⚠️ PRIORIDADE ALTA\n' : ''}
      
      DADOS DO CONTATO:
      - Nome: ${dados.name}
      - Email: ${dados.email}
      - Telefone: ${dados.phone}
      ${dados.company ? `- Empresa: ${dados.company}` : ''}
      - Assunto: ${obterTextoAssunto(dados.subject)}
      
      MENSAGEM:
      ${dados.message}
      
      ⏰ AÇÕES RECOMENDADAS:
      - Responder em até 24 horas
      - Verificar histórico de contatos
      - Personalizar resposta
      - Marcar status na planilha
      
      Link da planilha:
      https://docs.google.com/spreadsheets/d/${CONFIG.SPREADSHEET_ID}
      
      ---
      Sistema de Leads - ${CONFIG.NOME_EMPRESA}
    `;
    
    MailApp.sendEmail({
      to: CONFIG.EMAIL_EQUIPE,
      subject: assunto,
      body: corpoTexto,
      htmlBody: corpoHTML,
      name: `Sistema de Contatos - ${CONFIG.NOME_EMPRESA}`
    });
    
    console.log('✅ Email de notificação enviado para equipe');
    
  } catch (erro) {
    console.error('❌ Erro ao enviar email para equipe:', erro);
  }
}

// ==================== FUNÇÕES AUXILIARES ====================

function limparTexto(texto) {
  return texto ? String(texto).trim() : '';
}

function normalizarTelefone(telefone) {
  return telefone ? String(telefone).replace(/\D/g, '') : '';
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function obterTextoAssunto(codigo) {
  const assuntos = {
    'distribuidor': '🤝 Quero ser Distribuidor',
    'consultor': '💼 Quero ser Consultor',
    'produtos': '📦 Informações sobre Produtos',
    'parceria': '🤝 Parceria Comercial',
    'suporte': '🛠️ Suporte',
    'outro': '📋 Outro'
  };
  return assuntos[codigo] || codigo || 'Não especificado';
}

function isPrioridade(assunto) {
  const prioritarios = ['distribuidor', 'parceria', 'consultor'];
  return prioritarios.includes(assunto);
}

function formatarDataHora(data) {
  const opcoes = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo'
  };
  return data.toLocaleDateString('pt-BR', opcoes);
}

function respostaErro(mensagem) {
  console.error('❌ Erro:', mensagem);
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'erro',
      message: mensagem,
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ==================== CONFIGURAÇÃO INICIAL ====================
// Execute esta função UMA VEZ para criar a aba e cabeçalhos
function configurarPlanilha() {
  try {
    const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    
    if (sheet) {
      return 'Aba "' + CONFIG.SHEET_NAME + '" já existe!';
    }
    
    // Cria a aba
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    
    // Cabeçalhos
    const cabecalhos = [
      'Data/Hora',
      'Nome',
      'Email',
      'Telefone',
      'Empresa',
      'Assunto',
      'Mensagem',
      'Status'
    ];
    
    sheet.getRange(1, 1, 1, cabecalhos.length).setValues([cabecalhos]);
    
    // Formata cabeçalhos
    const headerRange = sheet.getRange(1, 1, 1, cabecalhos.length);
    headerRange.setBackground('#FFD24C');
    headerRange.setFontWeight('bold');
    headerRange.setFontColor('#000000');
    headerRange.setHorizontalAlignment('center');
    headerRange.setFontSize(12);
    
    // Ajusta largura das colunas
    sheet.setColumnWidth(1, 160); // Data/Hora
    sheet.setColumnWidth(2, 200); // Nome
    sheet.setColumnWidth(3, 250); // Email
    sheet.setColumnWidth(4, 140); // Telefone
    sheet.setColumnWidth(5, 180); // Empresa
    sheet.setColumnWidth(6, 180); // Assunto
    sheet.setColumnWidth(7, 400); // Mensagem
    sheet.setColumnWidth(8, 120); // Status
    
    // Congela primeira linha
    sheet.setFrozenRows(1);
    
    console.log('✅ Planilha configurada com sucesso!');
    
    return 'Aba "' + CONFIG.SHEET_NAME + '" criada com sucesso!';
    
  } catch (erro) {
    console.error('Erro ao configurar planilha:', erro);
    throw erro;
  }
}

