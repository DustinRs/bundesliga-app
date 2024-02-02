import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { TableComponent } from './table/table.component';
import { MatchInfosComponent } from './match-infos/match-infos.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ClubsComponent } from './clubs/clubs.component';
import { ClubInfosComponent } from './club-infos/club-infos.component';
import { ClubMatchInfosComponent } from './club-match-infos/club-match-infos.component';
import { NewsComponent } from './news/news.component';

export const routes: Routes = [
  { path: '', component: NewsComponent },
  { path: 'news', component: NewsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'table', component: TableComponent },
  { path: 'dashboard/:id', component: MatchInfosComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'clubs', component: ClubsComponent },
  { path: 'clubs/:id', component: ClubInfosComponent },
  { path: 'clubs/:clubid/:id', component: ClubMatchInfosComponent },
];
