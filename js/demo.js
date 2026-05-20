// Intelligent Client side logic for Planora Mock Preview Webapp
function switchView(mode) {
    const container = document.getElementById('appContainer');
    const btnDesktop = document.getElementById('btnDesktopView');
    const btnMobile = document.getElementById('btnMobileView');
    
    if(mode === 'desktop') {
        container.className = 'view-mode-desktop';
        btnDesktop.classList.add('active');
        btnMobile.classList.remove('active');
    } else {
        container.className = 'view-mode-mobile';
        btnMobile.classList.add('active');
        btnDesktop.classList.remove('remove');
        btnDesktop.classList.remove('active');
    }
}

function autoGrow(element) {
    element.style.height = "1px";
    element.style.height = (element.scrollHeight) + "px";
}

// Preset Data Store matching Pitch Deck Specifications
const presets = {
    vietnam: {
        title: "Vietnam",
        price: "7 Tage ab 690 €",
        tags: ["Natur", "Essen", "Kultur"],
        banner: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=400&q=80",
        steps: [
            "Tag 1-2: Altstadt von Hanoi & Streetfood-Tour",
            "Tag 3-4: Bootstour durch die versteckten Buchten von Ha Long (wenig Touristen)",
            "Tag 5-7: Trekking & Homestay im naturbelassenen Sapa-Tal"
        ],
        responseText: "Hervorragende Wahl! Vietnam passt perfekt zu deinem Wunsch nach exzellentem Essen und unberührter Natur. Für ein Budget von unter 800€ habe ich dir eine Route zusammengestellt, die klassischen Massentourismus meidet."
    },
    portugal: {
        title: "Portugal",
        price: "7 Tage ab 750 €",
        tags: ["Strand", "Städte", "Genuss"],
        banner: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=400&q=80",
        steps: [
            "Tag 1-2: Kultur & Kulinarik in den Seitengassen von Porto",
            "Tag 3-5: Wanderungen an der unentdeckten Costa Vicentina (Südwestküste)",
            "Tag 6-7: Entspannung an geheimen Strandbuchten nahe Sagres"
        ],
        responseText: "Wunderbar! Portugal bietet großartigen kulinarischen Genuss und atemberaubende Küstenabschnitte. Wir meiden die überlaufene Algarve und fokussieren uns auf die wilde, naturbewusste Westküste."
    },
    georgien: {
        title: "Georgien",
        price: "7 Tage ab 620 €",
        tags: ["Natur", "Kultur", "Abenteuer"],
        banner: "https://images.unsplash.com/photo-1565018985116-46b5a34f41b2?auto=format&fit=crop&w=400&q=80",
        steps: [
            "Tag 1-2: Erkundung von Tiflis (Tradition trifft Moderne) & Weinverkostung",
            "Tag 3-5: Atemberaubendes Bergpanorama im Kaukasus (Svanetien)",
            "Tag 6-7: Historische Höhlenstädte & unberührte Nationalparks"
        ],
        responseText: "Ein absoluter Geheimtipp! Georgien ist perfekt für dich: Extrem günstiges, weltklasse Essen, monumentale Gebirgslandschaften und fast kein klassischer Massentourismus. Optimal für dein Budget!"
    }
};

function loadPreset(key) {
    const data = presets[key];
    if(!data) return;
    
    // Inject custom client interaction message
    const chatHistory = document.getElementById('chatHistory');
    const typingIndicator = document.getElementById('typingIndicator');
    
    // Append simulated user trigger
    const userMsg = document.createElement('div');
    userMsg.className = 'msg msg-user';
    userMsg.innerHTML = `<div class="msg-text">Zeige mir Details zu ${data.title} an.</div>`;
    chatHistory.insertBefore(userMsg, typingIndicator);
    
    // Show loading
    typingIndicator.style.display = 'block';
    chatHistory.scrollTop = chatHistory.scrollHeight;
    
    setTimeout(() => {
        typingIndicator.style.display = 'none';
        
        // Bot text response append
        const botMsg = document.createElement('div');
        botMsg.className = 'msg msg-bot';
        botMsg.innerHTML = `<div class="msg-text">${data.responseText}</div>`;
        chatHistory.insertBefore(botMsg, typingIndicator);
        
        // Render detailed itinerary dashboard layout updates
        renderItinerary(data);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }, 1000);
}

function renderItinerary(data) {
    const view = document.getElementById('itineraryDetailView');
    
    let stepsHtml = '';
    data.steps.forEach(step => {
        stepsHtml += `<div class="itin-route-step">${step}</div>`;
    });
    
    let tagsHtml = '';
    data.tags.forEach(tag => {
        tagsHtml += `<span class="itin-tag">${tag}</span>`;
    });

    view.innerHTML = `
        <div class="itin-card">
            <div class="itin-banner" style="background-image: url('${data.banner}')">
                <h4>${data.title} Rundreise</h4>
            </div>
            <div class="itin-details">
                <div class="itin-price">${data.price}</div>
                <div class="itin-tags">${tagsHtml}</div>
                <div style="margin-top: 15px; margin-bottom: 10px; font-weight:600; font-size:0.85rem; color:var(--text-gray);">Kalkulierte Reiseroute:</div>
                ${stepsHtml}
            </div>
        </div>
        <button class="preset-pill" style="width:100%; padding:12px; background:var(--primary); font-weight:700; margin-top:10px; border-radius:8px;" onclick="alert('Buchungsprozess via Partnerschnittstelle simuliert!')">Komplettbuchung mit 1 Klick</button>
    `;
}

function handleUserSend() {
    const txtInput = document.getElementById('txtUserInput');
    const text = txtInput.value.trim();
    if(!text) return;
    
    const chatHistory = document.getElementById('chatHistory');
    const typingIndicator = document.getElementById('typingIndicator');
    
    const userMsg = document.createElement('div');
    userMsg.className = 'msg msg-user';
    userMsg.innerHTML = `<div class="msg-text">${text}</div>`;
    chatHistory.insertBefore(userMsg, typingIndicator);
    
    txtInput.value = '';
    txtInput.style.height = "auto";
    
    typingIndicator.style.display = 'block';
    chatHistory.scrollTop = chatHistory.scrollHeight;
    
    // Intelligent keyword parser simulation
    setTimeout(() => {
        typingIndicator.style.display = 'none';
        
        let targetPreset = 'georgien'; // fallback smart suggestion matching original input sheet query
        const lower = text.toLowerCase();
        if(lower.includes('vietnam') || lower.includes('essen') || lower.includes('hanoi')) {
            targetPreset = 'vietnam';
        } else if(lower.includes('portugal') || lower.includes('strand') || lower.includes('meer')) {
            targetPreset = 'portugal';
        }
        
        const data = presets[targetPreset];
        
        const botMsg = document.createElement('div');
        botMsg.className = 'msg msg-bot';
        botMsg.innerHTML = `<div class="msg-text">Deine Kriterien wurden analysiert. Basierend auf deinem Budget und Fokus habe ich den perfekten Match optimiert:<br><br><strong>${data.title}</strong> - ${data.responseText}</div>`;
        chatHistory.insertBefore(botMsg, typingIndicator);
        
        renderItinerary(data);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }, 1500);
}

// Support hitting enter key comfortably
document.getElementById('txtUserInput').addEventListener('keydown', function(e) {
    if(e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleUserSend();
    }
});
