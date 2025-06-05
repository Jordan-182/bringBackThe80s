const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;
const apiRoutes = {
  ARTICLES: `${apiUrl}/api/articles`,
};

const appRoutes = {
  ARTICLES: `${appUrl}/articles`,
  ARTICLES_ID: (id: number) => `${appUrl}/articles/${id}`,
  ARTICLES_ADD: `${appUrl}/articles/ajouter-article`,
  ARTICLE_EDIT: (id: number) => `${appUrl}/articles/${id}/editer-article`,
};

export { apiRoutes, appRoutes };
