import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Quiz } from '../../models/quiz.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
<div class="home">
      
      <section class="hero">
        <div class="hero-bg">
          <div class="organic-blob blob-rose"></div>
          <div class="custom-grid"></div>
        </div>
        
        <div class="container hero-container">
          <div class="hero-content">
            <div class="hero-badge">
              <span class="pulse-indicator"></span> Focus Informatique
            </div>
            <h1>Cultivez & testez <br><span class="highlight-text">vos compétences</span></h1>
            <p class="hero-desc">
              Une approche fraîche et interactive pour maîtriser l'informatique. Relevez des défis chronométrés et suivez votre progression au quotidien.
            </p>
            <div class="hero-cta">
              <a routerLink="/quizzes" class="btn btn-berry-main">
                Découvrir les Quiz <span class="arrow-icon">→</span>
              </a>
              <a routerLink="/leaderboard" class="btn btn-trans-outline">
                Classement
              </a>
            </div>
            
            <div class="hero-counters">
              <div class="counter-item">
                <span class="counter-num">{{ stats.totalQuizzes }}</span>
                <span class="counter-label">Quiz créés</span>
              </div>
              <div class="counter-item">
                <span class="counter-num">{{ stats.totalUsers }}</span>
                <span class="counter-label">Apprenants</span>
              </div>
              <div class="counter-item">
                <span class="counter-num">{{ stats.totalPlays }}</span>
                <span class="counter-label">Sessions jouées</span>
              </div>
            </div>
          </div>

          <div class="hero-visual">
            <div class="showcase-card">
              <div class="card-pill">Methode active</div>
              <h3>Pourquoi s'exercer ici ?</h3>
              <p>Notre cerveau retient mieux quand il est stimulé par le jeu et le challenge.</p>
              
              <div class="benefit-stack">
                <div class="benefit-row">
                  <div class="benefit-icon">🌱</div>
                  <p><strong>Progression douce :</strong> Des parcours adaptés à votre rythme.</p>
                </div>
                <div class="benefit-row">
                  <div class="benefit-icon">🌸</div>
                  <p><strong>Analyse claire :</strong> Identifiez instantanément vos points forts.</p>
                </div>
              </div>
              <div class="showcase-footer">Un peu de pratique chaque jour !</div>
            </div>
          </div>
        </div>

        <div class="wave-separator fill-vanilla">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,64C1200,75,1320,85,1380,90.7L1440,96L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      <section class="categories-section">
        <div class="container">
          <div class="center-title">
            <h2>Explorez par <span class="text-berry">catégorie</span></h2>
            <p>Sélectionnez un domaine pour tester vos acquis fondamentaux</p>
          </div>
          
          <div class="organic-bento">
            <div class="bento-item" *ngFor="let cat of categories" [routerLink]="['/quizzes']">
              <div class="bento-icon-wrapper">
                <img [src]="cat.img" [alt]="cat.name" class="bento-cat-img" />
              </div>
              <div class="bento-text">
                <h3>{{ cat.name }}</h3>
                <span class="bento-tag">{{ cat.count }} quiz disponibles</span>
              </div>
              <div class="bento-hover-arrow">→</div>
            </div>
          </div>
        </div>

        <div class="wave-separator fill-olive">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      <section class="steps-section">
        <div class="container">
          <div class="center-title light-text">
            <h2>Comment ça <span class="text-berry">fonctionne</span> ?</h2>
            <p class="subtitle-steps">Votre parcours d'apprentissage en quatre étapes simples</p>
          </div>
          
          <div class="lifeline-container">
            <div class="lifeline-track"></div>
            
            <div class="steps-timeline">
              <div class="timeline-step" *ngFor="let step of steps; let i = index">
                <div class="step-node">
                  <div class="step-badge-circle">{{ i + 1 }}</div>
                </div>
                <div class="step-content-box">
                  <h3>{{ step.title }}</h3>
                  <p>{{ step.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="wave-separator fill-rose">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,64L120,74.7C240,85,480,107,720,106.7C960,107,1200,85,1320,74.7L1440,64L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      <section class="featured-section">
        <div class="container">
          <div class="split-header">
            <div>
              <h2>Les Quiz <span class="text-berry">populaires</span></h2>
              <p>Sélectionnés pour leur pertinence et plébiscités par la communauté</p>
            </div>
            <a routerLink="/quizzes" class="text-trigger">Parcourir tout le catalogue →</a>
          </div>

          <div class="cards-layout">
            <div class="eco-quiz-card" *ngFor="let quiz of featuredQuizzes" [routerLink]="['/quiz', quiz.id]">
              <div class="eq-top">
                <div class="eq-icon-circle">
                  <img *ngIf="quiz.image" [src]="quiz.image" [alt]="quiz.title" class="quiz-card-img" />
                  <span *ngIf="!quiz.image">🖥️</span>
                </div>
                <span class="eq-difficulty" [ngClass]="'diff-' + getDifficultyClass(quiz.difficulty)">
                  {{ quiz.difficulty }}
                </span>
              </div>
              <div class="eq-body">
                <h3>{{ quiz.title }}</h3>
                <p>{{ quiz.description }}</p>
              </div>
              <div class="eq-footer">
                <span class="eq-meta">⏱️ {{ quiz.duration }} min</span>
                <span class="eq-meta">❓ {{ quiz.questions.length }} Questions</span>
              </div>
            </div>
          </div>
        </div>

        <div class="wave-separator fill-vanilla-footer">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,32L48,42.7C96,53,192,75,288,85.3C384,96,480,96,576,90.7C672,85,768,75,864,64C960,53,1056,43,1152,42.7C1248,43,1344,53,1392,58.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      <section class="cta-section" *ngIf="!auth.isLoggedIn">
        <div class="container">
          <div class="cta-wrapper-box">
            <h2>Prêt à changer votre façon d'apprendre ?</h2>
            <p>Créez un profil gratuitement et mesurez-vous aux autres apprenants dès maintenant.</p>
            <a routerLink="/register" class="btn btn-cta-peach">Commencer l'aventure</a>
          </div>
        </div>
      </section>
    </div>
`,
  styles: [`
:host {
      --berry-velvet: #B23A5D;
      --peach-whip: #FBC6A0;
      --vanilla-glow: #f3ece2;
      --rose-cloud: #ffd8e0;
      --olive-mist: #9DAA77;
      --text-dark: #2B1D21;
      --radius-custom: 24px;
    }

    .home {
      background-color: var(--vanilla-glow);
      color: var(--text-dark);
      font-family: system-ui, -apple-system, sans-serif;
    }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

    .wave-separator {
      position: absolute; left: 0; bottom: 0; width: 100%; height: 60px; overflow: hidden; line-height: 0;
    }
    .wave-separator svg { position: relative; display: block; width: calc(100% + 1.3px); height: 60px; }
    
    .fill-vanilla svg { fill: var(--vanilla-glow); }
    .fill-rose svg { fill: var(--rose-cloud); }
    .fill-olive svg { fill: var(--olive-mist); }
    .fill-vanilla-footer svg { fill: var(--vanilla-glow); }

    /* ==========================================================================
       HERO (STYLE ÉPURÉ SANS CARTE)
       ========================================================================== */
    .hero { position: relative; padding: 100px 0 180px; background-color: var(--olive-mist); overflow: hidden; }
    .hero-bg { position: absolute; inset: 0; z-index: 0; }
    .blob-rose { position: absolute; width: 600px; height: 600px; background: var(--rose-cloud); border-radius: 50%; filter: blur(120px); top: -200px; right: -100px; opacity: 0.4; }
    
    .custom-grid {
      position: absolute; inset: 0; opacity: 0.08;
      background-image: radial-gradient(var(--text-dark) 2px, transparent 2px);
      background-size: 24px 24px;
    }

    .hero-container { position: relative; z-index: 1; display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 60px; align-items: center; }
    
    /* Nouveau conteneur de texte fluide */
    .hero-content { display: flex; flex-direction: column; align-items: flex-start; }
    
    .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.2); color: var(--text-dark); padding: 6px 16px; border-radius: 100px; font-size: 0.85rem; font-weight: 700; margin-bottom: 24px; border: 1.5px solid var(--text-dark); }
    .pulse-indicator { width: 8px; height: 8px; background: var(--berry-velvet); border-radius: 50%; }

    .hero-content h1 { font-size: 3.8rem; font-weight: 900; line-height: 1.15; margin-bottom: 20px; letter-spacing: -0.02em; color: var(--text-dark); }
    .highlight-text { color: var(--berry-velvet); text-shadow: 2px 2px 0px rgba(255,255,255,0.5); }
    .hero-desc { font-size: 1.2rem; color: #352528; line-height: 1.6; margin-bottom: 36px; max-width: 580px; font-weight: 500; }
    .hero-cta { display: flex; gap: 16px; margin-bottom: 48px; }

    .btn { padding: 15px 32px; border-radius: 14px; font-weight: 800; font-size: 1rem; text-decoration: none; transition: all 0.2s ease; display: inline-flex; align-items: center; justify-content: center; gap: 10px; }
    .btn-berry-main { background: var(--berry-velvet); color: white; border: 3px solid var(--text-dark); box-shadow: 4px 4px 0px var(--text-dark); }
    .btn-berry-main:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0px var(--text-dark); }
    
    .btn-trans-outline { background: white; color: var(--text-dark); border: 3px solid var(--text-dark); box-shadow: 4px 4px 0px var(--text-dark); }
    .btn-trans-outline:hover { background: var(--peach-whip); transform: translate(-2px, -2px); box-shadow: 6px 6px 0px var(--text-dark); }

    /* Ligne de statistiques épurée */
    .hero-counters { display: flex; gap: 48px; border-top: 2px solid rgba(43, 29, 33, 0.15); padding-top: 28px; width: 100%; }
    .counter-item .counter-num { font-size: 2.5rem; font-weight: 900; color: var(--text-dark); display: block; line-height: 1; margin-bottom: 6px; }
    .counter-item .counter-label { font-size: 0.8rem; color: #443639; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }

    /* Le reste de tes styles existants (Inchangés) */
    .showcase-card { background: white; border-radius: var(--radius-custom); padding: 40px; box-shadow: 8px 8px 0px var(--text-dark); border: 3px solid var(--text-dark); max-width: 390px; margin: 0 auto; color: var(--text-dark); }
    .card-pill { display: inline-block; background: var(--peach-whip); color: var(--text-dark); font-size: 0.75rem; font-weight: 800; padding: 4px 12px; border-radius: 100px; margin-bottom: 20px; border: 2px solid var(--text-dark); }
    .showcase-card h3 { margin: 0 0 12px; font-size: 1.4rem; font-weight: 900; }
    .showcase-card p { margin: 0 0 24px; color: #443639; font-size: 0.95rem; line-height: 1.6; }
    
    .benefit-stack { display: flex; flex-direction: column; gap: 14px; margin-bottom: 24px; }
    .benefit-row { display: flex; align-items: center; gap: 14px; background: var(--vanilla-glow); padding: 14px; border-radius: 12px; border: 2px solid var(--text-dark); }
    .benefit-icon { font-size: 1.3rem; }
    .benefit-row p { margin: 0; font-size: 0.9rem; font-weight: 700; }
    .showcase-footer { font-size: 0.85rem; text-align: center; font-weight: 800; color: var(--berry-velvet); }

    .center-title { text-align: center; margin-bottom: 54px; }
    .center-title h2, .split-header h2 { font-size: 2.5rem; font-weight: 900; margin: 0 0 12px; letter-spacing: -0.01em; }
    .text-berry { color: var(--berry-velvet); }
    .center-title p, .split-header p { color: #524346; font-size: 1.1rem; font-weight: 600; }

    .categories-section { position: relative; padding: 90px 0 150px; background: var(--vanilla-glow); }
    .organic-bento { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .bento-item { background: white; border: 3px solid var(--text-dark); border-radius: var(--radius-custom); padding: 28px; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 20px; position: relative; box-shadow: 4px 4px 0px var(--text-dark); }
    .bento-icon-wrapper { width: 56px; height: 56px; background: var(--rose-cloud); border: 2px solid var(--text-dark); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; box-shadow: 2px 2px 0px var(--text-dark); }
    .bento-text h3 { font-size: 1.15rem; font-weight: 900; margin: 0 0 4px; }
    .bento-tag { font-size: 0.85rem; font-weight: 700; color: var(--berry-velvet); }
    .bento-hover-arrow { position: absolute; right: 24px; font-weight: 900; font-size: 1.3rem; color: var(--text-dark); transition: transform 0.2s; }
    
    .bento-item:hover { transform: translate(-3px, -3px); box-shadow: 7px 7px 0px var(--text-dark); background: var(--vanilla-glow); }
    .bento-item:hover .bento-hover-arrow { transform: translateX(5px); }

    .steps-section { position: relative; padding: 100px 0 160px; background: var(--olive-mist); }
    .subtitle-steps { color: var(--text-dark) !important; opacity: 0.9; }
    
    .lifeline-container { position: relative; width: 100%; margin-top: 60px; padding: 20px 0; }
    .lifeline-track { position: absolute; top: 40px; left: 12%; right: 12%; height: 6px; background: var(--text-dark); border-radius: 10px; z-index: 1; }
    .steps-timeline { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; position: relative; z-index: 2; }
    .timeline-step { text-align: center; display: flex; flex-direction: column; align-items: center; }
    .step-node { display: flex; justify-content: center; margin-bottom: 24px; height: 46px; }
    
    .step-badge-circle { width: 46px; height: 46px; border-radius: 50%; background: var(--vanilla-glow); color: var(--berry-velvet); display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.2rem; border: 3px solid var(--text-dark); box-shadow: 4px 4px 0 var(--text-dark); transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    .step-content-box { background: white; border: 3px solid var(--text-dark); border-radius: 16px; padding: 20px; box-shadow: 4px 4px 0 var(--text-dark); transition: all 0.25s ease; color: var(--text-dark); min-height: 110px; }
    .step-content-box h3 { font-size: 1.1rem; font-weight: 900; margin: 0 0 8px; color: var(--berry-velvet); }
    .step-content-box p { font-size: 0.88rem; color: #443639; line-height: 1.4; margin: 0; font-weight: 500; }

    .timeline-step:hover .step-badge-circle { background: var(--berry-velvet); color: white; transform: scale(1.15) rotate(10deg); }
    .timeline-step:hover .step-content-box { transform: translateY(-5px); box-shadow: 7px 7px 0 var(--text-dark); background: var(--vanilla-glow); }

    .featured-section { position: relative; padding: 100px 0 160px; background: var(--vanilla-glow); }
    .split-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 48px; }
    .text-trigger { color: var(--text-dark); font-weight: 800; text-decoration: none; font-size: 1rem; border-bottom: 3px solid var(--berry-velvet); padding-bottom: 4px; transition: color 0.2s; }
    .text-trigger:hover { color: var(--berry-velvet); }

    .cards-layout { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
    .eco-quiz-card { background: white; border-radius: var(--radius-custom); border: 3px solid var(--text-dark); cursor: pointer; transition: all 0.2s ease; display: flex; flex-direction: column; overflow: hidden; box-shadow: 5px 5px 0px var(--text-dark); }
    .eq-top { padding: 24px; display: flex; justify-content: space-between; align-items: center; }
    .eq-icon-circle { width: 50px; height: 50px; background: var(--vanilla-glow); border: 2px solid var(--text-dark); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
    
    .eq-difficulty { padding: 5px 14px; border-radius: 100px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; border: 2px solid var(--text-dark); }
    .diff-easy { background: var(--olive-mist); color: var(--text-dark); }
    .diff-medium { background: var(--peach-whip); color: var(--text-dark); }
    .diff-hard { background: var(--berry-velvet); color: white; }

    .eq-body { padding: 0 24px 28px; flex: 1; }
    .eq-body h3 { font-size: 1.25rem; font-weight: 900; margin: 0 0 10px; color: var(--text-dark); }
    .eq-body p { font-size: 0.95rem; color: #443639; line-height: 1.5; margin: 0; }
    
    .eq-footer { padding: 18px 24px; background: var(--vanilla-glow); border-top: 3px solid var(--text-dark); display: flex; gap: 16px; }
    .bg-meta { font-size: 0.85rem; color: var(--text-dark); font-weight: 800; }
    .eco-quiz-card:hover { transform: translate(-3px, -3px); box-shadow: 8px 8px 0px var(--text-dark); }

    .cta-section { padding: 100px 0 80px; background: var(--vanilla-glow); }
    .cta-wrapper-box { background: var(--berry-velvet); border: 3px solid var(--text-dark); border-radius: var(--radius-custom); padding: 60px 40px; text-align: center; color: white; box-shadow: 8px 8px 0px var(--text-dark); }
    .cta-wrapper-box h2 { font-size: 2.5rem; font-weight: 900; color: white; margin: 0 0 12px; }
    .cta-wrapper-box p { color: rgba(255,255,255,0.9); font-size: 1.15rem; margin: 0 0 32px; font-weight: 500; }
    
    .btn-cta-peach { background: var(--peach-whip); color: var(--text-dark); border: 3px solid var(--text-dark); box-shadow: 4px 4px 0 var(--text-dark); }
    .btn-cta-peach:hover { background: white; transform: translate(-2px, -2px); box-shadow: 6px 6px 0px var(--text-dark); }

    @media (max-width: 1024px) {
      .hero-container { grid-template-columns: 1fr; gap: 40px; }
      .hero-content h1 { font-size: 3rem; }
      .hero-visual { display: none; }
      .organic-bento, .cards-layout { grid-template-columns: repeat(2, 1fr); }
      .lifeline-track { display: none; }
      .steps-timeline { grid-template-columns: repeat(2, 1fr); gap: 32px; }
    }
    @media (max-width: 640px) {
      .organic-bento, .cards-layout, .steps-timeline { grid-template-columns: 1fr; }
      .split-header { flex-direction: column; align-items: flex-start; gap: 14px; }
      .hero-counters { gap: 24px; flex-wrap: wrap; }
    }
/* ── Images catégories bento ── */
.bento-cat-img {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

/* ── Images quiz featured cards ── */
.eq-icon-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 12px;
  overflow: hidden;
  background: var(--surface-alt, #f5f5f5);
}
.quiz-card-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
`]
})
export class HomeComponent implements OnInit {
  featuredQuizzes: Quiz[] = [];
  stats = { totalQuizzes: 0, totalUsers: 0, totalPlays: 0 };

  categories = [
    { icon: '🌐', img: 'assets/images/htmlcss.png', name: 'Web', count: 0 },
    { icon: '💻', img: 'assets/images/js.png', name: 'Programmation', count: 0 },
    { icon: '🧮', img: 'assets/images/alg.png', name: 'Algorithmique', count: 0 },
    { icon: '🗄️', img: 'assets/images/sql.png', name: 'Base de données', count: 0 },
    { icon: '📡', img: 'assets/images/reseau.png', name: 'Réseaux', count: 0 },
    { icon: '🔒', img: 'assets/images/securite.png', name: 'Sécurité', count: 0 }
  ];

  steps = [
    { title: 'Créez un compte', desc: 'Inscrivez-vous en quelques secondes pour accéder à tous les quiz.' },
    { title: 'Choisissez un quiz', desc: 'Parcourez les catégories et niveaux selon vos besoins.' },
    { title: 'Jouez chrono', desc: 'Répondez aux questions avec un timer. Chaque seconde compte !' },
    { title: 'Compétitionnez', desc: 'Comparez votre score avec les autres sur le leaderboard global.' }
  ];

  constructor(private dataService: DataService, public auth: AuthService) {}

  ngOnInit() {
    const quizzes = this.dataService.getPublishedQuizzes();
    this.featuredQuizzes = quizzes.slice(0, 3);
    this.stats = this.dataService.getStats();

    this.categories.forEach(cat => {
      cat.count = quizzes.filter(q => q.category === cat.name).length;
    });
  }

  getDifficultyClass(d: string): string {
    return d === 'Facile' ? 'easy' : d === 'Moyen' ? 'medium' : 'hard';
  }
}