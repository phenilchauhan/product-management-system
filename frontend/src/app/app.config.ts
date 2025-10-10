export const AppConfig = {
  apiBaseUrl: 'http://localhost:3000/api', // Backend URL

  endpoints: {
    users: '/users',
    categories: '/categories',
    products: '/products',
    bulkUpload: '/products/bulk-upload',
    report: '/products/report'
  },

  defaultPageSize: 10,
  maxUploadSizeMB: 5,
};
