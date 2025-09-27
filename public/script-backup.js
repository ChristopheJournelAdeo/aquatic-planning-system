console.log('🚀 Script principal démarré');

// Application de gestion de planning pour coachs de natation
class PlanningManager {
    constructor() {
        console.log('🔧 Initialisation PlanningManager');
        this.currentDate = new Date();
        this.currentView = 'coach';
        this.employees = [];
        this.locations = [];
        this.schedules = {};
        this.currentWeekStart = this.getWeekStart(this.currentDate);
        
        this.init();
    }
    
    init() {
        console.log('⚙️ Initialisation de l\'application');
        this.loadData();
        this.generateSampleData();
        this.setupEventListeners();
        this.updateWeekDisplay();
        this.renderCurrentView();
    }
    
    generateSampleData() {
        console.log('📊 Génération des données d\'exemple...');
        
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
        console.log('✅ Données d\'exemple générées');
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
            'aqua-fitness': 'Cours d\'aqua-fitness dynamique',
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
        
        // Navigation entre semaines
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

        // Boutons export PDF (menu et header)
        const exportPDFBtn = document.getElementById('exportPDF');
        const exportPdfBtn = document.getElementById('exportPdfBtn');
        if (exportPDFBtn) exportPDFBtn.addEventListener('click', () => this.exportToPDF());
        if (exportPdfBtn) exportPdfBtn.addEventListener('click', () => this.exportToPDF());

        // Boutons du menu référentiels
        const manageEmployeesBtn = document.getElementById('manageEmployeesBtn');
        const manageLocationsBtn = document.getElementById('manageLocationsBtn');
        const manageTemplateBtn = document.getElementById('manageTemplateBtn');
        const dashboardBtn = document.getElementById('dashboardBtn');
        
        if (manageEmployeesBtn) manageEmployeesBtn.addEventListener('click', () => this.showEmployeeManagement());
        if (manageLocationsBtn) manageLocationsBtn.addEventListener('click', () => this.showLocationManagement());
        if (manageTemplateBtn) manageTemplateBtn.addEventListener('click', () => this.showTemplateManagement());
        if (dashboardBtn) dashboardBtn.addEventListener('click', () => this.showDashboard());
        
        // Event listeners pour modales existantes (si elles existent dans le HTML)
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) modal.classList.remove('active');
            });
        });

        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.remove('active');
            });
        });
        
        console.log('🔍 Boutons référentiels:', {
            manageEmployees: !!manageEmployeesBtn,
            manageLocations: !!manageLocationsBtn,
            manageTemplate: !!manageTemplateBtn,
            dashboard: !!dashboardBtn
        });

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

    updateWeekDisplay() {
        console.log('📅 Mise à jour de l\'affichage de la semaine');
        const weekInfo = document.querySelector('.current-week-info');
        if (weekInfo) {
            const endDate = new Date(this.currentWeekStart);
            endDate.setDate(endDate.getDate() + 6);
            const weekNumber = this.getWeekNumber(this.currentWeekStart);
            weekInfo.innerHTML = `
                <div class="week-display">
                    <div class="week-number">Semaine ${weekNumber}</div>
                    <div class="week-dates">Du ${this.formatDate(this.currentWeekStart)} au ${this.formatDate(endDate)}</div>
                </div>
            `;
            console.log('✅ Semaine mise à jour:', weekInfo.textContent);
        } else {
            console.warn('⚠️ Élément .current-week-info non trouvé');
        }
    }

    getWeekNumber(date) {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }

    setupDragAndDrop() {
        document.querySelectorAll('.time-slot').forEach(slot => {
            slot.draggable = true;
            slot.addEventListener('dragstart', (e) => this.handleDragStart(e));
            slot.addEventListener('dragend', (e) => this.handleDragEnd(e));
        });

        document.querySelectorAll('.day-cell').forEach(cell => {
            cell.addEventListener('dragover', (e) => this.handleDragOver(e));
            cell.addEventListener('drop', (e) => this.handleDrop(e));
            cell.addEventListener('dragenter', (e) => this.handleDragEnter(e));
            cell.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        });
    }

    handleDragStart(e) {
        const slot = e.target.closest('.time-slot');
        if (!slot) return;
        
        slot.classList.add('dragging');
        const slotData = {
            slotId: slot.dataset.slotId,
            employeeId: slot.dataset.employeeId,
            date: slot.dataset.date
        };
        e.dataTransfer.setData('text/plain', JSON.stringify(slotData));
    }

    handleDragEnd(e) {
        e.target.closest('.time-slot')?.classList.remove('dragging');
    }

    handleDragOver(e) {
        e.preventDefault();
    }

    handleDragEnter(e) {
        e.preventDefault();
        e.target.closest('.day-cell')?.classList.add('drag-over');
    }

    handleDragLeave(e) {
        const cell = e.target.closest('.day-cell');
        if (cell && !cell.contains(e.relatedTarget)) {
            cell.classList.remove('drag-over');
        }
    }

    handleDrop(e) {
        e.preventDefault();
        const cell = e.target.closest('.day-cell');
        if (!cell) return;

        cell.classList.remove('drag-over');

        try {
            const slotData = JSON.parse(e.dataTransfer.getData('text/plain'));
            const targetEmployeeId = cell.dataset.employeeId;
            const targetDate = cell.dataset.date;

            if (slotData.employeeId && slotData.date && slotData.slotId) {
                this.moveSlot(slotData.slotId, slotData.employeeId, slotData.date, targetEmployeeId, targetDate);
            }
        } catch (error) {
            console.error('Erreur lors du drop:', error);
        }
    }

    moveSlot(slotId, fromEmployeeId, fromDate, toEmployeeId, toDate) {
        const fromSchedule = this.schedules[fromEmployeeId]?.[fromDate];
        if (!fromSchedule) return;

        const slotIndex = fromSchedule.findIndex(slot => slot.id === slotId);
        if (slotIndex === -1) return;

        const slot = fromSchedule[slotIndex];
        const toSchedule = this.schedules[toEmployeeId]?.[toDate] || [];
        const hasConflict = toSchedule.some(existingSlot => 
            this.timesOverlap(slot.startTime, slot.endTime, existingSlot.startTime, existingSlot.endTime)
        );

        if (hasConflict) {
            alert('Conflit détecté : un créneau existe déjà à cette heure.');
            return;
        }

        fromSchedule.splice(slotIndex, 1);
        
        if (!this.schedules[toEmployeeId]) this.schedules[toEmployeeId] = {};
        if (!this.schedules[toEmployeeId][toDate]) this.schedules[toEmployeeId][toDate] = [];

        slot.id = `slot_${toEmployeeId}_${toDate}_${Date.now()}`;
        this.schedules[toEmployeeId][toDate].push(slot);
        this.schedules[toEmployeeId][toDate].sort((a, b) => a.startTime.localeCompare(b.startTime));

        this.saveData();
        this.renderCurrentView();
        this.showNotification('Créneau déplacé avec succès !', 'success');
    }

    timesOverlap(start1, end1, start2, end2) {
        return start1 < end2 && end1 > start2;
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; z-index: 10000;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white; padding: 1rem 1.5rem; border-radius: 0.5rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    // Gestion des employés
    addEmployee() {
        const firstName = document.getElementById('newEmpFirstName').value.trim();
        const lastName = document.getElementById('newEmpLastName').value.trim();
        const specialty = document.getElementById('newEmpSpecialty').value;
        
        if (!firstName || !lastName) {
            alert('Veuillez remplir le prénom et le nom.');
            return;
        }
        
        const newEmployee = {
            id: `coach_${Date.now()}`,
            firstName: firstName,
            lastName: lastName,
            specialty: specialty,
            active: true
        };
        
        this.employees.push(newEmployee);
        this.saveData();
        this.renderCurrentView();
        this.showNotification(`Coach ${firstName} ${lastName} ajouté avec succès !`, 'success');
        
        // Fermer la modal
        document.getElementById('employeeModal')?.remove();
    }

    editEmployee(employeeId) {
        const employee = this.employees.find(emp => emp.id === employeeId);
        if (!employee) return;
        
        const newFirstName = prompt('Nouveau prénom:', employee.firstName);
        if (!newFirstName) return;
        
        const newLastName = prompt('Nouveau nom:', employee.lastName);
        if (!newLastName) return;
        
        employee.firstName = newFirstName;
        employee.lastName = newLastName;
        
        this.saveData();
        this.renderCurrentView();
        this.showNotification('Coach modifié avec succès !', 'success');
        
        // Fermer et rouvrir la modal pour rafraîchir
        document.getElementById('employeeModal')?.remove();
        this.showEmployeeModal();
    }

    deleteEmployee(employeeId) {
        const employee = this.employees.find(emp => emp.id === employeeId);
        if (!employee) return;
        
        if (!confirm(`Supprimer le coach ${employee.firstName} ${employee.lastName} ?\nTous ses créneaux seront également supprimés.`)) {
            return;
        }
        
        // Supprimer l'employé
        this.employees = this.employees.filter(emp => emp.id !== employeeId);
        
        // Supprimer tous ses créneaux
        delete this.schedules[employeeId];
        
        this.saveData();
        this.renderCurrentView();
        this.showNotification('Coach supprimé avec succès !', 'success');
        
        // Fermer et rouvrir la modal pour rafraîchir
        document.getElementById('employeeModal')?.remove();
        this.showEmployeeModal();
    }

    // Gestion des locations
    addLocation() {
        const name = document.getElementById('newLocName').value.trim();
        const capacity = parseInt(document.getElementById('newLocCapacity').value);
        const type = document.getElementById('newLocType').value;
        
        if (!name || !capacity) {
            alert('Veuillez remplir le nom et la capacité.');
            return;
        }
        
        const newLocation = {
            id: `bassin_${Date.now()}`,
            name: name,
            capacity: capacity,
            type: type
        };
        
        this.locations.push(newLocation);
        this.saveData();
        this.showNotification(`Bassin ${name} ajouté avec succès !`, 'success');
        
        // Fermer la modal
        document.getElementById('locationModal')?.remove();
    }

    editLocation(locationId) {
        const location = this.locations.find(loc => loc.id === locationId);
        if (!location) return;
        
        const newName = prompt('Nouveau nom:', location.name);
        if (!newName) return;
        
        const newCapacity = prompt('Nouvelle capacité:', location.capacity);
        if (!newCapacity) return;
        
        location.name = newName;
        location.capacity = parseInt(newCapacity);
        
        this.saveData();
        this.showNotification('Bassin modifié avec succès !', 'success');
        
        // Fermer et rouvrir la modal pour rafraîchir
        document.getElementById('locationModal')?.remove();
        this.showLocationModal();
    }

    deleteLocation(locationId) {
        const location = this.locations.find(loc => loc.id === locationId);
        if (!location) return;
        
        if (!confirm(`Supprimer le bassin ${location.name} ?`)) {
            return;
        }
        
        this.locations = this.locations.filter(loc => loc.id !== locationId);
        this.saveData();
        this.showNotification('Bassin supprimé avec succès !', 'success');
        
        // Fermer et rouvrir la modal pour rafraîchir
        document.getElementById('locationModal')?.remove();
        this.showLocationModal();
    }

    // Gestion des templates
    saveCurrentWeekAsTemplate() {
        this.templates = JSON.parse(JSON.stringify(this.schedules));
        localStorage.setItem('pool_templates', JSON.stringify(this.templates));
        this.showNotification('Semaine sauvegardée comme modèle !', 'success');
        
        // Fermer et rouvrir la modal pour rafraîchir
        document.getElementById('templateModal')?.remove();
        this.showTemplateModal();
    }

    applyTemplate() {
        if (Object.keys(this.templates).length === 0) {
            alert('Aucun modèle sauvegardé disponible.');
            return;
        }
        
        if (!confirm('Appliquer le modèle à cette semaine ?\nCela remplacera tous les créneaux actuels.')) {
            return;
        }
        
        // Adapter les dates du template à la semaine courante
        const newSchedules = {};
        const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
        
        Object.keys(this.templates).forEach(employeeId => {
            newSchedules[employeeId] = {};
            
            days.forEach((dayName, dayIndex) => {
                const currentDate = new Date(this.currentWeekStart);
                currentDate.setDate(currentDate.getDate() + dayIndex);
                const dateStr = currentDate.toISOString().split('T')[0];
                
                // Trouver le jour correspondant dans le template
                const templateDates = Object.keys(this.templates[employeeId] || {});
                if (templateDates[dayIndex]) {
                    const templateSlots = this.templates[employeeId][templateDates[dayIndex]] || [];
                    newSchedules[employeeId][dateStr] = templateSlots.map(slot => ({
                        ...slot,
                        id: `slot_${employeeId}_${dateStr}_${Date.now()}_${Math.random()}`
                    }));
                }
            });
        });
        
        this.schedules = newSchedules;
        this.saveData();
        this.renderCurrentView();
        this.showNotification('Modèle appliqué avec succès !', 'success');
        
        // Fermer la modal
        document.getElementById('templateModal')?.remove();
    }

    clearTemplate() {
        if (!confirm('Effacer le modèle sauvegardé ?')) {
            return;
        }
        
        this.templates = {};
        localStorage.removeItem('pool_templates');
        this.showNotification('Modèle effacé !', 'success');
        
        // Fermer et rouvrir la modal pour rafraîchir
        document.getElementById('templateModal')?.remove();
        this.showTemplateModal();
    }

    // Méthodes utilitaires manquantes
    getTotalSlots() {
        let total = 0;
        Object.keys(this.schedules).forEach(employeeId => {
            const employeeSchedule = this.schedules[employeeId] || {};
            Object.keys(employeeSchedule).forEach(date => {
                total += (employeeSchedule[date] || []).length;
            });
        });
        return total;
    }

    getTotalHours() {
        let total = 0;
        Object.keys(this.schedules).forEach(employeeId => {
            const employeeSchedule = this.schedules[employeeId] || {};
            Object.keys(employeeSchedule).forEach(date => {
                (employeeSchedule[date] || []).forEach(slot => {
                    const start = new Date(`2000-01-01T${slot.startTime}`);
                    const end = new Date(`2000-01-01T${slot.endTime}`);
                    total += (end - start) / (1000 * 60 * 60);
                });
            });
        });
        return total;
    }

    getEmployeeHours(employeeId) {
        let total = 0;
        const employeeSchedule = this.schedules[employeeId] || {};
        Object.keys(employeeSchedule).forEach(date => {
            (employeeSchedule[date] || []).forEach(slot => {
                const start = new Date(`2000-01-01T${slot.startTime}`);
                const end = new Date(`2000-01-01T${slot.endTime}`);
                total += (end - start) / (1000 * 60 * 60);
            });
        });
        return total;
    }





    renderDashboard() {
        // Placeholder pour le rendu du dashboard si modal existe dans HTML
        console.log('Dashboard rendu');
    }



    getMonthlyHours(month, year) {
        const monthlyHours = {};
        
        // Initialiser tous les employés à 0
        this.employees.forEach(emp => {
            monthlyHours[emp.id] = 0;
        });
        
        // Calculer les heures pour le mois donné
        Object.keys(this.schedules).forEach(employeeId => {
            const employeeSchedule = this.schedules[employeeId] || {};
            Object.keys(employeeSchedule).forEach(dateStr => {
                const date = new Date(dateStr);
                if (date.getMonth() === month && date.getFullYear() === year) {
                    (employeeSchedule[dateStr] || []).forEach(slot => {
                        const start = new Date(`2000-01-01T${slot.startTime}`);
                        const end = new Date(`2000-01-01T${slot.endTime}`);
                        const hours = (end - start) / (1000 * 60 * 60);
                        monthlyHours[employeeId] = (monthlyHours[employeeId] || 0) + hours;
                    });
                }
            });
        });
        
        return monthlyHours;
    }

    getPreviousMonthsData() {
        const currentDate = new Date();
        const previousMonths = [];
        
        // Générer les 3 derniers mois
        for (let i = 1; i <= 3; i++) {
            const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
            const month = targetDate.getMonth();
            const year = targetDate.getFullYear();
            
            previousMonths.push({
                month: month,
                year: year,
                monthName: this.getMonthName(month),
                data: this.getMonthlyHours(month, year)
            });
        }
        
        return previousMonths;
    }

    getMonthName(monthIndex) {
        const months = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];
        return months[monthIndex];
    }

    exportHoursPDF() {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const monthlyData = this.getMonthlyHours(currentMonth, currentYear);
        const previousMonthsData = this.getPreviousMonthsData();
        
        const printWindow = window.open('', '_blank');
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html><head>
                <title>Rapport d'Heures Piscine - ${this.getMonthName(currentMonth)} ${currentYear}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
                    .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #0ea5e9; padding-bottom: 20px; }
                    .header h1 { color: #0ea5e9; margin: 0; font-size: 2rem; }
                    .month-section { margin: 30px 0; page-break-inside: avoid; }
                    .month-title { background: #0ea5e9; color: white; padding: 10px; font-size: 1.2rem; }
                    .hours-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                    .hours-table th { background: #f8f9fa; padding: 12px; text-align: left; border: 1px solid #ddd; }
                    .hours-table td { padding: 10px 12px; border: 1px solid #ddd; }
                    .hours-table tbody tr:nth-child(even) { background: #f8f9fa; }
                    .total-row { background: #e3f2fd !important; font-weight: bold; }
                    .footer { margin-top: 40px; text-align: center; color: #666; font-size: 0.9rem; }
                </style>
            </head><body>
                <div class="header">
                    <h1>🕰️ Rapport d'Heures Piscine</h1>
                    <p>Généré le ${new Date().toLocaleDateString('fr-FR')}</p>
                </div>
                
                <div class="month-section">
                    <div class="month-title">Mois courant : ${this.getMonthName(currentMonth)} ${currentYear}</div>
                    <table class="hours-table">
                        <thead>
                            <tr>
                                <th>Coach</th>
                                <th>Spécialité</th>
                                <th>Nombre d'heures</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.employees.filter(emp => emp.active).map(emp => {
                                const hours = monthlyData[emp.id] || 0;
                                return `
                                    <tr>
                                        <td>${emp.firstName} ${emp.lastName}</td>
                                        <td>${this.getSpecialtyName(emp.specialty)}</td>
                                        <td>${hours.toFixed(1)}h</td>
                                    </tr>
                                `;
                            }).join('')}
                            <tr class="total-row">
                                <td colspan="2"><strong>TOTAL</strong></td>
                                <td><strong>${Object.values(monthlyData).reduce((sum, h) => sum + h, 0).toFixed(1)}h</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                ${previousMonthsData.map(monthData => `
                    <div class="month-section">
                        <div class="month-title">${monthData.monthName} ${monthData.year}</div>
                        <table class="hours-table">
                            <thead>
                                <tr>
                                    <th>Coach</th>
                                    <th>Spécialité</th>
                                    <th>Nombre d'heures</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.employees.filter(emp => emp.active).map(emp => {
                                    const hours = monthData.data[emp.id] || 0;
                                    return `
                                        <tr>
                                            <td>${emp.firstName} ${emp.lastName}</td>
                                            <td>${this.getSpecialtyName(emp.specialty)}</td>
                                            <td>${hours.toFixed(1)}h</td>
                                        </tr>
                                    `;
                                }).join('')}
                                <tr class="total-row">
                                    <td colspan="2"><strong>TOTAL</strong></td>
                                    <td><strong>${Object.values(monthData.data).reduce((sum, h) => sum + h, 0).toFixed(1)}h</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `).join('')}
                
                <div class="footer">
                    <p>Document généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</p>
                </div>
            </body></html>
        `);
        
        printWindow.document.close();
        setTimeout(() => { 
            printWindow.print(); 
            printWindow.close(); 
        }, 500);
        
        this.showNotification('Export rapport d\'heures lancé !', 'success');
    }

    getMonthlyHours(month, year) {
        const monthlyHours = {};
        
        // Initialiser tous les employés à 0
        this.employees.forEach(emp => {
            monthlyHours[emp.id] = 0;
        });
        
        // Calculer les heures pour le mois donné
        Object.keys(this.schedules).forEach(employeeId => {
            const employeeSchedule = this.schedules[employeeId] || {};
            Object.keys(employeeSchedule).forEach(dateStr => {
                const date = new Date(dateStr);
                if (date.getMonth() === month && date.getFullYear() === year) {
                    (employeeSchedule[dateStr] || []).forEach(slot => {
                        const start = new Date(`2000-01-01T${slot.startTime}`);
                        const end = new Date(`2000-01-01T${slot.endTime}`);
                        const hours = (end - start) / (1000 * 60 * 60);
                        monthlyHours[employeeId] = (monthlyHours[employeeId] || 0) + hours;
                    });
                }
            });
        });
        
        return monthlyHours;
    }

    getPreviousMonthsData() {
        const currentDate = new Date();
        const previousMonths = [];
        
        // Générer les 3 derniers mois
        for (let i = 1; i <= 3; i++) {
            const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
            const month = targetDate.getMonth();
            const year = targetDate.getFullYear();
            
            previousMonths.push({
                month: month,
                year: year,
                monthName: this.getMonthName(month),
                data: this.getMonthlyHours(month, year)
            });
        }
        
        return previousMonths;
    }

    getMonthName(monthIndex) {
        const months = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];
        return months[monthIndex];
    }

    exportHoursPDF() {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const monthlyData = this.getMonthlyHours(currentMonth, currentYear);
        const previousMonthsData = this.getPreviousMonthsData();
        
        const printWindow = window.open('', '_blank');
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html><head>
                <title>Rapport d'Heures Piscine - ${this.getMonthName(currentMonth)} ${currentYear}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
                    .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #0ea5e9; padding-bottom: 20px; }
                    .header h1 { color: #0ea5e9; margin: 0; font-size: 2rem; }
                    .month-section { margin: 30px 0; page-break-inside: avoid; }
                    .month-title { background: #0ea5e9; color: white; padding: 10px; font-size: 1.2rem; }
                    .hours-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                    .hours-table th { background: #f8f9fa; padding: 12px; text-align: left; border: 1px solid #ddd; }
                    .hours-table td { padding: 10px 12px; border: 1px solid #ddd; }
                    .hours-table tbody tr:nth-child(even) { background: #f8f9fa; }
                    .total-row { background: #e3f2fd !important; font-weight: bold; }
                    .footer { margin-top: 40px; text-align: center; color: #666; font-size: 0.9rem; }
                </style>
            </head><body>
                <div class="header">
                    <h1>🕰️ Rapport d'Heures Piscine</h1>
                    <p>Généré le ${new Date().toLocaleDateString('fr-FR')}</p>
                </div>
                
                <div class="month-section">
                    <div class="month-title">Mois courant : ${this.getMonthName(currentMonth)} ${currentYear}</div>
                    <table class="hours-table">
                        <thead>
                            <tr>
                                <th>Coach</th>
                                <th>Spécialité</th>
                                <th>Nombre d'heures</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.employees.filter(emp => emp.active).map(emp => {
                                const hours = monthlyData[emp.id] || 0;
                                return `
                                    <tr>
                                        <td>${emp.firstName} ${emp.lastName}</td>
                                        <td>${this.getSpecialtyName(emp.specialty)}</td>
                                        <td>${hours.toFixed(1)}h</td>
                                    </tr>
                                `;
                            }).join('')}
                            <tr class="total-row">
                                <td colspan="2"><strong>TOTAL</strong></td>
                                <td><strong>${Object.values(monthlyData).reduce((sum, h) => sum + h, 0).toFixed(1)}h</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                ${previousMonthsData.map(monthData => `
                    <div class="month-section">
                        <div class="month-title">${monthData.monthName} ${monthData.year}</div>
                        <table class="hours-table">
                            <thead>
                                <tr>
                                    <th>Coach</th>
                                    <th>Spécialité</th>
                                    <th>Nombre d'heures</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.employees.filter(emp => emp.active).map(emp => {
                                    const hours = monthData.data[emp.id] || 0;
                                    return `
                                        <tr>
                                            <td>${emp.firstName} ${emp.lastName}</td>
                                            <td>${this.getSpecialtyName(emp.specialty)}</td>
                                            <td>${hours.toFixed(1)}h</td>
                                        </tr>
                                    `;
                                }).join('')}
                                <tr class="total-row">
                                    <td colspan="2"><strong>TOTAL</strong></td>
                                    <td><strong>${Object.values(monthData.data).reduce((sum, h) => sum + h, 0).toFixed(1)}h</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `).join('')}
                
                <div class="footer">
                    <p>Document généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</p>
                </div>
            </body></html>
        `);
        
        printWindow.document.close();
        setTimeout(() => { 
            printWindow.print(); 
            printWindow.close(); 
        }, 500);
        
        this.showNotification('Export rapport d\'heures lancé !', 'success');
    }

    addSlot(employeeId, dateStr) {
        const employee = this.employees.find(emp => emp.id === employeeId);
        const dateObj = new Date(dateStr);
        const dayName = dateObj.toLocaleDateString('fr-FR', { weekday: 'long' });
        
        const startTime = prompt(`Ajouter un créneau pour ${employee.firstName} ${employee.lastName}\nLe ${dayName} ${this.formatDate(dateObj)}\n\nHeure de début (format HH:MM):`, '09:00');
        if (!startTime) return;
        
        const endTime = prompt('Heure de fin (format HH:MM):', '10:00');
        if (!endTime) return;
        
        const courseTypes = [
            'natation-debutant',
            'natation-perfectionnement', 
            'aqua-fitness',
            'aqua-gym',
            'ecole-de-nage',
            'water-polo',
            'plongee',
            'cours-prive'
        ];
        
        const courseType = prompt(`Type de cours:\n${courseTypes.map((type, i) => `${i+1}. ${this.getCourseTypeName(type)}`).join('\n')}\n\nChoisissez un numéro (1-${courseTypes.length}):`, '1');
        const selectedCourse = courseTypes[parseInt(courseType) - 1] || courseTypes[0];
        
        const locationId = this.locations.length > 1 ? 
            prompt(`Bassin:\n${this.locations.map((loc, i) => `${i+1}. ${loc.name}`).join('\n')}\n\nChoisissez un numéro (1-${this.locations.length}):`, '1') :
            '1';
        const selectedLocation = this.locations[parseInt(locationId) - 1] || this.locations[0];
        
        // Vérifier les conflits
        const existingSlots = this.schedules[employeeId]?.[dateStr] || [];
        const hasConflict = existingSlots.some(slot => 
            this.timesOverlap(startTime, endTime, slot.startTime, slot.endTime)
        );
        
        if (hasConflict) {
            alert('Conflit détecté : un créneau existe déjà à cette heure.');
            return;
        }
        
        // Créer le nouveau créneau
        const newSlot = {
            id: `slot_${employeeId}_${dateStr}_${Date.now()}`,
            startTime: startTime,
            endTime: endTime,
            courseType: selectedCourse,
            locationId: selectedLocation.id,
            description: this.generateCourseDescription(selectedCourse),
            participants: Math.floor(Math.random() * 12) + 3
        };
        
        // Ajouter à la planification
        if (!this.schedules[employeeId]) this.schedules[employeeId] = {};
        if (!this.schedules[employeeId][dateStr]) this.schedules[employeeId][dateStr] = [];
        
        this.schedules[employeeId][dateStr].push(newSlot);
        this.schedules[employeeId][dateStr].sort((a, b) => a.startTime.localeCompare(b.startTime));
        
        this.saveData();
        this.renderCurrentView();
        this.showNotification('Créneau ajouté avec succès !', 'success');
    }
    
    editSlot(slotId, employeeId, dateStr) {
        const slots = this.schedules[employeeId]?.[dateStr];
        if (!slots) return;
        
        const slot = slots.find(s => s.id === slotId);
        if (!slot) return;
        
        const employee = this.employees.find(emp => emp.id === employeeId);
        const dateObj = new Date(dateStr);
        const dayName = dateObj.toLocaleDateString('fr-FR', { weekday: 'long' });
        
        const newStartTime = prompt(`Modifier le créneau de ${employee.firstName} ${employee.lastName}\nLe ${dayName} ${this.formatDate(dateObj)}\n\nNouvelle heure de début:`, slot.startTime);
        if (!newStartTime) return;
        
        const newEndTime = prompt('Nouvelle heure de fin:', slot.endTime);
        if (!newEndTime) return;
        
        // Vérifier les conflits (exclure le créneau actuel)
        const otherSlots = slots.filter(s => s.id !== slotId);
        const hasConflict = otherSlots.some(s => 
            this.timesOverlap(newStartTime, newEndTime, s.startTime, s.endTime)
        );
        
        if (hasConflict) {
            alert('Conflit détecté : un autre créneau existe déjà à cette heure.');
            return;
        }
        
        // Mettre à jour le créneau
        slot.startTime = newStartTime;
        slot.endTime = newEndTime;
        
        // Trier les créneaux
        this.schedules[employeeId][dateStr].sort((a, b) => a.startTime.localeCompare(b.startTime));
        
        this.saveData();
        this.renderCurrentView();
        this.showNotification('Créneau modifié avec succès !', 'success');
    }
    
    deleteSlot(slotId, employeeId, dateStr) {
        const employee = this.employees.find(emp => emp.id === employeeId);
        const dateObj = new Date(dateStr);
        const dayName = dateObj.toLocaleDateString('fr-FR', { weekday: 'long' });
        
        if (!confirm(`Supprimer le créneau de ${employee.firstName} ${employee.lastName}\nLe ${dayName} ${this.formatDate(dateObj)} ?`)) {
            return;
        }
        
        const slots = this.schedules[employeeId]?.[dateStr];
        if (!slots) return;
        
        const slotIndex = slots.findIndex(s => s.id === slotId);
        if (slotIndex === -1) return;
        
        slots.splice(slotIndex, 1);
        
        this.saveData();
        this.renderCurrentView();
        this.showNotification('Créneau supprimé avec succès !', 'success');
    }

    showEmployeeManagement() {
        console.log('📋 Ouverture gestion des coachs');
        this.closeMenu();
        this.showEmployeeModal();
    }

    showLocationManagement() {
        console.log('🏊 Ouverture gestion des bassins');
        this.closeMenu();
        this.showLocationModal();
    }

    showTemplateManagement() {
        console.log('📅 Ouverture gestion semaine type');
        this.closeMenu();
        this.showTemplateModal();
    }

    showEmployeeModal() {
        const modalContent = `
            <div class="modal active" id="employeeModal" style="display: flex;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-chalkboard-teacher"></i> Gestion des Coachs</h3>
                        <button class="close-modal" onclick="this.closest('.modal').remove()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="employee-list">
                            <h4>Coachs actuels :</h4>
                            ${this.employees.map(emp => `
                                <div class="employee-item">
                                    <div class="employee-info">
                                        <strong>${emp.firstName} ${emp.lastName}</strong>
                                        <span class="specialty">${this.getSpecialtyName(emp.specialty)}</span>
                                    </div>
                                    <div class="employee-actions">
                                        <button onclick="planningManager.editEmployee('${emp.id}')" class="btn-edit">Modifier</button>
                                        <button onclick="planningManager.deleteEmployee('${emp.id}')" class="btn-delete">Supprimer</button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        <div class="add-employee-section">
                            <h4>Ajouter un nouveau coach :</h4>
                            <div class="form-group">
                                <input type="text" id="newEmpFirstName" placeholder="Prénom" class="form-input">
                                <input type="text" id="newEmpLastName" placeholder="Nom" class="form-input">
                                <select id="newEmpSpecialty" class="form-select">
                                    <option value="natation-adulte">Natation adulte</option>
                                    <option value="natation-enfant">Natation enfant</option>
                                    <option value="aqua-fitness">Aqua fitness</option>
                                    <option value="water-polo">Water polo</option>
                                    <option value="plongee">Plongée</option>
                                    <option value="sauvetage">Sauvetage</option>
                                </select>
                                <button onclick="planningManager.addEmployee()" class="btn-add">Ajouter Coach</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalContent);
    }

    showLocationModal() {
        const modalContent = `
            <div class="modal active" id="locationModal" style="display: flex;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-swimming-pool"></i> Gestion des Bassins</h3>
                        <button class="close-modal" onclick="this.closest('.modal').remove()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="location-list">
                            <h4>Bassins actuels :</h4>
                            ${this.locations.map(loc => `
                                <div class="location-item">
                                    <div class="location-info">
                                        <strong>${loc.name}</strong>
                                        <span class="capacity">Capacité: ${loc.capacity} • Type: ${loc.type}</span>
                                    </div>
                                    <div class="location-actions">
                                        <button onclick="planningManager.editLocation('${loc.id}')" class="btn-edit">Modifier</button>
                                        <button onclick="planningManager.deleteLocation('${loc.id}')" class="btn-delete">Supprimer</button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        <div class="add-location-section">
                            <h4>Ajouter un nouveau bassin :</h4>
                            <div class="form-group">
                                <input type="text" id="newLocName" placeholder="Nom du bassin" class="form-input">
                                <input type="number" id="newLocCapacity" placeholder="Capacité" class="form-input" min="1">
                                <select id="newLocType" class="form-select">
                                    <option value="competition">Compétition</option>
                                    <option value="apprentissage">Apprentissage</option>
                                    <option value="loisir">Loisir</option>
                                    <option value="profond">Profond</option>
                                </select>
                                <button onclick="planningManager.addLocation()" class="btn-add">Ajouter Bassin</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalContent);
    }

    showTemplateModal() {
        const modalContent = `
            <div class="modal active" id="templateModal" style="display: flex;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-calendar-plus"></i> Semaine Type</h3>
                        <button class="close-modal" onclick="this.closest('.modal').remove()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="template-section">
                            <h4>Gestion de la semaine type :</h4>
                            <div class="template-actions">
                                <button onclick="planningManager.saveCurrentWeekAsTemplate()" class="btn-primary">
                                    <i class="fas fa-save"></i> Sauvegarder semaine actuelle comme modèle
                                </button>
                                <button onclick="planningManager.applyTemplate()" class="btn-success">
                                    <i class="fas fa-calendar-check"></i> Appliquer le modèle à cette semaine
                                </button>
                                <button onclick="planningManager.clearTemplate()" class="btn-warning">
                                    <i class="fas fa-trash"></i> Effacer le modèle sauvegardé
                                </button>
                            </div>
                            <div class="template-info">
                                <p><strong>Utilisation :</strong></p>
                                <ul>
                                    <li>Configurez votre semaine idéale avec tous les créneaux</li>
                                    <li>Sauvegardez-la comme modèle</li>
                                    <li>Appliquez ce modèle à n'importe quelle semaine</li>
                                </ul>
                                <div class="template-status">
                                    ${Object.keys(this.templates).length > 0 ? 
                                        '<p class="status-success"><i class="fas fa-check"></i> Modèle sauvegardé disponible</p>' : 
                                        '<p class="status-info"><i class="fas fa-info"></i> Aucun modèle sauvegardé</p>'
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalContent);
    }

    showEmployeeManagement() {
        console.log('📋 Ouverture gestion des coachs');
        this.closeMenu();
        this.showEmployeeModal();
    }

    showLocationManagement() {
        console.log('🏊 Ouverture gestion des bassins');
        this.closeMenu();
        this.showLocationModal();
    }

    showTemplateManagement() {
        console.log('📅 Ouverture gestion semaine type');
        this.closeMenu();
        this.showTemplateModal();
    }

    showDashboard() {
        console.log('📊 Ouverture tableau de bord');
        this.closeMenu();
        const modal = document.getElementById('dashboardModal');
        if (modal) {
            modal.classList.add('active');
            this.renderDashboard();
        } else {
            this.showDashboardModal();
        }
    }



    showDashboardModal() {
        const modalContent = `
            <div class="modal active" id="dashboardModalTemp" style="display: flex;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-chart-bar"></i> Tableau de Bord</h3>
                        <button class="close-modal" onclick="this.closest('.modal').remove()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="dashboard-stats">
                            <h4>Statistiques de la semaine courante :</h4>
                            <div class="stats-grid">
                                <div class="stat-card">
                                    <div class="stat-number">${this.getTotalSlots()}</div>
                                    <div class="stat-label">Créneaux total</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-number">${this.getTotalHours().toFixed(1)}h</div>
                                    <div class="stat-label">Heures total</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-number">${this.employees.filter(emp => emp.active).length}</div>
                                    <div class="stat-label">Coachs actifs</div>
                                </div>
                                <div class="stat-card">
                                    <div class="stat-number">${this.locations.length}</div>
                                    <div class="stat-label">Bassins</div>
                                </div>
                            </div>
                            <div class="coach-breakdown">
                                <h4>Répartition par coach :</h4>
                                ${this.employees.filter(emp => emp.active).map(emp => {
                                    const hours = this.getEmployeeHours(emp.id);
                                    return `<div class="coach-stat">${emp.firstName} ${emp.lastName}: ${hours.toFixed(1)}h</div>`;
                                }).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalContent);
    }

    showBillingModal() {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const monthlyData = this.getMonthlyHours(currentMonth, currentYear);
        const previousMonthsData = this.getPreviousMonthsData();
        
        const modalContent = `
            <div class="modal active" id="billingModalTemp" style="display: flex;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-clock"></i> Suivi des Heures</h3>
                        <button class="close-modal" onclick="this.closest('.modal').remove()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="hours-tracking">
                            <h4>Heures du mois courant (${this.getMonthName(currentMonth)} ${currentYear}) :</h4>
                            <div class="current-month-hours">
                                ${this.employees.filter(emp => emp.active).map(emp => {
                                    const hours = monthlyData[emp.id] || 0;
                                    return `<div class="coach-hours-row">
                                        <span class="coach-name">${emp.firstName} ${emp.lastName}</span>
                                        <span class="hours-count">${hours.toFixed(1)}h</span>
                                    </div>`;
                                }).join('')}
                                <div class="total-hours-row">
                                    <span class="total-label">TOTAL</span>
                                    <span class="total-hours">${Object.values(monthlyData).reduce((sum, h) => sum + h, 0).toFixed(1)}h</span>
                                </div>
                            </div>
                            
                            <h4>Historique des mois précédents :</h4>
                            <div class="previous-months">
                                ${previousMonthsData.map(monthData => `
                                    <div class="month-section">
                                        <h5>${monthData.monthName} ${monthData.year}</h5>
                                        ${this.employees.filter(emp => emp.active).map(emp => {
                                            const hours = monthData.data[emp.id] || 0;
                                            return `<div class="coach-hours-row historical">
                                                <span class="coach-name">${emp.firstName} ${emp.lastName}</span>
                                                <span class="hours-count">${hours.toFixed(1)}h</span>
                                            </div>`;
                                        }).join('')}
                                        <div class="month-total">
                                            <span>Total : ${Object.values(monthData.data).reduce((sum, h) => sum + h, 0).toFixed(1)}h</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                            
                            <button onclick="planningManager.exportHoursPDF()" class="btn-primary">
                                <i class="fas fa-file-pdf"></i> Exporter le rapport d'heures
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalContent);
    }

    showEmployeeModal() {
        const modalContent = `
            <div class="modal active" id="employeeModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-chalkboard-teacher"></i> Gestion des Coachs</h3>
                        <button class="close-modal" onclick="this.closest('.modal').remove()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="employee-list">
                            <h4>Coachs actuels :</h4>
                            ${this.employees.map(emp => `
                                <div class="employee-item">
                                    <div class="employee-info">
                                        <strong>${emp.firstName} ${emp.lastName}</strong>
                                        <span class="specialty">${this.getSpecialtyName(emp.specialty)}</span>
                                    </div>
                                    <div class="employee-actions">
                                        <button onclick="planningManager.editEmployee('${emp.id}')" class="btn-edit">Modifier</button>
                                        <button onclick="planningManager.deleteEmployee('${emp.id}')" class="btn-delete">Supprimer</button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        <div class="add-employee-section">
                            <h4>Ajouter un nouveau coach :</h4>
                            <div class="form-group">
                                <input type="text" id="newEmpFirstName" placeholder="Prénom" class="form-input">
                                <input type="text" id="newEmpLastName" placeholder="Nom" class="form-input">
                                <select id="newEmpSpecialty" class="form-select">
                                    <option value="natation-adulte">Natation adulte</option>
                                    <option value="natation-enfant">Natation enfant</option>
                                    <option value="aqua-fitness">Aqua fitness</option>
                                    <option value="water-polo">Water polo</option>
                                    <option value="plongee">Plongée</option>
                                    <option value="sauvetage">Sauvetage</option>
                                </select>
                                <button onclick="planningManager.addEmployee()" class="btn-add">Ajouter Coach</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalContent);
    }

    showLocationModal() {
        const modalContent = `
            <div class="modal active" id="locationModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-swimming-pool"></i> Gestion des Bassins</h3>
                        <button class="close-modal" onclick="this.closest('.modal').remove()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="location-list">
                            <h4>Bassins actuels :</h4>
                            ${this.locations.map(loc => `
                                <div class="location-item">
                                    <div class="location-info">
                                        <strong>${loc.name}</strong>
                                        <span class="capacity">Capacité: ${loc.capacity} • Type: ${loc.type}</span>
                                    </div>
                                    <div class="location-actions">
                                        <button onclick="planningManager.editLocation('${loc.id}')" class="btn-edit">Modifier</button>
                                        <button onclick="planningManager.deleteLocation('${loc.id}')" class="btn-delete">Supprimer</button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        <div class="add-location-section">
                            <h4>Ajouter un nouveau bassin :</h4>
                            <div class="form-group">
                                <input type="text" id="newLocName" placeholder="Nom du bassin" class="form-input">
                                <input type="number" id="newLocCapacity" placeholder="Capacité" class="form-input" min="1">
                                <select id="newLocType" class="form-select">
                                    <option value="competition">Compétition</option>
                                    <option value="apprentissage">Apprentissage</option>
                                    <option value="loisir">Loisir</option>
                                    <option value="profond">Profond</option>
                                </select>
                                <button onclick="planningManager.addLocation()" class="btn-add">Ajouter Bassin</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalContent);
    }

    showTemplateModal() {
        const modalContent = `
            <div class="modal active" id="templateModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-calendar-plus"></i> Semaine Type</h3>
                        <button class="close-modal" onclick="this.closest('.modal').remove()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="template-section">
                            <h4>Gestion de la semaine type :</h4>
                            <div class="template-actions">
                                <button onclick="planningManager.saveCurrentWeekAsTemplate()" class="btn-primary">
                                    <i class="fas fa-save"></i> Sauvegarder semaine actuelle comme modèle
                                </button>
                                <button onclick="planningManager.applyTemplate()" class="btn-success">
                                    <i class="fas fa-calendar-check"></i> Appliquer le modèle à cette semaine
                                </button>
                                <button onclick="planningManager.clearTemplate()" class="btn-warning">
                                    <i class="fas fa-trash"></i> Effacer le modèle sauvegardé
                                </button>
                            </div>
                            <div class="template-info">
                                <p><strong>Utilisation :</strong></p>
                                <ul>
                                    <li>Configurez votre semaine idéale avec tous les créneaux</li>
                                    <li>Sauvegardez-la comme modèle</li>
                                    <li>Appliquez ce modèle à n'importe quelle semaine</li>
                                </ul>
                                <div class="template-status">
                                    ${Object.keys(this.templates).length > 0 ? 
                                        '<p class="status-success"><i class="fas fa-check"></i> Modèle sauvegardé disponible</p>' : 
                                        '<p class="status-info"><i class="fas fa-info"></i> Aucun modèle sauvegardé</p>'
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalContent);
    }

    showDashboardModal() {
        // Pour l'instant, juste une modal simple
        const modalContent = `
            <div class="modal active" id="dashboardModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-chart-dashboard"></i> Tableau de Bord</h3>
                        <button class="close-modal" onclick="this.closest('.modal').remove()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>Tableau de bord en développement...</p>
                        <p>Statistiques de la semaine courante :</p>
                        <ul>
                            <li>Nombre total de créneaux : ${this.getTotalSlots()}</li>
                            <li>Nombre de coachs actifs : ${this.employees.filter(emp => emp.active).length}</li>
                            <li>Nombre de bassins : ${this.locations.length}</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalContent);
    }

    showBillingModal() {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const monthlyData = this.getMonthlyHours(currentMonth, currentYear);
        const previousMonthsData = this.getPreviousMonthsData();
        
        const modalContent = `
            <div class="modal active" id="billingModalTemp" style="display: flex;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-clock"></i> Suivi des Heures</h3>
                        <button class="close-modal" onclick="this.closest('.modal').remove()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="hours-tracking">
                            <h4>Heures du mois courant (${this.getMonthName(currentMonth)} ${currentYear}) :</h4>
                            <div class="current-month-hours">
                                ${this.employees.filter(emp => emp.active).map(emp => {
                                    const hours = monthlyData[emp.id] || 0;
                                    return `<div class="coach-hours-row">
                                        <span class="coach-name">${emp.firstName} ${emp.lastName}</span>
                                        <span class="hours-count">${hours.toFixed(1)}h</span>
                                    </div>`;
                                }).join('')}
                                <div class="total-hours-row">
                                    <span class="total-label">TOTAL</span>
                                    <span class="total-hours">${Object.values(monthlyData).reduce((sum, h) => sum + h, 0).toFixed(1)}h</span>
                                </div>
                            </div>
                            
                            <h4>Historique des mois précédents :</h4>
                            <div class="previous-months">
                                ${previousMonthsData.map(monthData => `
                                    <div class="month-section">
                                        <h5>${monthData.monthName} ${monthData.year}</h5>
                                        ${this.employees.filter(emp => emp.active).map(emp => {
                                            const hours = monthData.data[emp.id] || 0;
                                            return `<div class="coach-hours-row historical">
                                                <span class="coach-name">${emp.firstName} ${emp.lastName}</span>
                                                <span class="hours-count">${hours.toFixed(1)}h</span>
                                            </div>`;
                                        }).join('')}
                                        <div class="month-total">
                                            <span>Total : ${Object.values(monthData.data).reduce((sum, h) => sum + h, 0).toFixed(1)}h</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                            
                            <button onclick="planningManager.exportHoursPDF()" class="btn-primary">
                                <i class="fas fa-file-pdf"></i> Exporter le rapport d'heures
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalContent);
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
        
        this.renderCoachView();
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
        
        // S'assurer que la vue est visible
        container.classList.add('active');
        container.style.display = 'block';
        console.log('✅ Vue coach rendue et visible');
        
        // Activer le drag & drop après le rendu
        setTimeout(() => this.setupDragAndDrop(), 100);
    }

    renderDayCell(employeeId, date) {
        const dateStr = date.toISOString().split('T')[0];
        const slots = this.schedules[employeeId]?.[dateStr] || [];
        
        return `
            <div class="day-cell" data-employee-id="${employeeId}" data-date="${dateStr}">
                ${slots.map(slot => `
                    <div class="time-slot" data-slot-id="${slot.id}" data-employee-id="${employeeId}" data-date="${dateStr}">
                        <div class="drag-handle">⋮⋮</div>
                        <div class="slot-content">
                            <div class="slot-time">${slot.startTime} - ${slot.endTime}</div>
                            <div class="slot-course">${this.getCourseTypeName(slot.courseType)}</div>
                            <div class="slot-location">${this.getLocationName(slot.locationId)}</div>
                        </div>
                        <div class="slot-actions">
                            <button class="action-btn edit-btn" onclick="planningManager.editSlot('${slot.id}', '${employeeId}', '${dateStr}')" title="Modifier">✏️</button>
                            <button class="action-btn delete-btn" onclick="planningManager.deleteSlot('${slot.id}', '${employeeId}', '${dateStr}')" title="Supprimer">❌</button>
                        </div>
                    </div>
                `).join('')}
                <div class="add-slot-btn" onclick="planningManager.addSlot('${employeeId}', '${dateStr}')">
                    <i class="fas fa-plus-circle"></i> ${slots.length === 0 ? 'Ajouter un cours' : 'Nouveau cours'}
                </div>
            </div>
        `;
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
            const templates = localStorage.getItem('pool_templates');

            if (employees) this.employees = JSON.parse(employees);
            if (locations) this.locations = JSON.parse(locations);
            if (schedules) this.schedules = JSON.parse(schedules);
            if (templates) this.templates = JSON.parse(templates);
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

    changeWeek(direction) {
        this.currentWeekStart.setDate(this.currentWeekStart.getDate() + (direction * 7));
        this.updateWeekDisplay();
        
        // Regénérer les données si la semaine n'a pas de données
        const weekDates = this.getWeekDays().map(day => day.fullDate.toISOString().split('T')[0]);
        let hasData = false;
        
        Object.keys(this.schedules).forEach(employeeId => {
            weekDates.forEach(date => {
                if (this.schedules[employeeId]?.[date]?.length > 0) {
                    hasData = true;
                }
            });
        });
        
        if (!hasData) {
            console.log('📅 Génération de données pour la nouvelle semaine');
            this.generateWeekSchedule();
        }
        
        this.renderCurrentView();
        this.showNotification(`Navigation vers semaine ${this.getWeekNumber(this.currentWeekStart)}`, 'info');
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
}

// Initialisation de l'application
let planningManager;

console.log('📄 Script chargé - en attente du DOM...');

document.addEventListener('DOMContentLoaded', () => {
    console.log('🔄 DOM chargé - Initialisation de l\'application...');
    
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
        console.error('❌ Erreur lors de l\'initialisation:', error);
        console.error('Stack trace:', error.stack);
    }
});

// Log immédiat pour vérifier que le script s'exécute
console.log('🚀 Script script.js en cours d\'exécution...');