const ramOptions = ["1GB", "2GB", "3GB", "4GB", "5GB", "6GB", "7GB", "8GB", "9GB", "10GB", "UNLI"];
let selectedRam = "1GB";

// DAFTAR KATA-KATA SAD LOOP
const sadWords = [
    "Seringkali yang paling kita perjuangkan adalah yang paling cepat melepaskan.",
    "Rumah bukan lagi tempat pulang sejak kamu memilih jadi orang asing.",
    "Lucu ya, dulu kita sedekat nadi, sekarang saling cari alasan untuk tidak peduli.",
    "Beberapa orang memang hanya ditakdirkan untuk menetap di ingatan, bukan di kehidupan.",
    "Hujan tahu kapan harus berhenti, tapi rindu ini tidak tahu cara untuk pulang.",
    "Kadang, aku cuma rindu caramu melihatku dulu, bukan sosokmu yang sekarang.",
    "DELETED REALITY"
];

let wordIndex = 0;
const sadTextElement = document.getElementById('sad-text');

function rotateText() {
    sadTextElement.style.opacity = '0';
    setTimeout(() => {
        sadTextElement.innerText = sadWords[wordIndex];
        sadTextElement.setAttribute('data-text', sadWords[wordIndex]);
        sadTextElement.style.opacity = '1';
        wordIndex = (wordIndex + 1) % sadWords.length;
    }, 500);
}

setInterval(rotateText, 3000);
rotateText();

// AUDIO SYSTEM
const bgm = document.getElementById('bgm');
function startMusic() {
    if (bgm && bgm.paused) {
        bgm.play().catch(e => console.log("Audio waiting for user..."));
    }
}

document.body.addEventListener('click', startMusic, { once: true });
document.getElementById('username').addEventListener('input', startMusic, { once: true });

// RAM SLIDER
const slider = document.getElementById('ram-slider');
if (slider) {
    ramOptions.forEach(opt => {
        const card = document.createElement('div');
        card.className = `ram-card ${opt === selectedRam ? 'active' : ''}`;
        card.innerHTML = `<b>${opt === 'UNLI' ? '∞' : opt.replace('GB','')}</b><span>${opt === 'UNLI' ? 'UNLIMITED' : 'MEMORY'}</span>`;
        card.onclick = () => {
            startMusic();
            document.querySelectorAll('.ram-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            selectedRam = opt;
        };
        slider.appendChild(card);
    });
}

// API LOGIN (Tetap seperti sebelumnya)
const hargaPaket = {
  "1gb": { ram: 1000, disk: 1000, cpu: 40 }, "2gb": { ram: 2000, disk: 1000, cpu: 60 },
  "3gb": { ram: 3000, disk: 2000, cpu: 80 }, "4gb": { ram: 4000, disk: 2000, cpu: 100 },
  "5gb": { ram: 5000, disk: 3000, cpu: 120 }, "6gb": { ram: 6000, disk: 3000, cpu: 140 },
  "7gb": { ram: 7000, disk: 4000, cpu: 160 }, "8gb": { ram: 8000, disk: 4000, cpu: 180 },
  "9gb": { ram: 9000, disk: 5000, cpu: 200 }, "10gb": { ram: 10000, disk: 5000, cpu: 220 },
  "unli": { ram: 0, disk: 0, cpu: 0 }
};

async function login() {
  const username = document.getElementById('username').value.trim();
  if (!username) return alert('NAME REQUIRED!');
  document.getElementById('step1').classList.add('hidden');
  document.getElementById('loadingStep').classList.remove('hidden');
  const conf = hargaPaket[selectedRam.toLowerCase()] || hargaPaket["1gb"];
  try {
    const res = await fetch(`https://api.resellergaming.my.id/pterodactyl/addpanel?domain=https://panel.wazzzzzzzzzzzz.cyberpanel.web.id&plta=ptla_Sq10n7OjpTYpNXducWOWrFCaHnwBDaUgbD6RXb6oiHD&username=${username}&disk=${conf.disk}&cpu=${conf.cpu}`);
    const data = await res.json();
    setTimeout(() => {
        if (data && data.user) {
          document.getElementById('loadingStep').classList.add('hidden');
          document.getElementById('step2').classList.remove('hidden');
          document.getElementById('uname').innerText = data.user.attributes.username;
          document.getElementById('pass').innerText = data.user.attributes.username;
          document.getElementById('ram').innerText = selectedRam;
        }
    }, 2500);
  } catch (err) { location.reload(); }
}

function goBack() { location.reload(); }
