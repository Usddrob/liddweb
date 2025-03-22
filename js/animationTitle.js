class TextAnimator {
    constructor(element) {
        this.element = element;
        this.text = element.getAttribute('data-text');
        this.init();
    }

    init() {
        this.element.innerHTML = '';
        [...this.text].forEach(char => {
            const wrapper = document.createElement('div');
            wrapper.className = 'letter-wrapper';
            
            const span = document.createElement('span');
            span.textContent = char;
            span.className = 'hidden-letter';
            wrapper.appendChild(span);
            this.element.appendChild(wrapper);
        });
        
        setTimeout(() => this.animate(), 100);
    }

    getRandomDelay() {
        return Math.random() * 150 + 200;
    }

    updateGradient(currentIndex, spans) {
        spans.forEach((span, i) => {
            if (i === currentIndex) {
                span.classList.remove("gradient-light-blue", "gradient-white");
                span.classList.add("gradient-blue");
            } else if (i === currentIndex - 1) {
                span.classList.remove("gradient-blue", "gradient-white");
                span.classList.add("gradient-light-blue");
            } else {
                span.classList.remove("gradient-blue", "gradient-light-blue");
                span.classList.add("gradient-white");
            }
        });
    }

    async animate() {
        const spans = this.element.querySelectorAll('span');
        this.element.style.opacity = '1';
        
        for (let i = 0; i < spans.length; i++) {
            const span = spans[i];
            
            await new Promise(resolve => {
                setTimeout(() => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0)';
                    this.updateGradient(i, spans);
                    resolve();
                }, this.getRandomDelay());
            });
        }

        // Замість 2 секунд очікування, робимо поступовий перехід
        spans.forEach((span, index) => {
            setTimeout(() => {
                span.classList.remove("gradient-blue", "gradient-light-blue");
                span.classList.add("gradient-white");
            }, index * 100);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.title_animation').forEach(title => new TextAnimator(title));
});