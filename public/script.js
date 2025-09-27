console.log('🔄 Chargement du script...');

class PlanningManager {
    constructor() {
        this.currentDate = new Date();
        this.currentView = 'coach';
        this.employees = [];
        this.locations = [];
        this.schedules = {};
        this.currentWeekStart = this.getWeekStart(this.currentDate);
        
        this.init();
    }
    
    init() {
        this.loadData();
        this.generateSampleData();
        this.setupEventListeners();
        this.updateWeekDisplay();
        this.renderCurrentView();
    }
    
    generateSampleData() {
        console.log('📊 Génération des données d exemple...');
        
        // Ne générer que si pas déjà chargé
        if (this.employees.length > 0) {
            console.log('📊 Données déjà existantes, utilisation des données chargées');
            return;
        }
        
        this.employees = [
            { id: 'coach1', firstName: 'Marie', lastName: 'Dubois', specialty: 'natation-adulte', active: true },
            { id: 'coach2', firstName: 'Jean', lastName: 'Martin', specialty: 'natation-enfant', active: true },
            { id: 'coach3', firstName: 'Sophie', lastName: 'Bernard', specialty: 'aqua-fitness', active: true },
            { id: 'coach4', firstName: 'Pierre', lastName: 'Durand', specialty: 'water-polo', active: true },
            { id: 'coach5', firstName: 'Emma', lastName: 'Leroy', specialty: 'plongee', active: true }
        ];

        this.locations = [
            { id: 'bassin1', name: 'Bassin Principal', capacity: 25, type: 'competition' },
            { id: 'bassin2', name: 'Bassin Enfants', capacity: 15, type: 'apprentissage' },
            { id: 'bassin3', name: 'Bassin Aqua-fitness', capacity: 20, type: 'loisir' },
            { id: 'bassin4', name: 'Bassin Plongée', capacity: 12, type: 'profond' }
        ];

        this.generateWeekSchedule();
        this.saveData();
    }
    
    generateWeekSchedule() {
        const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
        const timeSlots = [
            { start: '08:00', end: '09:00' },
            { start: '09:00', end: '10:00' },
            { start: '10:00', end: '11:00' },
            { start: '11:00', end: '12:00' },
            { start: '14:00', end: '15:00' },
            { start: '15:00', end: '16:00' },
            { start: '16:00', end: '17:00' },
            { start: '17:00', end: '18:00' },
            { start: '18:00', end: '19:00' },
            { start: '19:00', end: '20:00' }
        ];

        const courseTypes = ['natation-debutant', 'natation-perfectionnement', 'aqua-fitness', 'aqua-gym', 'ecole-de-nage', 'water-polo', 'plongee', 'cours-prive'];

        this.schedules = {};

        this.employees.forEach((employee) => {
            this.schedules[employee.id] = {};
            
            days.forEach((dayName, dayIndex) => {
                const currentDate = new Date(this.currentWeekStart);
                currentDate.setDate(currentDate.getDate() + dayIndex);
                const dateStr = currentDate.toISOString().split('T')[0];
                
                this.schedules[employee.id][dateStr] = [];

                const numSlots = Math.floor(Math.random() * 3) + 2;
                const usedSlots = new Set();
                
                for (let i = 0; i < numSlots; i++) {
                    let slotIndex;
                    do {
                        slotIndex = Math.floor(Math.random() * timeSlots.length);
                    } while (usedSlots.has(slotIndex));
                    
                    usedSlots.add(slotIndex);
                    
                    const timeSlot = timeSlots[slotIndex];
                    const courseType = courseTypes[Math.floor(Math.random() * courseTypes.length)];
                    const location = this.locations[Math.floor(Math.random() * this.locations.length)];
                    
                    this.schedules[employee.id][dateStr].push({
                        id: `slot_${employee.id}_${dateStr}_${i}`,
                        startTime: timeSlot.start,
                        endTime: timeSlot.end,
                        courseType: courseType,
                        locationId: location.id,
                        description: this.generateCourseDescription(courseType),
                        participants: Math.floor(Math.random() * 12) + 3
                    });
                }

                this.schedules[employee.id][dateStr].sort((a, b) => a.startTime.localeCompare(b.startTime));
            });
        });
    }

