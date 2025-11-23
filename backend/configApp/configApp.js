const configureApp = (app) => {
  // Change app prototype responses methods like sendStatus

  app.response.sendStatus = function (statusCode, type, message) {
    // code is intentionally kept simple for demonstration purpose
    return this.contentType(type).status(statusCode).send(message);
  };
    
    // Change app prototype properties
    

  return app;
};

export default configureApp;
