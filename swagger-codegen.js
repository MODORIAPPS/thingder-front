import { codegen } from "swagger-axios-codegen";

codegen({
    serviceNameSuffix: "Service",
    methodNameMode: "operationId",
    remoteUrl: "https://api.thingder.app/v3/api-docs",
    outputDir: "./src/api/generated",
    strictNullChecks: false,
    modelMode: "interface",
    sharedServiceOptions: true,
    useStaticMethod: true
})