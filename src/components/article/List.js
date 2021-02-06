import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faPencilAlt, faEye, faTrashAlt, faUserTie } from '@fortawesome/free-solid-svg-icons';
import Row from 'react-bootstrap/Row';
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UpdateModal from '../modals/UpdateModal';
import DeleteModal from '../modals/DeleteModal';
import { UserContext } from '../../context/UserContext';
const { Card, Button } = require("react-bootstrap");

const List = (props) => {

  const [show, setShow] = useState(false);
  const authContext = useContext(UserContext);
  const [deleteShow, setDeleteShow] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState();
  const [articleObject, setArticleObject] = useState();

  const editModal = (article) => {
    setShow(true);
    setArticleObject(article);
  }

  const deleteModal = (id) => {
    setDeleteShow(true);
    setSelectedArticle(id);
  }

  const hideModal = () => {
    setShow(false);
  }

  const hideDeleteModal = () => {
    setDeleteShow(false);
  }


  const handleChange = (e) => {
    const target = e.target;
    const field = target.name;
    const value = target.value;
    const newArticle = { ...articleObject, [field]: value };
    setArticleObject(newArticle)
  }

  const filteredArticles = props.articles.filter(article =>
    (props.categorySelected === null || props.categorySelected === article.category.title) &&
    (props.authorSelected === null || article.user.name.includes(props.authorSelected))
  );

  return (
    <>
      <UpdateModal
        articles={props.articles}
        handleChange={handleChange}
        setArticles={props.setArticles}
        categories={props.categories}
        showModal={show}
        hideModal={hideModal}
        articleObject={articleObject}
      />

      <DeleteModal
        setArticles={props.setArticles}
        showDeleteModal={deleteShow}
        hideDeleteModal={hideDeleteModal}
        selectedArticle={selectedArticle}
      />
      <div className="articlesContainer">
        {filteredArticles.map(article => (
          <Card
            id="articlesList"
            key={article.id}>
            <h3>{article.title}</h3>
            <Row>
              <div style={{ marginTop: 25 }}>
                <Card
                  className="detailCard">
                  <Row className="detailCardRow">
                    <FontAwesomeIcon style={{ color: "#2044d6" }} icon={faCrown} />
                       &nbsp;&nbsp;
                  <p className="infoField">{article.category.title}</p>
                  </Row>
                </Card>
              </div>
              <div style={{ marginTop: 25 }}>
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
            <Row>
              <div style={{ marginTop: 30, marginLeft: 30 }}>
                <Button
                  className="viewArticle"
                  variant="primary"
                  as={Link} to={`/article/` + article.id}>
                  <div style={{ fontSize: 13 }}>
                    <FontAwesomeIcon style={{ color: "#fff" }} icon={faEye} />
                  </div>
                </Button>

                {authContext.authState.user !== null && authContext.authState.user.id === article.user_id &&
                  <>
                    <Button
                      className="editArticle"
                      variant="primary"
                      onClick={() => editModal(article)}>
                      <div style={{ fontSize: 13 }}>
                        <FontAwesomeIcon style={{ color: "#fff" }} icon={faPencilAlt} />
                      </div>
                    </Button>
                    <Button
                      className="deleteArticle"
                      variant="primary"
                      onClick={() =>
                        deleteModal(article.id)
                      }>
                      <div style={{ fontSize: 13 }}>
                        <FontAwesomeIcon style={{ color: "#fff" }} icon={faTrashAlt} />
                      </div>
                    </Button>
                  </>
                }
              </div>
            </Row>
            <div>
              <p className="authorText">{(new Date(article.created_at)).toDateString()}</p>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}


export default List;
