const particles = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    const particlesLength = Math.floor(window.innerWidth / 10);
    for (let i = 0; i < particlesLength; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(55, 100, 144);
    particles.forEach((p, index) => {
        p.update();
        p.draw();
        p.checkParticles(particles.slice(index));
    });
}

class Particle {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = createVector(random(-2, 2), random(-2, 2));
        this.size = 10;
    }

    // Update movment by adding velocity
    update() {
        this.position.add(this.velocity);
        this.edges();
    }

    // Draw single particle
    draw() {
        noStroke();
        fill('rgba(255,255,255,0.5)');
        circle(this.position.x, this.position.y, this.size);
    }

    // Detect edges
    edges() {
        if(this.position.x < 0, this.position.x > width) {
            this.velocity.x *= -1;
        }

        if(this.position.y < 0, this.position.y > height) {
            this.velocity.y *= -1;
        }
    }

    // Connect particles
    checkParticles(particles) {
        particles.forEach(particle => {
            const d = dist(this.position.x, this.position.y, particle.position.x, particle.position.y);
            if(d < 120) {
                stroke('rgba(255,255,255,0.1)');
                line(this.position.x, this.position.y, particle.position.x, particle.position.y);
            }
        });
    }
}