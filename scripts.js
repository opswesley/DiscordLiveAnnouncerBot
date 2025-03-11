document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message');
    const urlsInput = document.getElementById('urls');
    const platformSelect = document.getElementById('platform');
    const roleInput = document.getElementById('roleInput');
    const roleList = document.getElementById('roleList');
    const gameInput = document.getElementById('gameInput');
    const guildSelect = document.getElementById('guildSelect');
    const channelSelect = document.getElementById('channelSelect');
    const preview = document.getElementById('preview');
  
    let allRoles = [];
  
    const savedGame = localStorage.getItem('lastGame');
    if (savedGame) {
      gameInput.value = savedGame;
    }
  
    window.updateDefaultUrl = function () {
      const platform = platformSelect.value.toLowerCase();
      switch (platform) {
        case 'twitch':
          urlsInput.value = 'https://www.twitch.tv/afslucas';
          break;
        case 'tiktok':
          urlsInput.value = 'https://www.tiktok.com/@afslucas/live';
          break;
        case 'youtube':
          urlsInput.value = '';
          break;
        default:
          urlsInput.value = '';
      }
      window.updatePreview();
    };
  
    window.saveGame = function () {
      const game = gameInput.value;
      if (game) {
        localStorage.setItem('lastGame', game);
      }
      window.updatePreview();
    };
  
    window.filterRoles = function () {
      const searchText = roleInput.value.toLowerCase();
      roleList.innerHTML = ''; 
      const filteredRoles = allRoles.filter(role =>
        role.name.toLowerCase().includes(searchText)
      );
      filteredRoles.forEach(role => {
        const option = document.createElement('option');
        option.value = role.name; 
        option.setAttribute('data-id', role.id); 
        roleList.appendChild(option);
      });

      const selectedOption = filteredRoles.find(role => role.name.toLowerCase() === searchText.toLowerCase());
      if (selectedOption) {
        roleInput.value = selectedOption.name; 
      }
      window.updatePreview();
    };
  
    // Função para atualizar o preview em tempo real
    window.updatePreview = function () {
      const message = messageInput.value || 'Sem mensagem';
      const urls = urlsInput.value.split('\n').filter(url => url.trim());
      const platform = platformSelect.value.toLowerCase();
      const roleName = roleInput.value;
      const game = gameInput.value || 'Jogo não especificado';
      let embedColor, embedTitle, cardImageURL;
  
      switch (platform) {
        case 'twitch':
          embedColor = '#6441A5';
          embedTitle = '🟣 Afslucas está AO VIVO na Twitch! 🎥';
          cardImageURL = 'https://i.ibb.co/6cMSjQhy/itoshi-sae-blue-lock.gif';
          break;
        case 'youtube':
          embedColor = '#FF0000';
          embedTitle = '🔴 Afslucas está AO VIVO no YouTube! 🎥';
          cardImageURL = 'https://i.ibb.co/wrFsw8hB/itoshi-sae-blue-lock-1.gif';
          break;
        case 'tiktok':
          embedColor = '#000000';
          embedTitle = '⚫ Afslucas está AO VIVO no TikTok! 🎥';
          cardImageURL = 'https://i.ibb.co/6cMSjQhy/itoshi-sae-blue-lock.gif';
          break;
        default:
          embedColor = '#00FF00';
          embedTitle = '🟢 Afslucas está AO VIVO! 🎥';
          cardImageURL = 'https://via.placeholder.com/150';
      }
  
      const selectedRole = allRoles.find(role => role.name === roleName);
      const mention = selectedRole ? `<@&${selectedRole.id}>` : '';
      preview.innerHTML = `
        <div class="embed bg-gray-700 p-4 rounded" style="border-left: 4px solid ${embedColor};">
          <h3 class="text-lg font-bold" style="color: ${embedColor};">${embedTitle}</h3>
          <p class="text-sm text-gray-300">Por <strong>Afslucas</strong> <a href="https://www.twitch.tv/afslucas" target="_blank" class="text-blue-400">Perfil</a></p>
          <div class="mt-2 space-y-2">
            <p><strong class="text-green-400">🎥 Título:</strong> ${message}</p>
            <p><strong class="text-green-400">🎮 Jogo:</strong> ${game}</p>
            ${urls.map(url => `<p><strong class="text-green-400">🔗 Link:</strong> <a href="${url}" target="_blank" class="text-blue-400">Assistir</a></p>`).join('')}
          </div>
          <p class="text-xs text-gray-500 mt-2">🔔 ${mention} Nova live detectada! 🚀</p>
          <img src="${cardImageURL}" alt="Card Image" class="w-full h-32 object-cover rounded mt-2">
          <p class="text-xs text-gray-500 mt-2">Afslucas | Junte-se à live! 🚀 - <span class="text-gray-400">${new Date().toLocaleString()}</span></p>
        </div>
      `;
    };
  
    window.updateDefaultUrl();
  
    messageInput.addEventListener('input', window.updatePreview);
    urlsInput.addEventListener('input', window.updatePreview);
    platformSelect.addEventListener('change', window.updateDefaultUrl);
    roleInput.addEventListener('input', window.filterRoles);
    gameInput.addEventListener('input', window.saveGame);

    window.clearForm = function () {
      messageInput.value = '';
      urlsInput.value = '';
      platformSelect.value = 'twitch';
      roleInput.value = '';
      gameInput.value = '';
      guildSelect.value = '';
      channelSelect.value = '';
      roleList.innerHTML = '';
      localStorage.removeItem('lastGame');
      window.updateDefaultUrl();
      window.updatePreview();
    };
  
    // Função para enviar mensagem
    window.sendMessage = function () {
      const message = messageInput.value;
      const urls = urlsInput.value.split('\n').filter(url => url.trim());
      const platform = platformSelect.value;
      const roleName = roleInput.value;
      const game = gameInput.value;
      const guildId = guildSelect.value;
      const channelId = channelSelect.value;
  
      const selectedRole = allRoles.find(role => role.name === roleName);
      const roleId = selectedRole ? selectedRole.id : '';
  
      if (!message || !guildId || !channelId) {
        alert('Preencha a mensagem, servidor e canal!');
        return;
      }
  
      fetch('/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, urls, platform, guildId, channelId, roleId, game }),
      })
        .then(response => response.text())
        .then(data => alert(data))
        .catch(err => alert(`Erro: ${err}`));
    };

    fetch('/guilds')
      .then(response => response.json())
      .then(guilds => {
        guildSelect.innerHTML = '<option value="">Selecione um servidor</option>';
        guilds.forEach(guild => {
          const option = document.createElement('option');
          option.value = guild.id;
          option.textContent = guild.name;
          guildSelect.appendChild(option);
        });
      })
      .catch(err => {
        guildSelect.innerHTML = '<option value="">Erro ao carregar servidores</option>';
        console.error('Erro ao carregar servidores:', err);
      });

    guildSelect.addEventListener('change', () => {
      const guildId = guildSelect.value;
      channelSelect.innerHTML = '<option value="">Carregando canais...</option>';
      roleInput.value = '';
      roleList.innerHTML = '';
      gameInput.value = localStorage.getItem('lastGame') || '';
  
      if (!guildId) {
        channelSelect.innerHTML = '<option value="">Selecione um servidor primeiro</option>';
        return;
      }

      fetch(`/channels/${guildId}`)
        .then(response => response.json())
        .then(channels => {
          channelSelect.innerHTML = '<option value="">Selecione um canal</option>';
          channels.forEach(channel => {
            const option = document.createElement('option');
            option.value = channel.id;
            option.textContent = channel.name;
            channelSelect.appendChild(option);
          });
        })
        .catch(err => {
          channelSelect.innerHTML = '<option value="">Erro ao carregar canais</option>';
          console.error('Erro ao carregar canais:', err);
        });
  
      fetch(`/roles/${guildId}`)
        .then(response => response.json())
        .then(roles => {
          allRoles = roles;
          roleList.innerHTML = '';
          roles.forEach(role => {
            const option = document.createElement('option');
            option.value = role.name;
            option.setAttribute('data-id', role.id);
            roleList.appendChild(option);
          });
        })
        .catch(err => {
          roleList.innerHTML = '<option value="">Erro ao carregar cargos</option>';
          console.error('Erro ao carregar cargos:', err);
        });
    });
  });