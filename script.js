// --- LOGIKA MASKOT NANA ---
function updateNana(text) {
  $('#nana-bubble').fadeOut(200, function() {
    $(this).text(text).fadeIn(200);
  });
}

// --- TERMINAL LOGIC ---
async function runTerminal() {
  const log = document.getElementById('terminal-log');
  const lines = [
    "> Connecting to Nodes...",
    "> Auth Pterodactyl API...",
    "> Allocating RAM: " + (currentSelected ? currentSelected.ram : "Wait"),
    "> Injecting Magic UwU...",
    "> [OK] SERVER READY!"
  ];
  log.innerHTML = "";
  for (let line of lines) {
    log.innerHTML += `<span class="term-green">[SYS]</span> ${line}<br>`;
    log.scrollTop = log.scrollHeight;
    await new Promise(r => setTimeout(r, 600));
  }
}

// Animasi Hujan Hati
function createHeart() {
  const rain = document.getElementById('love-rain');
  const heart = document.createElement('i');
  heart.classList.add('fas', 'fa-heart', 'heart');
  heart.style.left = Math.random() * 100 + 'vw';
  const duration = Math.random() * 3 + 2;
  heart.style.animationDuration = duration + 's';
  heart.style.fontSize = (Math.random() * 8 + 10) + 'px';
  rain.appendChild(heart);
  setTimeout(() => { heart.remove(); }, duration * 1000);
}
setInterval(createHeart, 400);

// Text Berjalan di Bawah
const texts = [
  "Menaburkan debu peri... ✨",
  "NanaCloud: Cloud Paling UwU! 💖",
  "Ready to deploy your magic? 🐾",
  "Kualitas Premium, Harga Gemoy... 🌸",
  "Deploy server jadi lebih asik! (๑˃ᴗ˂)ﻭ"
];
let ti = 0;
setInterval(() => {
  $('#sad-text').fadeOut(500, function() {
    $(this).text(texts[ti]).fadeIn(500);
    ti = (ti + 1) % texts.length;
  });
}, 3500);

// Data Paket
const allPlans = [
  { ram: "1GB", price: "10.000", disk: 1000, cpu: 40 },
  { ram: "2GB", price: "20.000", disk: 2000, cpu: 60 },
  { ram: "3GB", price: "30.000", disk: 3000, cpu: 80 },
  { ram: "4GB", price: "40.000", disk: 4000, cpu: 100 },
  { ram: "UNLI", price: "150.000", disk: 0, cpu: 0 }
];

// Audio Control
let playing = false;
const audio = document.getElementById('bgm');
const audioBtn = document.getElementById("play-audio");
const audioIcon = document.getElementById("audio-icon");
const audioText = document.getElementById("audio-text");

audioBtn.addEventListener("click", () => {
  if (!playing) {
    audio.volume = 0.4; audio.play(); playing = true;
    audioIcon.className = "fas fa-pause"; audioText.innerText = "Pause Musik Gemoy";
    updateNana("Asik! Musiknya enak nyan~ 🎵");
  } else {
    audio.pause(); playing = false;
    audioIcon.className = "fas fa-music"; audioText.innerText = "Putar Musik Gemoy";
  }
});

// Render Paket
$(document).ready(function() {
  const container = $('#plans-container');
  allPlans.forEach(p => {
    const isUnli = p.ram === "UNLI";
    container.append(`
      <div class="plan-card ${isUnli ? 'featured' : ''}">
        <div class="plan-name">🌸 ${p.ram} Plan</div>
        <div class="plan-price">Rp ${p.price}</div>
        <ul class="plan-features">
          <li><i class="fas fa-heart"></i> CPU ${isUnli ? 'Unli' : p.cpu + '%'}</li>
          <li><i class="fas fa-star"></i> Disk ${isUnli ? 'Unli' : p.ram}</li>
          <li><i class="fas fa-paw"></i> Web Access</li>
        </ul>
        <button class="btn-select" onclick="openModal('${p.ram}')">Pilih Paket ✨</button>
      </div>
    `);
  });
});

// Deploy Logic
let currentSelected = null;
function openModal(ram) {
  currentSelected = allPlans.find(x => x.ram === ram);
  $('#info-ram').text("Konfigurasi Paket: " + ram);
  $('#modal').css('display', 'flex');
  updateNana("Pilihan bagus! Jangan lupa kasih nama ya Kak~ 🎀");
}
function closeModal() { $('#modal').hide(); $('#step-form').show(); $('#step-loading').hide(); $('#step-success').hide(); }
function showDomainPopUp() { $('#modal').hide(); $('#modal-domain').css('display', 'flex'); }

async function execDeploy() {
  const user = $('#username').val().trim();
  if(!user) return alert("Isi namanya dulu Kak! 🐾");
  $('#step-form').hide(); $('#step-loading').show();
  updateNana("Lagi Nana rakit nih, ssttt... 🤫");
  await runTerminal();
  try {
    const url = `https://api.resellergaming.my.id/pterodactyl/addpanel?domain=wazzxnasa.zerocloud.web.id&plta=ptla_1omaExb64N83zTXrBshSNmIOctUDlDM7wUhhJ6bpyzG&username=${user}&disk=${currentSelected.disk}&cpu=${currentSelected.cpu}`;
    const res = await fetch(url);
    const data = await res.json();
    setTimeout(() => {
      if(data && data.user) {
        $('#step-loading').hide(); $('#step-success').show();
        $('#res-u').text(data.user.attributes.username);
        $('#res-p').text(data.user.attributes.username);
        $('#res-r').text(currentSelected.ram);
        updateNana("Horeee! Berhasil! Nana emang pinter nyan~ ✨");
      } else { alert("Gagal! Coba nama lain ya."); closeModal(); }
    }, 1000);
  } catch (e) { alert("API Error."); closeModal(); }
}
