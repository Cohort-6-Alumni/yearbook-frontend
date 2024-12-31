import { useState, useEffect } from 'react';

const useFetchContributors = (repoOwner1, repoName1, repoOwner2, repoName2) => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const responses = await Promise.all([
          fetch(`https://api.github.com/repos/${repoOwner1}/${repoName1}/contributors`),
          fetch(`https://api.github.com/repos/${repoOwner2}/${repoName2}/contributors`),
        ]);

        const data1 = await responses[0].json();
        const data2 = await responses[1].json();

        if (!responses[0].ok || !responses[1].ok) {
          throw new Error('Failed to fetch contributors');
        }

        const mergedContributors = [...data1, ...data2];
        const uniqueContributors = Array.from(new Set(mergedContributors.map((a) => a.id))).map(
          (id) => {
            return mergedContributors.find((a) => a.id === id);
          }
        );

        // Fetch full name for each unique contributor
        const contributorsWithFullName = await Promise.all(
          uniqueContributors.map(async (contributor) => {
            const response = await fetch(contributor.url);
            const data = await response.json();
            return {
              ...contributor,
              fullName: data.name,
            };
          })
        );

        setContributors(contributorsWithFullName);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, [repoOwner1, repoName1, repoOwner2, repoName2]);

  return { contributors, loading, error };
};

export default useFetchContributors;
