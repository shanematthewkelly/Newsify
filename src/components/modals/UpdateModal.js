import React, { useState, } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Lottie from 'react-lottie';
import * as animation from '../../animations/updateArticle.json';

const config = {
    loop: true,
    autoplay: true,
    animationData: animation.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const UpdateModal = ({
    showModal,
    hideModal,
    categories,
    articleObject,
    handleChange,
    setArticles,
    articles }) => {

    let articleTitle = articleObject?.title;
    let articleBody = articleObject?.body;
    let articleCategory = articleObject?.category_id;

    const [categoryId, setCategoryId] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const submitForm = (e) => {
        e.preventDefault();
        updateArticle();
    }

    const url = "http://localhost:8000/api/articles/" + articleObject?.id;
    const token = localStorage.getItem("token");

    function updateArticle() {

        fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                "category_id": articleCategory,
                "title": articleTitle,
                "body": articleBody
            })
        }).then(response => response.json())
            .then(
                (article) => {

                    article.category = categories.filter(
                        cat => `${cat.id}` === articleCategory)[0]

                    // Update article locally
                    const newArticles = articles;
                    const articleIndex = articles.findIndex(a => a.id === article.id);
                    newArticles[articleIndex] = article;
                    console.log(newArticles);

                    setArticles(newArticles)
                },
                (error) => {
                    console.log(error);
                }
            ).then(
                hideModal()
            );
    }

    return (
        <>
            {/* To populate the fields we need to get the ID of the selected article and pull in its' fields */}
            <Modal contentClassName="articleModal" show={showModal} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title className="modalTitle">Edit Article</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Lottie options={config}
                        style={{ marginBottom: 30 }}
                        height={150}
                        width={150} />
                    <Form onSubmit={submitForm} id="modalForm">
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Control
                                name="category_id"
                                className="modalField"
                                required
                                value={articleObject?.category_id}
                                onChange={handleChange}
                                as="select">
                                <option value="" disabled selected={
                                    articleCategory == null}>
                                    Please select a category
                                    </option>
                                {categories.map(category => (
                                    <option
                                        defaultValue={articleObject?.category_id === category.id}
                                        value={category.id}>
                                        {category.title}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicText">
                            <Form.Control
                                name="title"
                                required
                                className="modalField"
                                type="text"
                                placeholder="Enter Article Title"
                                value={articleObject?.title}
                                onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formBasicText">
                            <Form.Control
                                name="body"
                                required
                                className="modalField"
                                type="text"
                                value={articleObject?.body}
                                onChange={handleChange}
                                placeholder="Enter Article Information" />
                        </Form.Group>
                        <Button
                            className="modalClose"
                            variant="secondary"
                            onClick={hideModal}>
                            Close
                    </Button>
                        <Button
                            className="createModal"
                            variant="primary"
                            type="submit">
                            Update
                    </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default UpdateModal;
