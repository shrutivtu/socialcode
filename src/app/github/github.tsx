"use client"
import { useState, FC, useEffect } from "react";
import { Octokit } from "octokit";

interface GitData {
    id: number;
    name: string;
    html_url: string;
}

const Github: FC = () => {
    const [gitData, setGitData] = useState<Array<GitData>>([]);
    const [username, setUserName] = useState('');

    const octokit = new Octokit({
        auth: process.env.GIT_KEY
    });

    async function getTest() {
        const response = await octokit.request(`GET /users/${username}/repos`, {
            username: 'USERNAME',
            headers: {
                "X-GitHub-Api-Version": "2022-11-28",
            },
        });
        setGitData(response.data);
    }

    const handleSubmit = () => {
        if(username){
            getTest();
        }
    }

    return (
        <main className="w-4/5 my-0 mr-auto	 ml-auto pt-10 mb-2">
            <div className="w-1/2 my-0 mx-auto mb-4 flex pl-4">
                <input className="shadow appearance-none border rounded w-200 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2" id="username" type="text" placeholder="Username" onChange={(e) => setUserName(e.target.value)}/>
                <button onClick={handleSubmit} className="border border-white-400 px-4 py-2 rounded hover:border-white-900">Go</button>
            </div>
            <div className="w-4/5 my-0 mx-auto pl-10">
                {gitData.map((data) => {
                    return (
                        <li key={data.id} className="flex items-center justify-between w-4/5 border h-12 px-2 mb-2">
                            <p>{data.name}</p>
                            <a href={data.html_url}>Click here</a>
                        </li>
                    );
                })}
            </div>
            
        </main>
    );
}

export default Github;