import React from 'react'

export const networks = {
  production: {
    host: ""
  },
  development: {
    host: "http://192.168.1.27"
  },
};

export const NetworkContext = React.createContext(  networks.development );

