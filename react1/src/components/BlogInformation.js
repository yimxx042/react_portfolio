import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';


  function RenderBloginformation({bloginfo}) {
      return(
          <div key={bloginfo.id} className="col-md-12 m-1 d-flex justify-content-center">
              <Card className="bloginfocard">
                <CardImg width="250px" height="300px" src={bloginfo.image} alt={bloginfo.title} />
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
            <div className="container">
                <div ClassName="row">
                    <h1 className="blogtitle">Movie Blogs</h1>
                        <RenderBloginformation 
                            bloginfo={props.bloginfo[0]}
                        />   
                </div>
            </div>
        )
    }
    return <div />;
}
       

export default BlogInformation;