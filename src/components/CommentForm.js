import React, { Component } from 'react';
import {Button, Modal, ModalBody, ModalHeader, Label, Row, Col} from 'reactstrap';
import { Control, LocalForm, Errors} from 'react-redux-form';
import { Stagger, Fade} from 'react-animation-components';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class RenderComments extends Component{
    constructor(props){
        super(props);

        this.state = {
            isNavOpen:false,
            isModalOpen:false
        }
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }
   
     toggleNav(){
        this.setState({
            isNavOpen:!this.state.isNavOpen
        });  
      }
      
      toggleModal(){
          this.setState({
              isModalOpen:!this.state.isModalOpen
          });  
      }
  
      handleLogin(values){
          this.toggleModal();
        //   console.log(values);
          this.props.postComment(this.props.dishId, values.rating, values.yourname, values.comment);
        //   console.log(this.props.dishId,values);
      }

    render(){
        const commentsArr = this.props.comments.map((com) => {
            return (
                    <Fade in>
                        <dl className="row">
                            <dd className="col-12">{com.comment}</dd>
                            <dd className="col-12">{"--"+com.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(com.date)))}</dd>
                        </dl>
                    </Fade>
            );
        })
            return(
            <div>
                <Stagger in>
                {commentsArr}
                </Stagger>
               
                <div className="row">
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-edit fa-lg"></span> Submit Comment
                    </Button>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) =>this.handleLogin(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating"
                                            className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>                                        
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="yourname" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".yourname" id="name" name="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{minLength:minLength(3),maxLength:maxLength(15)}}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".yourname"
                                            show="touched"
                                            messages={{                            
                                                minLength:'Must be greter than 2 characters',
                                                maxLength:'Must be 15 characters or less'
                                            }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="12"
                                       className="form-control"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">Submit</Button>             
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
            );
    }

}

export default RenderComments;