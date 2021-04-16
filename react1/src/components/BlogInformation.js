import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, 
    Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody,
    Button, Label, Col, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';


class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            yourName:'',
            comment:'',
            isModalOpen:false,
            touched: {
                yourName: false,
                comment: false
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
        this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
    }
    render() {
        return (
            <div>
                <Button outline color="secondary" onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg" />Submit Comment
                </Button>
        </div>
        );
    }
}

function RenderBloginfos({bloginfo}) {

    return(
        <div className="col-md-5 m-1">
          
                 <Card key={bloginfo.id}>
                    <CardImg top src={bloginfo.image} alt={bloginfo.title} />
                    <CardBody>
                        <CardText>{bloginfo.details}</CardText>
                    </CardBody>
                </Card> 
        </div>
    )
}


function Bloginformation(props) {
    return(
        <div className="container">
                <div className="row">
                    <RenderBloginfos bloginfo={props.bloginfo} />
                </div>
        </div>
    )
}

export default Bloginformation;