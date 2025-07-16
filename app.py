from flask import Flask, request, render_template, redirect, url_for
import os
from datetime import datetime

# Configura o Flask para encontrar seus arquivos HTML e CSS/imagens
app = Flask(__name__, template_folder='html', static_folder='.')

# Define o caminho para a pasta de dados.
DATA_FOLDER = 'dados' #
if not os.path.exists(DATA_FOLDER): #
    os.makedirs(DATA_FOLDER) #

# Rota para a página inicial (opcional, apenas um exemplo)
@app.route('/') #
def home(): #
    return redirect(url_for('contato_page')) #

# Rota para servir a página de contato HTML
@app.route('/html/contato.html') #
def contato_page(): #
    return render_template('contato.html') #

# Rota para lidar com o envio do formulário
@app.route('/salvar_contato', methods=['POST']) #
def salvar_contato(): #
    if request.method == 'POST': #
        try: #
            nome = request.form['nome'] #
            email = request.form['email'] #
            assunto = request.form.get('assunto', 'N/A') #
            mensagem = request.form['mensagem'] #

            if not nome or not email or not mensagem: #
                return render_template('feedback.html', #
                                       title="Erro!", #
                                       message="Erro: Por favor, preencha todos os campos obrigatórios.", #
                                       redirect_url="/html/contato.html", #
                                       delay=3, #
                                       color="red", #
                                       shadow_color="rgba(255, 0, 0, 0.7)") #

            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S") #
            dados = f"========================================\n" \
                    f"Data/Hora: {timestamp}\n" \
                    f"Nome: {nome}\n" \
                    f"E-mail: {email}\n" \
                    f"Assunto: {assunto}\n" \
                    f"Mensagem:\n{mensagem}\n" \
                    f"========================================\n\n" #

            file_path = os.path.join(DATA_FOLDER, 'contatos.txt') #

            with open(file_path, 'a', encoding='utf-8') as f: #
                f.write(dados) #

            return render_template('feedback.html', #
                                   title="Mensagem Enviada!", #
                                   message="Obrigado por entrar em contato. Sua mensagem foi salva com sucesso!", #
                                   redirect_url="/html/contato.html", #
                                   delay=3, #
                                   color="#00ffff", #
                                   shadow_color="rgba(0, 255, 255, 0.7)") #

        except Exception as e: #
            return render_template('feedback.html', #
                                   title="Erro ao Enviar!", #
                                   message=f"Ocorreu um problema ao salvar sua mensagem: {e}. Por favor, tente novamente mais tarde.", #
                                   redirect_url="/html/contato.html", #
                                   delay=5, #
                                   color="red", #
                                   shadow_color="rgba(255, 0, 0, 0.7)") #
    return redirect(url_for('contato_page')) #

if __name__ == '__main__': #
    app.run(debug=True, port=5000) #