import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardImgOverlay } from 'reactstrap';
import { Button } from 'reactstrap';




function RenderBlog({bloginfo, onClick}) {
    return (
        <Card className="entirecard">
            <CardImg width="100%" height="400px" src={bloginfo.image} alt={bloginfo.title} />
            <CardBody className="cardbody"> 
                <CardTitle className="cardtitle">
                    #{bloginfo.id+1} <b>{bloginfo.title}</b>
                </CardTitle>
                <CardText className="cardtext">
                    {bloginfo.details}
                </CardText>
                <div className="d-flex justify-content-end">
                    <Button color="danger" onClick={() => onClick(bloginfo.id)}>Read More</Button> 
                </div>
            </CardBody>
        </Card>
    );
}

// function Results ({ results, openPopup}) {
//     return (
//         <section className="results">
//             {results.map(result => (
//                 <Result key={result.imdbID} result={result} openPopup={openPopup} />
//             ))}
//         </section>
//     )
// }

function Blog(props) {

    const blog = props.bloginfos.map(bloginfo => {
        return (
            <div key={bloginfo.id} className="col-md-5 m-1 d-flex justify-content-center">
                <RenderBlog bloginfo={bloginfo} onClick={props.onClick} />
            </div>
        );
    });

    return (
        <div className="container">
            <h1 className="blogtitle">Movie Blogs</h1>
                <div className="row">
                        {blog}
                </div>
        </div>
    );

}
    


export default Blog;