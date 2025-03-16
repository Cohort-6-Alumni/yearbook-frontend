import { useQuery } from '@tanstack/react-query';

const fetchContributorsData = async (repoOwner1, repoName1, repoOwner2, repoName2) => {
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
    (id) => mergedContributors.find((a) => a.id === id)
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

  return contributorsWithFullName;
};

const useFetchContributors = (repoOwner1, repoName1, repoOwner2, repoName2) => {
  return useQuery({
    queryKey: ['contributors', repoOwner1, repoName1, repoOwner2, repoName2],
    queryFn: () => fetchContributorsData(repoOwner1, repoName1, repoOwner2, repoName2),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

export default useFetchContributors;