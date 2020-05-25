import homeRoutes from './home/home.routes';
import articleRoutes from './articles/article.routes';
import userRoutes from './users/user.routes';
import categoryRoutes from './categories/category.routes';
import sponsorRoutes from './sponsors/sponsor.routes';
import carouselRoutes from './carousels/carousel.routes';
import dashboardRoutes from './dashboard/dashboard.routes';
import internalnewsRoutes from './internalnews/internalnews.routes';
import uploadRoutes from './upload/upload.routes';
import documentRoutes from './documents/document.routes';
import pageRoutes from './pages/page.routes';

export default app => {
  app.use('/', homeRoutes);
  app.use('/article', articleRoutes);
  app.use('/user', userRoutes);
  app.use('/category', categoryRoutes);
  app.use('/sponsor', sponsorRoutes);
  app.use('/carousel', carouselRoutes);
  app.use('/dashboard', dashboardRoutes);
  app.use('/internalnews', internalnewsRoutes);
  app.use('/upload', uploadRoutes);
  app.use('/document', documentRoutes);
  app.use('/page', pageRoutes);
};
