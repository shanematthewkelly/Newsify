import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUserTie, faCrown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Card, Row, Button, Spinner } from 'react-bootstrap';
import Comments from '../components/Comments';

const ArticleDetail = () => {

    const history = useHistory();
    const [articleObject, setArticleObject] = useState();

    // Modal States
    const [show, setShow] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isCreating, setIsCreating] = useState(false);


    // Modal Component Checks
    const isCreatingComment = () => {
        setShow(true)
        setIsCreating(true);
    }

    const isEditingComment = () => {
        setShow(true)
        setIsEditing(true);
    }

    const isDeletingComment = () => {
        setShow(true)
        setIsDeleting(true);
    }

    const hideModal = () => {
        setShow(false);
        setIsEditing(false);
        setIsDeleting(false);
        setIsCreating(false);
    }


    const singleArticle = (article) => {
        setArticleObject(article);
    }

    const backButton = () => {
        let path = `/`;
        history.push(path);
    }

    let { id } = useParams();
    const url = "http://localhost:8000/api/articles/" + id;
    const token = localStorage.getItem("token");
    const [article, setArticle] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState([]);

    const headers = {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }

    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: headers,
        }).then(response => response.json())
            .then(
                (article) => {
                    singleArticle(article);
                    setArticle(article);
                    setComments(article.comments);
                    setIsLoading(false);

                    let path = `/article/` + id;
                    history.push(path);
                }
            );
    }, []);

    return (
        <>
            {isLoading ?
                <div className="loadingContainer">
                    <Row>
                        <div className="spinners">
                            <Spinner className="spinnerStyle" animation="grow" size="sm" />
                            <Spinner className="spinnerStyleMove" animation="grow" size="sm" />
                            <Spinner className="spinnerStyleMove" animation="grow" size="sm" />
                        </div>
                    </Row>
                </div>
                :
                <div className="detailContainer">
                    <Button
                        className="backButton"
                        variant="primary"
                        onClick={backButton}>
                        <div style={{ fontSize: 13 }}>
                            <FontAwesomeIcon style={{ color: "#fff" }} icon={faArrowLeft} />
                        </div>
                    </Button>
                    <Card className="commentsCard">
                        <h1>{article.title}</h1>
                        <div style={{ marginTop: 20 }}>
                            <Row>
                                <div>
                                    <Card
                                        className="detailCard">
                                        <Row className="detailCardRow">
                                            <FontAwesomeIcon style={{ color: "#2044d6" }} icon={faCrown} />
                                    &nbsp;&nbsp;
                                    <p className="infoField">{article.category.title}</p>
                                        </Row>
                                    </Card>
                                </div>
                                <div>
                                    <Card
                                        className="detailCard">
                                        <Row className="detailCardRow">
                                            <FontAwesomeIcon style={{ color: "#2044d6" }} icon={faUserTie} />
                                    &nbsp;&nbsp;
                                    <p className="infoField">{article.user.name}</p>
                                        </Row>
                                    </Card>
                                </div>
                            </Row>
                            <p className="detailBody">{article.body}</p>
                        </div>
                    </Card>
                    <div style={{ marginTop: 80, marginLeft: 12 }}>
                        <Row>
                            <h2 className="commentsHeading">Comments</h2>
                            <Button
                                className="ml-auto"
                                id="createComment"
                                variant="primary"
                                onClick={isCreatingComment}>
                                <div style={{ fontSize: 20 }}>
                                    <FontAwesomeIcon style={{ color: "#fff" }} icon={faPlus} />
                                </div>
                            </Button>
                        </Row>
                    </div>

                    <div style={{ marginTop: 30 }}>
                        <Comments
                            comments={comments}
                            setComments={setComments}
                            articleObject={articleObject}
                            isEditingComment={isEditingComment}
                            isDeletingComment={isDeletingComment}
                            hideModal={hideModal}
                            showModal={show}
                            isCreating={isCreating}
                            isEditing={isEditing}
                            isDeleting={isDeleting}
                        />
                    </div>
                </div>
            }
        </>
    );
}

export default ArticleDetail;