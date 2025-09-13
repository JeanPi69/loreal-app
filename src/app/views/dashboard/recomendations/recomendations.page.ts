import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RecommendationCategory } from 'src/app/models/Dashboard';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { RecommendationsByCategoryPage } from './recommendations-by-category/recommendations-by-category.page';

@Component({
  selector: 'app-recomendations',
  templateUrl: './recomendations.page.html',
  styleUrls: ['./recomendations.page.scss'],
  standalone: false,
})
export class RecomendationsPage implements OnInit {
  categories: RecommendationCategory[] = [];
  isLoading = true;

  categoryImages: { [key: string]: string } = {
    '1': 'assets/dashboard/recommendations/restaurantes.png',
    '2': 'assets/dashboard/recommendations/casa-cambio.png'
  };

  constructor(
    private dashboardService: DashboardService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.getRecommendations();
  }

  getRecommendations() {
    this.isLoading = true;
    this.dashboardService.getRecommendations().subscribe({
      next: (res) => {
        console.log('Recommendations:', res);
        this.categories = res.data.recommendations;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching recommendations:', error);
      },
    });
  }

  getCategoryImage(categoryId: number) {
    return this.categoryImages[categoryId];
  }

  async openRecommendationByCategory(category: RecommendationCategory) {
    console.log('Opening recommendations for category:', category);
    const modal = await this.modalCtrl.create({
      component: RecommendationsByCategoryPage,
      componentProps: {
        category: category,
      },
      initialBreakpoint: 1,
      breakpoints: [0, 1],
    });
    await modal.present();
  }

  modalDismiss() {
    this.modalCtrl.dismiss();
  }
}
