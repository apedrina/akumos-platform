(function(app){
  
  console.log('running code-template Akumos Platform project...')

  app.scripts.push('src?init.js')
  app.suffix = 'jwt_'
  //app.params.set('name','spring-jwt')
  app.params.set('name','spring-kafka')

})(app)