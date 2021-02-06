import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import Lottie from 'react-lottie';
import * as animation from '../../animations/delete.json';

const config = {
    loop: true,
    autoplay: true,
    animationData: animation.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const DeleteModal = ({
    showDeleteModal,
    hideDeleteModal,
    selectedArticle,
    setArticles,
}) => {

    const url = "http://localhost:8000/api/articles/" + selectedArticle;
    const token = localStorage.getItem("token");

    function deleteArticle() {
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(
            (response) => {
                // Delete Article Locally
                setArticles(articles => articles.filter(article => article.id !== selectedArticle));
                hideDeleteModal()
            }
        )
    }

    return (
        <>
            <Modal contentClassName="articleModal" show={showDeleteModal} onHide={hideDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title className="modalTitle">Delete Article</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ marginTop: 30 }}>
                        <Lottie options={config}
                            style={{ marginBottom: 30 }}
                            height={170}
                            width={170} />
                    </div>
                    <h6 className="deleteModalText">Are you sure you want to delete this article?</h6>
                    <h6 className="deleteModalDesc">All comments associated with this article will be removed.</h6>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            className="modalDeleteBtn"
                            variant="primary"
                            onClick={deleteArticle}>
                            Delete
                </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DeleteModal;
