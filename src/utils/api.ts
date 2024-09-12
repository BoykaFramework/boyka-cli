import { BoykaError } from './boyka-error.js';

export const getLatestMavenVersion = async (
  groupId: string,
  artifactId: string,
): Promise<string | null> => {
  const baseUrl = 'https://central.sonatype.com/api/internal/browse/component/versions';
  const sortBy = 'sortField=normalizedVersion&sortDirection=desc&page=0&size=12&';
  const query = `${sortBy}filter=namespace%3A${groupId}%2Cname%3A${artifactId}`;

  try {
    const response = await fetch(`${baseUrl}?${query}`);
    if (!response.ok) {
      throw new BoykaError(`Error fetching Maven data: ${response.statusText}`);
    }

    const data = await response.json();
    const latestVersion = data.components[0].version;

    if (!latestVersion) {
      console.warn('No version found for the specified artifact.');
      return null;
    }
    return latestVersion;
  } catch (error) {
    throw new BoykaError(
      `Failed to fetch the latest version for [${groupId}:${artifactId}]: ${error}`,
    );
  }
};
