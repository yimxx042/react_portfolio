import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';


function RenderBlog({bloginfo}) {
    return (
            <Card className="entirecard">
                <CardImg width="100%" height="400px" src={bloginfo.image} alt={bloginfo.title} />
                <CardBody className="cardbody"> 
                    <CardTitle className="cardtitle">
                        #{bloginfo.id+1} <b>{bloginfo.title}</b> <span className="rating"> ✰ {bloginfo.ratings} </span>
                    </CardTitle>
                    <CardText className="cardtext">
                        {bloginfo.details}
                    </CardText>
                    <div className="d-flex justify-content-end">
                        <Link to ={`/blog/${bloginfo.id}`}>
                            <Button color="danger">Read More</Button> 
                        </Link>
                    </div>
                </CardBody>
            </Card>
    );
}

function Blog(props) {

    const blog = props.bloginfos.map(bloginfo => {
        return (
            <div key={bloginfo.id} className="col-md-5 m-1 d-flex justify-content-center">
                <RenderBlog bloginfo={bloginfo} />
            </div>
        );
    });

    return (
        <div className="container">
            <h1 className="blogtitle">MOVIE REVIEWS</h1>
                <div className="row d-flex justify-content-center">
                        {blog}
                </div>
        </div>
    );

}
    


export default Blog;