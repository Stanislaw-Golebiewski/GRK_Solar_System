#version 330 core
out vec4 FragColor;

in vec3 fragPosition;
in vec3 Normal;
in vec2 texCoord;

uniform vec3 lightColor;
uniform vec3 lightPos;
uniform vec3 viewPos;
uniform sampler2D samp_tex;

void main()
{
	//ambient
   	float ambientStrength = 0.15;
    vec3 ambient = ambientStrength * lightColor;
    //--

    //diffuse
	vec3 norm 	  = normalize(Normal);
	vec3 lightDir = normalize(lightPos - fragPosition);  
	float diff 	  = max(dot(norm, lightDir), 0.0);
	vec3 diffuse  = diff * lightColor;
	//--

	//spacular
	float specularStrength = 0.3;
	vec3 viewDir 	= normalize(viewPos - fragPosition);
	vec3 reflectDir = reflect(-lightDir, norm);
	float spec 		= pow(max(dot(viewDir, reflectDir), 0.0), 32);
	vec3 specular 	= specularStrength * spec * lightColor;  
	//--

	//attenuation 
	float constant	= 1.0;
    float linear 	= 0.0014;
    float quadratic = 0.000007;

    float distance    = length(lightPos - fragPosition);
	float attenuation = 1.0 / (constant + linear * distance + quadratic * (distance * distance));  

	ambient  *= attenuation; 
	diffuse  *= attenuation;
	specular *= attenuation; 
	//--

	vec3 objectColor = texture2D(samp_tex, texCoord).rgb;
	vec3 result 	 = (ambient + diffuse + specular) * objectColor;
	gl_FragColor 	 = vec4(result, 1.0);
}
