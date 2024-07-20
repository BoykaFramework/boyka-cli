import { TemplateFile } from '../types/types.js';

export const pomFile = {
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
        <boyka.version>1.2.0</boyka.version>
        <lombok.version>1.18.32</lombok.version>
        <testng.version>7.10.2</testng.version>
        <faker.version>2.2.2</faker.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>io.github.boykaframework</groupId>
            <artifactId>boyka-framework</artifactId>
            <version>\${boyka.version}</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>\${lombok.version}</version>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>org.testng</groupId>
            <artifactId>testng</artifactId>
            <version>\${testng.version}</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>net.datafaker</groupId>
            <artifactId>datafaker</artifactId>
            <version>\${faker.version}</version>
        </dependency>
    </dependencies>
</project>
`,
} satisfies TemplateFile;
