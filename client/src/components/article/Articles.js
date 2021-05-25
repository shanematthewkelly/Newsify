import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Filters from './Filters';
import List from './List';
import { Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import Lottie from 'react-lottie';
import * as animation from '../../animations/newsify.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CreateModal from '../modals/CreateModal';
import { UserContext } from '../../context/UserContext';

const config = {
    loop: true,
    autoplay: true,
    animationData: animation.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const Articles = () => {

    const history = useHistory();

    const loginRedirect = () => {

        let path = `/login`;
        history.push(path);
    }

    const registerRedirect = () => {

        let path = `/register`;
        history.push(path);
    }

    // Create Article Event
    const [show, setShow] = useState(false);
    const modalOpen = () => setShow(true);

    const hideModal = () => {
        setShow(false);
    }

    // Request essentials
    const authContext = useContext(UserContext);
    console.log(authContext);
    var article_endpoint = "http://localhost:8000/api/articles";
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (authContext.authState.auth) {
            fetch(article_endpoint, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then(response => response.json())
                .then(
                    (articleData) => {
                        setArticles(articleData);
                        setIsLoading(false);
                    }
                )
        }
    }, []);

    const [categories, setCategories] = useState([]);
    var category_endpoint = "http://localhost:8000/api/categories";


    // Categories Network Operations
    useEffect(() => {
        fetch(category_endpoint, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(
                (categoryData) => {
                    setCategories(categoryData);
                }
            )
    }, [])

    const [categorySelected, setCategorySelected] = useState(null);
    const [authorSelected, setAuthorSelected] = useState(null);

    const onCategoryChange = (e) => {
        const category = e.target.value;
        setCategorySelected(category)
    }

    const onAuthorChange = (e) => {
        const author = e.target.value;
        setAuthorSelected(author)
    }

    return (
        <>
            {isLoading ?
                <></>
                :
                <div className="articleContainer" style={{ marginLeft: 100, marginRight: 100 }}>
                    {authContext.authState.auth &&
                        <div>
                            <CreateModal
                                setArticles={setArticles}
                                categories={categories}
                                showModal={show}
                                hideModal={hideModal} />
                            <Filters
                                categories={categories}
                                onCategoryChange={onCategoryChange}
                                onAuthorChange={onAuthorChange} />
                            <div style={{ textAlign: "end" }}>
                                <Button
                                    className="createArticle"
                                    variant="primary"
                                    onClick={modalOpen}>
                                    <div style={{ fontSize: 20 }}>
                                        <FontAwesomeIcon style={{ color: "#fff" }} icon={faPlus} />
                                    </div>
                                </Button>
                            </div>
                        </div>
                    }
                    {authContext.authState.auth &&
                        <List
                            setArticles={setArticles}
                            categories={categories}
                            articles={articles}
                            categorySelected={categorySelected}
                            authorSelected={authorSelected} />
                    }
                </div>
            }
            {authContext.authState.user == null && !authContext.authState.auth &&
                <Container className="homeCont">
                    <Row>
                        <Col>
                            <div>
                                <h3 className="homeTitle">Welcome to <b>Newsify</b> For All Your Daily News </h3>
                                <p className="homeDesc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tincidunt placerat mauris, nec pulvinar tellus mattis a. Nulla nec orci nisl. Phasellus iaculis quis purus non scelerisque. Pellentesque diam lacus, suscipit ac semper id, mattis at lorem. Aenean pulvinar congue tristique. Phasellus neque urna, facilisis in porttitor eget, laoreet sed ex. Duis imperdiet vehicula leo, venenatis luctus tortor placerat vitae. Maecenas consequat egestas lacus, quis ultricies lacus. Nullam in sapien efficitur, tempor dolor sed, pulvinar felis. Nunc facilisis ligula ex, et faucibus erat bibendum nec.</p>
                                <Button
                                    className="homeBtn"
                                    variant="primary"
                                    onClick={loginRedirect}>
                                    Login
                                        </Button>
                                <Button
                                    className="homeRegBtn"
                                    variant="primary"
                                    onClick={registerRedirect}>
                                    Register
                                </Button>
                            </div>
                        </Col>
                        <Col>
                            <Lottie options={config}
                                style={{ marginBottom: 30 }}
                                height={370}
                                width={370} />
                        </Col>
                    </Row>
                </Container >
            }
        </>
    );
}

export default Articles;