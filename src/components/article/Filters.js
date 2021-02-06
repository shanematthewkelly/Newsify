import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons'


const Filters = (props) => {

  return (
    <div className="FiltersContainer">
      <Accordion className="mt-2">
        <Card>
          <Card.Header id="FiltersUI">
            <Accordion.Toggle as={Button} variant="link" eventKey="0" className="filtersName">
              <FontAwesomeIcon icon={faNewspaper} size="lg" />&nbsp;&nbsp;Filter Articles
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Form>
                <fieldset>
                  <Form.Group as={Row}>
                    <Form.Label className="customText" as="legend" column sm={2}>
                      Categories
                  </Form.Label>
                    <Col sm={10}>
                      {props.categories.map(category => (
                        <Form.Check
                          key={category.id}
                          type="radio"
                          name="category"
                          value={category.title}
                          label={category.title}
                          onChange={props.onCategoryChange}
                          className="radioText" />
                      ))}
                    </Col>
                  </Form.Group>
                </fieldset>
                <Form.Group as={Row}>
                  <Form.Label className="customText" column sm={2}>
                    Author
                </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      placeholder="Author"
                      className="FiltersField"
                      onChange={props.onAuthorChange}
                    />
                  </Col>
                </Form.Group>
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}


export default Filters;
