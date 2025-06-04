// Application Data
const appData = {
  "stores": [
    {
      "id": 1,
      "name": "Green Valley Dispensary",
      "contact": "Sarah Chen",
      "email": "sarah@greenvalley.com",
      "phone": "(206) 555-0123",
      "status": "Reordering",
      "lastOrder": "2025-05-28",
      "nextReorder": "2025-06-15",
      "orderValue": 15420,
      "tier": "Premium",
      "region": "Seattle",
      "riskScore": "Low"
    },
    {
      "id": 2,
      "name": "Mountain Peak Cannabis",
      "contact": "Mike Rodriguez",
      "email": "mike@mountainpeak.com",
      "phone": "(425) 555-0156",
      "status": "At-Risk",
      "lastOrder": "2025-04-15",
      "nextReorder": "2025-06-10",
      "orderValue": 8750,
      "tier": "Standard",
      "region": "Bellevue",
      "riskScore": "High"
    },
    {
      "id": 3,
      "name": "Sunset Wellness Co",
      "contact": "Emma Thompson",
      "email": "emma@sunsetwellness.com",
      "phone": "(360) 555-0189",
      "status": "Warm",
      "lastOrder": "2025-05-25",
      "nextReorder": "2025-06-08",
      "orderValue": 12300,
      "tier": "Premium",
      "region": "Tacoma",
      "riskScore": "Medium"
    },
    {
      "id": 4,
      "name": "Pacific Coast Collective",
      "contact": "David Park",
      "email": "david@pacificcoast.com",
      "phone": "(253) 555-0167",
      "status": "Cold",
      "lastOrder": "2025-03-20",
      "nextReorder": "2025-06-20",
      "orderValue": 5600,
      "tier": "Basic",
      "region": "Olympia",
      "riskScore": "High"
    },
    {
      "id": 5,
      "name": "Emerald City Cannabis",
      "contact": "Lisa Wang",
      "email": "lisa@emeraldcity.com",
      "phone": "(206) 555-0198",
      "status": "Reordering",
      "lastOrder": "2025-05-30",
      "nextReorder": "2025-06-12",
      "orderValue": 18950,
      "tier": "Premium",
      "region": "Seattle",
      "riskScore": "Low"
    },
    {
      "id": 6,
      "name": "Cascade Cannabis Co",
      "contact": "Tom Bradley",
      "email": "tom@cascadecannabis.com",
      "phone": "(425) 555-0134",
      "status": "Warm",
      "lastOrder": "2025-05-22",
      "nextReorder": "2025-06-14",
      "orderValue": 9875,
      "tier": "Standard",
      "region": "Bellevue",
      "riskScore": "Medium"
    }
  ],
  "metrics": {
    "totalStores": 427,
    "activeRelationships": 324,
    "weeklyOrders": 89,
    "atRiskStores": 12,
    "revenue": 1247500,
    "avgOrderValue": 11250
  },
  "todaysPriorities": [
    {
      "store": "Mountain Peak Cannabis",
      "action": "Follow up on stalled order",
      "priority": "High",
      "aiRecommendation": "Offer 5% discount on their usual SKU mix to re-engage"
    },
    {
      "store": "Pacific Coast Collective",
      "action": "Check in after 45 days of inactivity",
      "priority": "High",
      "aiRecommendation": "Share new product line information and schedule product demo"
    },
    {
      "store": "Emerald City Cannabis",
      "action": "Ready to reorder - high probability",
      "priority": "Medium",
      "aiRecommendation": "Upsell premium flower selection based on previous purchases"
    }
  ],
  "recentActivity": [
    {
      "time": "10:30 AM",
      "action": "Email sent to Green Valley Dispensary",
      "status": "Delivered"
    },
    {
      "time": "9:45 AM",
      "action": "SMS reminder sent to Sunset Wellness",
      "status": "Delivered"
    },
    {
      "time": "9:15 AM",
      "action": "Call completed with Mountain Peak Cannabis",
      "status": "Follow-up scheduled"
    },
    {
      "time": "8:50 AM",
      "action": "Order confirmation from Emerald City Cannabis",
      "status": "Confirmed"
    }
  ],
  "products": [
    {
      "sku": "WLD-001",
      "name": "Walden Indica Blend",
      "category": "Flower",
      "price": 45,
      "performance": "+12%"
    },
    {
      "sku": "WLD-002",
      "name": "Walden Sativa Premium",
      "category": "Flower", 
      "price": 50,
      "performance": "+8%"
    },
    {
      "sku": "WLD-003",
      "name": "Walden CBD Tincture",
      "category": "Edibles",
      "price": 35,
      "performance": "+15%"
    }
  ]
};

