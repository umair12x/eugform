"use client";
import Link from "next/link";
import Icon from "@/components/Icon";
import { Work_Sans } from "next/font/google";
import "../globals.css";

const workSans = Work_Sans({ subsets: ["latin"], weight: ["400", "700"] });

// export const metadata = {
//   title:{
//     default: "eUG Form - University Enrollment Made Easy",
//     template: "%s | eUG Form"
//   },
//   icon: "/favicon.ico",
//   description:
//     "An application to submit enrollment forms easily without hassle without any hardcopy",
//   authors: [{ name: "Umair Imran", url: "https://umairimran.com" }],
//   ketwords: [
//     "eUG Form",
//     "University of Agriculture",
//     "Undergraduate Enrollment",
//     "Digital Form Submission",
//     "eUG",
//     "UAF Enrollment",
//     "Online Application",
//     "Student Forms",
//     "University Forms",
//     "eUG Support",
//   ],
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={workSans.className}>
        <header className="bg-gray-200 dark:bg-gray-800 h-10 shadow-md">
          <nav className="w-full flex justify-between items-center">
            <div className="navbar bg-base-100 shadow-sm">
              <div className="navbar-start flex">
                <Icon />
              </div>
              <div className="navbar-center">
                <a className="btn btn-ghost text-xl">e.Enrollment</a>
              </div>
              <div className="navbar-end">
              
                <button className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {" "}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />{" "}
                    </svg>
                    <span className="badge badge-xs badge-primary indicator-item"></span>
                  </div>
                </button>

                <div className="dropdown relative">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h7"
                      />
                    </svg>
                  </div>

                  <ul
                    tabIndex="-1"
                    className="absolute right-0 mt-3 w-60 bg-base-100 rounded-box shadow menu menu-sm dropdown-content z-50"
                  >
                    <li>
                      <Link href="/">Homepage</Link>
                    </li>
                    <li>
                      <Link href="/about">About</Link>
                    </li>
                    <li>
                      <Link href="/contact">Contact</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="bg-gray-200 dark:bg-gray-800 text-gray-800 text-center p-4">
          © {new Date().getFullYear()} eUG Form. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
