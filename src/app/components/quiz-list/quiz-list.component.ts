import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Quiz } from '../../models/quiz.model';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
<div class="quiz-list-page">
      <div class="page-header">
        <div class="container">
          <div class="header-content">
            <div class="header-badge">CATALOGUE OFFICIEL</div>
            <h1>Tous les <em>Quiz</em></h1>
            <p>{{ filtered.length }} quiz disponibles · Testez vos connaissances en informatique</p>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="catalog-layout">

          <!-- SIDEBAR CATÉGORIES -->
          <aside class="filters-sidebar">
            <div class="sidebar-section">
              <label class="sidebar-label">Catégories</label>
              <div class="filter-stack">
                <button
                  class="pill-btn"
                  [class.active]="activeCategory === ''"
                  (click)="setCategory('')"
                >Toutes les catégories</button>
                <button
                  *ngFor="let cat of categories"
                  class="pill-btn"
                  [class.active]="activeCategory === cat"
                  (click)="setCategory(cat)"
                >{{ cat }}</button>
              </div>
            </div>
            <button
              class="clear-filters-link"
              (click)="resetFilters()"
              *ngIf="searchTerm || activeCategory || activeDifficulty"
            >Réinitialiser les filtres</button>
          </aside>

          <!-- MAIN CONTENT -->
          <main class="catalog-main">

            <!-- TOP BAR : recherche + difficulté -->
            <div class="top-control-bar">
              <div class="search-box">
                <span class="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Rechercher un quiz..."
                  [(ngModel)]="searchTerm"
                  (ngModelChange)="applyFilters()"
                  class="search-input"
                />
              </div>
              <div class="level-segment-control">
                <button [class.active]="activeDifficulty === ''" (click)="setDifficulty('')">Tous</button>
                <button class="lvl-easy" [class.active]="activeDifficulty === 'Facile'" (click)="setDifficulty('Facile')">Facile</button>
                <button class="lvl-medium" [class.active]="activeDifficulty === 'Moyen'" (click)="setDifficulty('Moyen')">Moyen</button>
                <button class="lvl-hard" [class.active]="activeDifficulty === 'Difficile'" (click)="setDifficulty('Difficile')">Difficile</button>
              </div>
            </div>

            <!-- GRID -->
            <div class="quizzes-grid" *ngIf="filtered.length > 0">
              <div class="premium-quiz-card" *ngFor="let quiz of filtered" [routerLink]="['/quiz', quiz.id]">

                <div class="card-flash-bg"></div>

                <div class="quiz-card-header">
                  <div class="quiz-image-wrap">
                    <img *ngIf="quiz.image" [src]="quiz.image" [alt]="quiz.title" class="quiz-thumb-img" />
                    <div *ngIf="!quiz.image" class="quiz-thumb-placeholder">📚</div>
                  </div>
                  <div class="quiz-meta">
                    <span class="category-tag" [ngClass]="getCategoryClass(quiz.category)">
                      <span class="quiz-category-dot"></span>
                      {{ quiz.category }}
                    </span>
                    <span class="difficulty-indicator" [ngClass]="getDifficultyClass(quiz.difficulty)">
                      {{ quiz.difficulty }}
                    </span>
                  </div>
                </div>

                <div class="card-body">
                  <h3 class="card-title">
                    {{ quiz.title }}
                    <span class="arrow-draw">→</span>
                  </h3>
                  <p class="card-description">{{ quiz.description }}</p>
                </div>

                <div class="card-footer">
                  <div class="meta-item"><span>❓</span><span><strong>{{ quiz.questions.length }}</strong> questions</span></div>
                  <div class="meta-item"><span>⏱️</span><span><strong>{{ quiz.duration }}</strong> min</span></div>
                </div>
              </div>
            </div>

            <div class="empty-results-card" *ngIf="filtered.length === 0">
              <h4>Aucun quiz trouvé</h4>
              <p>Essayez avec d'autres filtres ou termes de recherche.</p>
              <button class="action-btn" (click)="resetFilters()">Réinitialiser les filtres</button>
            </div>

          </main>
        </div>
      </div>
    </div>
`,
  styles: [`
