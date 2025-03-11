require('dotenv').config();
const express = require('express');
const { Client, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const app = express();
const port = 3000;

const client = new Client({
  intents: ['Guilds', 'GuildMessages', 'MessageContent', 'GuildMembers'],
});

app.use(express.json());
app.use(express.static(__dirname));

// Rota para listar servidores
app.get('/guilds', (req, res) => {
  if (!client.isReady()) {
    return res.status(503).send('Bot não está pronto');
  }
  const guilds = client.guilds.cache.map(guild => ({
    id: guild.id,
    name: guild.name,
  }));
  res.json(guilds);
});

// Rota para listar canais do servidor
app.get('/channels/:guildId', (req, res) => {
  const guildId = req.params.guildId;

  if (!client.isReady()) {
    return res.status(503).send('Bot não está pronto');
  }

  const guild = client.guilds.cache.get(guildId);
  if (!guild) {
    return res.status(404).send('Servidor não encontrado');
  }

  const channels = guild.channels.cache
    .filter(channel => channel.isTextBased() && channel.permissionsFor(guild.members.me).has('SendMessages'))
    .map(channel => ({
      id: channel.id,
      name: channel.name,
    }));

  res.json(channels);
});

// Rota para listar cargos do servidor
app.get('/roles/:guildId', (req, res) => {
  const guildId = req.params.guildId;

  if (!client.isReady()) {
    return res.status(503).send('Bot não está pronto');
  }

  const guild = client.guilds.cache.get(guildId);
  if (!guild) {
    return res.status(404).send('Servidor não encontrado');
  }

  const roles = guild.roles.cache
    .filter(role => !role.name.includes('@everyone') && !role.managed)
    .map(role => ({
      id: role.id,
      name: role.name,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 100);

  res.json(roles);
});

app.post('/send-message', (req, res) => {
  const { message, urls, platform, guildId, channelId, roleId, game } = req.body;

  console.log('Requisição recebida:', { message, urls, platform, guildId, channelId, roleId, game });

  if (!client.isReady()) {
    console.error('Bot não está pronto');
    return res.status(503).send('Bot não está pronto');
  }

  const guild = client.guilds.cache.get(guildId);
  if (!guild) {
    console.error('Servidor não encontrado:', guildId);
    return res.status(400).send('Servidor não encontrado');
  }

  const channel = guild.channels.cache.get(channelId);
  if (!channel || !channel.isTextBased()) {
    console.error('Canal inválido ou sem permissão:', channelId);
    return res.status(400).send('Canal inválido');
  }

  // Configurações de cor e título por plataforma
  let embedColor, embedTitle, cardImageURL;
  switch (platform.toLowerCase()) {
    case 'twitch':
      embedColor = 0x6441A5;
      embedTitle = '🟣 **AFSLUCAS AO VIVO NA TWITCH!**';
      cardImageURL = 'https://i.ibb.co/6cMSjQhy/itoshi-sae-blue-lock.gif'; // Seu banner
      break;
    case 'youtube':
      embedColor = 0xFF0000;
      embedTitle = '🔴 **AFSLUCAS AO VIVO NO YOUTUBE!**';
      cardImageURL = 'https://i.ibb.co/wrFsw8hB/itoshi-sae-blue-lock-1.gif'; // Seu banner
      break;
    case 'tiktok':
      embedColor = 0x000000;
      embedTitle = '⚫ **AFSLUCAS AO VIVO NO TIKTOK!**';
      cardImageURL = 'https://i.ibb.co/6cMSjQhy/itoshi-sae-blue-lock.gif'; // Seu banner
      break;
    default:
      embedColor = 0x00FF00;
      embedTitle = '🟢 **AFSLUCAS AO VIVO!**';
      cardImageURL = 'https://i.ibb.co/6cMSjQhy/itoshi-sae-blue-lock.gif'; // Banner padrão
  }

  const embed = new EmbedBuilder()
    .setColor(embedColor)
    .setTitle(embedTitle)
    .setAuthor({
      name: 'AFSLUCAS',
      url: 'https://www.twitch.tv/afslucas',
    })
    .setDescription(
      `🎉 **Estou ao vivo agora!** 🎉\n` +
      `━━━━━━━━━━━━━━━━━━━`
    )
    .addFields(
      { 
        name: '🎬 Título da live', 
        value: `**${message || 'Sem título'}**`, 
        inline: true 
      },
      { 
        name: '🎮 Jogo', 
        value: `**${game || 'Não especificado'}**`, 
        inline: true 
      },
      { 
        name: '⏰ Início', 
        value: `<t:${Math.floor(Date.now() / 1000)}:R>`, 
        inline: true 
      },
      { 
        name: '👥 Cargo mencionado', 
        value: roleId ? `<@&${roleId}>` : 'Nenhum', 
        inline: true 
      }
    )
    .setImage(cardImageURL) // Seu banner
    .setFooter({ 
      text: `AFSLUCAS | Live iniciada há <t:${Math.floor(Date.now() / 1000)}:R> 🔥`, 
    })
    .setTimestamp(); 

  const row = new ActionRowBuilder();
  if (urls.length > 0) {
    urls.forEach((url, index) => {
      if (index < 5) { 
        row.addComponents(
          new ButtonBuilder()
            .setLabel(`👀 Assistir Agora! (${index + 1})`)
            .setStyle(ButtonStyle.Link)
            .setURL(url)
        );
      }
    });
    // Botão para redes sociais
    row.addComponents(
      new ButtonBuilder()
        .setLabel('🌐 Minhas Redes')
        .setStyle(ButtonStyle.Link)
        .setURL('https://beacons.ai/afslucas')
    );
  }

  channel.send({
    content: '',
    embeds: [embed],
    components: urls.length > 0 ? [row] : [],
  })
    .then(() => {
      console.log('Mensagem enviada com sucesso!');
      res.send('Mensagem enviada com sucesso!');
    })
    .catch(err => {
      console.error('Erro ao enviar mensagem:', err);
      res.status(500).send(`Erro ao enviar mensagem: ${err.message}`);
    });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// Conectar ao Discord
client.once('ready', () => {
  console.log(`Bot conectado como ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);