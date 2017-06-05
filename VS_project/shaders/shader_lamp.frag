#version 330 core
out vec4 FragColor;

in vec2 texCord;

uniform sampler2D samp_tex;
uniform vec3 lightColor;

void main()
{
	vec3 objectColor = texture2D(samp_tex, texCord).rgb;
    FragColor = vec4(objectColor * lightColor, 1);
}
