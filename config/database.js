

module.exports = {
  database:{
    host: process.env.DB_HOST || '',
	name: process.env.DB_DATABASE || '',
    user: process.env.DB_USER || '',
    password : process.env.DB_PASSWORD ||''
  }
}
