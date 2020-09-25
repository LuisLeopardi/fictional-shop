import React, {Component} from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import CoolNavbar from './components/navbar';
import FrontPage from './components/frontpage';
import Admin from './components/admin';
import Edit from './components/edit';
import Item from './components/item';
import Search from './components/search';
import GetAll from './components/getAll';

class App extends Component {
  
  state = {
    searchQuery:null,
    collection:null
  }

  queryHandler =  (searchQuery, collection) => {
    if (!searchQuery || !collection) return;
    this.setState({searchQuery, collection})
  }

  render(){
    const {searchQuery, collection} = this.state;
    return (
      <Router>
       <Switch>
        <Route path="/admin" />
        <Route path="/" render={props=>(  
          <CoolNavbar {...props} queryHandler={this.queryHandler}/>
          )
        }/>
       </Switch>
       <Switch>
        <Route exact path='/' component={FrontPage}/>
        <Route exact path='/admin' component={Admin}/>
        <Route path='/admin/edit' component={Edit}/>
        <Route path='/item' component={Item}/>
        <Route path='/search' render={props=>(
          <Search {...props} collection={collection} searchQuery={searchQuery}/>
        )}/>
        <Route path='/getAll' component={GetAll}/>
       </Switch>
       </Router>
    );
  }
}

export default App;

