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
        auth: "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",
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

    const handleSubmit = () => {
        console.log(username);
        if(username){
            getTest();
        }
    }

    return (
        <main className="w-4/5 my-0 mr-auto	 ml-auto pt-10">
            <div className="mb-4 flex justify-evenly">
                <input className="shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" onChange={(e) => setUserName(e.target.value)}/>
                <button onClick={handleSubmit}>Go</button>
            </div>
            {gitData.map((data) => {
                return (
                    <li key={data.id} className="flex justify-between">
                        <p>{data.name}</p>
                        <a href={data.html_url}>Click here</a>
                    </li>
                );
            })}
        </main>
    );
}

export default Github;