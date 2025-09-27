console.log('🚀 Script simplifié chargé');

class SimplePlanningManager {
    constructor() {
        console.log('🔧 Initialisation du planning simplifié');
        this.initSimple();
    }
    
    initSimple() {
        // Données de test
        const coaches = [
            'Marie Dubois - Natation adulte',
            'Jean Martin - Natation enfant', 
            'Sophie Bernard - Aqua fitness',
            'Pierre Durand - Water polo',
            'Emma Leroy - Plongée'
        ];
        
        const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
        
        // Masquer le spinner
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) {
            spinner.style.display = 'none';
            console.log('✅ Spinner masqué');
        }
        
        // Trouver le container
        const container = document.getElementById('personView');
        if (!container) {
            console.error('❌ Container personView non trouvé');
            return;
        }
        
        console.log('✅ Container trouvé, génération du contenu...');
        
        // Générer le contenu simple
        const gridHeader = container.querySelector('.grid-header');
        const gridContent = container.querySelector('.grid-content');
        
        if (gridHeader) {
            gridHeader.innerHTML = `
                <div class="person-column-header">Coachs</div>
                ${days.map(day => `<div class="day-header">${day}</div>`).join('')}
            `;
        }
        
        if (gridContent) {
            gridContent.innerHTML = coaches.map(coach => `
                <div class="person-row">
                    <div class="person-info">
                        <div class="person-name">${coach}</div>
                    </div>
                    ${days.map(() => `
                        <div class="day-cell">
                            <div class="time-slot">
                                <div class="slot-content">
                                    <div class="slot-time">08:00 - 09:00</div>
                                    <div class="slot-course">Cours de natation</div>
                                    <div class="slot-location">Bassin Principal</div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `).join('');
        }
        
        // S'assurer que la vue est visible
        container.classList.add('active');
        container.style.display = 'block';
        
        console.log('✅ Planning simplifié généré !');
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM chargé - Initialisation du planning simplifié...');
    try {
        new SimplePlanningManager();
    } catch (error) {
        console.error('❌ Erreur:', error);
    }
});

console.log('📄 Script simplifié prêt');