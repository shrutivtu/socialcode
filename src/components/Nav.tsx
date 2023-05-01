"use client";
import { FC, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import  { route } from '../route'

const navContent = [
  {
    name: 'Github',
    route: route.github
  },
  {
    name: 'Twitter',
    route: route.twitter
  },
  {
    name: 'Linkedin',
    route: route.linkedin
  }
]

export const Nav:FC = () => {
  const router = useRouter();

  const [redirect, setRedirect] = useState('');

  useEffect(() => {
    if (redirect !== "") {
      router.push(redirect)
    }
  }, [redirect, router]);

  const redirectTo = useCallback(
    (pathname: string) => (): void => {
      setRedirect(pathname)
    },
    []
  )

  return (
    <nav className="bg-gray-900 text-white">
      <section className="flex h-14  items-center w-64 justify-between px-2">
        <div className="cursor-pointer mr-2" onClick={redirectTo('/')}>Home</div>
        {navContent.map((obj, i) => {
          return(
            <div className="hover:bg-gray-700 hover:text-white px-3 py-2 cursor-pointer" key={i} onClick={redirectTo(obj.route)}>
              {obj.name}
            </div>
          )
        })}
      </section>
    </nav>
  );
};