# mongo-explorer

Initial prototype for a MongoDB Database Explorer Client with a REACT Front-End, Express/NodeJS backend > MongoDB

1) Currently only connects to local mongodb instance for testing

2) Does not ask for credentials

3) Host/Port for MongoDB instance are defined in src/mongoServer.js

4) Some formatting issues for documents with long values (i.e strings)

5) Use "npm run build-run" target to start backend server after mongod (mongodb daemon) is started and accepting connections

6) Front-End client is accessible @ localhost:8080

REST API

The rest API is defined in mongoServer.js but briefly described here:

<table>
 <th>Method</th>
 <th>Endpoint</th>
 <th>Description</th>
 <tr>
  <td>GET</td><td>/databases</td><td>Returns all database</td>
 </tr>
 <tr>
  <td>GET</td><td>/databases/:database/collections</td><td>Returns all collections for a database</td>
 </tr>
 <tr>
  <td>GET</td><td>/databases/:database/collections/:collection</td><td>Returns all documents in a collection</td>
 </tr>
 <tr>
  <td>GET</td><td>/databases/:database/stats</td><td>Returns statistics for a database</td>
 </tr>
 <tr>
  <td>POST</td><td>/databases/:database/collections/:collection</td><td>Issues a query for the particular database collection</td>
 </tr>
</table>



 
