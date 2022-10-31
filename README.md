sudo openapi-generator generate -i https://api.thingder.app/v3/api-docs -g typescript-axios -o ./src/api/generated --additional-properties=nullSafeAdditionalProps=true