// Application State
let currentSection = 'dashboard';
let currentFilter = 'all';
let performanceChart = null;
let revenueChart = null;

// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.content-section');
const searchInput = document.getElementById('searchInput');
const filterTabs = document.querySelectorAll('.filter-tab');
const storesGrid = document.getElementById('storesGrid');
const prioritiesList = document.getElementById('prioritiesList');
const activityFeed = document.getElementById('activityFeed');
const prioritiesDetailed = document.getElementById('prioritiesDetailed');
const storeModal = document.getElementById('storeModal');
const modalClose = document.querySelector('.modal-close');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeSearch();
  initializeFilters();
  initializeModals();
  renderDashboard();
  renderStores();
  renderPriorities();
  renderActivity();
  initializeCharts();
  
  // Add smooth animations
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    document.body.style.opacity = '1';
  }, 100);
});

// Navigation System
function initializeNavigation() {
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      const section = this.dataset.section;
      switchSection(section);
    });
  });
}

function switchSection(sectionName) {
  // Update nav items
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.dataset.section === sectionName) {
      item.classList.add('active');
    }
  });

  // Update sections
  sections.forEach(section => {
    section.classList.remove('active');
    if (section.id === sectionName) {
      section.classList.add('active');
    }
  });

  currentSection = sectionName;

  // Render section-specific content
  switch(sectionName) {
    case 'stores':
      renderStores();
      break;
    case 'priorities':
      renderDetailedPriorities();
      break;
    case 'analytics':
      setTimeout(() => initializeCharts(), 100);
      break;
  }
}

// Search Functionality
function initializeSearch() {
  searchInput.addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase();
    filterStores(query);
  });

  // Add search button functionality
  document.querySelector('.search-btn').addEventListener('click', function() {
    const query = searchInput.value.toLowerCase();
    if (query) {
      // Switch to stores section and filter
      switchSection('stores');
      filterStores(query);
    }
  });
}

function filterStores(query) {
  if (currentSection !== 'stores') return;
  
  const stores = query ? 
    appData.stores.filter(store => 
      store.name.toLowerCase().includes(query) ||
      store.contact.toLowerCase().includes(query) ||
      store.region.toLowerCase().includes(query)
    ) : 
    getFilteredStores();
    
  renderStoresGrid(stores);
}

// Filter System
function initializeFilters() {
  filterTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const filter = this.dataset.filter;
      setActiveFilter(filter);
      currentFilter = filter;
      renderStores();
    });
  });
}

function setActiveFilter(filter) {
  filterTabs.forEach(tab => {
    tab.classList.remove('active');
    if (tab.dataset.filter === filter) {
      tab.classList.add('active');
    }
  });
}

function getFilteredStores() {
  if (currentFilter === 'all') {
    return appData.stores;
  }
  
  return appData.stores.filter(store => {
    switch(currentFilter) {
      case 'reordering':
        return store.status === 'Reordering';
      case 'at-risk':
        return store.status === 'At-Risk';
      case 'warm':
        return store.status === 'Warm';
      case 'cold':
        return store.status === 'Cold';
      default:
        return true;
    }
  });
}

// Modal System
function initializeModals() {
  modalClose.addEventListener('click', closeModal);
  storeModal.addEventListener('click', function(e) {
    if (e.target === storeModal) {
      closeModal();
    }
  });
}

function openStoreModal(storeId) {
  const store = appData.stores.find(s => s.id === storeId);
  if (!store) return;

  document.getElementById('modalStoreName').textContent = store.name;
  document.getElementById('modalBody').innerHTML = generateStoreModalContent(store);
  storeModal.classList.add('active');
}

function closeModal() {
  storeModal.classList.remove('active');
}

function generateStoreModalContent(store) {
  const daysSinceLastOrder = Math.floor((new Date() - new Date(store.lastOrder)) / (1000 * 60 * 60 * 24));
  
  return `
    <div class="store-modal-grid">
      <div class="modal-section">
        <h4>Contact Information</h4>
        <div class="contact-details">
          <p><strong>Contact:</strong> ${store.contact}</p>
          <p><strong>Email:</strong> <a href="mailto:${store.email}">${store.email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${store.phone}">${store.phone}</a></p>
          <p><strong>Region:</strong> ${store.region}</p>
          <p><strong>Tier:</strong> ${store.tier}</p>
        </div>
      </div>
      
      <div class="modal-section">
        <h4>Order Information</h4>
        <div class="order-details">
          <p><strong>Last Order:</strong> ${formatDate(store.lastOrder)} (${daysSinceLastOrder} days ago)</p>
          <p><strong>Next Reorder:</strong> ${formatDate(store.nextReorder)}</p>
          <p><strong>Last Order Value:</strong> $${store.orderValue.toLocaleString()}</p>
          <p><strong>Risk Score:</strong> <span class="risk-${store.riskScore.toLowerCase()}">${store.riskScore}</span></p>
        </div>
      </div>
      
      <div class="modal-section">
        <h4>AI Recommendations</h4>
        <div class="ai-recommendations">
          ${generateAIRecommendations(store)}
        </div>
      </div>
      
      <div class="modal-section">
        <h4>Quick Actions</h4>
        <div class="quick-actions">
          <button class="btn-primary" onclick="sendEmail('${store.email}')">Send Email</button>
          <button class="btn-secondary" onclick="callStore('${store.phone}')">Call Store</button>
          <button class="btn-secondary" onclick="scheduleFollowUp('${store.id}')">Schedule Follow-up</button>
        </div>
      </div>
    </div>
  `;
}

