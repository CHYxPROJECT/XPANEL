// Create particles for background
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random size and position
    const size = Math.random() * 6 + 2;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 20 + 10;
    const animationDelay = Math.random() * 5;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.animationDuration = `${animationDuration}s`;
    particle.style.animationDelay = `${animationDelay}s`;
    
    particlesContainer.appendChild(particle);
  }
}

const hargaPaket = {
  "1gb": { ram: 1000, disk: 1000, cpu: 40 },
  "2gb": { ram: 2000, disk: 1000, cpu: 60 },
  "3gb": { ram: 3000, disk: 2000, cpu: 80 },
  "4gb": { ram: 4000, disk: 2000, cpu: 100 },
  "5gb": { ram: 5000, disk: 3000, cpu: 120 },
  "6gb": { ram: 6000, disk: 3000, cpu: 140 },
  "7gb": { ram: 7000, disk: 4000, cpu: 160 },
  "8gb": { ram: 8000, disk: 4000, cpu: 180 },
  "9gb": { ram: 9000, disk: 5000, cpu: 200 },
  "10gb": { ram: 10000, disk: 5000, cpu: 220 },
  "unli": { ram: 0, disk: 0, cpu: 0 }
};

function goBack() {
  document.getElementById('step1').classList.remove('hidden');
  document.getElementById('loadingStep').classList.add('hidden');
  document.getElementById('step2').classList.add('hidden');
  document.getElementById('errorStep').classList.add('hidden');
}

async function login() {
  const username = document.getElementById('username').value.trim();
  const paket = document.getElementById('paket').value;

  if (!username || !paket) return alert('Isi semua data terlebih dahulu!');

  document.getElementById('step1').classList.add('hidden');
  document.getElementById('loadingStep').classList.remove('hidden');

  const conf = hargaPaket[paket];
  
  try {
    // Note: URL API ini harus dipastikan aktif & sesuai parameter yang diminta API-nya.
    const res = await fetch(`https://api.resellergaming.my.id/pterodactyl/addpanel?domain=https://panel.wazzzzzzzzzzzz.cyberpanel.web.id&plta=ptla_Sq10n7OjpTYpNXducWOWrFCaHnwBDaUgbD6RXb6oiHD&username=${username}&disk=${conf.disk}&cpu=${conf.cpu}`);
    const data = await res.json();

    if (data && data.user) {
      document.getElementById('loadingStep').classList.add('hidden');
      document.getElementById('step2').classList.remove('hidden');

      document.getElementById('email').innerText = data.user.attributes.email;
      document.getElementById('uname').innerText = data.user.attributes.username;
      document.getElementById('pass').innerText = data.user.attributes.username;
      document.getElementById('ram').innerText = paket.toUpperCase();
    } else {
      throw new Error("Respon API tidak sesuai");
    }
  } catch (err) {
    document.getElementById('loadingStep').classList.add('hidden');
    document.getElementById('errorStep').classList.remove('hidden');
    document.getElementById('errorText').innerText = err.message;
  }
}

// Initialize particles when page loads
window.onload = function() {
  createParticles();
};