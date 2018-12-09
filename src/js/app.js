import React from 'react';
import Header from './header';
import DatabaseList from './db/databaseList';
import DatabaseCollections from './db/databaseCollections';
import DatabaseCollectionDocument from './db/databaseCollectionDocument';
import DatabaseQuery from './db/databaseQuery';

import axios from 'axios';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentDatabase: null,
            currentCollection: null,
            databases: {databases:[]},
            collections: {collections:[]},
            collection: {collection:[]}
        }

        this.getDatabases = this.getDatabases.bind(this);
        this.getDatabaseCollections = this.getDatabaseCollections.bind(this);
        this.getDatabaseCollection = this.getDatabaseCollection.bind(this);
        this.queryDatabase = this.queryDatabase.bind(this);
    }

    //
    // Retrieves the list of databases
    //
    getDatabases(){
        axios.get("/databases")
        .then(resp => {
            this.setState( {
                databases : resp.data.databases
            });
        })
        .catch(error => {
            alert("An Error Occurred during Database Name Retrieval: " + error);
        });       
    }

    //
    // Returns the list of collections for a database
    //
    getDatabaseCollections(databaseName){
        let database = databaseName.target.id;
        axios.get(`/databases/${database}/collections`)
        .then(resp => {
            this.setState( {
                collections : resp.data.collections,
                currentDatabase: database
            });
        })
        .catch(error => {
            alert("An Error Occurred during Database Collections Retrieval: " + error);
        });       
    }    

    //
    // Returns the list of documents for the specified collection of the 
    // specified database
    //
    getDatabaseCollection(collectionName){
        let collection = collectionName.target.id;
        axios.get(`/databases/${this.state.currentDatabase}/collections/${collection}`)
        .then(resp => {
            this.setState( {
                collection : resp.data.collection,
                currentCollection: collection
            });
        })
        .catch(error => {
            alert("An Error Occurred during Database Collections Retrieval: " + error);
        });       
    }

    //
    // Sends a query against the current database and collection 
    //
    queryDatabase(){
        let messageValue = document.getElementById('EchoMessage').value;
        if (messageValue == "") messageValue = "{}";
        axios.post(`/databases/${this.state.currentDatabase}/collections/${this.state.currentCollection}`,{"filter":`${messageValue}`})
            .then(resp => {
                this.setState({
                    collection: resp.data.collection
                })
            })
            .catch(error => {
                alert("An Error Occurred during Query: " + error.message);
            });
    }   

    render(){
        return (
            <div className="APPLICATION">
              <div className="APPLICATION_NAVIGATION">
                 <Header label="Databases"/>
                  <DatabaseList databaseDocuments={this.state.databases} 
                               handleClick={this.getDatabaseCollections}/>                
                 <Header label="Collections"/>    
                 <DatabaseCollections collectionDocuments={this.state.collections} 
                                      currentCollection={this.state.collection}
                                      handleClick={this.getDatabaseCollection}/>      
                 <div className="APPLICATION_CONTENT_WIDGET">
                      <span className="APPLICATION_CONTENT_WIDGET_CONTENT">
                           3
                      </span>
                 </div>                                                                                
              </div>
              <div className="APPLICATION_CONTENT">
               <Header label="Documents"/>   
               <DatabaseQuery handleQuery={this.queryDatabase}/>
               <DatabaseCollectionDocument id={'COLLECTION_DOCUMENT_ID'} value={this.state.collection}/>                                               
              </div>
            </div>
        );
    };

    // Populate initial view with list of databases
    componentDidMount(){
        this.getDatabases();
    }

}

export default App;