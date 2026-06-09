import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Quiz, Score } from '../../models/quiz.model';

@Component({
  selector: 'app-quiz-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
<div class="quiz-detail-page" *ngIf="quiz">
      <div class="page-bg"></div>
      <div class="container">
        
        <a routerLink="/quizzes" class="back-link">
          <span class="arrow">←</span> Retour au catalogue
        </a>

        <div class="detail-layout">
          <div class="detail-main">
            
            <header class="quiz-header">
              <div class="quiz-tags">
                <span class="tag-cat">{{ quiz.category }}</span>
                <span class="difficulty-indicator" [ngClass]="getDifficultyClass(quiz.difficulty)">
                  {{ quiz.difficulty }}
                </span>
              </div>
              <h1>{{ quiz.title }}</h1>
              <p class="quiz-desc">{{ quiz.description }}</p>
            </header>

            <div class="quiz-stats-row">
              <div class="stat-item">
                <div class="stat-icon-wrap">📋</div>
                <div class="stat-meta">
                  <strong>{{ quiz.questions.length }}</strong>
                  <span>Questions</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon-wrap">⏱️</div>
                <div class="stat-meta">
                  <strong>{{ quiz.duration }} min</strong>
                  <span>Durée totale</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon-wrap">🏆</div>
                <div class="stat-meta">
                  <strong>{{ topScore?.score || '—' }}</strong>
                  <span>Record actuel</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon-wrap">🎮</div>
                <div class="stat-meta">
                  <strong>{{ quizScores.length }}</strong>
                  <span>Tentatives</span>
                </div>
              </div>
            </div>

            <div class="types-section">
              <h3>Configuration du module</h3>
              <div class="types-grid">
                <div class="type-card" *ngIf="hasQcm">
                  <span class="type-icon">🎯</span>
                  <strong>QCM standard</strong>
                  <span>1 bonne réponse</span>
                </div>
                <div class="type-card" *ngIf="hasMultiple">
                  <span class="type-icon">🗂️</span>
                  <strong>Choix multiple</strong>
                  <span>Plusieurs réponses</span>
                </div>
                <div class="type-card" *ngIf="hasVF">
                  <span class="type-icon">⚖️</span>
                  <strong>Vrai / Faux</strong>
                  <span>Validation directe</span>
                </div>
              </div>
            </div>

            <div class="rules-section">
              <h3>Règles et Conditions</h3>
              <ul class="rules-list">
                <li>
                  <span class="bullet-point"></span>
                  <p>Le compte à rebours s'enclenche immédiatement dès l'initialisation du quiz.</p>
                </li>
                <li>
                  <span class="bullet-point"></span>
                  <p>Le chronomètre global ne peut subir aucune interruption ou mise en pause.</p>
                </li>
                <li>
                  <span class="bullet-point"></span>
                  <p>Un <strong>bonus de vélocité</strong> est octroyé si la réponse est validée en moins de la moitié du temps imparti.</p>
                </li>
                <li>
                  <span class="bullet-point"></span>
                  <p>Toute absence de réponse à l'expiration du délai individuel sera comptabilisée comme nulle.</p>
                </li>
              </ul>
            </div>
          </div>

          <div class="detail-sidebar">
            <div class="cta-card">
              <div class="cta-top">
                <div class="cta-quiz-icon">
                  <img *ngIf="quiz.image" [src]="quiz.image" [alt]="quiz.title" class="cta-quiz-img" />
                  <span *ngIf="!quiz.image">💡</span>
                </div>
                <h3>Prêt à relever le défi ?</h3>
                <p class="cta-subtitle">Progression enregistrée sur votre profil membre.</p>
              </div>

              <ng-container *ngIf="auth.isLoggedIn; else loginPrompt">
                <a [routerLink]="['/quiz', quiz.id, 'play']" class="btn btn-primary-action">
                 Démarrer le quiz
                </a>
              </ng-container>
              
              <ng-template #loginPrompt>
                <p class="login-hint">Authentification requise pour participer</p>
                <a routerLink="/login" class="btn btn-primary-action">
                  Se connecter
                </a>
                <a routerLink="/register" class="btn btn-secondary-action">
                  Créer un compte d'accès
                </a>
              </ng-template>
            </div>

            <div class="mini-leaderboard" *ngIf="quizScores.length > 0">
              <h4>Classement Général</h4>
              <div class="lb-list">
                <div class="lb-row" *ngFor="let s of quizScores.slice(0,5); let i = index">
                  <div class="lb-rank-badge" [ngClass]="'rank-' + (i + 1)">
                    {{ i + 1 }}
                  </div>
                  <span class="lb-name">{{ s.userName }}</span>
                  <strong class="lb-score">{{ s.score }} <small>pts</small></strong>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="not-found" *ngIf="!quiz">
      <div class="container">
        <h2>Module Introuvable</h2>
        <p>Le quiz recherché n'existe pas ou a été archivé par l'administration.</p>
        <a routerLink="/quizzes" class="btn btn-primary-action" style="display: inline-flex; width: auto;">
          Retourner au catalogue
        </a>
      </div>
    </div>
`,
  styles: [`
:host {
      --berry-velvet: #B23A5D;
      --peach-whip: #FBC6A0;
      --rose-cloud: #ffd8e0;
      --olive-mist: #9DAA77;
      --olive-dark: #7A8758;

      --text-main: #2B1D21;
      --text-muted: #625357;
      --bg-light: #f3ece2;
      --border-color: #D1C7BD;
      --surface-white: #FFFFFF;
      
      --radius-sm: 20px;   
      --radius-md: 18px;   
      --transition-premium: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .quiz-detail-page {
      padding-top: 40px;
      padding-bottom: 100px;
      min-height: 100vh;
      position: relative;
    }

    .page-bg {
      position: fixed;
      inset: 0;
      z-index: -1;
      background-color: var(--bg-light);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* BOUTON RETOUR ALIGNÉ */
    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 0 32px 0;
      color: var(--text-muted);
      font-size: 0.9rem;
      font-weight: 600;
      text-decoration: none;
      transition: var(--transition-premium);
    }
    .back-link .arrow { transition: transform 0.2s ease; }
    .back-link:hover { color: var(--berry-velvet); }
    .back-link:hover .arrow { transform: translateX(-4px); }

    /* LAYOUT BI-COLONNE ASYMÉTRIQUE */
    .detail-layout {
      display: grid;
      grid-template-columns: 1fr 360px;
      gap: 40px;
      align-items: start;
    }

    .detail-main {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    /* ZONE HEADER */
    .quiz-header {
      background: var(--surface-white);
      padding: 32px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
      border-top: 3px solid var(--olive-mist);
    }

    .quiz-tags {
      display: flex;
      gap: 10px;
      align-items: center;
      margin-bottom: 16px;
    }

    .tag-cat {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--berry-velvet);
      background: var(--rose-cloud);
      padding: 4px 14px;
      border-radius: var(--radius-sm);
    }

    .quiz-header h1 {
      font-size: 2.2rem;
      font-weight: 800;
      margin: 0 0 12px 0;
      color: var(--text-main);
      letter-spacing: -0.01em;
    }

    .quiz-desc {
      font-size: 1rem;
      color: var(--text-muted);
      line-height: 1.6;
      margin: 0;
    }

    /* BLOCS DE STATISTIQUES ARRONDIS (SQUIRCLES) */
    .quiz-stats-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }

    .stat-item {
      background: var(--surface-white);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 14px;
      transition: var(--transition-premium);
    }
    .stat-item:hover {
      transform: translateY(-4px);
      border-color: var(--olive-mist);
      box-shadow: 0 12px 24px rgba(157, 170, 119, 0.08);
    }

    .stat-icon-wrap {
      width: 44px;
      height: 44px;
      background: var(--bg-light);
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
    }

    .stat-meta { display: flex; flex-direction: column; }
    .stat-meta strong { font-size: 1.2rem; font-weight: 800; color: var(--text-main); }
    .stat-meta span { font-size: 0.75rem; color: var(--text-muted); font-weight: 500; }

    /* SECTIONS FILLES CONTENEURS */
    .types-section, .rules-section {
      background: var(--surface-white);
      border-radius: var(--radius-md);
      padding: 30px;
      border: 1px solid var(--border-color);
    }

    .types-section h3, .rules-section h3 {
      font-size: 1.05rem;
      font-weight: 800;
      margin: 0 0 20px 0;
      color: var(--text-main);
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    .types-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 14px;
    }

    .type-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 20px 14px;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      background: var(--surface-white);
      transition: var(--transition-premium);
    }
    .type-card:hover {
      border-color: var(--berry-velvet);
      background: rgba(178, 58, 93, 0.01);
    }

    .type-icon { font-size: 1.6rem; margin-bottom: 8px; }
    .type-card strong { font-size: 0.85rem; color: var(--text-main); margin-bottom: 4px; }
    .type-card span { font-size: 0.75rem; color: var(--text-muted); }

    /* LISTE DES RÈGLES NETTE */
    .rules-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .rules-list li {
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }
    .bullet-point {
      width: 6px;
      height: 6px;
      background: var(--olive-mist);
      border-radius: 50%;
      margin-top: 7px;
      flex-shrink: 0;
    }
    .rules-list p {
      font-size: 0.92rem;
      color: var(--text-muted);
      line-height: 1.5;
      margin: 0;
    }

    /* BADGES DE DIFFICULTÉ ULTRA PROPRES */
    .difficulty-indicator {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 3px 12px;
      border-radius: var(--radius-sm);
    }
    .difficulty-indicator.easy { background: var(--olive-mist); color: white; }
    .difficulty-indicator.medium { background: var(--peach-whip); color: #522d14; }
    .difficulty-indicator.hard { background: var(--berry-velvet); color: white; }

    /* ==========================================================================
       SIDEBAR DROITE & CTA EN PERSPECTIVE
       ========================================================================== */
    .detail-sidebar {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .cta-card {
      background: var(--surface-white);
      border-radius: var(--radius-md);
      padding: 32px;
      border: 1px solid var(--border-color);
      border-top: 3px solid var(--berry-velvet);
      box-shadow: 0 10px 30px rgba(43, 29, 33, 0.03);
      text-align: center;
      position: sticky;
      top: 40px;
    }

    .cta-quiz-icon {
      font-size: 3.5rem;
      margin-bottom: 14px;
    }

    .cta-top h3 {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--text-main);
      margin: 0 0 6px 0;
    }

    .cta-subtitle {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin: 0 0 24px 0;
    }

    /* BOUTONS D'ACTIONS PREMIUMS SANS COINS DROITS */
    .btn-primary-action {
      display: inline-flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      background: var(--berry-velvet);
      color: white;
      padding: 14px 24px;
      font-weight: 700;
      font-size: 0.95rem;
      border-radius: var(--radius-sm);
      text-decoration: none;
      box-shadow: 0 4px 15px rgba(178, 58, 93, 0.2);
      transition: var(--transition-premium);
      border: none;
      cursor: pointer;
    }
    .btn-primary-action:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(178, 58, 93, 0.35);
      background: #962F4E;
    }

    .btn-secondary-action {
      display: inline-flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      background: transparent;
      color: var(--text-main);
      padding: 12px 24px;
      font-weight: 600;
      font-size: 0.9rem;
      border-radius: var(--radius-sm);
      text-decoration: none;
      border: 1px solid var(--border-color);
      margin-top: 10px;
      transition: var(--transition-premium);
      cursor: pointer;
    }
    .btn-secondary-action:hover {
      background: var(--bg-light);
      border-color: var(--text-muted);
    }

    .login-hint {
      font-size: 0.85rem;
      color: var(--berry-velvet);
      font-weight: 600;
      margin-bottom: 14px;
    }

    /* LEADERBOARD LOOK PREMIUM */
    .mini-leaderboard {
      background: var(--surface-white);
      border-radius: var(--radius-md);
      padding: 24px;
      border: 1px solid var(--border-color);
    }
    .mini-leaderboard h4 {
      font-size: 0.95rem;
      font-weight: 800;
      color: var(--text-main);
      margin: 0 0 16px 0;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    .lb-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .lb-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      background: var(--bg-light);
      border-radius: var(--radius-sm);
      transition: var(--transition-premium);
    }
    .lb-row:hover {
      transform: scale(1.02);
      background: rgba(157, 170, 119, 0.1);
    }

    .lb-rank-badge {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--border-color);
      color: var(--text-muted);
      font-size: 0.75rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .lb-rank-badge.rank-1 { background: #FFD700; color: #524300; }
    .lb-rank-badge.rank-2 { background: #C0C0C0; color: #3A3A3A; }
    .lb-rank-badge.rank-3 { background: #CD7F32; color: #4A2E12; }

    .lb-name {
      flex: 1;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-main);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .lb-score {
      color: var(--berry-velvet);
      font-size: 0.95rem;
      font-weight: 800;
    }
    .lb-score small {
      font-size: 0.7rem;
      font-weight: 500;
      color: var(--text-muted);
    }

    /* NOT FOUND STATE */
    .not-found {
      padding: 100px 24px;
      text-align: center;
    }
    .not-found h2 { font-size: 1.8rem; font-weight: 800; margin-bottom: 8px; }
    .not-found p { color: var(--text-muted); margin-bottom: 24px; }

    /* RESPONSIVE RESPONSIVENESS */
    @media (max-width: 992px) {
      .detail-layout { grid-template-columns: 1fr; }
      .cta-card { position: static; }
      .quiz-stats-row { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 576px) {
      .quiz-stats-row { grid-template-columns: 1fr; }
      .quiz-header h1 { font-size: 1.8rem; }
    }
/* ── Image quiz dans sidebar CTA ── */
.cta-quiz-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 16px;
  overflow: hidden;
  background: var(--surface-alt, #f5f5f5);
  margin: 0 auto 16px;
}
.cta-quiz-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
`]
})
export class QuizDetailComponent implements OnInit {
  quiz?: Quiz;
  quizScores: Score[] = [];
  topScore?: Score;

  get hasQcm() { return this.quiz?.questions.some(q => q.type === 'qcm'); }
  get hasMultiple() { return this.quiz?.questions.some(q => q.type === 'multiple'); }
  get hasVF() { return this.quiz?.questions.some(q => q.type === 'vf'); }

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.quiz = this.dataService.getQuizById(id);
    if (this.quiz) {
      this.quizScores = this.dataService.getScoresByQuiz(id);
      this.topScore = this.quizScores[0];
    }
  }

  getDifficultyClass(d: string): string {
    return d === 'Facile' ? 'easy' : d === 'Moyen' ? 'medium' : 'hard';
  }
}