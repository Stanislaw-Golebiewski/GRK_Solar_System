#version 330 core

layout(location = 0) in vec3 vertexPosition;
layout(location = 1) in vec2 vertexTexCoord;
layout(location = 2) in vec3 vertexNormal;

uniform mat4 modelViewProjectionMatrix;
uniform mat4 modelMatrix;

out vec3 fragPosition;
out vec3 Normal;
out vec2 texCoord;

void main()
{
	fragPosition = vec3(modelMatrix * vec4(vertexPosition, 1.0));
	Normal = mat3(transpose(inverse(modelMatrix))) * vertexNormal; 
	texCoord = vertexTexCoord;

	gl_Position = modelViewProjectionMatrix * vec4(vertexPosition, 1.0);
}
