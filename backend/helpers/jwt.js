const expressJWT = require('express-jwt');

function authJWT () {
  let secret = 'secret'
  return expressJWT({
    secret,
    algorithms:['HS256']
  }).unless(
    {
      path:[
        {url: /\/api\/v1\/products(.*)/, method:['GET', 'OPTIONS']},
        {url: /\/api\/v1\/category(.*)/, method:['GET', 'OPTIONS']},
        '/api/v1/users/login',
        '/api/v1/users/register',
        '/'
      ]
    }
  )
}

module.exports=authJWT;