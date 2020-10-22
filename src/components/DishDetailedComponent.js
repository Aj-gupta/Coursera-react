import React  from 'react';
import { Card, CardImg,CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';
import RenderComments from './CommentForm';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform} from 'react-animation-components';

function RenderDish({dish}) {
            // console.log(dish.comments);
            
            
            return(
                <FadeTransform in 
                transformProps={{
                    exitTrasform:'scale(0.5) translateY(-50%)'
                                      }}>
                        <Card>
                            <CardImg top src={baseUrl +dish.image} alt={dish.name} />
                            <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>  
                </FadeTransform>
            );
        
       
           
    }
    

const DishDetail = (props) => {
        // console.log(props);
        // console.log("dish detailed component render invoked.");
        if(props.isLoading){
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if(props.errMess){
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if( props.dish != null)
        return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h3>Comments</h3>
                        <RenderComments comments={props.comments} 
                        postComment={props.postComment}
                        dishId={props.dish.id}/>
                    </div>
                </div>
                </div>
            );
        else
            return (
                <div></div>
            );
    }


export default DishDetail; 