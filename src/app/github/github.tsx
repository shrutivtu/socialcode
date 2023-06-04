"use client";
import { useState, FC, useEffect } from "react";
import { Octokit } from "octokit";
import { Topic, Repositories } from "@/components";

const Github: FC = () => {
  // const [gitData, setGitData] = useState<Array<GitData>>([]);
  const [gitData, setGitData] = useState([]);
  const [username, setUserName] = useState("");
  const [topicKeyword, setTopicKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [userPref, setUserPref] = useState('');

  useEffect(() => {
    if(topicKeyword) getTopicResult();
  }, [page]);;

  const octokit = new Octokit({
    auth: process.env.GIT_KEY,
  });

  async function getTest() {
    const response = await octokit.request(`GET /users/${username}/repos`, {
      username: "USERNAME",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    setGitData(response.data);
  }

  const getTopicResult = async () => {
    try {
      const response = await octokit.request("GET /search/repositories", {
        q: `topic:${topicKeyword}`,
        sort: "stars",
        order: "desc",
        page: page,
      });

      // Process the response data
      const processData = (arr: any) => {
        const res = arr.map((item: any) => {
          const {
            name,
            html_url,
            forks_count,
            topics,
            visibility,
            open_issues,
            watchers,
          } = item;
          return {
            name: name,
            htmlUrl: html_url,
            forksCount: forks_count,
            topics: topics,
            visibility: visibility,
            openIssues: open_issues,
            watchers: watchers,
          };
        });
        setGitData(res);
      };
      processData(response.data.items);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = () => {
    if (username) {
      getTest();
    }
    if (topicKeyword) {
      getTopicResult();
    }
  };

  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const renderComponent = () => {
    switch(userPref){
      case 'UserRepositories':  <Repositories gitData={gitData} />;
      break;
      case 'TopicRepositories': <Topic gitData={gitData} page={page} handleChangePage={handleChange} />;
      break;
    }
  }

  return (
    <main className="w-4/5 my-0 mr-auto	 ml-auto pt-10 mb-2">
      <div className="w-9/10 my-0 mx-auto mb-4 flex items-center justify-center relative">
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
          id="username"
          type="text"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
          // onChange={(e) => setTopicKeyword(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="border border-white-400 px-4 py-2 rounded hover:border-white-900 mr-2"
        >
          Go
        </button>
        <button className="border border-white-400 px-4 py-2 rounded hover:border-white-900">
          + Add Filter
        </button>
        {/* <div className="width-1/5 background-white">
                    <ul>
                        <li><input type="checkbox" name="option1" value="option1" />Search By Username</li>
                        <li><input type="checkbox" name="option2" value="option2" />Search By Framework</li>
                    </ul>
                </div> */}
      </div>
      <div className="w-full my-0 mx-auto pl-10 flex flex-col items-center justify-center">
        {gitData && <Repositories gitData={gitData} />}
        {/* {gitData && <Topic gitData={gitData} page={page} handleChangePage={handleChange} />} */}
      </div>
    </main>
  );
};

export default Github;