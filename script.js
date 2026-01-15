// Copy Email to Clipboard Functionality
document.addEventListener('DOMContentLoaded', function() {
    const copyEmailBtn = document.querySelector('.copy-email-btn');
    
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', function() {
            const email = this.getAttribute('data-email');
            
            // Copy to clipboard
            navigator.clipboard.writeText(email).then(function() {
                // Show feedback
                const originalText = copyEmailBtn.textContent;
                copyEmailBtn.textContent = '✓ Copied!';
                copyEmailBtn.classList.add('copied');
                
                // Reset after 2 seconds
                setTimeout(function() {
                    copyEmailBtn.textContent = originalText;
                    copyEmailBtn.classList.remove('copied');
                }, 2000);
            }).catch(function(err) {
                // Fallback for older browsers
                fallbackCopyToClipboard(email);
            });
        });
    }

    // Project Modal Functionality
    setupProjectModals();
});

// Fallback copy function for older browsers
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        const copyEmailBtn = document.querySelector('.copy-email-btn');
        const originalText = copyEmailBtn.textContent;
        copyEmailBtn.textContent = '✓ Copied!';
        copyEmailBtn.classList.add('copied');
        
        setTimeout(function() {
            copyEmailBtn.textContent = originalText;
            copyEmailBtn.classList.remove('copied');
        }, 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
    }
    
    document.body.removeChild(textArea);
}

// Project Details Data
const projectData = {
    'resume-builder': {
        title: 'Resume Builder',
        description: 'Create a clean, professional resume instantly with this ready-to-use web application. Perfect for students, job seekers, and professionals who want a modern resume without spending hours formatting.',
        videoUrl: './videos/resume-builder.mp4',
        features: [
            'Professional resume templates',
            'Easy-to-use interface',
            'Real-time preview',
            'Multiple export formats',
            'Customizable sections'
        ],
        technologies: ['JavaScript', 'HTML', 'CSS'],
        github: 'https://github.com/Dantescenario/resume-builder'
    },
    'job-tracker': {
        title: 'Job Application Tracker',
        description: 'A simple, offline-first Job Application Tracker to organize your job hunt in one clean dashboard. Track applications, interviews, and follow-ups all in one place.',
        videoUrl: './videos/job-tracker.mp4',
        features: [
            'Track job applications',
            'Manage interview schedules',
            'Offline-first functionality',
            'Application status updates',
            'Clean, intuitive dashboard'
        ],
        technologies: ['JavaScript', 'HTML', 'CSS', 'LocalStorage'],
        github: 'https://github.com/Dantescenario/job-application-tracker'
    },
    'finance-dashboard': {
        title: 'Finance Dashboard',
        description: 'A comprehensive finance dashboard for data visualization using interactive charts and analytics. Visualize your financial data in real-time with beautiful, interactive graphs.',
        videoUrl: './videos/finance-dashboard.mp4',
        features: [
            'Interactive charts and graphs',
            'Financial data visualization',
            'Real-time analytics',
            'Expense tracking',
            'Budget management'
        ],
        technologies: ['Python', 'Data Visualization', 'Charts'],
        github: 'https://github.com/Dantescenario/finance-dashboard'
    },
    'goal-tracker': {
        title: 'Goal Tracker Pro',
        description: 'A modern, feature-rich goal tracking application built with React, Vite, and Tailwind CSS. Track your daily, weekly, and monthly goals with real-time progress updates and beautiful visualizations.',
        videoUrl: './videos/goal-tracker.mp4',
        features: [
            'Daily, weekly, and monthly goals',
            'Progress tracking',
            'Real-time updates',
            'Beautiful UI with Tailwind CSS',
            'Goal statistics and analytics'
        ],
        technologies: ['React', 'Vite', 'Tailwind CSS', 'JavaScript'],
        github: 'https://github.com/Dantescenario/Goal-Tracker-Pro'
    }
};

// Setup Project Modals
function setupProjectModals() {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.modal-close');
    const viewProjectBtns = document.querySelectorAll('.view-project-btn');

    // Close modal when X is clicked
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        // Stop video if playing
        const videoContainer = document.getElementById('videoContainer');
        videoContainer.innerHTML = '';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            const videoContainer = document.getElementById('videoContainer');
            videoContainer.innerHTML = '';
        }
    });

    // Open modal when view project button is clicked
    viewProjectBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });
}

// Open Project Modal
function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const videoContainer = document.getElementById('videoContainer');
    const projectDetails = document.getElementById('projectDetails');

    // Set title
    modalTitle.textContent = project.title;

    // Set video with HTML5 video player for local files
    videoContainer.innerHTML = `
        <video width="100%" height="400" controls style="border-radius: 12px;">
            <source src="${project.videoUrl}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    `;

    // Set project details
    projectDetails.innerHTML = `
        <h3>About This Project</h3>
        <p>${project.description}</p>
        
        <h4>Key Features</h4>
        <ul>
            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        
        <h4>Technologies Used</h4>
        <div class="tech-tags">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        
        <div class="modal-buttons">
            <a href="${project.github}" target="_blank" class="modal-btn">View on GitHub</a>
        </div>
    `;

    // Show modal
    modal.style.display = 'block';
}
