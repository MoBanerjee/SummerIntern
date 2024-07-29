import React, { createContext } from 'react';
const UserContext = createContext({user:"", setuser: ()=>{}});
export default  UserContext 