<?php
// Define o caminho do arquivo onde os dados serão salvos.
// Certifique-se de que o diretório 'dados_avaliacoes' existe e tem permissões de escrita para o servidor web.
$arquivo_destino = __DIR__ . '/dados_avaliacoes/avaliacoes_projeto.txt';

// Verifica se o método de requisição é POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Coleta e sanitiza os dados do formulário
    // Usamos htmlspecialchars para prevenir ataques XSS (Cross-Site Scripting)
    $pontos_positivos = htmlspecialchars($_POST['pontos_positivos'] ?? 'Não informado');
    $pontos_negativos = htmlspecialchars($_POST['pontos_negativos'] ?? 'Não informado');
    $sugestoes = htmlspecialchars($_POST['sugestoes'] ?? 'Não informado');

    // Gera um timestamp para a entrada
    $timestamp = date('Y-m-d H:i:s');

    // Constrói o conteúdo a ser salvo no arquivo
    $dados = "========================================\n";
    $dados .= "Data/Hora da Avaliação: {$timestamp}\n";
    $dados .= "Pontos Positivos:\n{$pontos_positivos}\n";
    $dados .= "Pontos Negativos:\n{$pontos_negativos}\n";
    $dados .= "Sugestões:\n{$sugestoes}\n";
    $dados .= "========================================\n\n";

    // Garante que o diretório exista. Se não existir, tenta criá-lo.
    $diretorio = dirname($arquivo_destino);
    if (!is_dir($diretorio)) {
        // Cria o diretório recursivamente com permissões 0755 (recomendado para diretórios)
        mkdir($diretorio, 0755, true); 
    }

    // Tenta anexar os dados ao arquivo
    // FILE_APPEND: adiciona ao final do arquivo
    // LOCK_EX: impede que outros scripts escrevam no arquivo ao mesmo tempo
    if (file_put_contents($arquivo_destino, $dados, FILE_APPEND | LOCK_EX) !== false) {
        // Redireciona para uma página de sucesso ou exibe uma mensagem
        header('Location: sucesso.html'); // Certifique-se de que sucesso.html existe e é adequada.
        exit;
    } else {
        // Se houver um erro ao salvar o arquivo
        echo "Erro ao salvar a avaliação. Por favor, tente novamente.";
    }
} else {
    // Se a página for acessada diretamente sem um POST, redireciona para o formulário de avaliação
    header('Location: contato.html');
    exit;
}
?>