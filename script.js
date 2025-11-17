// Artwork Database
const artworks = {
    renaissance: [
        {
            title: "The Birth of Venus",
            artist: "Sandro Botticelli",
            year: "1485",
            medium: "Tempera on canvas",
            description: "An iconic masterpiece depicting the goddess Venus emerging from the sea.",
            curatorNotes: "This painting represents the idealized beauty of the Renaissance period, blending classical mythology with Christian symbolism.",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1280px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg"
        },
        {
            title: "The Last Supper",
            artist: "Leonardo da Vinci",
            year: "1498",
            medium: "Mural painting",
            description: "A dramatic portrayal of Jesus's final meal with his disciples.",
            curatorNotes: "Da Vinci's revolutionary use of perspective and emotional depth changed the course of Western art forever.",
            img: "https://i.pinimg.com/736x/1b/70/c5/1b70c51821d885b9ff64957b6a743f95.jpg"
        },
        {
            title: "The School of Athens",
            artist: "Raphael",
            year: "1511",
            medium: "Fresco",
            description: "A celebration of philosophy featuring the greatest thinkers of antiquity.",
            curatorNotes: "Raphael masterfully depicts the intellectual spirit of the Renaissance through harmonious composition and idealized figures.",
            img: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Raphael_School_of_Athens.jpg"
        }
    ],
    abstract: [
        {
            title: "Composition VIII",
            artist: "Wassily Kandinsky",
            year: "1923",
            medium: "Oil on canvas",
            description: "A dynamic arrangement of geometric forms and vivid colors.",
            curatorNotes: "Kandinsky believed that abstract forms could evoke spiritual and emotional responses without representing reality.",
            img: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Wassily_Kandinsky_Composition_VIII.jpg"
        },
        {
            title: "Broadway Boogie Woogie",
            artist: "Piet Mondrian",
            year: "1943",
            medium: "Oil on canvas",
            description: "A vibrant grid inspired by the energy of New York City.",
            curatorNotes: "This work captures the rhythm and vitality of jazz and the urban landscape through pure abstraction.",
            img: "https://com.bimago.media/media/catalog/image/view/product/152128/role/image/size/1500x2240/type/dk-osmr-wiz3/557bde8b7e766bb82233ffe01d75aae3.webp"
        },
        {
            title: "No. 5",
            artist: "Jackson Pollock",
            year: "1948",
            medium: "Oil on fiberboard",
            description: "A complex web of dripped and splattered paint.",
            curatorNotes: "Pollock's revolutionary drip technique embodied the spontaneous energy of Abstract Expressionism.",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa0Kfku8cwILFbxRlgw_ADrV6PA_cqL3-Qpw&s"
        }
    ],
    modern: [
        {
            title: "Campbell's Soup Cans",
            artist: "Andy Warhol",
            year: "1962",
            medium: "Synthetic polymer paint on canvas",
            description: "An iconic Pop Art piece elevating consumer products to fine art.",
            curatorNotes: "Warhol's work challenges the boundaries between high art and popular culture, mass production and uniqueness.",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAfMktpgfW5aJXHj7gf1S8RuFVkTwcwmt23w&s"
        },
        {
            title: "Nighthawks",
            artist: "Edward Hopper",
            year: "1942",
            medium: "Oil on canvas",
            description: "A haunting scene of urban isolation in a late-night diner.",
            curatorNotes: "Hopper captures the alienation and loneliness of modern American life through stark lighting and compositional tension.",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGrV3NdKMy4mabkLFlTX_Ve0wXAnJzRl98mQ&s"
        },
        {
            title: "The Persistence of Memory",
            artist: "Salvador Dalí",
            year: "1931",
            medium: "Oil on canvas",
            description: "Melting clocks in a dreamlike landscape challenge our perception of time.",
            curatorNotes: "Dalí's surrealist masterpiece explores the fluid nature of reality and the subconscious mind.",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKzj28lSFPQcUG51aSZPRxVyIJE__iwLhC7A&s"
        }
    ]
};

// State
let currentSection = 0;
let musicPlaying = false;
let selectedArtwork = null;

// DOM Elements (guards in case script loads before DOM)
const lobby = document.getElementById('lobby');
const gallery = document.getElementById('gallery');
const reflection = document.getElementById('reflection');
const startBtn = document.getElementById('startBtn');
const musicToggle = document.getElementById('musicToggle');
const modal = document.getElementById('artModal');
const closeModal = document.getElementById('closeModal');
const feedbackForm = document.getElementById('feedbackForm');
const thankYou = document.getElementById('thankYou');

// Initialize
function init() {
    renderArtworks();
    setupEventListeners();
    observeCollections();
    populateFavoriteDropdown();
}

