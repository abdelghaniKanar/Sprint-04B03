import axios from "axios";

const API_URL = "http://localhost:3001";

// Get comments for an article
const getCommentsByArticleId = async (articleId) => {
  try {
    const response = await axios.get(
      `${API_URL}/comments?articleId=${articleId}`
    );
    return { success: true, comments: response.data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Add a new comment
const addComment = async (commentData) => {
  try {
    // Add creation timestamp
    commentData.createdAt = new Date().toISOString();

    const response = await axios.post(`${API_URL}/comments`, commentData);
    return { success: true, comment: response.data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Update a comment
const updateComment = async (commentId, commentData) => {
  try {
    const response = await axios.put(
      `${API_URL}/comments/${commentId}`,
      commentData
    );
    return { success: true, comment: response.data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Delete a comment
const deleteComment = async (commentId) => {
  try {
    await axios.delete(`${API_URL}/comments/${commentId}`);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const commentService = {
  getCommentsByArticleId,
  addComment,
  updateComment,
  deleteComment,
};

export default commentService;
