import React, { useState, useContext } from 'react';
import { Modal, Form, Button, } from 'react-bootstrap';
import Lottie from 'react-lottie';
import * as animation from '../../animations/comment.json';
import * as animation2 from '../../animations/createcomment.json';
import * as animation3 from '../../animations/delete.json';
import { UserContext } from '../../context/UserContext';

const animConfig1 = {
    loop: true,
    autoplay: true,
    animationData: animation2.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const animConfig2 = {
    loop: true,
    autoplay: true,
    animationData: animation.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const animConfig3 = {
    loop: true,
    autoplay: true,
    animationData: animation3.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const CommentsModal = ({
    articleObject,
    showModal,
    hideModal,
    isCreating,
    isEditing,
    isDeleting,
    setComments,
    selectedComment
}) => {

    const [body, setBody] = useState("");
    const [bodyError, setBodyError] = useState({});
    const authContext = useContext(UserContext);

    const commentCreate = (e) => {
        e.preventDefault();
        const formValidated = validateForm();

        if (formValidated) {
            postComment();
        }
    }

    const validateForm = () => {

        const bodyError = {};
        let validated = true;

        if (body.trim().length < 10) {
            bodyError.invalidBody = "Please write a comment longer than 10 characters"
            validated = false;
        }
        setBodyError(bodyError);

        return validated;
    }


    const url = "http://localhost:8000/api/comments"
    const token = localStorage.getItem("token");
    const headers = {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }

    let userId = authContext.authState.user !== null && authContext.authState.user.id
    let articleId = articleObject.id

    function postComment() {
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                "body": body,
                "user_id": userId, // User ID from reducer
                "article_id": articleId // Passed in article object ID
            })
        }).then(response => response.json())
            .then(
                (newComments) => {
                    setComments(oldComments => {
                        return [...oldComments, newComments]
                    });
                    hideModal()
                }
            )
    }

    const deleteURL = "http://localhost:8000/api/comments/" + selectedComment;

    function deleteComment() {
        fetch(deleteURL, {
            method: 'DELETE',
            headers: headers,
        }).then(
            (response) => {
                // Delete Comment Locally
                setComments(comments => comments.filter(comment => comment.id !== selectedComment));
                hideModal()
            }
        )
    }

    return (
        <div>
            <Modal contentClassName="articleModal" show={showModal} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title
                        className="modalTitle">
                        {
                            isEditing && "Edit Comment" ||
                            isCreating && "Create Comment" ||
                            isDeleting && "Delete Comment"
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isCreating &&
                        <Lottie options={animConfig1}
                            style={{ marginBottom: 30 }}
                            height={150}
                            width={250} />
                    }
                    {isEditing &&
                        <Lottie options={animConfig2}
                            style={{ marginBottom: 30 }}
                            height={140}
                            width={140} />
                    }
                    {isDeleting &&
                        <div style={{ marginTop: 30 }}>
                            <Lottie options={animConfig3}
                                style={{ marginBottom: 30 }}
                                height={140}
                                width={140} />
                        </div>
                    }

                    {isEditing || isCreating ?
                        <>
                            <Form id="modalForm">

                                <Form.Group controlId="formBasicText">
                                    <Form.Control
                                        as="textarea" rows={5}
                                        className="commentField"
                                        type="text"
                                        value={body}
                                        onChange={(e) => { setBody(e.target.value) }}
                                        placeholder="Please write a suitable comment"
                                    />
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
                                {isCreating &&
                                    <Button
                                        className="createModal"
                                        variant="primary"
                                        type="submit"
                                        onClick={commentCreate}>
                                        Create
                                </Button>
                                }
                                {isEditing &&
                                    <Button
                                        className="createModal"
                                        variant="primary"
                                        type="submit">
                                        Edit
                                     </Button>
                                }
                            </Form>
                        </>
                        :
                        <>
                            <h6 className="deleteModalText">Are you sure you want to delete this comment?</h6>
                            <h6 className="deleteModalDesc">This comment will not appear anymore under this article.</h6>
                            <div style={{ textAlign: 'center' }}>
                                <Button
                                    className="modalDeleteBtn"
                                    variant="primary"
                                    onClick={deleteComment}>
                                    Delete
                                </Button>
                            </div>
                        </>
                    }
                </Modal.Body>
            </Modal>
        </div >
    )
}

export default CommentsModal;