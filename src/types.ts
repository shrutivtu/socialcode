export interface GitRepoProps {
  id: number;
  name: string;
  html_url: string;
}

export interface GitTopicProps {
    forksCount: number;
    htmlUrl: string;
    name: string;
    openIssues: number;
    topics: string[];
    visibility: string;
    watchers: number;
}