// Render artworks
function renderArtworks() {
    ['renaissance', 'abstract', 'modern'].forEach(collection => {
        const grid = document.getElementById(`${collection}Grid`);
        if (!grid) return;
        artworks[collection].forEach((art, index) => {
            const card = document.createElement('div');
            card.className = 'artwork-card';
            card.innerHTML = `
                <img class="artwork-img" src="${art.img}" alt="${art.title}" onerror="this.onerror=null;this.src='https://via.placeholder.com/900x500?text=Image+not+found'">
                <div class="artwork-info">
                    <h4>${art.title}</h4>
                    <p>${art.artist} (${art.year})</p>
                </div>
            `;
            card.addEventListener('click', () => openModal(collection, index));
            grid.appendChild(card);
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    if (startBtn) startBtn.addEventListener('click', startTour);
    if (musicToggle) musicToggle.addEventListener('click', toggleMusic);
    if (closeModal) closeModal.addEventListener('click', () => modal.classList.remove('active'));
    if (modal) modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    const submitBtn = document.getElementById('submitBtn');
    const restartBtn = document.getElementById('restartBtn');
    const restartBtn2 = document.getElementById('restartBtn2');
    const shareBtn = document.getElementById('shareBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const backBtn = document.getElementById('backBtn');

    if (submitBtn) submitBtn.addEventListener('click', submitFeedback);
    if (restartBtn) restartBtn.addEventListener('click', restartTour);
    if (restartBtn2) restartBtn2.addEventListener('click', restartTour);
    if (shareBtn) shareBtn.addEventListener('click', shareExperience);
    if (prevBtn) prevBtn.addEventListener('click', () => scrollToCollection(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => scrollToCollection(1));
    if (backBtn) backBtn.addEventListener('click', goBackToLobby);
}

// Start tour
function startTour() {
    if (lobby) lobby.style.display = 'none';
    if (gallery) {
        gallery.classList.remove('hidden');
        gallery.classList.add('visible');
    }
    currentSection = 0; // reset to first collection
    const backBtn = document.getElementById('backBtn');
    if (backBtn) backBtn.classList.remove('hidden');
}

// Toggle music
function toggleMusic() {
    musicPlaying = !musicPlaying;
    const musicToggleBtn = document.getElementById('musicToggle');
    musicToggleBtn.textContent = musicPlaying ? '🔊 Music' : '🔇 Music';
}

// Observe collections for scroll animations and keep currentSection in sync
function observeCollections() {
    const collections = Array.from(document.querySelectorAll('.collection'));
    if (!collections.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // update currentSection to the index of the intersecting collection
                const idx = collections.indexOf(entry.target);
                if (idx !== -1) currentSection = idx;
            } else {
                // remove visible when not intersecting (optional)
                // entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.35 });

    collections.forEach(collection => observer.observe(collection));

    // Observe reflection section to mark it visible when scrolled into view
    if (reflection) {
        const reflectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    reflection.classList.remove('hidden');
                    reflection.classList.add('visible');
                }
            });
        }, { threshold: 0.3 });

        reflectionObserver.observe(reflection);
    }
}

// Scroll to collection (direction: -1 prev, +1 next)
function scrollToCollection(direction) {
    const collections = Array.from(document.querySelectorAll('.collection'));
    if (!collections.length) return;

    // If currently viewing reflection and user presses previous, go to last collection
    if (reflection && !reflection.classList.contains('hidden') && direction < 0) {
        const lastIdx = collections.length - 1;
        collections[lastIdx].scrollIntoView({ behavior: 'smooth', block: 'center' });
        // hide reflection
        reflection.classList.add('hidden');
        reflection.classList.remove('visible');
        currentSection = lastIdx;
        return;
    }

    const newIndex = currentSection + direction;

    // If trying to go forward from last collection -> open reflection (feedback page)
    if (currentSection === collections.length - 1 && direction > 0) {
        // show reflection section (page 4)
        if (reflection) {
            reflection.classList.remove('hidden');
            reflection.classList.add('visible');
            // scroll to top of reflection
            setTimeout(() => {
                reflection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
        }
        return;
    }

    // If trying to go backward from first collection -> go back to lobby
    if (currentSection === 0 && direction < 0) {
        // show lobby
        if (lobby) {
            lobby.style.display = 'flex';
            gallery.classList.add('hidden');
            gallery.classList.remove('visible');
            const backBtn = document.getElementById('backBtn');
            if (backBtn) backBtn.classList.add('hidden');
        }
        return;
    }

    // Otherwise clamp index and scroll to that collection
    const clampedIndex = Math.max(0, Math.min(collections.length - 1, newIndex));
    currentSection = clampedIndex;
    collections[clampedIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Open modal
function openModal(collection, index) {
    const art = artworks[collection][index];
    selectedArtwork = art;

    const modalImg = document.getElementById('modalImg');
    const modalDetails = document.getElementById('modalDetails');
    if (modalImg) modalImg.src = art.img;
    if (modalDetails) modalDetails.innerHTML = `
        <h3>${art.title}</h3>
        <p><strong>Artist:</strong> ${art.artist}</p>
        <p><strong>Year:</strong> ${art.year}</p>
        <p><strong>Medium:</strong> ${art.medium}</p>
        <p><strong>Description:</strong> ${art.description}</p>
        <div class="curator-notes">
            <strong>Curator's Notes:</strong><br>
            ${art.curatorNotes}
        </div>
    `;

    if (modal) modal.classList.add('active');
}

// Populate favorite dropdown
function populateFavoriteDropdown() {
    const select = document.getElementById('favoriteArt');
    if (!select) return;
    select.innerHTML = ''; // clear existing
    Object.values(artworks).flat().forEach(art => {
        const option = document.createElement('option');
        option.value = art.title;
        option.textContent = `${art.title} by ${art.artist}`;
        select.appendChild(option);
    });
}

// Submit feedback
function submitFeedback() {
    const nameEl = document.getElementById('visitorName');
    const emailEl = document.getElementById('visitorEmail');
    const favoriteEl = document.getElementById('favoriteArt');
    const ratingEl = document.getElementById('rating');
    const commentsEl = document.getElementById('comments');

    const name = nameEl ? nameEl.value.trim() : '';
    const email = emailEl ? emailEl.value.trim() : '';
    const favorite = favoriteEl ? favoriteEl.value : '';
    const rating = ratingEl ? ratingEl.value : '';
    const comments = commentsEl ? commentsEl.value.trim() : '';

    if (!name || !email) {
        alert('Please fill in your name and email.');
        return;
    }

    if (!email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
    }

    const thankYouMessageEl = document.getElementById('thankYouMessage');
    if (thankYouMessageEl) {
        thankYouMessageEl.innerHTML = `
            <p><strong>${name}</strong>, thank you for visiting MuseoSpace!</p>
            <p>Your favorite artwork: <em>${favorite}</em></p>
            <p>Your rating: ${'⭐'.repeat(rating)}</p>
            ${comments ? `<p>Your thoughts: "${comments}"</p>` : ''}
            <p>We've sent a confirmation to <strong>${email}</strong></p>
        `;
    }

    if (feedbackForm) feedbackForm.style.display = 'none';
    if (thankYou) thankYou.classList.add('active');
}

// Restart tour
function restartTour() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
        if (gallery) {
            gallery.classList.add('hidden');
            gallery.classList.remove('visible');
        }
        if (reflection) {
            reflection.classList.add('hidden');
            reflection.classList.remove('visible');
        }
        if (lobby) lobby.style.display = 'flex';
        if (feedbackForm) feedbackForm.style.display = 'block';
        if (thankYou) thankYou.classList.remove('active');
        const nameEl = document.getElementById('visitorName');
        const emailEl = document.getElementById('visitorEmail');
        const commentsEl = document.getElementById('comments');
        if (nameEl) nameEl.value = '';
        if (emailEl) emailEl.value = '';
        if (commentsEl) commentsEl.value = '';
        currentSection = 0;
    }, 500);
}

// Share experience
function shareExperience() {
    const shareText = `I just experienced MuseoSpace - an immersive virtual art exhibition! 🎨`;
    const shareUrl = window.location.href;

    if (navigator.share) {
        navigator.share({
            title: 'MuseoSpace',
            text: shareText,
            url: shareUrl
        }).catch(() => {});
    } else {
        const tempInput = document.createElement('input');
        tempInput.value = `${shareText} ${shareUrl}`;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('Link copied to clipboard!');
    }
}

// Go back to lobby (bound to back button)
function goBackToLobby() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (gallery) {
        gallery.classList.add('hidden');
        gallery.classList.remove('visible');
    }
    if (reflection) {
        reflection.classList.add('hidden');
        reflection.classList.remove('visible');
    }
    if (lobby) lobby.style.display = 'flex';
    const backBtn = document.getElementById('backBtn');
    if (backBtn) backBtn.classList.add('hidden');
}

// Initialize on load
init();

// Music Toggle (kept at bottom to ensure DOM ready)
document.addEventListener("DOMContentLoaded", () => {
  const musicToggleBtn = document.getElementById("musicToggle");
  const bgAudio = document.getElementById("bgAudio");

  if (musicToggleBtn && bgAudio) {
    musicToggleBtn.addEventListener("click", () => {
      if (bgAudio.paused) {
        bgAudio.play().catch(()=>{});
        musicToggleBtn.textContent = "🔊 Music";
      } else {
        bgAudio.pause();
        bgAudio.currentTime = 0;
        musicToggleBtn.textContent = "🔇 Music";
      }
    });
  }
});
