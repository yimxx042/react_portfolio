import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Button, Label, Col, Row, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { Link } from 'react-router-dom';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);


class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            yourName:'',
            comment:'',
            touched: { 
                YourName: false,
                comment: false,
            }
        };
        this.toggleModal = this.toggleModal.bind(this);  
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.bloginfoId, values.rating, values.author, values.text);
    }

    render() {
        return (
            <React.Fragment>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                  <p>Thanks for your comments</p>
                    </ModalBody> 
                    </ Modal>
                        <LocalForm onSubmit={values => this.props.postComment(this.props.bloginfoId, values.rating, values.author, values.text)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                    <Col md={12}>
                                        <Control.select model=".contactType" name="contactType" className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="author" md={12}>Your Name</Label>
                                    <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                            placeholder="Your Name"
                                            className="form-control"
                                            validators={{
                                                required, 
                                                minLength: minLength(2),
                                                maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".yourName"
                                            show="touched"
                                            component="div"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be at least 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                
                                <Row className="form-group">
                                    <Label htmlFor="text" md={12}>Comment</Label>
                                    <Col md={12}>
                                        <Control.textarea model=".text" id="text" name="text"
                                            placeholder="What is your opinion?"
                                            rows="10"
                                            className="form-control"
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{size: 12}} >
                                        <div className="d-flex justify-content-center">
                                            <Button color="danger" size="lg" block type="submit" >
                                                Submit
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </LocalForm>
                            </React.Fragment>
        )
    }
}

function RenderComments({comments, postComment, bloginfoId}) {
    if(comments) {
        return (
            <div className="col-md-12 m-1">
                <h4>Comments</h4>
            <Stagger in>
                {
                    comments.map(comment => {
                        return (
                            <Fade in key={comment.id}>
                                <div id="comment-border">
                                    <p>
                                        {comment.text}<br />
                                        -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                    </p>
                                </div>
                            </Fade>
                        );
                    })
                }
            </Stagger>
                <CommentForm bloginfoId={bloginfoId} postComment={postComment} />
            </div>
        );
    } 
    return <div />       
}



  function RenderBloginformation({bloginfo}) {
      return(
          <div className="col-md-12 m-1 d-flex justify-content-center">
              <Card className="bloginfocard">
                <CardImg width="100%" height="400px" src={ baseUrl + bloginfo.image} alt={bloginfo.title} />
                      <CardBody>
                            <CardTitle className="blogcardtitle"><b>{bloginfo.title}</b></CardTitle>
                            <CardText>{bloginfo.details}</CardText>
                      </CardBody>
              </Card> 
          </div>
      );
 }

function BlogInformation(props){
    if (props.bloginfo){
        return (
            <div className="container d-flex justify-content-center">
                <div className="row d-flex justify-content-center">
                    <div className="col-12">
                        <h1 className="blogtitle2">Did you like this movie? Let`s discuss about it together!</h1>
                        <RenderBloginformation bloginfo={props.bloginfo[0]} />  
                    </div>   
                    <div className="col-10 col-md-10 col-sm-12">
                    <RenderComments 
                        comments={props.comments}
                        postComment={props.postComment}
                        bloginfoId={props.bloginfo.id}        
                    />
                    </div>       
                </div>
            </div>
        )
    }
    return <div />;
}
       

export default BlogInformation;