function generateAIRecommendations(store) {
  const recommendations = {
    'Reordering': 'Store is in active reordering cycle. Consider upselling complementary products.',
    'At-Risk': 'Store hasn\'t ordered recently. Offer incentives or check for issues.',
    'Warm': 'Store is engaged but not ordering. Share product education or special offers.',
    'Cold': 'Store needs re-engagement. Schedule a personal visit or demo.'
  };
  
  return `
    <div class="ai-recommendation">
      <div class="ai-recommendation-label">AI Insight</div>
      <div class="ai-recommendation-text">${recommendations[store.status]}</div>
    </div>
  `;
}

// Render Functions
function renderDashboard() {
  renderPriorities();
  renderActivity();
}

function renderPriorities() {
  if (!prioritiesList) return;
  
  prioritiesList.innerHTML = appData.todaysPriorities.map(priority => `
    <div class="priority-item">
      <div class="priority-info">
        <div class="priority-store">${priority.store}</div>
        <div class="priority-action">${priority.action}</div>
      </div>
      <div class="priority-level ${priority.priority.toLowerCase()}">${priority.priority}</div>
    </div>
  `).join('');
}

function renderActivity() {
  if (!activityFeed) return;
  
  activityFeed.innerHTML = appData.recentActivity.map(activity => `
    <div class="activity-item">
      <div class="activity-time">${activity.time}</div>
      <div class="activity-action">${activity.action}</div>
      <div class="activity-status">${activity.status}</div>
    </div>
  `).join('');
}

function renderStores() {
  if (!storesGrid) return;
  
  const stores = getFilteredStores();
  renderStoresGrid(stores);
}

