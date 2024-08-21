import 'dotenv/config';
import * as joi from 'joi';


interface EnvVars {
  PORT: number
}
//TODO: VALIDAR las variables de entorno
const envSchemas = joi.object({
  PORT: joi.number().required()

}).unknown(true)

const { error, value } = envSchemas.validate( process.env )
const envVars: EnvVars  = value
console.log({ error , envVars })
if( error ) throw new Error(`Config Validation error: ${error.message }`)


export const envs = {
  port: envVars.PORT as number
}