:host {
      --berry-velvet: #B23A5D;
      --peach-whip: #FBC6A0;
      --olive-mist: #9DAA77;
      --olive-dark: #7A8758;
      --text-main: #2B1D21;
      --text-muted: #625357;
      --bg-light: #f3ece2;
      --border-color: #D1C7BD;
      --surface-white: #FFFFFF;
      --radius-sm: 20px;
      --radius-md: 18px;
      --kinetic-transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* ===== PAGE LAYOUT ===== */
    .quiz-list-page {
      background-color: var(--bg-light);
      color: var(--text-main);
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      min-height: 100vh;
      padding-bottom: 80px;
    }

    /* ===== HEADER ===== */
    .page-header {
      padding: 60px 0 40px;
      margin-bottom: 30px;
      border-bottom: 1px solid var(--border-color);
    }

    .container {
      max-width: 1340px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .header-badge {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--berry-velvet);
      margin-bottom: 12px;
      letter-spacing: 0.1em;
    }

    .header-content h1 {
      font-size: 2.4rem;
      font-weight: 800;
      margin: 0 0 12px;
    }

    .header-content h1 em {
      font-style: italic;
      color: var(--berry-velvet);
    }

    .header-content p {
      font-size: 1rem;
      color: var(--text-muted);
      max-width: 600px;
      margin-top: 8px;
    }

    /* ===== CATALOG LAYOUT : SIDEBAR + MAIN ===== */
    .catalog-layout {
      display: grid;
      grid-template-columns: 260px 1fr;
      gap: 32px;
      align-items: start;
    }

    /* ===== SIDEBAR CATÉGORIES ===== */
    .filters-sidebar {
      position: sticky;
      top: 24px;
      background: var(--surface-white);
      border: 1px solid var(--border-color);
      border-top: 3px solid var(--olive-mist);
      border-radius: var(--radius-md);
      padding: 24px;
    }

    .sidebar-label {
      display: block;
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-muted);
      margin-bottom: 14px;
    }

    .filter-stack {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .pill-btn {
      width: 100%;
      text-align: left;
      padding: 10px 14px;
      background: transparent;
      border: none;
      border-radius: 10px;
      font-family: inherit;
      font-size: 0.9rem;
      color: var(--text-main);
      cursor: pointer;
      transition: var(--kinetic-transition);
    }

    .pill-btn:hover {
      background: rgba(157, 170, 119, 0.12);
      color: var(--olive-dark);
    }

    .pill-btn.active {
      background: var(--berry-velvet);
      color: white;
      font-weight: 600;
    }

    .clear-filters-link {
      background: none;
      border: none;
      color: var(--berry-velvet);
      font-family: inherit;
      font-size: 0.82rem;
      text-decoration: underline;
      cursor: pointer;
      margin-top: 16px;
      padding: 0;
    }

    /* ===== MAIN CONTENT ===== */
    .catalog-main { min-width: 0; }

    /* ===== TOP BAR : recherche + difficulté ===== */
    .top-control-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
      background: var(--surface-white);
      padding: 14px 20px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
      border-top: 3px solid var(--olive-mist);
    }

    .search-box {
      position: relative;
      flex: 1;
      max-width: 380px;
    }

    .search-icon {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0.6;
    }

    .search-input {
      width: 100%;
      padding: 10px 12px 10px 38px;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-sm);
      background: var(--bg-light);
      color: var(--text-main);
      font-family: inherit;
      font-size: 0.9rem;
      outline: none;
      transition: var(--kinetic-transition);
    }

    .search-input:focus {
      border-color: var(--olive-mist);
      background: var(--surface-white);
      box-shadow: 0 0 0 3px rgba(157, 170, 119, 0.15);
    }

    /* ===== DIFFICULTY SEGMENT CONTROL ===== */
    .level-segment-control {
      display: flex;
      background: var(--bg-light);
      padding: 4px;
      border-radius: var(--radius-sm);
      border: 1px solid rgba(209, 199, 189, 0.6);
    }

    .level-segment-control button {
      background: transparent;
      border: none;
      padding: 8px 18px;
      font-size: 0.82rem;
      font-weight: 700;
      font-family: inherit;
      color: var(--text-muted);
      cursor: pointer;
      border-radius: var(--radius-sm);
      transition: var(--kinetic-transition);
      white-space: nowrap;
    }

    .level-segment-control button:hover:not(.active) {
      background: rgba(255, 255, 255, 0.7);
    }

    .level-segment-control button.active { color: white; background: var(--text-muted); }
    .level-segment-control button.lvl-easy.active { background: var(--olive-mist); }
    .level-segment-control button.lvl-medium.active { background: var(--peach-whip); color: #522d14; }
    .level-segment-control button.lvl-hard.active { background: var(--berry-velvet); }

    /* ===== QUIZ GRID ===== */
    .quizzes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }

    /* ===== QUIZ CARD ===== */
    .premium-quiz-card {
      background: var(--surface-white);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      z-index: 1;
      transition: var(--kinetic-transition);
    }

    .card-flash-bg {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background: linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(244,247,236,1) 100%);
      z-index: -1;
      transform: scale(0.95);
      opacity: 0;
      transition: var(--kinetic-transition);
    }

    .premium-quiz-card:hover {
      border-color: var(--olive-mist);
      box-shadow: 0 0 0 1px var(--olive-mist),
                  0 20px 40px rgba(122, 135, 88, 0.08);
    }

    .premium-quiz-card:hover .card-flash-bg {
      transform: scale(1);
      opacity: 1;
    }

    /* ===== CARD HEADER ===== */
    .quiz-card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .quiz-meta {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 6px;
    }

    .category-tag {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--berry-velvet);
      letter-spacing: 0.06em;
    }

    .quiz-category-dot {
      width: 9px; height: 9px;
      border-radius: 50%;
      display: inline-block;
      background: var(--berry-velvet);
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.22);
    }

    .category-web .quiz-category-dot { background: #4f86f7; }
    .category-programmation .quiz-category-dot { background: #2a9d8f; }
    .category-algorithmique .quiz-category-dot { background: #f4a261; }
    .category-base-de-donnees .quiz-category-dot { background: #6a67ce; }
    .category-reseaux .quiz-category-dot { background: #e76f51; }
    .category-securite .quiz-category-dot { background: #264653; }

    .difficulty-indicator {
      font-size: 0.72rem;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: var(--radius-sm);
    }

    .difficulty-indicator.easy { background: var(--olive-mist); color: white; }
    .difficulty-indicator.medium { background: var(--peach-whip); color: #522d14; }
    .difficulty-indicator.hard { background: var(--berry-velvet); color: white; }

    /* ===== CARD BODY ===== */
    .card-body { flex: 1; }

    .card-title {
      font-size: 1rem;
      font-weight: 700;
      margin: 0 0 8px 0;
      color: var(--text-main);
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 1.3;
      transition: var(--kinetic-transition);
    }

    .arrow-draw {
      flex-shrink: 0;
      transform: translateX(-10px);
      opacity: 0;
      color: var(--olive-dark);
      transition: var(--kinetic-transition);
    }

    .premium-quiz-card:hover .card-title { color: var(--olive-dark); }
    .premium-quiz-card:hover .arrow-draw { transform: translateX(0); opacity: 1; }

    .card-description {
      font-size: 0.85rem;
      color: var(--text-muted);
      line-height: 1.5;
      margin: 0;
    }

    /* ===== CARD FOOTER ===== */
    .card-footer {
      display: flex;
      gap: 16px;
      padding-top: 14px;
      border-top: 1px solid rgba(209, 199, 189, 0.4);
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text-muted);
    }

    .meta-item strong { color: var(--text-main); }

    /* ===== EMPTY STATE ===== */
    .empty-results-card {
      background: var(--surface-white);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 60px 40px;
      text-align: center;
      max-width: 500px;
      margin: 40px auto 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }

    .empty-results-card h4 { margin: 0; font-size: 1.2rem; color: var(--text-main); }
    .empty-results-card p { color: var(--text-muted); margin: 0; }

    .action-btn {
      background: var(--berry-velvet);
      color: white;
      border: none;
      padding: 10px 24px;
      font-weight: 600;
      font-family: inherit;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: var(--kinetic-transition);
    }

    .action-btn:hover { opacity: 0.88; }

    /* ===== RESPONSIVE ===== */
    @media (max-width: 992px) {
      .catalog-layout { grid-template-columns: 1fr; }
      .filters-sidebar { position: static; }
      .top-control-bar { flex-direction: column; align-items: stretch; }
    }
    @media (max-width: 640px) {
      .header-content h1 { font-size: 1.8rem; }
      .quizzes-grid { grid-template-columns: 1fr; }
    }
/* ── Images dans les cartes quiz-list ── */
.quiz-image-wrap {
  width: 56px;
  height: 56px;
  border-radius: 10px;
  overflow: hidden;
  background: var(--surface-alt, #f5f5f5);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.quiz-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.quiz-thumb-placeholder {
  font-size: 1.6rem;
}
.quiz-card-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
`]
})
export class QuizListComponent implements OnInit {
  all: Quiz[] = [];
  filtered: Quiz[] = [];
  searchTerm = '';
  activeCategory = '';
  activeDifficulty = '';
  categories: string[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.all = this.dataService.getPublishedQuizzes();
    this.categories = this.buildCategories(this.all);
    this.filtered = [...this.all];
  }

  buildCategories(quizzes: Quiz[]): string[] {
    return [...new Set(quizzes.map(q => q.category).filter(cat => cat && cat.trim()))];
  }

  setCategory(cat: string) {
    this.activeCategory = cat;
    this.applyFilters();
  }

  setDifficulty(d: string) {
    this.activeDifficulty = d;
    this.applyFilters();
  }

  applyFilters() {
    this.filtered = this.all.filter(q => {
      const matchSearch = !this.searchTerm ||
        q.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        q.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchCat = !this.activeCategory || q.category === this.activeCategory;
      const matchDiff = !this.activeDifficulty || q.difficulty === this.activeDifficulty;
      return matchSearch && matchCat && matchDiff;
    });
  }

  resetFilters() {
    this.searchTerm = '';
    this.activeCategory = '';
    this.activeDifficulty = '';
    this.filtered = [...this.all];
  }

  getCategoryClass(category: string): string {
    const map: Record<string, string> = {
      Web: 'category-web',
      Programmation: 'category-programmation',
      Algorithmique: 'category-algorithmique',
      'Base de données': 'category-base-de-donnees',
      Réseaux: 'category-reseaux',
      Sécurité: 'category-securite'
    };
    return map[category] || 'category-default';
  }

  getDifficultyClass(d: string): string {
    return d === 'Facile' ? 'easy' : d === 'Moyen' ? 'medium' : 'hard';
  }
}