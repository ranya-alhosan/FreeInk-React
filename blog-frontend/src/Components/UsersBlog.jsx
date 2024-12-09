import React, { useState, useEffect } from 'react';
import apiClient from "../Api/apiClient";
import { Modal, Button, Card, Spinner, Container } from 'react-bootstrap';
import "/public/assets/css/UserPosts.css";

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get('/posts');
        const userId = JSON.parse(localStorage.getItem('userId'));
        const userPosts = response.data.data.filter((post) => post.user_id === userId);
        setPosts(userPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await apiClient.delete(`/deletepost/${id}`);
        setPosts(posts.filter((post) => post.id !== id));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleSave = async (id) => {
    try {
      const formData = new FormData();
      formData.append('title', editPost.title || '');
      formData.append('content', editPost.content || '');
      formData.append('category_id', editPost.category_id || '');

      const response = await apiClient.put(`/updatepost/${id}`, formData);
      const updatedPost = response.data.data;

      setPosts(posts.map((post) => (post.id === id ? updatedPost : post)));
      setEditPost(null);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating post:', error.response?.data || error);
    }
  };

  const openEditModal = (post) => {
    setEditPost(post);
    setShowModal(true);
  };

  const closeEditModal = () => {
    setEditPost(null);
    setShowModal(false);
  };

  const openImageModal = (image) => {
    setCurrentImage(image);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setCurrentImage(null);
    setShowImageModal(false);
  };

  return (
    <Container>
      {/* <h1 className="tape-header text-center my-4">Your Posts</h1> */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : posts.length > 0 ? (
        <div className="post-list">
          {posts.map((post) => (
            <Card key={post.id} className="mb-4">
              {/* Only render the image if the post has an image */}
              {post.img && (
                <Card.Img
                  variant="top"
                  src={post.img}
                  alt="Post Image"
                  onClick={() => openImageModal(post.img)} // Open image modal only if image exists
                />
              )}

              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content}</Card.Text>
                <Card.Text>
                  <small className="text-muted">Category: {post.category_id}</small>
                </Card.Text>
                <div className="button-container">
                  <Button variant="primary" onClick={() => openEditModal(post)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(post.id)}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center">You have no posts.</p>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <Modal show={showImageModal} onHide={closeImageModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Post Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={currentImage} alt="Post" style={{ width: '100%' }} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeImageModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Edit Modal */}
      {editPost && (
        <Modal show={showModal} onHide={closeEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Title"
                value={editPost.title || ''}
                onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
              />
              <textarea
                className="form-control mb-3"
                placeholder="Content"
                rows="4"
                value={editPost.content || ''}
                onChange={(e) => setEditPost({ ...editPost, content: e.target.value })}
              />
              <input
                type="number"
                className="form-control mb-3"
                placeholder="Category ID"
                value={editPost.category_id || ''}
                onChange={(e) => setEditPost({ ...editPost, category_id: e.target.value })}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEditModal}>
              Cancel
            </Button>
            <Button variant="success" onClick={() => handleSave(editPost.id)}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default UserPosts;
