import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardImgOverlay } from 'reactstrap';
import Main from './MainComponent';



function RenderBlog({bloginfo, onClick}) {
    return (
        <Card onClick={() => onClick(bloginfo.id)}>
            <CardImg width="100%" height="100%" src={bloginfo.image} alt={bloginfo.title} />
            <CardBody>
                <CardTitle>{bloginfo.title}</CardTitle>
                <CardText>{bloginfo.details}</CardText>
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
            <div key={bloginfo.id} className="col-md-5 m-1">
                <RenderBlog bloginfo={bloginfo} onClick={props.onClick} />
            </div>
        );
    });

    return (
        <div className="container">
            <div className="row">
                    {blog}
            </div>
        </div>
    );

}
    


export default Blog;