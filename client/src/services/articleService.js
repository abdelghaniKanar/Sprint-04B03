import axios from "axios";

const API_URL = "http://localhost:3001";

// Get all articles
const getAllArticles = async () => {
  try {
    const response = await axios.get(`${API_URL}/articles`);
    return { success: true, articles: response.data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Get articles by author
const getArticlesByAuthor = async (authorId) => {
  try {
    const response = await axios.get(
      `${API_URL}/articles?authorId=${authorId}`
    );
    return { success: true, articles: response.data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Get article by ID
const getArticleById = async (articleId) => {
  try {
    const response = await axios.get(`${API_URL}/articles/${articleId}`);
    return { success: true, article: response.data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Create new article
const createArticle = async (articleData) => {
  try {
    // Add creation timestamp
    articleData.createdAt = new Date().toISOString();

    const response = await axios.post(`${API_URL}/articles`, articleData);
    return { success: true, article: response.data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Update article
const updateArticle = async (articleId, articleData) => {
  try {
    const response = await axios.put(
      `${API_URL}/articles/${articleId}`,
      articleData
    );
    return { success: true, article: response.data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Delete article
const deleteArticle = async (articleId) => {
  try {
    await axios.delete(`${API_URL}/articles/${articleId}`);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Search articles by title
const searchArticles = async (searchQuery) => {
  try {
    // JSON Server supports full-text search with q parameter
    const response = await axios.get(`${API_URL}/articles?q=${searchQuery}`);
    return { success: true, articles: response.data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Filter articles by category
const filterArticlesByCategory = async (category) => {
  try {
    const response = await axios.get(
      `${API_URL}/articles?category=${category}`
    );
    return { success: true, articles: response.data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Get all categories
const getAllCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return { success: true, categories: response.data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const articleService = {
  getAllArticles,
  getArticlesByAuthor,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  searchArticles,
  filterArticlesByCategory,
  getAllCategories,
};

export default articleService;
