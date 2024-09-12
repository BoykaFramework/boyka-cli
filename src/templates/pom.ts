import { TemplateFile } from '../types/types.js';

const scopeCondition = 'dependency.scope And dependency.scope != "" And dependency.scope != nil';

export const PomFile: TemplateFile = {
  fileName: 'pom.xml',
  content: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
    http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>{{ groupId }}</groupId>
    <artifactId>{{ artifactId }}</artifactId>
    <version>1.0.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>{% for dependency in dependencies %}
        <dependency>
            <groupId>{{ dependency.groupId }}</groupId>
            <artifactId>{{ dependency.artifactId }}</artifactId>
            <version>{{ dependency.version }}</version>{% if ${scopeCondition} %}
            <scope>{{ dependency.scope }}</scope>{% endif %}
        </dependency>
    {% endfor %}</dependencies>
</project>
`,
};
