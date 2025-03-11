# Discord Live Announcer

![Discord Live Announcer Preview](https://i.postimg.cc/TYqgm0fp/image.png)

---

## 🌍 English Documentation

### 📖 Overview

**Discord Live Announcer** is a web application designed to send live stream announcements to Discord servers. It allows streamers to notify their community about live streams on platforms like Twitch, YouTube, or TikTok with beautifully formatted embeds. Built with Node.js, Express, Discord.js, and a simple frontend using Tailwind CSS, this tool helps streamers automate their announcements.

#### Key Features:
- **Customizable Embeds**: Include stream details such as title, game, start time, and role mention.
- **Platform Support**: Works with Twitch, YouTube, and TikTok, featuring platform-specific colors and banners.
- **Interactive Buttons**: Provide direct links to the live stream and social media.
- **Role Mention**: Notify a specific role within the Discord server.
- **Game Selection**: Choose from a predefined list or add your own game.
- **Responsive Web Interface**: A clean and modern UI built with Tailwind CSS.
- **Dynamic Preview**: Preview the embed before sending (requires additional setup in `scripts.js`).

![Preview](https://i.postimg.cc/cH95sW5G/image.png)

---

### ⚙️ Prerequisites

- **Node.js** (v16 or higher) and **npm** installed.
- A Discord bot token (refer to the setup guide below).
- A modern web browser.
- Internet connection to interact with the Discord API.

---

### 📥 Installation

1. **Download the Project**: Clone the repository or download the files.
2. **Install Dependencies**: Run the following command to install required packages:
   ```bash
   npm install
   npm install express discord.js dotenv
   npm install nodemon --save-dev  # For automatic restarts during development
   npm install discord.js@14.15.3  # Ensure the correct version is installed
   npm audit fix --force  # Fix any potential vulnerabilities   
   ```
3. **Configure Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add the bot token:
     ```bash
     DISCORD_TOKEN=your-bot-token-here
     ```
4. **Start the Server**:
   ```bash
   nodemon index.js  # Recommended for development (auto-restarts on changes)
   node index.js  # Standard way to run the bot
   ```
   Expected output:
   ```bash
   Server running at http://localhost:3000
   Bot connected as [your-bot-name]
   ```
5. **Access the Web Interface**: Open `http://localhost:3000` in a web browser.

---

### 🚀 Usage

1. Select a server from the dropdown list.
2. Choose a text channel for announcements.
3. (Optional) Select a role to mention in the announcement.
4. Pick a game from the predefined list or enter a custom one.
5. Choose a streaming platform (Twitch, YouTube, or TikTok).
6. Enter a stream title (e.g., "LIVE NOW ON TWITCH").
7. Add stream URLs, one per line.
8. Click "Send" to publish the announcement.
9. Click "Clear" to reset the form.

---

### 🛠️ Dependencies

Install the required backend dependencies:
```bash
npm install discord.js express dotenv
```

**Frontend Styling:** Tailwind CSS is included via CDN in `index.html`, requiring no additional setup.

---

### 🔧 Discord Bot Setup Guide

1. **Create a Discord Bot**:
   - Go to the [Discord Developer Portal](https://discord.com/developers/applications).
   - Create a new application and add a bot.
   - Copy the bot token and store it in `.env`.

2. **Enable Required Intents**:
   - Navigate to the "Bot" tab in the Developer Portal.
   - Enable "Presence Intent," "Server Members Intent," and "Message Content Intent."

3. **Invite the Bot to Your Server**:
   - Go to the "OAuth2" section and generate an invite link.
   - Assign necessary permissions (Send Messages, Embed Links, etc.).
   - Use this format (replace `[CLIENT_ID]` with your bot’s ID):
     ```
     https://discord.com/oauth2/authorize?client_id=[CLIENT_ID]&scope=bot&permissions=277025459264
     ```

4. **Verify the Bot is Running**:
   - Run `node index.js` and confirm that the bot connects successfully.
   - If the bot is offline, check the `.env` file and ensure all intents are enabled.

---

### ⚠️ Important Notes

- **Permissions**: Ensure the bot has the correct permissions in the Discord server.
- **Embed Preview**: The preview feature in the web interface is not fully implemented. Modify `scripts.js` to extend this functionality.
- **Security**: Never share your `.env` file, as it contains sensitive information.
- **Tailwind CSS**: It is loaded via CDN, but you can install it locally if needed.

---

### 📝 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## 🇧🇷 Documentação em Português

### 📖 Visão Geral

![Discord Live Announcer Preview](https://i.postimg.cc/TYqgm0fp/image.png)

O **Discord Live Announcer** é uma aplicação web que envia anúncios de lives para servidores do Discord. Construído com Node.js, Express, Discord.js e Tailwind CSS, ele permite que streamers automatizem suas notificações.

#### Funcionalidades Principais:
- **Embeds Personalizáveis**: Informações como título, jogo e menção de cargo.
- **Suporte a Plataformas**: Twitch, YouTube e TikTok.
- **Botões Interativos**: Links diretos para a live e redes sociais.
- **Menção de Cargo**: Notificação personalizada para um grupo de usuários.
- **Seleção de Jogo**: Lista predefinida ou entrada personalizada.
- **Interface Web Responsiva**: Interface moderna utilizando Tailwind CSS.
- **Pré-visualização Dinâmica**: Requer configuração extra em `scripts.js`.

![Preview](https://i.postimg.cc/cH95sW5G/image.png)

---

### ⚙️ Pré-requisitos

- **Node.js** (v16 ou superior) e **npm**.
- Token de bot do Discord.
- Navegador atualizado.
- Conexão com a internet.

---

### 📥 Instalação

1. **Baixar o Projeto**: Clone o repositório ou faça o download.
2. **Instalar Dependências**:
   ```bash
   npm install
   npm install express discord.js dotenv
   npm install nodemon --save-dev  # Para reinícios automáticos durante o desenvolvimento
   npm install discord.js@14.15.3  # Garante que a versão correta seja instalada
   npm audit fix --force  # Corrige possíveis vulnerabilidades
   ```
3. **Configurar Variáveis de Ambiente**:
   - Criar um arquivo `.env` e adicionar o token do bot:
     ```bash
     DISCORD_TOKEN=seu-token-aqui
     ```
4. **Iniciar o Servidor**:
   ```bash
   nodemon index.js  # Recomendado para desenvolvimento (reinicia automaticamente ao alterar)
   node index.js  # Forma padrão de executar o bot
   ```
5. **Acessar a Interface Web**: Abra `http://localhost:3000` no navegador.

---

### 🚀 Uso

1. Escolha um servidor.
2. Selecione um canal para enviar o anúncio.
3. (Opcional) Escolha um cargo para mencionar.
4. Escolha um jogo ou adicione um personalizado.
5. Selecione a plataforma de streaming.
6. Insira um título para a live.
7. Adicione URLs.
8. Clique em "Enviar".
9. Clique em "Limpar" para resetar o formulário.

---

### 📝 Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para mais informações.