function renderStoresGrid(stores) {
  storesGrid.innerHTML = stores.map(store => `
    <div class="store-card" onclick="openStoreModal(${store.id})">
      <div class="store-header">
        <div>
          <div class="store-name">${store.name}</div>
          <div class="store-contact">${store.contact}</div>
        </div>
        <div class="store-status ${store.status.toLowerCase().replace('-', '')}">${store.status}</div>
      </div>
      
      <div class="store-details">
        <div class="store-detail">
          <div class="store-detail-value">$${store.orderValue.toLocaleString()}</div>
          <div class="store-detail-label">Last Order</div>
        </div>
        <div class="store-detail">
          <div class="store-detail-value">${formatDate(store.nextReorder)}</div>
          <div class="store-detail-label">Next Reorder</div>
        </div>
        <div class="store-detail">
          <div class="store-detail-value">${store.tier}</div>
          <div class="store-detail-label">Tier</div>
        </div>
        <div class="store-detail">
          <div class="store-detail-value">${store.region}</div>
          <div class="store-detail-label">Region</div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderDetailedPriorities() {
  if (!prioritiesDetailed) return;
  
  prioritiesDetailed.innerHTML = appData.todaysPriorities.map(priority => `
    <div class="priority-card">
      <div class="priority-card-header">
        <div>
          <div class="priority-card-title">${priority.store}</div>
          <div class="priority-card-subtitle">${priority.action}</div>
        </div>
        <div class="priority-level ${priority.priority.toLowerCase()}">${priority.priority}</div>
      </div>
      
      <div class="ai-recommendation">
        <div class="ai-recommendation-label">AI Recommendation</div>
        <div class="ai-recommendation-text">${priority.aiRecommendation}</div>
      </div>
      
      <div class="priority-actions" style="margin-top: 20px;">
        <button class="btn-primary" onclick="takeAction('${priority.store}')">Take Action</button>
        <button class="btn-secondary" onclick="viewStoreDetails('${priority.store}')">View Store</button>
      </div>
    </div>
  `).join('');
}

// Chart Initialization
function initializeCharts() {
  initializePerformanceChart();
  initializeRevenueChart();
}

function initializePerformanceChart() {
  const ctx = document.getElementById('performanceChart');
  if (!ctx) return;

  if (performanceChart) {
    performanceChart.destroy();
  }

  performanceChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Orders',
        data: [12, 19, 15, 25, 22, 18, 24],
        borderColor: '#E1FC02',
        backgroundColor: 'rgba(225, 252, 2, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#E1FC02',
        pointBorderColor: '#0D1412',
        pointBorderWidth: 2,
        pointRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(225, 252, 2, 0.1)'
          },
          ticks: {
            color: '#B8BDB9'
          }
        },
        y: {
          grid: {
            color: 'rgba(225, 252, 2, 0.1)'
          },
          ticks: {
            color: '#B8BDB9'
          }
        }
      }
    }
  });
}

function initializeRevenueChart() {
  const ctx = document.getElementById('revenueChart');
  if (!ctx) return;

  if (revenueChart) {
    revenueChart.destroy();
  }

  revenueChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [{
        label: 'Revenue',
        data: [280000, 320000, 290000, 357500],
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#E1FC02'],
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(225, 252, 2, 0.1)'
          },
          ticks: {
            color: '#B8BDB9'
          }
        },
        y: {
          grid: {
            color: 'rgba(225, 252, 2, 0.1)'
          },
          ticks: {
            color: '#B8BDB9',
            callback: function(value) {
              return '$' + (value / 1000) + 'K';
            }
          }
        }
      }
    }
  });
}

// Utility Functions
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(amount);
}

// Action Functions
function sendEmail(email) {
  // Simulate sending email
  showNotification(`Email sent to ${email}`, 'success');
  closeModal();
}

function callStore(phone) {
  // Simulate calling store
  showNotification(`Calling ${phone}...`, 'info');
  closeModal();
}

function scheduleFollowUp(storeId) {
  // Simulate scheduling follow-up
  showNotification('Follow-up scheduled successfully', 'success');
  closeModal();
}

function takeAction(storeName) {
  showNotification(`Action taken for ${storeName}`, 'success');
}

function viewStoreDetails(storeName) {
  const store = appData.stores.find(s => s.name === storeName);
  if (store) {
    switchSection('stores');
    setTimeout(() => openStoreModal(store.id), 300);
  }
}

function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 32px;
    background: var(--walden-surface);
    border: 1px solid var(--walden-lime);
    color: var(--walden-text-primary);
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: var(--shadow-glow);
    z-index: 3000;
    animation: slideInRight 0.3s ease-out;
  `;
  notification.textContent = message;

  // Add to DOM
  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-in';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .store-modal-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
  
  .modal-section {
    background: var(--walden-surface-light);
    padding: 20px;
    border-radius: 12px;
    border: 1px solid var(--walden-border);
  }
  
  .modal-section h4 {
    color: var(--walden-lime);
    margin-bottom: 16px;
    font-size: 16px;
    font-weight: 600;
  }
  
  .contact-details p,
  .order-details p {
    margin-bottom: 8px;
    color: var(--walden-text-primary);
  }
  
  .contact-details a {
    color: var(--walden-lime);
    text-decoration: none;
  }
  
  .contact-details a:hover {
    text-decoration: underline;
  }
  
  .risk-low { color: var(--walden-lime); }
  .risk-medium { color: #ffa502; }
  .risk-high { color: #ff4757; }
  
  .quick-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  
  .priority-actions {
    display: flex;
    gap: 12px;
  }
`;
document.head.appendChild(notificationStyles);

// Chart controls
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('chart-btn')) {
    // Update chart button active state
    const buttons = e.target.parentNode.querySelectorAll('.chart-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Update chart data based on button clicked
    if (e.target.textContent === 'Revenue' && performanceChart) {
      performanceChart.data.datasets[0].data = [28000, 32000, 29000, 35750, 31200, 28800, 33400];
      performanceChart.data.datasets[0].label = 'Revenue ($)';
      performanceChart.update();
    } else if (e.target.textContent === 'Orders' && performanceChart) {
      performanceChart.data.datasets[0].data = [12, 19, 15, 25, 22, 18, 24];
      performanceChart.data.datasets[0].label = 'Orders';
      performanceChart.update();
    }
  }
});

// Hover effects for cards
document.addEventListener('mouseover', function(e) {
  if (e.target.closest('.metric-card') || e.target.closest('.store-card') || e.target.closest('.dashboard-card')) {
    const card = e.target.closest('.metric-card, .store-card, .dashboard-card');
    card.style.transform = 'translateY(-4px)';
  }
});

document.addEventListener('mouseout', function(e) {
  if (e.target.closest('.metric-card') || e.target.closest('.store-card') || e.target.closest('.dashboard-card')) {
    const card = e.target.closest('.metric-card, .store-card, .dashboard-card');
    card.style.transform = 'translateY(0)';
  }
});