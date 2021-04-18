import React, { Component }  from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';



/* Create Header */

class Header extends Component {

    constructor(props){
        super(props);

        this.state = {
            isNavOpen : false
        };
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
        return (
            <React.Fragment>
                 <Navbar dark sticky="top" expand="md">
                    <div ClassName="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav className="ml-5" navbar >
                                <NavItem className="mr-4">
                                        {/* <NavLink className="nav-link" to="/home">
                                            <i className="fa fa-home fa-lg" /> Movie Trailer
                                        </NavLink>
                                    </NavItem >
                                    <NavItem className="mr-4"> */}
                                        <NavLink className="nav-link" to="/movies">
                                            <i className="fa fa-list fa-lg" /> Search
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="mr-4">
                                        <NavLink className="nav-link" to="/blog">
                                            <i className="fa fa-info fa-lg" /> Reviews
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/feedback">
                                            <i className="fa fa-address-card fa-lg" /> Feedback
                                        </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </React.Fragment>
        );
    }

}

export default Header;