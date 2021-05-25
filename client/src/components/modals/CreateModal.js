import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Lottie from 'react-lottie';
import * as animation from '../../animations/article.json';

const config = {
    loop: true,
    autoplay: true,
    animationData: animation.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const CreateModal = ({
    showModal,
    hideModal,
    categories,
    setArticles
}) => {

    const [categoryId, setCategoryId] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [titleError, setTitleError] = useState({});
    const [bodyError, setBodyError] = useState({});

    const submitForm = (e) => {
        e.preventDefault();
        const formValidated = validateForm();

        if (formValidated) {
            postArticle();
        }
    }

    const validateForm = () => {

        const titleError = {};
        const bodyError = {};
        let validated = true;

        // Title Validation
        if (title.trim().length < 5) {
            titleError.invalidTitle = "The title must be longer than 5 characters"
            validated = false;

        } else if (title.trim().length > 50) {
            titleError.lengthError = "The title cannot be longer than 50 characters"
            validated = false;
        }

        // Body Validation
        if (body.trim().length < 20) {
            bodyError.invalidBody = "Please write an article longer than 20 characters"
            validated = false;
        }

        setTitleError(titleError);
        setBodyError(bodyError);

        return validated;
    }

    const allArticles = "http://localhost:8000/api/articles";
    const singleArticle = "http://localhost:8000/api/articles/";
    const token = localStorage.getItem("token");
    const headers = {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
    }

    function postArticle() {

        fetch(allArticles, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                "category_id": categoryId,
                "title": title,
                "body": body
            })
        }).then(response => response.json())
            .then(
                (result) => {
                    fetch(singleArticle + result.id, {
                        headers: headers,
                    }).then(response => response.json())
                        .then(
                            (articleNew) => {
                                // Category isn't returned with the articles
                                // To get the category and attach it, the categories are filtered to get the one to match
                                // the category ID that has been selected
                                articleNew.category = categories.filter(
                                    cat => `${cat.id}` === categoryId)[0]

                                setArticles(oldArticles => {
                                    return [...oldArticles, articleNew]
                                });
                                hideModal()
                            },
                            (error) => {
                                console.log(error)
                            }
                        )
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    return (
        <>
            <Modal contentClassName="articleModal" show={showModal} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title className="modalTitle">Create An Article</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Lottie options={config}
                        style={{ marginBottom: 30 }}
                        height={185}
                        width={350} />
                    <Form onSubmit={submitForm} id="modalForm">
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Control
                                className="modalField"
                                required
                                value={categoryId}
                                onChange={(e) => { setCategoryId(e.target.value) }}
                                as="select">
                                <option value="" disabled selected={
                                    categoryId == null}>
                                    Please select a category
                                    </option>

                                {categories.map(category => (
                                    <option
                                        selected={categoryId === category.id}
                                        value={category.id}>
                                        {category.title}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicText">
                            <Form.Control
                                className="modalField"
                                type="text"
                                placeholder="Enter Article Title"
                                value={title}
                                onChange={(e) => { setTitle(e.target.value) }} />
                            {Object.keys(titleError).map((key) => {
                                return <div key={key} className="formError">{titleError[key]}</div>
                            })}
                        </Form.Group>

                        <Form.Group controlId="formBasicText">
                            <Form.Control
                                className="modalField"
                                type="text"
                                value={body}
                                onChange={(e) => { setBody(e.target.value) }}
                                placeholder="Enter Article Information" />
                            {Object.keys(bodyError).map((key) => {
                                return <div key={key} className="formError">{bodyError[key]}</div>
                            })}
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
                            Create
                    </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CreateModal;