    generateCourseDescription(courseType) {
        const descriptions = {
            'natation-debutant': 'Apprentissage des bases de la natation',
            'natation-perfectionnement': 'Perfectionnement technique des nages',
            'aqua-fitness': 'Cours d aqua-fitness dynamique',
            'aqua-gym': 'Gymnastique aquatique douce',
            'ecole-de-nage': 'École de natation pour enfants',
            'water-polo': 'Entraînement water-polo',
            'plongee': 'Initiation à la plongée sous-marine',
            'cours-prive': 'Cours particulier personnalisé'
        };
        return descriptions[courseType] || 'Cours de natation';
    }

    setupEventListeners() {
        console.log('⚙️ Configuration des événements...');
        
        // Navigation
        const prevWeekBtn = document.getElementById('prevWeekBtn');
        const nextWeekBtn = document.getElementById('nextWeekBtn');
        
        if (prevWeekBtn) prevWeekBtn.addEventListener('click', () => this.changeWeek(-1));
        if (nextWeekBtn) nextWeekBtn.addEventListener('click', () => this.changeWeek(1));
        
        console.log('🔍 Boutons navigation:', { prevWeekBtn: !!prevWeekBtn, nextWeekBtn: !!nextWeekBtn });
        
        // Boutons de vue
        const viewByPersonBtn = document.getElementById('viewByPersonBtn');
        const viewByLocationBtn = document.getElementById('viewByLocationBtn');
        
        if (viewByPersonBtn) viewByPersonBtn.addEventListener('click', () => this.switchView('coach'));
        if (viewByLocationBtn) viewByLocationBtn.addEventListener('click', () => this.switchView('location'));

        // Menu
        const menuToggle = document.getElementById('openSideMenu');
        const menuClose = document.getElementById('closeSideMenu');
        const menuOverlay = document.getElementById('menuOverlay');
        
        if (menuToggle) menuToggle.addEventListener('click', () => this.toggleMenu());
        if (menuClose) menuClose.addEventListener('click', () => this.closeMenu());
        if (menuOverlay) menuOverlay.addEventListener('click', () => this.closeMenu());

        // Boutons du menu
        const employeesBtn = document.getElementById('manageEmployeesBtn');
        const locationsBtn = document.getElementById('manageLocationsBtn');
        const dashboardBtn = document.getElementById('dashboardBtn');
        const billingBtn = document.getElementById('billingBtn');
        const exportPDFBtn = document.getElementById('exportPDF');
        
        if (employeesBtn) employeesBtn.addEventListener('click', () => this.showEmployeeManagement());
        if (locationsBtn) locationsBtn.addEventListener('click', () => this.showLocationManagement());
        if (dashboardBtn) dashboardBtn.addEventListener('click', () => this.showDashboard());
        if (billingBtn) billingBtn.addEventListener('click', () => this.showBilling());
        if (exportPDFBtn) exportPDFBtn.addEventListener('click', () => this.exportToPDF());

        // Fermeture des modales
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.modal')?.classList.remove('active');
            });
        });

        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.remove('active');
            });
        });
    }

    toggleMenu() {
        const sideMenu = document.getElementById('sideMenu');
        const menuOverlay = document.getElementById('menuOverlay');
        
        if (sideMenu) sideMenu.classList.add('active');
        if (menuOverlay) menuOverlay.classList.add('active');
    }

    closeMenu() {
        const sideMenu = document.getElementById('sideMenu');
        const menuOverlay = document.getElementById('menuOverlay');
        
        if (sideMenu) sideMenu.classList.remove('active');
        if (menuOverlay) menuOverlay.classList.remove('active');
    }

    changeWeek(direction) {
        this.currentWeekStart.setDate(this.currentWeekStart.getDate() + (direction * 7));
        this.updateWeekDisplay();
        this.renderCurrentView();
    }

    switchView(view) {
        this.currentView = view;
        
        // Mise à jour des boutons
        document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
        if (view === 'coach') {
            document.getElementById('viewByPersonBtn')?.classList.add('active');
        } else {
            document.getElementById('viewByLocationBtn')?.classList.add('active');
        }
        
        // Mise à jour des vues
        document.querySelectorAll('.planning-view').forEach(v => v.classList.remove('active'));
        if (view === 'coach') {
            document.getElementById('personView')?.classList.add('active');
        } else {
            document.getElementById('locationView')?.classList.add('active');
        }
        
        this.renderCurrentView();
    }

    updateWeekDisplay() {
        console.log('📅 Mise à jour de l affichage de la semaine');
        const weekInfo = document.querySelector('.current-week-info');
        if (weekInfo) {
            const endDate = new Date(this.currentWeekStart);
            endDate.setDate(endDate.getDate() + 6);
            weekInfo.textContent = `Semaine du ${this.formatDate(this.currentWeekStart)} au ${this.formatDate(endDate)}`;
            console.log('✅ Semaine mise à jour:', weekInfo.textContent);
        } else {
            console.warn('⚠️ Élément .current-week-info non trouvé');
        }
    }

    renderCurrentView() {
        console.log('🎨 Rendu de la vue:', this.currentView);
        console.log('📊 Données disponibles:', {
            employees: this.employees.length,
            locations: this.locations.length,
            schedules: Object.keys(this.schedules).length
        });
        
        // Cacher le spinner
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) {
            spinner.style.display = 'none';
            console.log('👻 Spinner masqué');
        }
        
        if (this.currentView === 'coach') {
            this.renderCoachView();
        } else {
            this.renderLocationView();
        }
        
        // Forcer l'affichage si rien n'est visible
        setTimeout(() => this.forceDisplay(), 1000);
    }
    
    forceDisplay() {
        const personView = document.getElementById('personView');
        const spinner = document.getElementById('loadingSpinner');
        
        if (personView && personView.style.display === 'none') {
            console.log('🔧 Forçage de l\'affichage de la vue');
            personView.style.display = 'block';
        }
        
        if (spinner && spinner.style.display !== 'none') {
            console.log('🔧 Forçage de masquage du spinner');
            spinner.style.display = 'none';
        }
    }

    renderCoachView() {
        console.log('🎨 Début renderCoachView');
        const container = document.getElementById('personView');
        if (!container) {
            console.error('❌ Container personView non trouvé');
            return;
        }
        console.log('✅ Container personView trouvé:', container);

        const days = this.getWeekDays();
        console.log('📅 Jours de la semaine:', days);
        
        // Mettre à jour le header avec les bonnes dates
        const gridHeader = container.querySelector('.grid-header');
        if (gridHeader) {
            gridHeader.innerHTML = `
                <div class="person-column-header">Coachs</div>
                ${days.map(day => `<div class="day-header">${day.name}<br><small>${day.date}</small></div>`).join('')}
            `;
            console.log('✅ Header mis à jour');
        } else {
            console.error('❌ gridHeader non trouvé');
        }
        
        // Mettre à jour le contenu
        const gridContent = container.querySelector('.grid-content');
        if (gridContent) {
            const activeEmployees = this.employees.filter(emp => emp.active);
            console.log('👥 Employés actifs:', activeEmployees.length);
            
            if (activeEmployees.length === 0) {
                gridContent.innerHTML = '<div class="no-data">Aucun coach disponible</div>';
            } else {
                gridContent.innerHTML = activeEmployees.map(employee => {
                    console.log('👤 Rendu employé:', employee.firstName, employee.lastName);
                    return `
                        <div class="person-row">
                            <div class="person-info">
                                <div class="person-name">${employee.firstName} ${employee.lastName}</div>
                                <div class="person-role">${this.getSpecialtyName(employee.specialty)}</div>
                            </div>
                            ${days.map(day => this.renderDayCell(employee.id, day.fullDate)).join('')}
                        </div>
                    `;
                }).join('');
            }
            console.log('✅ Contenu grille mis à jour');
        } else {
            console.error('❌ gridContent non trouvé dans le container');
        }
    }

    renderLocationView() {
        const container = document.getElementById('locationView');
        if (!container) {
            console.error('Container locationView non trouvé');
            return;
        }

        const days = this.getWeekDays();
        
        // Mettre à jour le contenu de la vue location
        const locationContent = container.querySelector('#locationPlanningContent') || container.querySelector('.location-planning');
        if (locationContent) {
            locationContent.innerHTML = this.locations.map(location => `
                <div class="location-section">
                    <div class="location-header">
                        <div class="location-title">
                            <i class="fas fa-swimming-pool"></i> ${location.name}
                        </div>
                        <div class="location-details">Capacité: ${location.capacity} • Type: ${location.type}</div>
                    </div>
                    <div class="location-content">
                        ${days.map(day => `
                            <div class="location-day">
                                <div class="day-label">
                                    <strong>${day.name}</strong><br><small>${day.date}</small>
                                </div>
                                <div class="location-slots">
                                    ${this.renderLocationSlots(location.id, day.fullDate)}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('');
        }
    }

    renderDayCell(employeeId, date) {
        const dateStr = date.toISOString().split('T')[0];
        const slots = this.schedules[employeeId]?.[dateStr] || [];
        
        return `
            <div class="day-cell" data-employee-id="${employeeId}" data-date="${dateStr}">
                ${slots.map(slot => `
                    <div class="time-slot" data-slot-id="${slot.id}" data-employee-id="${employeeId}" data-date="${dateStr}">
                        <div class="slot-content">
                            <div class="slot-time">${slot.startTime} - ${slot.endTime}</div>
                            <div class="slot-course">${this.getCourseTypeName(slot.courseType)}</div>
                            <div class="slot-location">${this.getLocationName(slot.locationId)}</div>
                        </div>
                    </div>
                `).join('')}
                ${slots.length === 0 ? `
                    <div class="add-slot-btn">
                        <i class="fas fa-plus"></i> Aucun créneau
                    </div>
                ` : ''}
            </div>
        `;
    }

    renderLocationSlots(locationId, date) {
        const dateStr = date.toISOString().split('T')[0];
        const slots = [];
        
        Object.keys(this.schedules).forEach(employeeId => {
            const daySlots = this.schedules[employeeId]?.[dateStr] || [];
            daySlots.forEach(slot => {
                if (slot.locationId === locationId) {
                    const employee = this.employees.find(emp => emp.id === employeeId);
                    slots.push({
                        ...slot,
                        employeeName: employee ? `${employee.firstName} ${employee.lastName}` : 'Coach inconnu'
                    });
                }
            });
        });
        
        slots.sort((a, b) => a.startTime.localeCompare(b.startTime));
        
        if (slots.length === 0) {
            return '<div class="location-slot empty">Aucun cours programmé</div>';
        }
        
        return slots.map(slot => `
            <div class="location-slot">
                <div class="slot-header">
                    <div class="slot-time">${slot.startTime} - ${slot.endTime}</div>
                    <div class="slot-type">${this.getCourseTypeName(slot.courseType)}</div>
                </div>
                <div class="slot-coach">${slot.employeeName}</div>
            </div>
        `).join('');
    }

    getWeekDays() {
        const days = [];
        const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        
        for (let i = 1; i <= 7; i++) {
            const date = new Date(this.currentWeekStart);
            date.setDate(this.currentWeekStart.getDate() + (i - 1));
            days.push({
                name: dayNames[date.getDay()],
                date: this.formatDate(date),
                fullDate: date
            });
        }
        return days;
    }

    getWeekStart(date) {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(d.setDate(diff));
    }

    formatDate(date) {
        return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }

    showEmployeeManagement() {
        const modal = document.getElementById('employeesModal');
        if (modal) modal.classList.add('active');
    }

    showLocationManagement() {
        const modal = document.getElementById('locationsModal');
        if (modal) modal.classList.add('active');
    }

    showDashboard() {
        const modal = document.getElementById('dashboardModal');
        if (modal) {
            modal.classList.add('active');
            this.renderDashboard();
        }
    }

    showBilling() {
        const modal = document.getElementById('billingModal');
        if (modal) {
            modal.classList.add('active');
            this.renderBilling();
        }
    }

    renderDashboard() {
        console.log('Dashboard rendu');
    }

    renderBilling() {
        console.log('Facturation rendue');
    }

    exportToPDF() {
        const element = document.querySelector('.planning-view.active');
        if (!element) {
            alert('Aucune vue à exporter');
            return;
        }
        
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html><head>
                <title>Planning Piscine - ${this.formatDate(this.currentWeekStart)}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .planning-grid { width: 100%; border-collapse: collapse; }
                    .grid-header, .person-row { display: grid; grid-template-columns: 200px repeat(7, 1fr); gap: 1px; }
                    .person-column-header, .day-header, .person-info, .day-cell { 
                        border: 1px solid #ddd; padding: 8px; min-height: 40px; }
                    .person-column-header, .day-header { background: #0ea5e9; color: white; font-weight: bold; text-align: center; }
                    .person-info { background: #f8f9fa; font-weight: bold; }
                    .time-slot { background: #e0f2fe; margin: 2px 0; padding: 4px; border-radius: 4px; font-size: 10px; }
                </style>
            </head><body>
                <h1 style="text-align: center; color: #0ea5e9;">🏊‍♀️ Planning Piscine</h1>
                <p style="text-align: center;">Semaine du ${this.formatDate(this.currentWeekStart)}</p>
                ${element.innerHTML}
            </body></html>
        `);
        
        printWindow.document.close();
        setTimeout(() => { printWindow.print(); printWindow.close(); }, 500);
    }

    getSpecialtyName(specialty) {
        const names = {
            'natation-adulte': 'Natation adulte',
            'natation-enfant': 'Natation enfant',
            'aqua-fitness': 'Aqua fitness',
            'water-polo': 'Water polo',
            'plongee': 'Plongée',
            'sauvetage': 'Sauvetage'
        };
        return names[specialty] || 'Coach polyvalent';
    }

    getCourseTypeName(courseType) {
        const names = {
            'natation-debutant': 'Natation débutant',
            'natation-perfectionnement': 'Perfectionnement',
            'aqua-fitness': 'Aqua fitness',
            'aqua-gym': 'Aqua gym',
            'ecole-de-nage': 'École de nage',
            'water-polo': 'Water polo',
            'natation-synchronisee': 'Nat. synchro',
            'plongee': 'Plongée',
            'sauvetage': 'Sauvetage',
            'cours-prive': 'Cours privé'
        };
        return names[courseType] || courseType;
    }

    getLocationName(locationId) {
        const location = this.locations.find(loc => loc.id === locationId);
        return location ? location.name : 'Lieu inconnu';
    }

    loadData() {
        try {
            const employees = localStorage.getItem('pool_employees');
            const locations = localStorage.getItem('pool_locations');
            const schedules = localStorage.getItem('pool_schedules');

            if (employees) this.employees = JSON.parse(employees);
            if (locations) this.locations = JSON.parse(locations);
            if (schedules) this.schedules = JSON.parse(schedules);
        } catch (error) {
            console.error('Erreur lors du chargement:', error);
        }
    }

    saveData() {
        try {
            localStorage.setItem('pool_employees', JSON.stringify(this.employees));
            localStorage.setItem('pool_locations', JSON.stringify(this.locations));
            localStorage.setItem('pool_schedules', JSON.stringify(this.schedules));
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
        }
    }
}

// Initialisation de l'application
let planningManager;

console.log('📄 Script chargé - en attente du DOM...');

document.addEventListener('DOMContentLoaded', () => {
    console.log('🔄 DOM chargé - Initialisation de l application...');
    
    // Vérifier les éléments principaux
    const personView = document.getElementById('personView');
    const locationView = document.getElementById('locationView');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    console.log('🔍 Vérification des éléments:', {
        personView: !!personView,
        locationView: !!locationView,
        loadingSpinner: !!loadingSpinner
    });
    
    try {
        planningManager = new PlanningManager();
        console.log('✅ Application chargée avec succès !');
    } catch (error) {
        console.error('❌ Erreur lors de l initialisation:', error);
        console.error('Stack trace:', error.stack);
    }
});

// Log immédiat pour vérifier que le script s'exécute
console.log('🚀 Script script.js en cours d exécution...');
