// script.js - Enhancements for project page

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add animation effects to project cards
  const projectCards = document.querySelectorAll('.project-card');
  
  // Animate cards on page load
  projectCards.forEach((card, index) => {
    // Add staggered animation delay
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100 * index);
  });
  
  // Add click event to project cards for more details
  projectCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Don't trigger if clicking on a link
      if (e.target.tagName === 'A' || e.target.closest('a')) {
        return;
      }
      
      // Toggle an active class for expanded details
      this.classList.toggle('expanded');
    });
  });
  
  // Add search functionality
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search projects...';
  searchInput.className = 'search-input';
  
  // Insert search before projects container
  const projectsContainer = document.querySelector('.projects-container');
  document.body.insertBefore(searchInput, projectsContainer);
  
  // Style the search input
  searchInput.style.display = 'block';
  searchInput.style.margin = '0 auto 2rem auto';
  searchInput.style.padding = '0.75rem 1rem';
  searchInput.style.width = '100%';
  searchInput.style.maxWidth = '500px';
  searchInput.style.borderRadius = '8px';
  searchInput.style.border = '1px solid #e2e2e2';
  searchInput.style.fontSize = '1rem';
  searchInput.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
  
  // Add search functionality
  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    
    projectCards.forEach(card => {
      const title = card.querySelector('h2').textContent.toLowerCase();
      const description = card.querySelector('p').textContent.toLowerCase();
      const tags = Array.from(card.querySelectorAll('.tech-tag'))
        .map(tag => tag.textContent.toLowerCase());
      
      // Check if card matches search term
      const matchesSearch = title.includes(searchTerm) || 
                           description.includes(searchTerm) ||
                           tags.some(tag => tag.includes(searchTerm));
      
      // Show/hide based on search
      card.style.display = matchesSearch ? 'block' : 'none';
    });
    
    // Show message if no results
    const hasVisibleCards = Array.from(projectCards).some(card => 
      card.style.display !== 'none'
    );
    
    let noResultsMsg = document.querySelector('.no-results');
    
    if (!hasVisibleCards && searchTerm) {
      if (!noResultsMsg) {
        noResultsMsg = document.createElement('p');
        noResultsMsg.className = 'no-results';
        noResultsMsg.textContent = 'No projects match your search.';
        noResultsMsg.style.textAlign = 'center';
        noResultsMsg.style.color = '#6e6e80';
        noResultsMsg.style.padding = '2rem';
        projectsContainer.appendChild(noResultsMsg);
      }
      noResultsMsg.style.display = 'block';
    } else if (noResultsMsg) {
      noResultsMsg.style.display = 'none';
    }
  });
  
  // Add dark mode toggle
  const darkModeToggle = document.createElement('button');
  darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  darkModeToggle.className = 'theme-toggle';
  darkModeToggle.title = 'Toggle Dark Mode';
  
  // Style the toggle button
  darkModeToggle.style.position = 'absolute';
  darkModeToggle.style.top = '1rem';
  darkModeToggle.style.right = '1rem';
  darkModeToggle.style.background = 'var(--light-purple)';
  darkModeToggle.style.color = 'var(--purple)';
  darkModeToggle.style.border = 'none';
  darkModeToggle.style.borderRadius = '50%';
  darkModeToggle.style.width = '40px';
  darkModeToggle.style.height = '40px';
  darkModeToggle.style.cursor = 'pointer';
  darkModeToggle.style.display = 'flex';
  darkModeToggle.style.alignItems = 'center';
  darkModeToggle.style.justifyContent = 'center';
  darkModeToggle.style.fontSize = '1.2rem';
  darkModeToggle.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  
  document.body.appendChild(darkModeToggle);
  
  // Add dark mode functionality
  darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
      this.innerHTML = '<i class="fas fa-sun"></i>';
      document.documentElement.style.setProperty('--light-gray', '#1a1a2e');
      document.documentElement.style.setProperty('--white', '#242439');
      document.documentElement.style.setProperty('--text', '#e2e2e2');
      document.documentElement.style.setProperty('--text-light', '#b8b8c0');
      document.documentElement.style.setProperty('--shadow', 'rgba(0, 0, 0, 0.2)');
    } else {
      this.innerHTML = '<i class="fas fa-moon"></i>';
      document.documentElement.style.setProperty('--light-gray', '#f7f7f7');
      document.documentElement.style.setProperty('--white', '#ffffff');
      document.documentElement.style.setProperty('--text', '#333340');
      document.documentElement.style.setProperty('--text-light', '#6e6e80');
      document.documentElement.style.setProperty('--shadow', 'rgba(0, 0, 0, 0.05)');
    }
  });
  
  // Add CSS for expanded card state
  const style = document.createElement('style');
  style.textContent = `
    .project-card {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.4s ease, transform 0.4s ease, height 0.3s ease;
    }
    
    .project-card.expanded {
      height: auto;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
    }
    
    .dark-mode .project-button {
      background-color: #3d3d5c;
      color: #d1c4ff;
    }
    
    .dark-mode .project-button.primary {
      background-color: var(--primary);
      color: var(--white);
    }
    
    .dark-mode .tech-tag {
      background-color: #3d3d5c;
      color: #d1c4ff;
    }
  `;
  document.head.appendChild(style);
});