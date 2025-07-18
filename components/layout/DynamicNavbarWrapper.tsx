import { getCategoriesWithProductCount } from '@/lib/sanity';
import DynamicNavbar from './DynamicNavbar';

const DynamicNavbarWrapper = async () => {
  try {
    const categories = await getCategoriesWithProductCount();
    return <DynamicNavbar categories={categories} />;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return null;
  }
};

export default DynamicNavbarWrapper; 