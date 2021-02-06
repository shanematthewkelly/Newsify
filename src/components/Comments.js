import React, { useContext, useState } from 'react';
import { Card, Button, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import CommentsModal from './modals/CommentsModal';
import { UserContext } from '../context/UserContext';

const Comments = ({
    articleObject,
    hideModal,
    showModal,
    isEditingComment,
    isDeletingComment,
    isCreating,
    isEditing,
    isDeleting,
    setComments,
    comments,
}) => {

    const [selectedComment, setSelectedComment] = useState();

    const deleteComment = (id) => {
        setSelectedComment(id)
    }

    const authContext = useContext(UserContext);

    return (
        <>
            <CommentsModal
                selectedComment={selectedComment}
                setComments={setComments}
                articleObject={articleObject}
                showModal={showModal}
                hideModal={hideModal}
                isCreating={isCreating}
                isEditing={isEditing}
                isDeleting={isDeleting}
            />
            {comments.length != 0 ?
                <>
                    {
                        comments.map(comment => (
                            <Card
                                className="commentsCard"
                                key={comment.id}>
                                <h1 className="commentsQuote">"</h1>
                                <h5 className="commentsTitle">{comment.body}</h5>
                                <Row>
                                    {authContext.authState.user !== null && authContext.authState.user.id === comment.user_id &&
                                        <>
                                            <Button
                                                className="editArticle"
                                                variant="primary"
                                                onClick={isEditingComment}>
                                                <div style={{ fontSize: 13 }}>
                                                    <FontAwesomeIcon style={{ color: "#fff" }} icon={faPencilAlt} />
                                                </div>
                                            </Button>
                                            <Button
                                                className="deleteArticle"
                                                variant="primary"
                                                onClick={() => {
                                                    deleteComment(comment.id)
                                                    isDeletingComment()
                                                }
                                                }>
                                                <div style={{ fontSize: 13 }}>
                                                    <FontAwesomeIcon style={{ color: "#fff" }} icon={faTrashAlt} />
                                                </div>
                                            </Button>
                                        </>
                                    }
                                </Row>
                            </Card>
                        ))
                    }
                </>
                :
                <div>
                    <h4 className="noComments">There are no comments here yet. Try add one. </h4>
                </div>
            }
        </>
    );
}

export default Comments;